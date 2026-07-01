"use client";

import { useState, useRef } from "react";
import "../../styles/cyber-contact.css";

/* ── DATA ──────────────────────────────────────────────────── */
const TABS = [
  { id: "general",   label: "General",    icon: "◈" },
  { id: "support",   label: "Support",    icon: "⬡" },
  { id: "business",  label: "Business",   icon: "▶" },
  { id: "report",    label: "Bug Report", icon: "⚑" },
];

const SUBJECTS = {
  general:  ["I have a question", "Platform feedback", "Press inquiry", "Partnership"],
  support:  ["Can't access my account", "Lab environment issue", "CTF challenge bug", "Billing issue"],
  business: ["Team / enterprise plan", "Corporate training", "Sponsorship", "API access"],
  report:   ["Security vulnerability", "CTF cheating report", "Content error", "Abuse report"],
};

const PRIORITY = [
  { val: "low",      label: "Low — general inquiry" },
  { val: "medium",   label: "Medium — needs attention" },
  { val: "high",     label: "High — blocking issue" },
  { val: "critical", label: "Critical — platform down" },
];

const QUICK_LINKS = [
  {
    icon: "⚑",
    iconColor: "#f7768e",
    iconBg: "rgba(247,118,142,0.12)",
    iconBorder: "rgba(247,118,142,0.3)",
    title: "CTF Arena Support",
    sub: "Challenge bugs, scoring issues, team problems",
    href: "#",
  },
  {
    icon: "⬡",
    iconColor: "#9ece6a",
    iconBg: "rgba(158,206,106,0.12)",
    iconBorder: "rgba(158,206,106,0.3)",
    title: "Community Discord",
    sub: "Fastest response — 24/7 community & instructors",
    href: "#",
  },
  {
    icon: "◈",
    iconColor: "#7aa2f7",
    iconBg: "rgba(122,162,247,0.12)",
    iconBorder: "rgba(122,162,247,0.3)",
    title: "Codex Documentation",
    sub: "Platform docs, lecture index, lab guides",
    href: "#",
  },
  {
    icon: "▶",
    iconColor: "#bb9af7",
    iconBg: "rgba(187,154,247,0.12)",
    iconBorder: "rgba(187,154,247,0.3)",
    title: "Instructor Applications",
    sub: "Join the team — open practitioner positions",
    href: "#",
  },
];

const CONTACT_INFO = [
  {
    icon: "◎",
    iconColor: "#7aa2f7",
    iconBg: "rgba(122,162,247,0.1)",
    iconBorder: "rgba(122,162,247,0.3)",
    title: "General Inquiries",
    val: "hello@cybernexus.io",
    valColor: "#7aa2f7",
    sub: "Responds within 24 hours",
  },
  {
    icon: "⚑",
    iconColor: "#f7768e",
    iconBg: "rgba(247,118,142,0.1)",
    iconBorder: "rgba(247,118,142,0.3)",
    title: "Security Reports",
    val: "security@cybernexus.io",
    valColor: "#f7768e",
    sub: "PGP key available on request",
  },
  {
    icon: "▶",
    iconColor: "#e0af68",
    iconBg: "rgba(224,175,104,0.1)",
    iconBorder: "rgba(224,175,104,0.3)",
    title: "Business & Partnerships",
    val: "partners@cybernexus.io",
    valColor: "#e0af68",
    sub: "Enterprise & team inquiries",
  },
];

const RESPONSE_TIMES = [
  { label: "General",    time: "< 24h",  fill: 90,  color: "#9ece6a" },
  { label: "Support",    time: "< 4h",   fill: 70,  color: "#7aa2f7" },
  { label: "Critical",   time: "< 1h",   fill: 40,  color: "#f7768e" },
  { label: "Business",   time: "< 48h",  fill: 100, color: "#e0af68" },
];

