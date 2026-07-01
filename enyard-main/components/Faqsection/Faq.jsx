"use client";

import { useState } from "react";
import "@/styles/cyber-faq.css";

/* ── FAQ DATA ─────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Do I need a technical background to get started?",
    a: "Not at all. CyberNexus is built for curious minds of every background — whether you're a developer, student, designer, or just someone interested in how the digital world works. Our Codex starts from absolute first principles, and every topic is explained before any technical depth is introduced.",
    chips: [
      { label: "Beginner Friendly", style: "green" },
      { label: "No Prerequisites", style: "blue" },
    ],
  },
  {
    q: "What exactly is a CTF (Capture The Flag)?",
    a: "CTF challenges are puzzle-based security competitions where you break into intentionally vulnerable systems to find a hidden string of text — the \"flag\". They're the most hands-on way to learn offensive security. Think of them as escape rooms, but for hackers. Season IV is currently live with 380+ challenges spanning web, binary, forensics, and cryptography.",
    chips: [
      { label: "Season IV Live", style: "red" },
      { label: "380+ Challenges", style: "yellow" },
      { label: "All Skill Levels", style: "purple" },
    ],
  },
  {
    q: "Are the live lectures recorded? Can I watch later?",
    a: "Yes. Every live lecture is recorded and added to the Codex library within 24 hours. Live sessions include real-time Q&A with instructors, while recorded versions are timestamped and indexed so you can jump directly to any topic. We currently have 94 lectures with 8 running live at any given time.",
    chips: [
      { label: "Recorded", style: "blue" },
      { label: "Timestamped", style: "cyan" },
      { label: "Q&A Included", style: "green" },
    ],
  },
  {
    q: "How is CyberNexus different from other security platforms?",
    a: "Three things set us apart: the encyclopedia-first approach (every concept is indexed and cross-referenced like a reference book), the integration of live instruction with CTF practice in a single platform, and our breadth — from OSCP prep to digital forensics to reverse engineering, all in one place. We don't silo learning.",
    chips: [
      { label: "Encyclopaedic", style: "yellow" },
      { label: "Cross-referenced", style: "blue" },
      { label: "40+ Domains", style: "purple" },
    ],
  },
  {
    q: "Is CyberNexus free to use?",
    a: "The Codex reference library and a selection of CTF challenges are free with no account required. A free account unlocks lecture access, progress tracking, and leaderboard participation. Pro enrollment gives you access to all live lectures, the full CTF archive, and dedicated lab environments.",
    chips: [
      { label: "Free Tier", style: "green" },
      { label: "Pro Access", style: "yellow" },
      { label: "No Paywall on Basics", style: "cyan" },
    ],
  },
  {
    q: "What certifications or career paths does this prepare me for?",
    a: "Our curriculum maps directly to OSCP, CEH, CompTIA Security+, and PNPT. Beyond certifications, we cover practical paths like penetration testing, digital forensics, malware analysis, bug bounty hunting, and defensive blue-team operations. The Codex includes a career map showing which lectures and labs correspond to each path.",
    chips: [
      { label: "OSCP", style: "red" },
      { label: "CEH", style: "blue" },
      { label: "Sec+", style: "green" },
      { label: "PNPT", style: "purple" },
    ],
  },
];

const MINI_STATS = [
  { val: "< 2h", lbl: "Avg Response" },
  { val: "94", lbl: "Lectures" },
  { val: "40+", lbl: "Domains" },
];

/* ── COMPONENT ────────────────────────────────────────────── */
export default function FAQSection() {
  const [open, setOpen] = useState(0); // first open by default

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className="faq section-light" id="faq" aria-label="Common questions">
      <div className="faq-inner">

        {/* ══ LEFT — animated visual ══ */}
        <div className="faq-left reveal-left">

          <div>
            <div className="faq-label">
              <span>System Overview</span>
            </div>
            <h2 className="faq-left-title">
              Everything you need<br />
              to know about<br />
              <span>CyberNexus.</span>
            </h2>
          </div>

          <p className="faq-left-sub">
            A live platform, a growing compendium, and a community of
            practitioners. Here's how it all fits together.
          </p>

          {/* ── ORBIT ANIMATION ── */}
          <div className="faq-anim" aria-hidden="true">

            {/* scanning line */}
            <div className="faq-anim-scan" />

            {/* CRT scanlines */}
            <div className="faq-anim-crt" />

            {/* orbital rings */}
            <div className="faq-orbit-ring faq-orbit-ring-1">
              <div className="faq-node faq-r1-n1" />
              <div className="faq-node faq-r1-n2" />
              <div className="faq-node faq-r1-n3" />
              <div className="faq-node faq-r1-n4" />
            </div>

            <div className="faq-orbit-ring faq-orbit-ring-2">
              <div className="faq-node faq-r2-n1" />
              <div className="faq-node faq-r2-n2" />
              <div className="faq-node faq-r2-n3" />
            </div>

            <div className="faq-orbit-ring faq-orbit-ring-3" />

            {/* SVG connection lines */}
            <svg className="faq-connections" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="180" y1="180" x2="180" y2="80" stroke="#7aa2f7" strokeWidth="1" strokeDasharray="4 6" opacity="0.5">
                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="180" y1="180" x2="80" y2="180" stroke="#7dcfff" strokeWidth="1" strokeDasharray="4 6" opacity="0.5">
                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.5s" repeatCount="indefinite" />
              </line>
              <line x1="180" y1="180" x2="180" y2="280" stroke="#9ece6a" strokeWidth="1" strokeDasharray="4 6" opacity="0.5">
                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.8s" repeatCount="indefinite" />
              </line>
              <line x1="180" y1="180" x2="280" y2="180" stroke="#bb9af7" strokeWidth="1" strokeDasharray="4 6" opacity="0.5">
                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3s" repeatCount="indefinite" />
              </line>
              <circle cx="180" cy="180" r="55" stroke="#7aa2f7" strokeWidth="0.5" strokeDasharray="3 8" opacity="0.3">
                <animateTransform attributeName="transform" type="rotate" from="0 180 180" to="360 180 180" dur="20s" repeatCount="indefinite" />
              </circle>
            </svg>

            {/* core node */}
            <div className="faq-core">
              <span className="faq-core-icon">⬡</span>
            </div>

            {/* floating tag labels */}
            <div className="faq-tags">
              <span className="faq-tag faq-tag-1">ACTIVE</span>
              <span className="faq-tag faq-tag-2">SECURE</span>
              <span className="faq-tag faq-tag-3">LIVE</span>
              <span className="faq-tag faq-tag-4">v4.2.1</span>
            </div>

            {/* data stream ticker */}
            <div className="faq-stream">
              <div className="faq-stream-line">
                <span>SYN_ACK</span>
                <em>0x7fff · </em>
                <span>EXPLOIT_DB</span>
                <em>CVE-2024-1337 · </em>
                <span>TCP_HANDSHAKE</span>
                <em>PORT 443 · </em>
                <span>NEXUS_CORE</span>
                <em>HEAP_ALLOC · </em>
                <span>SHELL_SPAWN</span>
                <em>0x0804860b · </em>
                <span>PKT_CAPTURE</span>
                <em>ICMP_ECHO · </em>
              </div>
            </div>
          </div>

          {/* mini stats below animation */}
          <div className="faq-mini-stats">
            {MINI_STATS.map(({ val, lbl }) => (
              <div className="faq-mini-stat" key={lbl}>
                <div className="faq-mini-val">{val}</div>
                <div className="faq-mini-lbl">{lbl}</div>
              </div>
            ))}
          </div>

        </div>

        {/* ══ RIGHT — accordion ══ */}
        <div className="faq-right reveal-right">

          <div className="faq-right-header">
            <div className="faq-label" style={{ marginBottom: 12 }}>
              <span>Common Questions</span>
            </div>
            <h2 className="faq-right-title">Frequently Asked</h2>
            <p className="faq-right-sub">
              {FAQS.length} questions · click to expand
            </p>
          </div>

          {FAQS.map(({ q, a, chips }, i) => (
            <div
              key={i}
              className={`faq-item${open === i ? " open" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <div className="faq-q-left">
                  <span className="faq-q-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="faq-q-text">{q}</span>
                </div>
                <span className="faq-q-icon" aria-hidden="true">+</span>
              </button>

              <div
                id={`faq-answer-${i}`}
                className="faq-answer"
                role="region"
                aria-hidden={open !== i}
              >
                <div className="faq-answer-inner">
                  <p className="faq-answer-text">{a}</p>
                  {chips?.length > 0 && (
                    <div className="faq-answer-chips">
                      {chips.map(({ label, style }) => (
                        <span
                          key={label}
                          className={`faq-chip faq-chip-${style}`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* still have questions */}
          <div className="faq-cta">
            <div className="faq-cta-text">
              <span className="faq-cta-title">Still have questions?</span>
              <span className="faq-cta-sub">
                Our community & instructors are online 24/7
              </span>
            </div>
            <button className="faq-cta-btn">
              Ask the Community
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
