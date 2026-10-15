import { useEffect, useState } from "react";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import HowIWork from "./components/HowIWork.jsx";
import Skills from "./components/Skills.jsx";
import ProjectsGallery from "./components/ProjectsGallery.jsx";
import Experience from "./components/Experience.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import Reveal from "./components/Reveal.jsx";
import { profile } from "./data/content.js";

const NAV_LINKS = [
  { href: "#work", id: "Cara Kerja", en: "Process" },
  { href: "#skills", id: "Keahlian", en: "Skills" },
  { href: "#projects", id: "Proyek", en: "Projects" },
  { href: "#experience", id: "Pengalaman", en: "Experience" },
  { href: "#contact", id: "Kontak", en: "Contact" },
];

export default function App() {
  const [lang, setLang] = useState("id");
  const t = (v) => (typeof v === "string" ? v : v[lang] ?? v.id ?? v.en);

  // nav jadi solid setelah hero
  useEffect(() => {
    const onScroll = () => {
      const nav = document.getElementById("nav");
      if (!nav) return;
      nav.classList.toggle("is-scrolled", window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Navigasi tetap — muncul solid setelah hero */}
      <header className="nav" id="nav">
        <div className="nav-inner">
          <a className="nav-logo" href="#home">
            <span className="nav-logo-mark">SFL</span>
          </a>
          <nav className="nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} className="nav-link" href={l.href}>
                {t(l)}
              </a>
            ))}
            <div className="lang-toggle" role="group" aria-label="Language">
              <button
                type="button"
                className={`lang-btn${lang === "id" ? " is-active" : ""}`}
                onClick={() => setLang("id")}
              >
                ID
              </button>
              <span className="lang-sep">/</span>
              <button
                type="button"
                className={`lang-btn${lang === "en" ? " is-active" : ""}`}
                onClick={() => setLang("en")}
              >
                EN
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <Hero lang={lang} t={t} />
        <About lang={lang} t={t} />
        <HowIWork lang={lang} t={t} />
        <Skills lang={lang} t={t} />
        <ProjectsGallery lang={lang} t={t} />
        <Experience lang={lang} t={t} />
        <Education lang={lang} t={t} />
        <Contact lang={lang} t={t} />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span>
            © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
          </span>
          <span className="footer-note">
            {lang === "id"
              ? "Dibangun dengan React, Vite & GSAP — di-deploy gratis di Vercel/Netlify/GitHub Pages."
              : "Built with React, Vite & GSAP — deployed free on Vercel/Netlify/GitHub Pages."}
          </span>
        </div>
      </footer>
    </>
  );
}
