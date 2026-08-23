"use client";

import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);
  const closeNav = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#home" className="logo">
          Fatin&nbsp;Fuad&nbsp;Raj<span className="logo-dot">.</span>
        </a>

        <button
          className="nav-toggle"
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          aria-label="Toggle navigation menu"
          onClick={toggleNav}
        >
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
        </button>

        <nav id="primary-nav" className={`primary-nav ${isOpen ? "is-open" : ""}`} aria-label="Primary">
          <ul className="nav-list">
            <li><a href="#about" onClick={closeNav}>About</a></li>
            <li><a href="#portfolio" onClick={closeNav}>Portfolio</a></li>
            <li><a href="#services" onClick={closeNav}>Services</a></li>
            <li><a href="#contact" onClick={closeNav}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
