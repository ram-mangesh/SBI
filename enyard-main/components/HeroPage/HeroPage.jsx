"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import "@/styles/cyber-hero.css";

/* ── icons (phosphor) ─────────────────────────────────── */
import {
  Users,
  Flag,
  GraduationCap,
  ShieldCheck,
  Lock,
  ArrowRight,
  Clock,
} from "@phosphor-icons/react";

/* ── data ─────────────────────────────────────────────── */
const STATS = [
  { value: "12,400", accent: "+", label: "Enrolled Students", delta: "+340 this week", icon: Users },
  { value: "380", accent: "", label: "CTF Challenges", delta: "Season IV live", icon: Flag },
  { value: "94", accent: "", label: "Expert Lectures", delta: "8 live now", icon: GraduationCap },
  { value: "40", accent: "+", label: "Security Domains", delta: "From OSCP to DFIR", icon: ShieldCheck },
];

const CATEGORIES = [
  { id: "all", label: "All", icon: "⌬" },
  { id: "codex", label: "Codex", icon: "#" },
  { id: "lectures", label: "Lectures", icon: "▶" },
  { id: "ctf", label: "CTF", icon: "⚑" },
  { id: "labs", label: "Labs", icon: "⬡" },
];

const POOL = {
  all: ["SQL Injection", "Buffer Overflow", "XSS Fundamentals", "Reverse Engineering", "Network Forensics", "Privilege Escalation", "CSRF Attacks", "Race Conditions"],
  codex: ["OWASP Top 10", "CVE Database", "Exploit Dev Guide", "Cryptography Basics", "Malware Analysis", "Shellcoding 101"],
  lectures: ["Web App Pentesting 101", "Linux Internals", "Active Directory Attacks", "Forensics Workshop", "Heap Exploitation"],
  ctf: ["Injection Gauntlet", "Pwn Starter Pack", "Crypto Challenges", "Forensics Season IV", "Web Exploitation CTF"],
  labs: ["DVWA Setup", "Metasploitable 3", "Buffer Overflow Lab", "Burp Suite Basics", "GDB & PWNDBG"],
};

