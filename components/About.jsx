"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function About() {
  const statsRef = useRef(null);

  useEffect(() => {
    const statsContainer = statsRef.current;
    if (!statsContainer) return;

    const animateCounter = (el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || "";
      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    const statObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    const statNumbers = statsContainer.querySelectorAll(".stat-number");
    statNumbers.forEach((el) => statObserver.observe(el));

    return () => {
      statNumbers.forEach((el) => statObserver.unobserve(el));
      statObserver.disconnect();
    };
  }, []);

  return (
    <section className="section about" id="about">
      <div className="container">
        <p className="section-eyebrow reveal">About Me</p>
        <h2 className="section-title reveal">The editor behind the timeline</h2>

        <div className="about-grid">
          <div className="about-photo reveal">
            <div className="photo-frame">
              <img
                src="/Man_posing_in_workspace_202608230441.jpeg"
                alt="Portrait of Color Creatives team member"
                width="600"
                height="750"
                loading="lazy"
              />
            </div>
          </div>

          <div className="about-body">
            <p className="reveal">
              I fell in love with editing in a college dorm room, splicing together skate
              videos at 2 a.m. That same curiosity drives me today &mdash; I believe editing
              is where a film truly comes alive. Every cut, every pause, every frame is a
              decision about what the audience should feel.
            </p>
            <p className="reveal" style={{ "--reveal-delay": ".08s" }}>
              Over the past 3 years I&rsquo;ve worked with YouTube creators, documentary
              filmmakers, and independent brands around the world. I wear several hats &mdash;
              narrative editor, colorist, and occasional sound designer &mdash; and I treat
              every project like it&rsquo;s the most important one on my desk.
            </p>

            <ul className="stats reveal" style={{ "--reveal-delay": ".16s" }} ref={statsRef}>
              <li className="stat">
                <span className="stat-number" data-count="3" data-suffix="+">0</span>
                <span className="stat-label">Years of experience</span>
              </li>
              <li className="stat">
                <span className="stat-number" data-count="120" data-suffix="+">0</span>
                <span className="stat-label">Projects delivered</span>
              </li>
            </ul>

            <ul className="tool-chips reveal" style={{ "--reveal-delay": ".24s" }} aria-label="Software I use">
              <li><span className="tool-chip"><img className="tool-logo" src="/logos/premiere.svg" alt="Premiere Pro" title="Premiere Pro" loading="lazy" /></span></li>
              <li><span className="tool-chip"><img className="tool-logo" src="/logos/after-effects.svg" alt="After Effects" title="After Effects" loading="lazy" /></span></li>
              <li><span className="tool-chip"><img className="tool-logo" src="/logos/photoshop.svg" alt="Photoshop" title="Photoshop" loading="lazy" /></span></li>
              <li><span className="tool-chip"><img className="tool-logo" src="/logos/illustrator.svg" alt="Illustrator" title="Illustrator" loading="lazy" /></span></li>
              <li><span className="tool-chip tool-chip--bl"><img className="tool-logo" src="/logos/blender.svg" alt="Blender" title="Blender" loading="lazy" /></span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
