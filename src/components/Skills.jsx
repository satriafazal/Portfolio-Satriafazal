import Reveal from "./Reveal.jsx";
import { skillGroups, techGroups } from "../data/content.js";

export default function Skills({ lang, t }) {
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-label">{lang === "id" ? "Keahlian" : "Skills"}</span>
          <h2 className="section-title">
            {lang === "id"
              ? "Kemampuan berdasarkan pekerjaan yang pernah saya lakukan."
              : "Capabilities based on the work I have done."}
          </h2>
        </Reveal>

        <div className="skills-grid">
          {skillGroups.map((g, i) => (
            <Reveal className="skill-card" key={g.title.en} delay={i * 80}>
              <h3 className="skill-title">{t(g.title)}</h3>
              <p className="skill-sub">{t(g.sub)}</p>
              <ul className="skill-list">
                {t(g.items).map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="tech-block" delay={120}>
          <h3 className="tech-title">
            {lang === "id" ? "Teknologi yang pernah digunakan" : "Technologies I have worked with"}
          </h3>
          <p className="tech-note">
            {lang === "id"
              ? "Bukan berarti semua teknologi digunakan pada semua proyek."
              : "Not every technology is used in every project."}
          </p>
          <div className="tech-groups">
            {techGroups.map((g) => (
              <div className="tech-group" key={g.title.en}>
                <span className="tech-group-title">{t(g.title)}</span>
                <div className="tech-chips">
                  {g.items.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
