"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function VideoModal({ video, onClose }) {
  const closeBtnRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timeout;
    if (video) {
      setActiveVideo(video);
    } else {
      timeout = setTimeout(() => {
        setActiveVideo(null);
      }, 400); // Wait for CSS fade out transition
    }
    return () => clearTimeout(timeout);
  }, [video]);

  useEffect(() => {
    if (video) {
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus({ preventScroll: true });
    } else {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && video) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  if (!mounted) return null;

  const displayVideo = video || activeVideo;
  const isShort = displayVideo?.format === "short";
  const separator = displayVideo?.embedUrl.includes("?") ? "&" : "?";
  const src = displayVideo ? `${displayVideo.embedUrl}${separator}autoplay=1` : "";

  return createPortal(
    <div
      className={`video-modal ${video ? "is-open" : ""}`}
      id="video-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      aria-hidden={!video}
      onClick={(e) => {
        if (e.target.id === "video-modal") onClose();
      }}
    >
      <button
        className="video-modal-close"
        id="video-modal-close"
        aria-label="Close video"
        onClick={onClose}
        ref={closeBtnRef}
      >
        &times;
      </button>
      <div className={`video-modal-frame ${isShort ? "video-modal-frame--short" : ""}`} id="video-modal-frame">
        {displayVideo && (
          <iframe
            src={src}
            title={displayVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>,
    document.body
  );
}
