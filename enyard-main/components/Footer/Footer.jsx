"use client";

import { useEffect, useRef } from "react";
import "@/styles/cyber-footer.css";

/* ─────────────────────────────────────────────────────────── */
/*  Inline styles so this works as a self-contained artifact  */
/* ─────────────────────────────────────────────────────────── */

const CSS = ``; // Styles moved to global cyber-footer.css

/* ─────────────────────────────────────────────────────────── */
/*  DATA                                                       */
/* ─────────────────────────────────────────────────────────── */

const LINKS = {
  Learn: [
    { label: "Codex",            badge: null },
    { label: "Live Lectures",    badge: { text: "8 LIVE", cls: "red" } },
    { label: "CTF Arena",        badge: { text: "S4",     cls: "red" } },
    { label: "Lab Environments", badge: null },
    { label: "Leaderboard",      badge: null },
    { label: "Certifications",   badge: null },
  ],
  Platform: [
    { label: "About CyberNexus", badge: null },
    { label: "Pro Membership",   badge: { text: "NEW", cls: "blue" } },
    { label: "API Access",       badge: null },
    { label: "Instructor Portal",badge: null },
    { label: "Changelog",        badge: { text: "v4.2.1", cls: "green" } },
    { label: "Status",           badge: null },
  ],
  Community: [
    { label: "Discord Server",   badge: { text: "ONLINE", cls: "green" } },
    { label: "Write-ups",        badge: null },
    { label: "Blog",             badge: null },
    { label: "Hall of Fame",     badge: null },
    { label: "Bug Bounty",       badge: null },
    { label: "Contribute",       badge: null },
  ],
};

const STATUSES = [
  { dot: "green",  text: "All Systems Operational" },
  { dot: "green",  text: "CTF Arena · 38 online" },
  { dot: "yellow", text: "Season IV · 19 days left" },
  { dot: "blue",   text: "Codex · 94 lectures indexed" },
  { dot: "green",  text: "API · 12ms avg latency" },
];

const SOCIALS = ["⌬", "⊕", "◈", "⬡"];

// Doubled for seamless scroll
const STREAM_ITEMS = [
  <><span>SYN_ACK</span><em>0x7fff</em><b>CTF_SEASON_IV</b><span>NEXUS_CORE</span><em>PORT_443</em><b>HEAP_ALLOC</b><span>TCP_HANDSHAKE</span><em>CVE-2024-1337</em><b>SHELL_SPAWN</b><span>PKT_CAPTURE</span><em>ICMP_ECHO</em><b>0x0804860b</b></>,
  <><span>SYN_ACK</span><em>0x7fff</em><b>CTF_SEASON_IV</b><span>NEXUS_CORE</span><em>PORT_443</em><b>HEAP_ALLOC</b><span>TCP_HANDSHAKE</span><em>CVE-2024-1337</em><b>SHELL_SPAWN</b><span>PKT_CAPTURE</span><em>ICMP_ECHO</em><b>0x0804860b</b></>,
];

/* ─────────────────────────────────────────────────────────── */
/*  MATRIX RAIN CANVAS                                         */
/* ─────────────────────────────────────────────────────────── */

function MatrixCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const CHARS = "アイウエオカキクケコサシスセソ0123456789ABCDEF><{}[]()#$%@!?/\\|=+-*";
    const FONT_SIZE = 13;
    let cols, drops, raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols  = Math.floor(canvas.width / FONT_SIZE);
      drops = Array(cols).fill(1);
    };

    const draw = () => {
      // translucent fade for trail effect
      ctx.fillStyle = "rgba(26,27,38, 0.16)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px 'IBM Plex Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        // vary colour: mostly blue, occasional cyan/green/purple
        const roll = Math.random();
        if (roll < 0.05)      ctx.fillStyle = "#7dcfff"; // cyan  — accent
        else if (roll < 0.10) ctx.fillStyle = "#9ece6a"; // green — accent
        else if (roll < 0.13) ctx.fillStyle = "#bb9af7"; // purple — rare
        else                  ctx.fillStyle = "rgba(122,162,247,0.55)"; // blue base

        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);

        // brighter "head" glyph
        if (Math.random() > 0.975) {
          ctx.fillStyle = "#c0caf5";
          ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
        }

        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="cf-matrix-canvas" />;
}

/* ─────────────────────────────────────────────────────────── */
/*  COMPONENT                                                  */
/* ─────────────────────────────────────────────────────────── */

export default function CyberFooter() {
  return (
    <footer className="cf section-light" aria-label="Site footer">

      {/* gradient rule */}
      <div className="cf-top-rule" />

      {/* ── Matrix rain strip ── */}
      <div className="cf-canvas-wrap reveal">
        <MatrixCanvas />
        <div className="cf-canvas-overlay">
          <div className="cf-canvas-logo">
            Cyber<em>Nexus</em>
          </div>
          <div className="cf-canvas-tagline">
            Encyclopaedia Cybernetica · Volume XII · Est. 2019
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="cf-inner">

        {/* Brand column */}
        <div className="reveal-delay-1 reveal">
          <a className="cf-brand-logo" href="/">
            <span className="cf-brand-prompt">~$</span>
            <span className="cf-brand-name">CyberNexus</span>
          </a>

          <p className="cf-brand-desc">
            A live platform, a growing compendium, and a community of
            practitioners. From absolute first principles to advanced
            exploit development — all indexed, all cross-referenced.
          </p>

          <div className="cf-newsletter-label"> Subscribe to the Codex digest</div>
          <div className="cf-newsletter-row">
            <input
              className="cf-newsletter-input"
              type="email"
              placeholder="operator@nexus.sh"
              aria-label="Email address"
            />
            <button className="cf-newsletter-btn">SUBSCRIBE</button>
          </div>

          <div className="cf-socials" aria-label="Social links">
            {SOCIALS.map((icon, i) => (
              <a key={i} href="#" className="cf-social-btn" aria-label={`Social ${i + 1}`}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([col, items], idx) => (
          <div key={col} className={`reveal reveal-delay-${idx + 2}`}>
            <div className="cf-col-title">{col}</div>
            <ul className="cf-col-links">
              {items.map(({ label, badge }) => (
                <li key={label}>
                  <a href="#">
                    {label}
                    {badge && (
                      <span className={`cf-link-badge cf-link-badge-${badge.cls}`}>
                        {badge.text}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Status row ── */}
      <div className="cf-status-row reveal" aria-label="System status">
        {STATUSES.map(({ dot, text }) => (
          <div className="cf-status-item" key={text}>
            <span className={`cf-status-dot cf-status-dot-${dot}`} />
            {text}
          </div>
        ))}
      </div>

      {/* ── Data stream ── */}
      <div className="cf-stream reveal" aria-hidden="true">
        <div className="cf-stream-track">
          {STREAM_ITEMS[0]}&nbsp;&nbsp;&nbsp;&nbsp;
          {STREAM_ITEMS[1]}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="cf-bottom reveal">
        <div className="cf-bottom-left">
          <strong>© 2025 CyberNexus Inc.</strong> All rights reserved.
          <br />
          Ethical hacking education · Not affiliated with any CVE authority
        </div>

        <div className="cf-bottom-right">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
          <a href="#">Responsible Disclosure</a>
          <span className="cf-version-chip">v4.2.1</span>
        </div>
      </div>

    </footer>
  );
}