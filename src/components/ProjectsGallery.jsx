import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, placeholderSvg } from "../data/content.js";

gsap.registerPlugin(ScrollTrigger);
// abaikan resize dari URL bar mobile agar pinning tidak dihitung ulang sia-sia
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Galeri proyek: section di-PIN (scroll vertikal terkunci), kartu bergerak
 * horizontal.
 *
 * Perbaikan UX:
 * 1. Start dwell: saat masuk section, proyek 01 tertahan (pause) terlebih dahulu
 *    sehingga pengguna bisa membaca proyek 01 tanpa langsung meloncat ke proyek 02.
 * 2. Threshold akurat: pergantian kartu aktif dihitung berdasarkan posisi tengah kartu
 *    terhadap viewport, bukan perbandingan kasar window width.
 * 3. End dwell: setelah kartu proyek 04 (terakhir) berada di posisi fokus, section
 *    tetap ter-pin untuk jarak scroll yang cukup agar pengguna tidak langsung
 *    terlempar (unpin terburu-buru).
 */
export default function ProjectsGallery({ lang, t }) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const currentRef = useRef(0);
  const stRef = useRef(null); // context ScrollTrigger aktif
  const goToCardRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [mobile, setMobile] = useState(false);

  useLayoutEffect(() => {
    let cancelled = false;
    let timer = null;
    let resizeTimer = null;

    const init = () => {
      if (cancelled) return;

      // Bersihkan instance sebelumnya
      if (stRef.current) {
        stRef.current.revert();
        stRef.current = null;
      }

      // Pemeriksaan awal: di mobile pakai layout grid biasa (tanpa pin)
      const isMobile = window.innerWidth < 900;
      setMobile(isMobile);
      if (isMobile) {
        goToCardRef.current = (index) => {
          cardsRef.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
        };
        return;
      }

      const ctx = gsap.context(() => {
        const track = trackRef.current;
        if (!track) return;
        const viewport = track.parentElement; // .track-viewport
        if (!viewport) return;

        // Jarak tempuh horizontal track = lebar total track - lebar viewport
        const getAmount = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

        // Posisi target track (x) agar setiap kartu berada di fokus/tengah
        const getCardTargets = () => {
          const cards = cardsRef.current.filter(Boolean);
          const amount = getAmount();
          if (!cards.length) return [0];
          const viewportCenter = viewport.clientWidth / 2;
          return cards.map((card, i) => {
            if (i === 0) return 0;
            if (i === cards.length - 1) return -amount;
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const idealX = -(cardCenter - viewportCenter);
            return Math.max(-amount, Math.min(0, idealX));
          });
        };

        // Perhitungan buffer scroll vertikal (dwell)
        const getDwells = () => {
          const amount = getAmount();
          // Jeda awal agar kartu 01 tidak langsung loncat saat user mulai scroll
          const startDwell = Math.max(420, Math.round(window.innerHeight * 0.5));
          // Jarak tempuh gerak horizontal yang nyaman dan tidak terburu-buru
          const moveDist = Math.max(Math.round(amount * 1.5), Math.round(window.innerHeight * 1.6));
          // Jeda akhir agar kartu 04 tidak cepat ter-unpin
          const endDwell = Math.max(900, Math.round(window.innerHeight * 1.05));
          const totalDist = startDwell + moveDist + endDwell;
          return { startDwell, moveDist, endDwell, totalDist };
        };

        const { startDwell, moveDist, endDwell, totalDist } = getDwells();
        const startRatio = startDwell / totalDist;
        const moveRatio = moveDist / totalDist;
        const endRatio = endDwell / totalDist;

        // Update kartu aktif pada heading kiri dan dots
        const updateActive = () => {
          const cards = cardsRef.current.filter(Boolean);
          if (!cards.length) return;

          const currentX = gsap.getProperty(track, "x") || 0;
          const amount = getAmount();

          // Fase start dwell: selalu kartu 01
          if (currentX >= -15) {
            if (currentRef.current !== 0) {
              currentRef.current = 0;
              setCurrent(0);
            }
            return;
          }

          // Fase end dwell: selalu kartu terakhir (04)
          if (amount > 0 && currentX <= -(amount - 15)) {
            const lastIndex = cards.length - 1;
            if (currentRef.current !== lastIndex) {
              currentRef.current = lastIndex;
              setCurrent(lastIndex);
            }
            return;
          }

          // Kartu aktif berdasarkan target tengah terdekat
          const targets = getCardTargets();
          let best = 0;
          for (let i = 0; i < targets.length - 1; i++) {
            const mid = (targets[i] + targets[i + 1]) / 2;
            if (currentX < mid) {
              best = i + 1;
            }
          }

          if (best !== currentRef.current) {
            currentRef.current = best;
            setCurrent(best);
          }
        };

        // Timeline GSAP dengan start dwell, animasi horizontal, dan end dwell
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: () => `+=${getDwells().totalDist}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: () => updateActive(),
          },
        });

        // 1. Jeda awal: kartu 01 diam & aktif
        tl.to({}, { duration: startRatio });

        // 2. Animasi translasi kartu: bergerak horizontal
        tl.to(track, {
          x: () => -getAmount(),
          ease: "none",
          duration: moveRatio,
          onUpdate: updateActive,
        });

        // 3. Jeda akhir: kartu 04 diam & tetap ter-pin
        tl.to({}, { duration: endRatio });

        // Navigasi klik dot
        goToCardRef.current = (index) => {
          const st = tl.scrollTrigger;
          if (!st) return;
          const { startDwell: sD, moveDist: mD, totalDist: tD } = getDwells();
          const sRatio = sD / tD;
          const mRatio = mD / tD;
          const amt = getAmount();
          const targets = getCardTargets();
          const targetX = targets[index] ?? 0;

          let targetProgress = 0;
          if (index === 0) {
            targetProgress = 0;
          } else if (index === targets.length - 1) {
            targetProgress = sRatio + mRatio;
          } else {
            const frac = amt > 0 ? Math.abs(targetX) / amt : 0;
            targetProgress = sRatio + frac * mRatio;
          }

          const targetScroll = st.start + targetProgress * tD;
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        };
      }, rootRef);

      stRef.current = ctx;
      ScrollTrigger.refresh();
    };

    // SAFETY: tunggu font selesai render + jeda singkat
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

  const goToCard = (index) => {
    if (goToCardRef.current) {
      goToCardRef.current(index);
    }
  };

  const active = projects[current] || projects[0];

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
          <div
            className="projects-dots"
            role="tablist"
            aria-label={lang === "id" ? "Navigasi proyek" : "Projects navigation"}
          >
            {projects.map((p, i) => (
              <button
                key={p.num}
                type="button"
                className={`projects-dot${i === current ? " is-active" : ""}`}
                onClick={() => goToCard(i)}
                aria-label={`${lang === "id" ? "Lihat proyek" : "View project"} ${p.num} - ${p.title}`}
                aria-selected={i === current}
                role="tab"
              />
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