const SOCIALS = [
  { icon: "⌥", label: "GitHub",   href: "#" },
  { icon: "◈", label: "Twitter",  href: "#" },
  { icon: "⬡", label: "Discord",  href: "#" },
  { icon: "▶", label: "YouTube",  href: "#" },
  { icon: "◎", label: "LinkedIn", href: "#" },
  { icon: "⚑", label: "CTFtime",  href: "#" },
];

const PLATFORM_STATUS = [
  { dot: "#9ece6a", name: "Platform & Codex",     val: "Operational",  valColor: "#9ece6a" },
  { dot: "#9ece6a", name: "CTF Arena",            val: "Operational",  valColor: "#9ece6a" },
  { dot: "#9ece6a", name: "Lab Environments",     val: "Operational",  valColor: "#9ece6a" },
  { dot: "#e0af68", name: "Live Lecture Stream",  val: "Degraded",     valColor: "#e0af68" },
];

const OFFICES = [
  { flag: "🇮🇳", city: "Mumbai",    role: "HQ & Engineering", tz: "IST UTC+5:30" },
  { flag: "🇬🇧", city: "London",    role: "EU Operations",    tz: "GMT UTC+0" },
  { flag: "🇯🇵", city: "Tokyo",     role: "APAC Community",   tz: "JST UTC+9" },
  { flag: "🇺🇸", city: "New York",  role: "Americas",         tz: "EST UTC-5" },
];

