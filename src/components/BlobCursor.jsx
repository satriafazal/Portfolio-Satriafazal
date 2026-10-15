import { useEffect, useRef } from "react";

const TRAIL_MAX = 14;

/**
 * Hero blob cursor:
 * - Blob gooey mengikuti cursor dengan lag (lerp)
 * - Blob = "lubang" pada mask gambar utama -> gambar alternatif terlihat
 * - Trail blob kecil muncul saat cursor bergerak cepat
 * - Teks .invertible berubah putih saat blob menyentuh (transition 300ms di CSS)
 * - Elemen [data-parallax] bergeser berlawanan arah cursor
 */
export default function BlobCursor({ primarySrc, altSrc, fallback }) {
  const svgRef = useRef(null);
  const groupRef = useRef(null);
  const imgPrimaryRef = useRef(null);
  const imgAltRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return; // perangkat sentuh / reduced motion: hero statis

    const svg = svgRef.current;
    const group = groupRef.current;
    const hero = svg.closest(".hero");

    // --- buat elemen lingkaran sekali ---
    const NS = "http://www.w3.org/2000/svg";
    const main = document.createElementNS(NS, "circle");
    main.setAttribute("fill", "#000");
    group.appendChild(main);

    const slots = [];
    for (let i = 0; i < TRAIL_MAX; i++) {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("fill", "#000");
      c.setAttribute("fill-opacity", "0");
      group.appendChild(c);
      slots.push({ el: c });
    }

    let w = window.innerWidth;
    let h = window.innerHeight;
    let mx = w / 2;
    let my = h * 0.55;
    let bx = mx;
    let by = my;
    let px = mx;
    let py = my;
    let vx = 0;
    let vy = 0;
    let speed = 0;
    const trail = [];
    const inverted = new Set();

    const maskRect = svg.querySelector("#reveal-mask rect");

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      if (maskRect) {
        maskRect.setAttribute("width", String(w));
        maskRect.setAttribute("height", String(h));
      }
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    onResize();

    // fallback kalau gambar internet gagal dimuat
    [imgPrimaryRef.current, imgAltRef.current].forEach((img) => {
      if (!img) return;
      img.addEventListener("error", () => img.setAttribute("href", fallback));
    });

    const frame = () => {
      vx = mx - px;
      vy = my - py;
      speed = Math.min(70, Math.hypot(vx, vy));
      px = mx;
      py = my;

      // blob utama mengikuti dengan lag
      bx += (mx - bx) * 0.12;
      by += (my - by) * 0.12;

      const baseR = Math.min(115, Math.max(60, w * 0.065));
      const rx = baseR + Math.abs(vx) * 0.9;
      const ry = baseR + Math.abs(vy) * 0.9;
      main.setAttribute("cx", bx.toFixed(1));
      main.setAttribute("cy", by.toFixed(1));
      main.setAttribute("rx", rx.toFixed(1));
      main.setAttribute("ry", ry.toFixed(1));

      // trail: semakin cepat cursor, semakin banyak & besar trail
      if (speed > 3) {
        trail.push({ x: bx, y: by, r: baseR * 0.68, life: 1 });
        if (trail.length > TRAIL_MAX) trail.shift();
      }
      for (let i = trail.length - 1; i >= 0; i--) {
        const t = trail[i];
        t.life -= 0.03 + speed * 0.0018;
        t.r *= 1.014;
        if (t.life <= 0) trail.splice(i, 1);
      }
      slots.forEach((slot, i) => {
        const t = trail[i];
        if (!t) {
          slot.el.setAttribute("fill-opacity", "0");
          return;
        }
        slot.el.setAttribute("cx", t.x.toFixed(1));
        slot.el.setAttribute("cy", t.y.toFixed(1));
        slot.el.setAttribute("r", t.r.toFixed(1));
        slot.el.setAttribute("fill-opacity", (t.life * 0.5).toFixed(3));
      });

      // invert teks saat blob menyentuh
      const els = hero.querySelectorAll(".invertible");
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const near =
          bx > r.left - baseR * 0.8 &&
          bx < r.right + baseR * 0.8 &&
          by > r.top - baseR * 0.8 &&
          by < r.bottom + baseR * 0.8;
        if (near && !inverted.has(el)) {
          inverted.add(el);
          el.classList.add("is-inverted");
        } else if (!near && inverted.has(el)) {
          inverted.delete(el);
          el.classList.remove("is-inverted");
        }
      });

      // parallax: geser berlawanan arah cursor
      const nx = mx / w - 0.5;
      const ny = my / h - 0.5;
      hero.querySelectorAll("[data-parallax]").forEach((el) => {
        const f = parseFloat(el.dataset.parallax) || 0.02;
        el.style.transform = `translate3d(${(-nx * f * 100).toFixed(2)}px, ${(
          -ny *
          f *
          100
        ).toFixed(2)}px, 0)`;
      });

      requestAnimationFrame(frame);
    };
    const raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      group.querySelectorAll("circle").forEach((c) => c.remove());
    };
  }, [fallback]);

  return (
    <div className="blob-layer" aria-hidden="true">
      <svg
        ref={svgRef}
        className="blob-svg"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* efek gooey: blur -> pertajam alpha -> gabung */}
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
          {/* mask: putih = gambar utama terlihat, hitam = gambar alternatif terlihat */}
          <mask id="reveal-mask" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
            <g ref={groupRef} filter="url(#goo)" />
          </mask>
        </defs>
        {/* lapisan bawah: gambar alternatif (image two) */}
        <image
          ref={imgAltRef}
          href={altSrc}
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
        {/* lapisan atas: gambar utama (image one) dengan lubang blob */}
        <image
          ref={imgPrimaryRef}
          href={primarySrc}
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#reveal-mask)"
        />
      </svg>
    </div>
  );
}
