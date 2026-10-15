import Reveal from "./Reveal.jsx";
import { contact } from "../data/content.js";

export default function Contact({ lang, t }) {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-label">{t(contact.label)}</span>
          <h2 className="section-title contact-title">{t(contact.title)}</h2>
        </Reveal>

        <Reveal className="contact-body" delay={100}>
          <p className="contact-statement">{t(contact.statement)}</p>
          <a className="contact-email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <ul className="contact-links">
            {contact.links.map((l) => (
              <li key={l.name}>
                <a className="contact-link" href={l.href} target="_blank" rel="noreferrer">
                  {l.name}
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
