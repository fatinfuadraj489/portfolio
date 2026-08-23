"use client";

import { useEffect } from "react";

export default function GlobalInteractions({ children }) {
  useEffect(() => {
    // ---------------------------------------------------------
    // SCROLL REVEAL
    // ---------------------------------------------------------
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => revealObserver.observe(el));

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.classList.contains("reveal")) {
              revealObserver.observe(node);
            }
            node.querySelectorAll(".reveal").forEach((el) => {
              revealObserver.observe(el);
            });
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // ---------------------------------------------------------
    // HEADER SCROLL SPY & FROSTED BACKGROUND
    // ---------------------------------------------------------
    const header = document.querySelector(".site-header");
    const onScroll = () => {
      if (header) {
        header.classList.toggle("is-scrolled", window.scrollY > 10);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
    const sectionSpy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("is-active", active);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    ["about", "portfolio", "services", "contact"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) sectionSpy.observe(section);
    });

    // ---------------------------------------------------------
    // SMOOTH SCROLL (CUSTOM INERTIA)
    // ---------------------------------------------------------
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const HEADER_OFFSET = 84;
    const tmpStyle = document.documentElement.style;

    const smooth = {
      current: window.scrollY,
      target: window.scrollY,
      running: false,
      lastSelfScroll: 0
    };

    function maxScroll() {
      return document.documentElement.scrollHeight - window.innerHeight;
    }

    function scrollStep() {
      const diff = smooth.target - smooth.current;
      smooth.current += diff * 0.07;
      if (Math.abs(diff) < 0.5) {
        smooth.current = smooth.target;
        tmpStyle.scrollBehavior = "auto";
        window.scrollTo(0, smooth.target);
        tmpStyle.scrollBehavior = "";
        smooth.running = false;
        return;
      }
      tmpStyle.scrollBehavior = "auto";
      window.scrollTo(0, smooth.current);
      smooth.lastSelfScroll = performance.now();
      requestAnimationFrame(scrollStep);
    }

    function startScroll(targetY) {
      smooth.current = window.scrollY;
      smooth.target = Math.max(0, Math.min(targetY, maxScroll()));
      if (!smooth.running) {
        smooth.running = true;
        requestAnimationFrame(scrollStep);
      }
    }

    const onNativeScroll = () => {
      if (!smooth.running && performance.now() - smooth.lastSelfScroll > 120) {
        smooth.current = window.scrollY;
        smooth.target = window.scrollY;
      }
    };
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    const onWheel = (e) => {
      if (reduceMotion.matches || !finePointer.matches) return;
      if (e.ctrlKey) return;
      e.preventDefault();
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16;
      else if (e.deltaMode === 2) delta *= window.innerHeight;
      startScroll(smooth.target + delta);
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    const SCROLL_KEYS = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "]);
    const onKeyDown = (e) => {
      if (reduceMotion.matches || !finePointer.matches) return;
      if (e.target.closest("input, textarea, select, button, a, [contenteditable]")) return;
      if (!SCROLL_KEYS.has(e.key)) return;
      e.preventDefault();
      if (e.key === "Home") { startScroll(0); return; }
      if (e.key === "End") { startScroll(maxScroll()); return; }
      let delta = 0;
      if (e.key === "ArrowDown" || e.key === " ") delta = window.innerHeight * 0.9;
      else if (e.key === "ArrowUp") delta = -window.innerHeight * 0.9;
      else if (e.key === "PageDown") delta = window.innerHeight;
      else if (e.key === "PageUp") delta = -window.innerHeight;
      startScroll(smooth.target + delta);
    };
    window.addEventListener("keydown", onKeyDown);

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const onAnchorClick = (e) => {
      const link = e.currentTarget;
      const hash = link.getAttribute("href");
      if (hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();

      if (reduceMotion.matches) {
        window.location.hash = hash;
        return;
      }

      const targetY = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      startScroll(Math.max(targetY, 0));
      window.history.pushState(null, "", hash);
    };

    anchorLinks.forEach((link) => {
      link.addEventListener("click", onAnchorClick);
    });

    return () => {
      revealElements.forEach((el) => revealObserver.unobserve(el));
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onNativeScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      anchorLinks.forEach((link) => {
        link.removeEventListener("click", onAnchorClick);
      });
      sectionSpy.disconnect();
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return <>{children}</>;
}
