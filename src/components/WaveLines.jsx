import { useEffect, useRef } from "react";

/**
 * Wave lines: beberapa garis sinusoidal beranimasi di bagian bawah hero,
 * bergerak halus dan bereaksi lembut terhadap gerakan mouse.
 */
export default function WaveLines() {
  const svgRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const svg = svgRef.current;
    const paths = Array.from(svg.querySelectorAll(".wave-line"));
    let w = window.innerWidth;
    let h = window.innerHeight;
    let t = 0;
    let target = 0.5;
    let phase = 0.5;
    let amp = 1;
    let targetAmp = 1;

    const onMove = (e) => {
      target = e.clientX / window.innerWidth;
    };
    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    onResize();

    const configs = paths.map((el, i) => ({
      el,
      freq: 1.4 + i * 0.8,
      baseY: 0.66 + i * 0.085,
      speed: 0.5 + i * 0.3,
      ampBase: 12 + i * 9,
    }));

    const frame = () => {
      t += 0.008;
      const shift = target - phase;
      phase += shift * 0.04;
      targetAmp = 1 + Math.min(2.4, Math.abs(shift) * 14);
      amp += (targetAmp - amp) * 0.05;

      configs.forEach((c, idx) => {
        const y0 = h * c.baseY;
        const a = c.ampBase * amp * (1 + idx * 0.35);
        const steps = 20;
        let d = `M 0 ${y0.toFixed(1)}`;
        for (let s = 1; s <= steps; s++) {
          const x = (w / steps) * s;
          const y =
            y0 +
            Math.sin(x * 0.0055 * c.freq + t * c.speed * 5 + phase * 2.2) * a;
          d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
        }
        c.el.setAttribute("d", d);
      });
      requestAnimationFrame(frame);
    };
    const raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="wave-svg"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path className="wave-line" />
      <path className="wave-line" />
      <path className="wave-line" />
    </svg>
  );
}
