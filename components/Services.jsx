export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <p className="section-eyebrow reveal">Services</p>
        <h2 className="section-title reveal">What I can do for your project</h2>

        <div className="services-grid">
          <article className="service-card reveal">
            <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="6" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <line x1="20" y1="4" x2="8.12" y2="15.88" />
              <line x1="14.47" y1="14.48" x2="20" y2="20" />
              <line x1="8.12" y1="8.12" x2="12" y2="12" />
            </svg>
            <h3>Editing</h3>
            <p>Narrative cutting, pacing, and rhythm &mdash; from rough assembly to a locked, delivery-ready cut.</p>
          </article>

          <article className="service-card reveal" style={{ "--reveal-delay": ".08s" }}>
            <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 22a10 10 0 0 0 0-20" />
              <path d="M12 22a10 10 0 0 1 0-20" />
            </svg>
            <h3>Color Grading</h3>
            <p>Primary grades, film emulation, and stylistic looks that make your footage feel cinematic and consistent.</p>
          </article>

          <article className="service-card reveal" style={{ "--reveal-delay": ".16s" }}>
            <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3" />
              <path d="M14 3h4v18h-4" />
            </svg>
            <h3>Motion Graphics</h3>
            <p>Titles, lower-thirds, kinetic typography, and animated overlays that match your brand language.</p>
          </article>

          <article className="service-card reveal" style={{ "--reveal-delay": ".24s" }}>
            <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            <h3>Sound Design</h3>
            <p>Dialogue clean-up, room tone, mixing, and soundscapes that make your edit feel expensive.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
