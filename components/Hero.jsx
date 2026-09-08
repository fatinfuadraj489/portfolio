export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <p className="hero-eyebrow">
          <span className="online-dot" aria-hidden="true"></span>
          Video Editor &amp; Storyteller
        </p>

        <h1 className="hero-title">
          I turn raw footage into<br />
          <span className="accent-text">stories</span> that lands.
        </h1>

        <p className="hero-sub">
          Hi, we're Color Creatives &mdash; a freelance video editing team with 3+ years
          of experience. We edit long-form, short-form, talking head videos,
          documentaries, and brand ads.
        </p>

        <div className="hero-actions">
          <a href="#portfolio" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-ghost">Get in Touch</a>
        </div>
      </div>

      <a href="#about" className="hero-scroll" aria-label="Scroll down to the about section">
        <span className="hero-scroll-line"></span>
      </a>
    </section>
  );
}