/* ── COMPONENT ─────────────────────────────────────────────── */
export default function ContactPage() {
  const [tab, setTab]           = useState("general");
  const [subject, setSubject]   = useState("");
  const [priority, setPriority] = useState("medium");
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [handle, setHandle]     = useState("");
  const [message, setMessage]   = useState("");
  const [agreed, setAgreed]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ticketId] = useState(() =>
    `NX-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
  );

  const MAX_CHARS = 800;
  const remaining = MAX_CHARS - message.length;

  const handleSubmit = () => {
    if (!name || !email || !message || !agreed) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1400);
  };

  const reset = () => {
    setSubmitted(false);
    setName(""); setEmail(""); setHandle("");
    setMessage(""); setSubject(""); setAgreed(false);
    setPriority("medium");
  };

  return (
    <div className="ct-page">

      {/* ── Edition Bar ── */}
      <div className="ct-edition">
        <span>
          Encyclopaedia Cybernetica &nbsp;·&nbsp;
          <span>Volume XII</span>
          &nbsp;·&nbsp; Contact &amp; Support
        </span>
        <div className="ct-edition-right">
          <span className="ct-edition-tag">RESPONSE &lt; 24H</span>
          <span>SUPPORT · BUSINESS · SECURITY</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="ct-dotgrid">
        <div className="ct-hero reveal">

          {/* left */}
          <div>
            <p className="ct-hero-kicker">
              <span>Get In Touch</span>
            </p>
            <h1 className="ct-hero-title">
              We here.<br />
              <em>Let talk</em><br />
              <span className="ct-accent">security.</span>
            </h1>
            <p className="ct-hero-lead">
              Whether you've found a <strong>platform bug</strong>, want to
              partner with us, need help with your account, or just want to
              say hello — we respond to every message.
            </p>
          </div>

          {/* right — quick links */}
          <div className="ct-quick-links">
            {QUICK_LINKS.map(({ icon, iconColor, iconBg, iconBorder, title, sub, href }) => (
              <a key={title} href={href} className="ct-quick-link">
                <div
                  className="ct-ql-icon"
                  style={{ color: iconColor, background: iconBg, borderColor: iconBorder }}
                  aria-hidden="true"
                >
                  {icon}
                </div>
                <div className="ct-ql-text">
                  <div className="ct-ql-title">{title}</div>
                  <div className="ct-ql-sub">{sub}</div>
                </div>
                <span className="ct-ql-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main: Form + Sidebar ── */}
      <div className="ct-main ct-dotgrid">
        <div className="ct-main-inner">

          {/* ══ FORM PANEL ══ */}
          <div className="ct-form-panel reveal-left">

            {/* terminal bar */}
            <div className="ct-form-bar">
              <div className="ct-form-dots">
                <span /><span /><span />
              </div>
              <span className="ct-form-bar-title">
                nexus@codex:~/contact — new_ticket.sh
              </span>
              <div className="ct-form-bar-status">
                <span className="ct-form-bar-status-dot" aria-hidden="true" />
                FORM ACTIVE
              </div>
            </div>

            {/* tabs */}
            <div className="ct-form-tabs" role="tablist" aria-label="Contact category">
              {TABS.map(({ id, label, icon }) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={tab === id}
                  className={`ct-form-tab${tab === id ? " active" : ""}`}
                  onClick={() => { setTab(id); setSubject(""); }}
                >
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </button>
              ))}
            </div>

            {/* form body or success */}
            {submitted ? (
              <div className="ct-success">
                <div className="ct-success-icon" aria-hidden="true">✓</div>
                <div className="ct-success-title">Message Transmitted</div>
                <p className="ct-success-sub">
                  Your message has been received. We respond to{" "}
                  <strong style={{ color: "var(--blue)" }}>{email}</strong>{" "}
                  within 24 hours. Track your ticket below.
                </p>
                <div className="ct-success-id">
                  Ticket ID: <span>{ticketId}</span>
                </div>

                {/* terminal confirmation preview */}
                <div className="ct-terminal-preview">
                  <span className="ct-tp-line">
                    <span className="ct-tp-prompt">❯ </span>
                    <span className="ct-tp-cmd">nexus ticket submit</span>
                  </span>
                  <span className="ct-tp-line ct-tp-indent">
                    <span className="ct-tp-key">id:       </span>
                    <span className="ct-tp-val">{ticketId}</span>
                  </span>
                  <span className="ct-tp-line ct-tp-indent">
                    <span className="ct-tp-key">category: </span>
                    <span className="ct-tp-val">{tab}</span>
                  </span>
                  <span className="ct-tp-line ct-tp-indent">
                    <span className="ct-tp-key">priority: </span>
                    <span className="ct-tp-val">{priority}</span>
                  </span>
                  <span className="ct-tp-line ct-tp-indent">
                    <span className="ct-tp-key">from:     </span>
                    <span className="ct-tp-val">{email}</span>
                  </span>
                  <span className="ct-tp-line ct-tp-indent">
                    <span className="ct-tp-ok">✓ </span>
                    <span className="ct-tp-muted">queued for review</span>
                  </span>
                </div>

                <button
                  className="ct-submit-btn"
                  onClick={reset}
                  style={{ marginTop: 8 }}
                >
                  ← Submit Another
                </button>
              </div>
            ) : (
              <>
                <div className="ct-form-body">

                  {/* name + email row */}
                  <div className="ct-field-row">
                    <div className="ct-field">
                      <label className="ct-field-label" htmlFor="ct-name">
                        <span className="ct-field-label-icon" aria-hidden="true">◈</span>
                        Full Name
                        <span className="ct-field-required" aria-label="required">*</span>
                      </label>
                      <input
                        id="ct-name"
                        className={`ct-input${name === "" && submitting ? " error" : ""}`}
                        type="text"
                        placeholder="Arjun Kapoor"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                      />
                    </div>
                    <div className="ct-field">
                      <label className="ct-field-label" htmlFor="ct-email">
                        <span className="ct-field-label-icon" aria-hidden="true">◎</span>
                        Email Address
                        <span className="ct-field-required" aria-label="required">*</span>
                      </label>
                      <input
                        id="ct-email"
                        className={`ct-input${email === "" && submitting ? " error" : ""}`}
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* handle + priority row */}
                  <div className="ct-field-row">
                    <div className="ct-field">
                      <label className="ct-field-label" htmlFor="ct-handle">
                        <span className="ct-field-label-icon" aria-hidden="true">⚑</span>
                        Nexus Handle
                        <span style={{ color: "var(--comment)", fontSize: 8, marginLeft: 4 }}>optional</span>
                      </label>
                      <input
                        id="ct-handle"
                        className="ct-input"
                        type="text"
                        placeholder="@your_handle"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                      />
                    </div>
                    <div className="ct-field">
                      <label className="ct-field-label" htmlFor="ct-priority">
                        <span className="ct-field-label-icon" aria-hidden="true">▶</span>
                        Priority
                      </label>
                      <select
                        id="ct-priority"
                        className="ct-select"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        {PRIORITY.map(({ val, label }) => (
                          <option key={val} value={val}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* subject */}
                  <div className="ct-field">
                    <label className="ct-field-label" htmlFor="ct-subject">
                      <span className="ct-field-label-icon" aria-hidden="true">⬡</span>
                      Subject
                    </label>
                    <select
                      id="ct-subject"
                      className="ct-select"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    >
                      <option value="">— Select a subject —</option>
                      {SUBJECTS[tab].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* message */}
                  <div className="ct-field">
                    <label className="ct-field-label" htmlFor="ct-message">
                      <span className="ct-field-label-icon" aria-hidden="true">#</span>
                      Message
                      <span className="ct-field-required" aria-label="required">*</span>
                    </label>
                    <textarea
                      id="ct-message"
                      className={`ct-textarea${message === "" && submitting ? " error" : ""}`}
                      placeholder={
                        tab === "report"
                          ? "Describe the vulnerability or issue in detail. Include steps to reproduce..."
                          : tab === "support"
                          ? "Describe your issue. Include any error messages, your browser, and what you were doing..."
                          : "Write your message here..."
                      }
                      value={message}
                      onChange={(e) => {
                        if (e.target.value.length <= MAX_CHARS) setMessage(e.target.value);
                      }}
                    />
                    <div className="ct-field-meta">
                      <span className="ct-field-hint">
                        {tab === "report" && "⚑ Security reports are encrypted in transit"}
                        {tab === "support" && "◈ Include your ticket or account ID if you have one"}
                      </span>
                      <span
                        className={`ct-char-count${remaining < 100 ? " warn" : ""}${remaining < 0 ? " over" : ""}`}
                      >
                        {message.length}/{MAX_CHARS}
                      </span>
                    </div>
                  </div>

                  {/* checkbox */}
                  <div className="ct-checkbox-row">
                    <input
                      id="ct-agree"
                      type="checkbox"
                      className="ct-checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <label htmlFor="ct-agree" className="ct-checkbox-label">
                      I agree to the{" "}
                      <a href="#">Privacy Policy</a> and{" "}
                      <a href="#">Terms of Service</a>.
                      My data will only be used to respond to this inquiry.
                    </label>
                  </div>

                </div>

                {/* form footer */}
                <div className="ct-form-footer">
                  <div className="ct-form-footer-note">
                    <span aria-hidden="true">✓</span>
                    End-to-end encrypted · Responds within{" "}
                    {priority === "critical" ? "1 hour" :
                     priority === "high" ? "4 hours" :
                     priority === "medium" ? "24 hours" : "48 hours"}
                  </div>
                  <button
                    className="ct-submit-btn"
                    onClick={handleSubmit}
                    disabled={submitting || !name || !email || !message || !agreed}
                    aria-label="Submit contact form"
                  >
                    {submitting ? (
                      <>
                        <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>
                          ◎
                        </span>
                        Transmitting…
                      </>
                    ) : (
                      <>▶ Transmit Message</>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ══ SIDEBAR ══ */}
          <div className="ct-sidebar reveal-right">

            {/* contact info */}
            <div className="ct-info-card">
              <div className="ct-info-card-bar">
                <span>Direct Channels</span>
                <span style={{ color: "var(--blue)" }}>◈</span>
              </div>
              <div className="ct-info-body">
                {CONTACT_INFO.map(({ icon, iconColor, iconBg, iconBorder, title, val, valColor, sub }) => (
                  <div className="ct-info-row" key={title}>
                    <div
                      className="ct-info-icon"
                      style={{ color: iconColor, background: iconBg, borderColor: iconBorder }}
                      aria-hidden="true"
                    >
                      {icon}
                    </div>
                    <div className="ct-info-text">
                      <div className="ct-info-title">{title}</div>
                      <div className="ct-info-val" style={{ color: valColor }}>{val}</div>
                      <div className="ct-info-sub">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* response times */}
            <div className="ct-response-card">
              <div className="ct-info-card-bar">
                <span>Response Times</span>
                <span style={{ color: "var(--green)" }}>▶</span>
              </div>
              <div className="ct-response-body">
                {RESPONSE_TIMES.map(({ label, time, fill, color }) => (
                  <div className="ct-response-row" key={label}>
                    <div className="ct-response-label">{label}</div>
                    <div className="ct-response-bar-wrap">
                      <div
                        className="ct-response-bar-fill"
                        style={{ width: `${fill}%`, background: color }}
                      />
                    </div>
                    <div className="ct-response-val" style={{ color }}>{time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* platform status */}
            <div className="ct-status-card">
              <div className="ct-info-card-bar">
                <span>Platform Status</span>
                <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--green)", fontSize: 9 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", display: "inline-block", animation: "ctPulse 1.6s ease infinite" }} />
                  LIVE
                </div>
              </div>
              <div className="ct-status-body">
                {PLATFORM_STATUS.map(({ dot, name, val, valColor }) => (
                  <div className="ct-status-row" key={name}>
                    <span
                      className="ct-status-dot"
                      style={{ background: dot }}
                      aria-hidden="true"
                    />
                    <span className="ct-status-name">{name}</span>
                    <span className="ct-status-val" style={{ color: valColor }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* socials */}
            <div className="ct-social-card">
              <div className="ct-info-card-bar">
                <span>Find Us Online</span>
                <span style={{ color: "var(--purple)" }}>⬡</span>
              </div>
              <div className="ct-social-body">
                {SOCIALS.map(({ icon, label, href }) => (
                  <a key={label} href={href} className="ct-social-btn" aria-label={label}>
                    <span className="ct-social-icon" aria-hidden="true">{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Community Offices ── */}
      <div className="ct-map ct-dotgrid">
        <div className="ct-map-inner">

          <div className="ct-map-header">
            <span className="ct-map-title">Global Community Presence</span>
            <div className="ct-map-live">
              <span className="ct-map-live-dot" aria-hidden="true" />
              Members in 80+ countries
            </div>
          </div>

          <div className="ct-offices">
            {OFFICES.map(({ flag, city, role, tz }) => (
              <div className="ct-office" key={city}>
                <div className="ct-office-flag" aria-hidden="true">{flag}</div>
                <div className="ct-office-city">{city}</div>
                <div className="ct-office-role">{role}</div>
                <div className="ct-office-tz">{tz}</div>
              </div>
            ))}
          </div>

          <div className="ct-map-pins" style={{ marginTop: 20 }}>
            <div className="ct-map-pin">
              <span className="ct-map-pin-dot" style={{ background: "var(--green)" }} />
              <strong>12,400+</strong>&nbsp;active members
            </div>
            <div className="ct-map-pin">
              <span className="ct-map-pin-dot" style={{ background: "var(--blue)" }} />
              <strong>80+</strong>&nbsp;countries represented
            </div>
            <div className="ct-map-pin">
              <span className="ct-map-pin-dot" style={{ background: "var(--purple)" }} />
              <strong>24/7</strong>&nbsp;Discord community
            </div>
            <div className="ct-map-pin">
              <span className="ct-map-pin-dot" style={{ background: "var(--yellow)" }} />
              <strong>8</strong>&nbsp;live lectures daily
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}