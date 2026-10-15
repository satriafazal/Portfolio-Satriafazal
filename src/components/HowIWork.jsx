import Reveal from "./Reveal.jsx";
import { processSteps } from "../data/content.js";

export default function HowIWork({ lang, t }) {
  return (
    <section className="section section-alt" id="work">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-label">{lang === "id" ? "Cara Kerja" : "How I Work"}</span>
          <h2 className="section-title">
            {lang === "id"
              ? "Pahami masalahnya, rancang pengalamannya, bangun solusinya."
              : "Understand the problem, design the experience, build the solution."}
          </h2>
        </Reveal>

        <ol className="process-grid">
          {processSteps.map((s, i) => (
            <Reveal as="li" className="process-card" key={s.num} delay={i * 90}>
              <span className="process-num">{s.num}</span>
              <h3 className="process-title">{t(s.title)}</h3>
              <span className="process-sub">{t(s.subtitle)}</span>
              <p className="process-desc">{t(s.desc)}</p>
              <p className="process-tags">{t(s.tags)}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
