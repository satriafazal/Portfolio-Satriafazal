import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, placeholderSvg } from "../data/content.js";

gsap.registerPlugin(ScrollTrigger);
// abaikan resize dari URL bar mobile agar pinning tidak dihitung ulang sia-sia
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Galeri proyek: section di-PIN (scroll vertikal terkunci), kartu bergerak
 * horizontal. Heading kiri tetap, teksnya mengikuti kartu yang sedang di
 * tengah. Inisialisasi GSAP diberi jeda + pemeriksaan lebar agar pinning
 * akurat setelah DOM & font selesai render.
 */
export default function ProjectsGallery({ lang, t }) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const currentRef = useRef(0);
  const stRef = useRef(null); // context ScrollTrigger aktif (dibagi antar re-invoke effect)
  const [current, setCurrent] = useState(0);
  const [mobile, setMobile] = useState(false);

  useLayoutEffect(() => {
    let cancelled = false;
    let timer = null;
    let resizeTimer = null;

    const init = () => {
      if (cancelled) return;

      // bersihkan instance sebelumnya (aman untuk StrictMode & re-init resize)
      if (stRef.current) {
        stRef.current.revert();
        stRef.current = null;
      }

      // pemeriksaan awal: di mobile pakai layout grid biasa (tanpa pin)
      const isMobile = window.innerWidth < 900;
      setMobile(isMobile);
      if (isMobile) return;

      const ctx = gsap.context(() => {
        const track = trackRef.current;
        const viewport = track.parentElement; // .track-viewport (area terlihat)
        // jarak tempuh = lebar total track - lebar area terlihat
        const getAmount = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

        // heading mengikuti kartu yang paling dekat dengan titik fokus.
        // Dipanggil dari onUpdate ScrollTrigger DAN onUpdate tween (scrub lag).
        const updateActive = () => {
          const cards = cardsRef.current.filter(Boolean);
          if (!cards.length) return;
          const focusX = window.innerWidth * 0.62;
          let best = 0;
          let bestDist = Infinity;
          cards.forEach((card, i) => {
            const r = card.getBoundingClientRect();
            const d = Math.abs(r.left + r.width / 2 - focusX);
            if (d < bestDist) {
              bestDist = d;
              best = i;
            }
          });
          if (best !== currentRef.current) {
            currentRef.current = best;
            setCurrent(best);
          }
        };

        gsap.to(track, {
          x: () => -getAmount(),
          ease: "none",
          onUpdate: updateActive,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: () => `+=${getAmount()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: updateActive,
          },
        });
      }, rootRef);

      stRef.current = ctx;
      // refresh setelah layout pasti (gambar & font sudah termuat)
      ScrollTrigger.refresh();
    };

    // SAFETY: tunggu font selesai render + jeda singkat, agar lebar kartu
    // akurat sebelum ScrollTrigger menghitung pinning
    const start = () => {
      if (!cancelled) timer = setTimeout(init, 300);
    };
    if (document.fonts && document.fonts.status !== "loaded") {
      document.fonts.ready.then(start);
    } else {
      start();
    }

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 250);
    };
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onLoad);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      if (stRef.current) {
        stRef.current.revert();
        stRef.current = null;
      }
    };
  }, []);

  const active = projects[current];

  return (
    <section className={`projects${mobile ? " is-mobile" : ""}`} id="projects" ref={rootRef}>
      <div className="projects-inner">
        {/* Heading kiri — tetap (pinned), teks mengikuti kartu aktif */}
        <aside className="projects-aside">
          <span className="section-label">{lang === "id" ? "Proyek Pilihan" : "Selected Projects"}</span>
          <div className="projects-heading">
            <span className="projects-heading-num" key={`num-${current}`}>
              {active.num}
            </span>
            <h2 className="projects-heading-title" key={`title-${current}`}>
              {active.title}
            </h2>
            <span className="projects-heading-kind" key={`kind-${current}`}>
              {t(active.kind)}
            </span>
            <span className="projects-heading-status" key={`status-${current}`}>
              {t(active.status)}
            </span>
          </div>
          <div className="projects-dots">
            {projects.map((p, i) => (
              <span key={p.num} className={`projects-dot${i === current ? " is-active" : ""}`} />
            ))}
          </div>
          <p className="projects-hint">
            {lang === "id" ? "Gulir untuk menjelajah →" : "Scroll to explore →"}
          </p>
        </aside>

        {/* Track kartu — bergerak horizontal saat section ter-pin */}
        <div className="track-viewport">
          <div className="track" ref={trackRef}>
            {projects.map((p, i) => (
              <article
                className={`proj-card${i === current ? " is-active" : ""}`}
                key={p.num}
                ref={(el) => (cardsRef.current[i] = el)}
              >
                <div className="proj-media">
                  <img
                    className="proj-img"
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = placeholderSvg(p.title, 1200, 800);
                    }}
                  />
                </div>
                <div className="proj-body">
                  <div className="proj-meta">
                    <span className="proj-num">{p.num}</span>
                    <span className="proj-kind">{t(p.kind)}</span>
                  </div>
                  <h3 className="proj-title">{p.title}</h3>
                  <span className="proj-status">{t(p.status)}</span>
                  <p className="proj-desc">{t(p.desc)}</p>
                  <p className="proj-contrib-title">
                    {lang === "id" ? "Kontribusi saya" : "My contributions"}
                  </p>
                  <ul className="proj-contrib">
                    {t(p.contributions).map((c, j) => (
                      <li key={j}>{c}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
