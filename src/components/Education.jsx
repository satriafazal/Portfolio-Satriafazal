import Reveal from "./Reveal.jsx";
import { education } from "../data/content.js";

export default function Education({ lang, t }) {
  return (
    <section className="section" id="education">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-label">{t(education.label)}</span>
          <h2 className="section-title">{t(education.title)}</h2>
        </Reveal>

        <div className="edu-grid">
          {education.items.map((item, i) => (
            <Reveal className="edu-card" key={item.school} delay={i * 90}>
              <span className="edu-period">{t(item.period)}</span>
              <h3 className="edu-school">{item.school}</h3>
              <p className="edu-degree">{t(item.degree)}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="cert-card" delay={180}>
          <span className="cert-label">{lang === "id" ? "Sertifikasi" : "Certification"}</span>
          <h3 className="cert-name">{t(education.certification.name)}</h3>
          <p className="cert-detail">{t(education.certification.detail)}</p>
        </Reveal>
      </div>
    </section>
  );
}
