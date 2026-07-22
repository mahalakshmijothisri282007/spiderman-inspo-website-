import { lazy, Suspense, useRef, useState } from 'react'
import { AiToolsMarquee } from './AiToolsMarquee'
import { ContactPanel } from './ContactPanel'
import {
  ABOUT,
  AI_TOOLS_SECTION,
  EDITORIAL,
  FULLSTACK_SKILLS,
  LIVE_SITE_URL,
  PROJECTS_BLURB,
  SITE_META,
} from './portfolioContent'
import './App.css'

const MJStudioCanvas = lazy(async () => {
  const mod = await import('./studio/MJStudioCanvas')
  return { default: mod.MJStudioCanvas }
})

const NAV = [
  { href: '#tour-intro', label: 'home' },
  { href: '#tour-work', label: 'work' },
  { href: '#tour-about', label: 'about' },
  { href: '#tour-ai', label: 'stack' },
  { href: '#tour-contact', label: 'contact' },
]

function StudioFallback() {
  return (
    <div className="canvas-fallback" aria-hidden>
      <span className="canvas-fallback__pulse" />
      <p>{SITE_META.title} · environment loading…</p>
    </div>
  )
}

function EditorialCarousel() {
  const slides = [...EDITORIAL.carouselSlides]
  const [idx, setIdx] = useState(0)

  function prev() {
    setIdx((i) => (i - 1 + slides.length) % slides.length)
  }
  function next() {
    setIdx((i) => (i + 1) % slides.length)
  }

  return (
    <div className="editorial-carousel" aria-live="polite">
      <p className="editorial-carousel__label">
        <span aria-hidden>|</span> {slides[idx]}
      </p>
      <div className="editorial-carousel__pager">
        <button type="button" className="editorial-carousel__btn" onClick={prev} aria-label="Previous slide">
          prev
        </button>
        <span className="editorial-carousel__count">
          {idx + 1} / {slides.length}
        </span>
        <button type="button" className="editorial-carousel__btn" onClick={next} aria-label="Next slide">
          next
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const scrollRootRef = useRef<HTMLElement | null>(null)
  const [hero, hello, bridge, brainstorm] = EDITORIAL.heroLineParts

  return (
    <div className="app">
      <a href="#tour-intro" className="skip-link">
        Skip to content
      </a>

      <div className="canvas-layer canvas-layer--pass-through" aria-hidden>
        <Suspense fallback={<StudioFallback />}>
          <MJStudioCanvas scrollRootRef={scrollRootRef} />
        </Suspense>
      </div>

      <div className="site-shell">
        <header className="hki-header">
          <div className="hki-header__ribbon">
            <span className="hki-muted hki-muted--caps">social</span>
            <span className="hki-lang" aria-hidden="true">
              <span className="hki-lang__active">EN</span>
              {' / '}
              <button type="button" className="hki-lang__btn">
                FR
              </button>
            </span>
          </div>
          <div className="hki-header__main">
            <a className="hki-logo" href="#tour-intro">
              mj<span className="hki-logo__fade">creative engineer</span>
            </a>
            <nav className="hki-nav" aria-label="Primary">
              <ul>
                {NAV.map(({ href, label }) => (
                  <li key={href}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <main ref={scrollRootRef} className="hki-main" tabIndex={-1}>
          <section id="tour-intro" className="hki-section hki-section--hero">
            <div className="hki-hero-tags" aria-hidden>
              <p>{EDITORIAL.taglineLines[0]}</p>
              <p>{EDITORIAL.taglineLines[1]}</p>
            </div>
            <h1 className="hki-display">
              {hero}
              <em>{hello}</em>
              <br />
              {bridge}
              <em>{brainstorm}</em>
            </h1>
            <p className="hki-muted hki-intro">{SITE_META.heroIntro}</p>
            <EditorialCarousel />
            <p className="hki-muted hki-hero-tags hki-hero-tags--below" aria-hidden>
              <span>{EDITORIAL.taglineLines[0]}</span>
              <span>{EDITORIAL.taglineLines[1]}</span>
            </p>
            <div className="hki-hero-links">
              <a className="hki-underline-link" href={LIVE_SITE_URL} target="_blank" rel="noreferrer noopener">
                view portfolio →
              </a>
              <a className="hki-underline-link" href="#tour-contact">
                start dialogue →
              </a>
            </div>
            <div className="hki-scroll-cue">scroll the tour ↓</div>
          </section>

          <section id="tour-about" className="hki-section">
            <p className="hki-muted hki-muted--caps">{ABOUT.eyebrow}</p>
            <h2 className="hki-headline">{ABOUT.statsLine}</h2>
            {ABOUT.paragraphs.map((para, idx) => (
              <p key={idx} className="hki-body">
                {para}
              </p>
            ))}
            <dl className="hki-mini-grid">
              <div>
                <dt className="hki-muted hki-muted--caps">crew</dt>
                <dd>32 members · 30+ tools each · CREAGENZ</dd>
              </div>
              <div>
                <dt className="hki-muted hki-muted--caps">space</dt>
                <dd>Hybrid 3D modular studio · scroll camera</dd>
              </div>
            </dl>
          </section>

          <section id="tour-capabilities" className="hki-section">
            <h2 className="hki-headline hki-headline--sm">Capabilities</h2>
            <p className="hki-body">Production stack from UI to deployment — aligned with the live portfolio.</p>
            <ul className="hki-chips">
              {FULLSTACK_SKILLS.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            <div className="hki-columns">
              <div>
                <h3 className="hki-subhead">Product / UX</h3>
                <p className="hki-body hki-body--tight">Systems, journeys, tactile screens.</p>
              </div>
              <div>
                <h3 className="hki-subhead">Engineering</h3>
                <p className="hki-body hki-body--tight">TypeScript-forward builds, tooling, integrations.</p>
              </div>
              <div>
                <h3 className="hki-subhead">AI workflows</h3>
                <p className="hki-body hki-body--tight">Assistive prototyping through QA-ready deliverables.</p>
              </div>
            </div>
          </section>

          <section id="tour-work" className="hki-section">
            <h2 className="hki-headline">{PROJECTS_BLURB.title}</h2>
            <p className="hki-body">{PROJECTS_BLURB.body}</p>
            <ul className="hki-bullet">
              <li>Enterprise-facing UI shells · marketing platforms</li>
              <li>AI-assisted internals · creative tooling bridges</li>
              <li>Data-backed UX narratives</li>
            </ul>
            <a className="hki-underline-link" href={LIVE_SITE_URL} target="_blank" rel="noreferrer noopener">
              mjportfoliodev.vercel.app →
            </a>
          </section>

          <section id="tour-ai" className="hki-section">
            <h2 className="hki-headline hki-headline--sm">{AI_TOOLS_SECTION.title}</h2>
            <p className="hki-body">{AI_TOOLS_SECTION.subtitle}</p>
            <div className="hki-marquee-slot">
              <AiToolsMarquee />
            </div>
          </section>

          <section id="tour-contact" className="hki-section hki-section--contact">
            <div className="hki-address-block">
              {EDITORIAL.addressBlock.map((line, i) => (
                <p key={i} className={i === 2 ? 'hki-muted hki-body--tiny' : 'hki-body'}>
                  {line.startsWith('http') ? (
                    <a href={line} target="_blank" rel="noreferrer noopener" className="hki-plain-link">
                      {line.replace('https://', '')}
                    </a>
                  ) : (
                    line
                  )}
                </p>
              ))}
            </div>

            <ul className="hki-contact-channels">
              {EDITORIAL.channels.map((ch) => (
                <li key={ch.heading}>
                  <h3 className="hki-muted hki-muted--caps">{ch.hint}</h3>
                  <p className="hki-contact-channels__title">{ch.heading}</p>
                  <a href={ch.href} target="_blank" rel="noreferrer noopener" className="hki-underline-link">
                    {ch.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hki-contact-form-wrap">
              <ContactPanel />
            </div>

            <footer className="hki-footer">
              <p className="hki-footer__pride">{EDITORIAL.footerPrideLine}</p>
              <p className="hki-footer__fine">{EDITORIAL.legalHint}</p>
              <nav className="hki-footer__nav">
                <ul>
                  {NAV.map(({ href, label }) => (
                    <li key={href}>
                      <a href={href}>{label}</a>
                    </li>
                  ))}
                </ul>
                <span className="hki-divider">·</span>
                <a href={LIVE_SITE_URL} target="_blank" rel="noreferrer noopener">
                  portfolio
                </a>
              </nav>
              <span className="hki-muted hki-brand-mark">mj creative engineer studio</span>
            </footer>
          </section>
        </main>
      </div>
    </div>
  )
}
