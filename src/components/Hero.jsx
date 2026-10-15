import BlobCursor from "./BlobCursor.jsx";
import WaveLines from "./WaveLines.jsx";
import { heroImages, profile, socials, placeholderSvg } from "../data/content.js";

const ICON_PATHS = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.23 1 .5 1.5 1 .5.5.77.9 1 1.5.17.4.36 1 .42 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2a4 4 0 0 1-1 1.5 4 4 0 0 1-1.5 1c-.4.17-1 .36-2.2.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42a4 4 0 0 1-1.5-1 4 4 0 0 1-1-1.5c-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2a4 4 0 0 1 1-1.5 4 4 0 0 1 1.5-1c.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 4.9a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm6.4-8.3a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z",
  x: "M18.9 1.2h3.7l-8 9.2L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.4 7.1 5.9-7.1zm-1.3 19.4h2L6.5 3.3h-2l13.1 17.3z",
  youtube:
    "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z",
  linkedin:
    "M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1a3.7 3.7 0 0 1 3.4-1.9c3.6 0 4.2 2.4 4.2 5.4v6.3zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zm1.8 13H3.4V9h3.7v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z",
};

export default function Hero({ lang, t }) {
  return (
    <section className="hero" id="home">
      <BlobCursor
        primarySrc={heroImages.primary}
        altSrc={heroImages.alternate}
        fallback={placeholderSvg("Portrait", 1600, 1000)}
      />
      <WaveLines />
      <div className="hero-veil" />

      <div className="hero-content">
        <h1 className="hero-name invertible" data-parallax="0.035">
          <span className="hero-name-line">{profile.firstName}</span>
          <span className="hero-name-line hero-name-last">{profile.lastName}</span>
        </h1>

        <div className="hero-top-right">
          <a className="hero-portfolio invertible" href="#projects">
            Portfolio
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <p className="hero-tagline invertible" data-parallax="0.02">
          <span className="hero-tagline-role">{t(profile.role)}</span>
          <span className="hero-tagline-text">{t(profile.tagline)}</span>
        </p>

        <ul className="hero-socials">
          {socials.map((s) => (
            <li key={s.name}>
              <a
                className="social invertible"
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                title={s.name}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d={ICON_PATHS[s.icon]} />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <div className="hero-scroll" aria-hidden="true">
          <span>{lang === "id" ? "Gulir" : "Scroll"}</span>
          <span className="hero-scroll-line" />
        </div>
      </div>
    </section>
  );
}
