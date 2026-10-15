import Reveal from "./Reveal.jsx";
import { experience } from "../data/content.js";

export default function Experience({ lang, t }) {
  return (
    <section className="section section-alt" id="experience">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-label">{t(experience.label)}</span>
          <h2 className="section-title">{t(experience.title)}</h2>
        </Reveal>

        <div className="timeline">
          {experience.items.map((item, i) => (
            <Reveal className="timeline-item" key={item.org + i} delay={i * 90}>
              <div className="timeline-marker" />
              <div className="timeline-content">
                <div className="timeline-head">
                  <h3 className="timeline-role">{t(item.role)}</h3>
                  <span className="timeline-period">{t(item.period)}</span>
                </div>
                <p className="timeline-org">{item.org}</p>
                <p className="timeline-desc">{t(item.desc)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
