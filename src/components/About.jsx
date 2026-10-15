import Reveal from "./Reveal.jsx";
import { about, profile, strengths } from "../data/content.js";

export default function About({ lang, t }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-label">{t(about.label)}</span>
          <h2 className="section-title">{t(about.title)}</h2>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-facts" delay={80}>
            <p className="about-identity">{t(profile.identity)}</p>
            <p className="about-role">{t(profile.role)}</p>
          </Reveal>

          <Reveal className="about-text" delay={160}>
            {t(about.paragraphs).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>

        <div className="strengths-grid">
          {strengths.map((s, i) => (
            <Reveal className="strength-card" key={s.title.en} delay={i * 70}>
              <h3>{t(s.title)}</h3>
              <p>{t(s.desc)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