/* ── component ────────────────────────────────────────── */
export default function HeroPage() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [hiIdx, setHiIdx] = useState(0);

  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  /* close dropdown on outside click */
  useEffect(() => {
    const fn = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* useMemo — zero-lag filtering, no useEffect needed */
  const results = useMemo(() => {
    const pool = POOL[category];
    if (!query.trim()) return pool.slice(0, 6);
    const q = query.toLowerCase();
    return pool.filter((s) => s.toLowerCase().includes(q)).slice(0, 7);
  }, [query, category]);

  /* reset highlight when list changes */
  useEffect(() => { setHiIdx(0); }, [results]);

  const pick = (s) => { setQuery(s); setFocused(false); };

  const onKeyDown = (e) => {
    if (!focused) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHiIdx((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setHiIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter") { if (results[hiIdx]) pick(results[hiIdx]); }
    if (e.key === "Escape") { setFocused(false); }
  };

  const catLabel = CATEGORIES.find((c) => c.id === category)?.label ?? "All";

  return (
    <section className="hero">

      {/* ── Edition Bar ── */}
      <div className="hero-edition">
        <span className="hero-edition-left">
          Encyclopaedia Cybernetica &nbsp;·&nbsp;
          <span>Volume XII</span>
          &nbsp;·&nbsp; Digital Security Sciences
        </span>
        <div className="hero-edition-right">
          <span className="hero-edition-tag">CTF SEASON IV</span>
          <span>OSCP · PWNDBG · FORENSICS · REVERSE ENG.</span>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="hero-main">

        {/* ── LEFT ── */}
        <div className="hero-left">

          <p className="hero-kicker reveal reveal-delay-1">
            <span>The Definitive Reference</span>
          </p>

          <h1 className="hero-heading reveal reveal-delay-2">
            Master the Art of<br />
            <em>Cyber</em>security —<br />
            <span className="accent">From First Principles.</span>
          </h1>

          <p className="hero-sub reveal reveal-delay-3">
            Live lectures, capture-the-flag arenas, and a complete
            <strong> indexed compendium</strong> of offensive &amp; defensive
            security disciplines — curated for curious minds of
            <strong> every background.</strong>
          </p>

          {/* ── Search ── */}
          <div className="search-section reveal reveal-delay-4" ref={wrapRef}>

            {/* category pills */}
            <div className="search-cats" role="group" aria-label="Search category">
              {CATEGORIES.map(({ id, label, icon }) => (
                <button
                  key={id}
                  className={`cat-btn${category === id ? " active" : ""}`}
                  aria-pressed={category === id}
                  onClick={() => { setCategory(id); inputRef.current?.focus(); }}
                >
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </button>
              ))}
            </div>

            {/* input row */}
            <div className="search-input-outer">
              <div className={`hero-prompt${focused ? " focused" : ""}`}>
                <span className="hero-prompt-label">~/nexus&nbsp;$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  placeholder={`search ${category === "all" ? "the codex" : catLabel.toLowerCase()}…`}
                  aria-label="Search the knowledge base"
                  aria-autocomplete="list"
                  aria-controls="search-dropdown"
                  autoComplete="off"
                  spellCheck={false}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onKeyDown={onKeyDown}
                />
                <button
                  className="hero-prompt-btn"
                  aria-label="Run search"
                  onClick={() => setFocused(false)}
                >
                  QUERY
                </button>
              </div>

              {/* dropdown */}
              {focused && (
                <div id="search-dropdown" className="search-dropdown" role="listbox">
                  <div className="search-dropdown-header">
                    {query.trim()
                      ? `${results.length} result${results.length !== 1 ? "s" : ""} in ${catLabel}`
                      : `popular in ${catLabel}`}
                  </div>

                  {results.length > 0 ? (
                    results.map((item, i) => (
                      <div
                        key={item}
                        className={`search-dropdown-item${i === hiIdx ? " highlighted" : ""}`}
                        role="option"
                        aria-selected={i === hiIdx}
                        onMouseEnter={() => setHiIdx(i)}
                        onMouseDown={(e) => { e.preventDefault(); pick(item); }}
                      >
                        <span className="sdi-arrow" aria-hidden="true">▸</span>
                        {item}
                        <span className="sdi-cat">{catLabel}</span>
                      </div>
                    ))
                  ) : (
                    <div className="search-dropdown-empty">
                      no results for "{query}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="hero-cta reveal reveal-delay-5">
            <a href="#" className="hero-btn-primary">
              <ArrowRight size={13} weight="bold" />
              Start Learning
            </a>
            <a href="#" className="hero-btn-secondary">
              <Clock size={13} />
              View Live Lectures
            </a>
            <span className="hero-cta-note">Free to explore · No account needed</span>
          </div>

        </div>

        {/* ── RIGHT — Terminal ── */}
        <div className="hero-right reveal reveal-right reveal-delay-3">
          <div className="hero-terminal">

            <div className="hero-terminal-bar">
              <div className="hero-terminal-dots">
                <span /><span /><span />
              </div>
              <span className="hero-terminal-title">nexus@codex:~</span>
            </div>

            <div className="hero-terminal-body">

              <span className="t-line">
                <span className="t-comment"># Welcome to CyberNexus v4.2.1</span>
              </span>

              <span className="t-line">&nbsp;</span>

              <span className="t-line">
                <span className="t-prompt">❯ </span>
                <span className="t-cmd">nexus search </span>
                <span className="t-string">"sql injection"</span>
              </span>

              <span className="t-line">
                <span className="t-comment">// Codex — 14 entries found</span>
              </span>

              <span className="t-line t-indent">
                <span className="t-key">[01] </span>
                <span className="t-val">SQLi Fundamentals</span>
                <span className="t-muted"> · Beginner</span>
              </span>

              <span className="t-line t-indent">
                <span className="t-key">[02] </span>
                <span className="t-val">Blind SQLi &amp; OAST</span>
                <span className="t-muted"> · Intermediate</span>
              </span>

              <span className="t-line t-indent">
                <span className="t-key">[03] </span>
                <span className="t-val">SQLMap &amp; Automation</span>
                <span className="t-muted"> · Advanced</span>
              </span>

              <span className="t-line t-indent">
                <span className="t-purple">[CTF] </span>
                <span className="t-val">Injection Gauntlet</span>
                <span className="t-muted"> · Season IV</span>
              </span>

              <span className="t-line">&nbsp;</span>

              <span className="t-line">
                <span className="t-prompt">❯ </span>
                <span className="t-cmd">nexus lecture </span>
                <span className="t-string">--live</span>
              </span>

              <span className="t-line t-indent">
                <span className="t-success">● </span>
                <span className="t-val">Web App Pentesting 101</span>
              </span>

              <span className="t-line t-indent t-muted">
                &nbsp; Started 12 min ago · 284 watching
              </span>

              <span className="t-line">&nbsp;</span>

              <span className="t-line">
                <span className="t-prompt">❯ </span>
                <span className="t-cursor" />
              </span>

            </div>
          </div>

          <div className="hero-terminal-badge">
            <Lock size={14} />
            CTF Arena &nbsp;<strong>38 online</strong>
          </div>
        </div>

      </div>

      {/* ── Stats ── */}
      <div className="hero-stats reveal reveal-scale reveal-delay-6">
        {STATS.map(({ value, accent, label, delta, icon: Icon }) => (
          <div className="hero-stat" key={label}>
            <div className="hero-stat-icon">
              <Icon size={20} weight="duotone" />
            </div>
            <div className="hero-stat-value">
              {value}<span>{accent}</span>
            </div>
            <div className="hero-stat-label">{label}</div>
            <div className="hero-stat-delta">{delta}</div>
          </div>
        ))}
      </div>

    </section>
  );
}
