"use client";

import { useState, useEffect } from "react";
import { VIDEO_PROJECTS } from "../data/videos";

export default function Portfolio({ onOpenModal }) {
  const [activeFormat, setActiveFormat] = useState("long");
  const [isSwapping, setIsSwapping] = useState(false);

  const setFormat = (format) => {
    if (format === activeFormat) return;
    setIsSwapping(true);
    setTimeout(() => {
      setActiveFormat(format);
      setIsSwapping(false);
    }, 240);
  };

  const projects = VIDEO_PROJECTS.filter((v) => v.format === activeFormat);

  return (
    <section className="section portfolio" id="portfolio">
      <div className="container">
        <p className="section-eyebrow reveal">Portfolio</p>
        <h2 className="section-title reveal">Selected work</h2>
        <p className="section-sub reveal">Short-form for the scroll, long-form for the story. Toggle between the two &mdash; no page reload, just a re-render.</p>

        <div className="format-toggle-wrap reveal">
          <div className="format-toggle" role="tablist" aria-label="Filter projects by format">
            <span className={`format-toggle-pill ${activeFormat === "short" ? "is-second" : ""}`} aria-hidden="true"></span>
            <button
              type="button"
              className={`format-toggle-btn ${activeFormat === "long" ? "is-active" : ""}`}
              id="tab-long"
              role="tab"
              aria-selected={activeFormat === "long"}
              aria-controls="video-grid"
              onClick={() => setFormat("long")}
            >
              Long-form
            </button>
            <button
              type="button"
              className={`format-toggle-btn ${activeFormat === "short" ? "is-active" : ""}`}
              id="tab-short"
              role="tab"
              aria-selected={activeFormat === "short"}
              aria-controls="video-grid"
              onClick={() => setFormat("short")}
            >
              Short-form
            </button>
          </div>
        </div>

        <div
          className={`video-grid ${activeFormat === "long" ? "video-grid--long" : ""} ${isSwapping ? "grid-swap" : ""}`}
          id="video-grid"
          role="tabpanel"
          aria-labelledby={activeFormat === "short" ? "tab-short" : "tab-long"}
        >
          {projects.map((video, index) => {
            const badge = video.format === "short" ? "Short-form · 9:16" : "Long-form · 16:9";
            const frameClass = video.format === "short" ? "video-frame--short" : "video-frame--long";
            return (
              <article
                key={index}
                className="video-card reveal"
                style={{ "--reveal-delay": `${index * 70}ms` }}
                tabIndex="0"
                role="button"
                aria-label={`Play video: ${video.title}`}
                onClick={() => onOpenModal(video)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpenModal(video);
                  }
                }}
              >
                <div className={`video-frame ${frameClass}`}>
                  {video.thumbnail && (
                    <img className="video-thumb" src={video.thumbnail} alt="" loading="lazy" />
                  )}
                  <span className="video-badge">{badge}</span>
                  <span className="video-play-hint" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5.14v13.72L19 12z" />
                    </svg>
                  </span>
                  <div className="video-overlay">
                    <h3 className="video-title">{video.title}</h3>
                    <p className="video-desc">{video.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
