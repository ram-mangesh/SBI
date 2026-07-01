"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "@/styles/cyber-navabar.css";

const NAV_LINKS = [
  { label: "Lectures", href: "#" },
  { label: "CTF Arena", href: "#" },
  { label: "Codex", href: "#" },
  { label: "Labs", href: "#" },
  { label: "Leaderboard", href: "#" },
];

export default function CyberNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);

  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);

 useEffect(() => {
  let lastScroll = 0;

  const handleScroll = () => {
    const current = window.scrollY;

    setScrolled(current > 10);

    /* ---- TOP OF PAGE ---- */
    if (current <= 10) {
      setHidden(false);
      setCompact(false); // show full navbar
      lastScroll = current;
      return;
    }

    /* ---- SCROLL DOWN ---- */
    if (current > lastScroll) {
      setHidden(true);
      setCompact(false);
    } 
    /* ---- SCROLL UP ---- */
    else {
      setHidden(false);
      setCompact(true);
    }

    lastScroll = current;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <nav
      className={`cn-root 
      ${scrolled ? "scrolled" : ""} 
      ${hidden ? "hidden" : ""} 
      ${compact ? "compact" : ""}`}
    >
      <div className="cn-inner">

        {!compact && (
          <Link className="cn-logo" href="/">
            <span className="cn-logo-prompt">~$</span>
            <span className="cn-logo-name">CyberNexus</span>
          </Link>
        )}

        <ul className="cn-links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={active === label ? "active" : ""}
                onClick={() => setActive(label)}
              >
                <span className="prefix">./</span>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {!compact && (
          <div className="cn-right">
            <span className="cn-live">
              <span className="cn-live-dot" />
              LIVE
            </span>

            <div className="cn-divider" />

            <button className="cn-btn-ghost">Enroll</button>
            <button className="cn-btn-primary">Sign In</button>

            <button
              className={`cn-hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span /><span /><span />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}