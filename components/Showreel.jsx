"use client";

import { useEffect, useRef } from "react";

export default function Showreel() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const iframeObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            iframe.src = iframe.dataset.src;
            iframe.removeAttribute("data-src");
            observer.unobserve(iframe);
          }
        });
      },
      { rootMargin: "600px 0px" }
    );

    iframeObserver.observe(iframe);

    return () => {
      iframeObserver.disconnect();
    };
  }, []);

  return (
    <section className="section showreel" id="showreel">
      <div className="container showreel-inner">
        <p className="section-eyebrow reveal">Showreel</p>
        <h2 className="section-title reveal">The reel</h2>

        <div className="showreel-frame reveal">
          <iframe
            ref={iframeRef}
            data-src="https://www.youtube.com/embed/iUaHarxyVA0"
            title="Showreel"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <span className="video-badge">2026 Showreel</span>
        </div>
      </div>
    </section>
  );
}
