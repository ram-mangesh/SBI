"use client";

import { useState } from "react";
import "@/styles/cyber-pricing.css";

/* ── PLAN DATA ─────────────────────────────────────────────── */
const PLANS = [
  {
    id: "free",
    barDot: "#565f89",
    barName: "tier::free",
    badge: null,
    name: "Explorer",
    desc: "Start exploring the Codex and a curated set of CTF challenges — no card required.",
    monthly: 0,
    annual: 0,
    amountClass: "free",
    btnLabel: "Start Exploring",
    btnClass: "pr-btn-ghost",
    features: [
      { icon: "check", text: "Full Codex read access" },
      { icon: "check", text: "20 CTF challenges (Beginner tier)" },
      { icon: "check", text: "Community Discord access" },
      { icon: "check", text: "Public leaderboard" },
      { icon: "cross", text: "Live lectures" },
      { icon: "cross", text: "Lab environments" },
      { icon: "cross", text: "CTF archive (Season I–III)" },
      { icon: "cross", text: "Progress tracking & certificates" },
    ],
  },
  {
    id: "pro",
    barDot: "#7aa2f7",
    barName: "tier::pro",
    badge: { label: "Most Popular", cls: "pr-badge-blue" },
    featured: true,
    name: "Operator",
    desc: "Full platform access. Live lectures, all CTF seasons, and dedicated lab machines.",
    monthly: 29,
    annual: 19,
    amountClass: "pro",
    btnLabel: "Enroll Now",
    btnClass: "pr-btn-primary",
    features: [
      { icon: "check", text: "Everything in Explorer" },
      { icon: "check", text: "All 380+ CTF challenges" },
      { icon: "check", text: "94 lectures + live sessions" },
      { icon: "check", text: "Dedicated lab environments" },
      { icon: "check", text: "CTF archive — all seasons" },
      { icon: "check", text: "Progress tracking & certificates" },
      { icon: "check", text: "OSCP / PNPT prep paths" },
      { icon: "bullet", text: "Priority community support" },
    ],
  },
  {
    id: "team",
    barDot: "#bb9af7",
    barName: "tier::team",
    badge: { label: "For Teams", cls: "pr-badge-green" },
    name: "Red Team",
    desc: "Everything in Operator, shared workspaces, admin dashboard, and volume pricing.",
    monthly: 79,
    annual: 59,
    amountClass: "team",
    btnLabel: "Contact Sales",
    btnClass: "pr-btn-purple",
    features: [
      { icon: "check", text: "Everything in Operator" },
      { icon: "check", text: "Up to 25 seats" },
      { icon: "check", text: "Shared CTF workspaces" },
      { icon: "check", text: "Team leaderboard & analytics" },
      { icon: "check", text: "Admin dashboard" },
      { icon: "check", text: "SSO / SAML support" },
      { icon: "check", text: "Custom lab provisioning" },
      { icon: "bullet", text: "Dedicated account manager" },
    ],
  },
];

const COMPARE_ROWS = [
  { feat: "Codex Access",            free: "✓ Full",    pro: "✓ Full",    team: "✓ Full"    },
  { feat: "CTF Challenges",          free: "20",        pro: "380+",      team: "380+"      },
  { feat: "Live Lectures",           free: "✗",         pro: "✓",         team: "✓"         },
  { feat: "Lab Environments",        free: "✗",         pro: "✓",         team: "Custom"    },
  { feat: "CTF Archive",             free: "✗",         pro: "✓ All",     team: "✓ All"     },
  { feat: "Certificates",            free: "✗",         pro: "✓",         team: "✓"         },
  { feat: "Team Workspace",          free: "✗",         pro: "✗",         team: "✓"         },
  { feat: "Admin Dashboard",         free: "✗",         pro: "✗",         team: "✓"         },
];

const FOOTNOTES = [
  { icon: "⚑", text: "Cancel anytime, no lock-in" },
  { icon: "⬡", text: "Labs provisioned in < 30s" },
  { icon: "#", text: "Student discount — 40% off" },
  { icon: "★", text: "14-day money-back guarantee" },
];

const cellClass = (val) => {
  if (val === "✗") return "pr-compare-cell no";
  if (val === "✓" || val.startsWith("✓")) return "pr-compare-cell yes";
  if (!isNaN(parseInt(val))) return "pr-compare-cell limit";
  return "pr-compare-cell";
};

/* ── COMPONENT ─────────────────────────────────────────────── */
export default function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const [showCompare, setShowCompare] = useState(true);

  return (
    <section className="pr" id="pricing" aria-label="Pricing plans">
      <div className="pr-inner">

        {/* ── Header ── */}
        <div className="pr-header reveal">
          <div className="pr-label"><span>Access Tiers</span></div>
          <h2 className="pr-title">
            Choose your<br />
            <em>access level.</em>
          </h2>
          <p className="pr-sub">
            Start free and upgrade when youre ready.
            No paywalls on the fundamentals.
          </p>

          {/* billing toggle */}
          <div className="pr-toggle">
            <span className={`pr-toggle-label${!annual ? " active" : ""}`}>Monthly</span>

            <label className="pr-toggle-switch" aria-label="Toggle annual billing">
              <input
                type="checkbox"
                checked={annual}
                onChange={() => setAnnual((v) => !v)}
              />
              <div className="pr-toggle-track">
                <div className="pr-toggle-thumb" />
              </div>
            </label>

            <span className={`pr-toggle-label${annual ? " active" : ""}`}>Annual</span>
            {annual && <span className="pr-toggle-save">Save 35%</span>}
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="pr-grid reveal reveal-d1">
          {PLANS.map((plan) => {
            const price = annual ? plan.annual : plan.monthly;
            const isFree = price === 0;

            return (
              <div
                key={plan.id}
                className={`pr-card${plan.featured ? " featured" : ""}`}
              >
                {/* top bar */}
                <div className="pr-card-bar">
                  <div className="pr-card-bar-left">
                    <span
                      className="pr-card-bar-dot"
                      style={{ background: plan.barDot }}
                    />
                    <span className="pr-card-bar-name">{plan.barName}</span>
                  </div>
                  {plan.badge && (
                    <span className={`pr-badge ${plan.badge.cls}`}>
                      {plan.badge.label}
                    </span>
                  )}
                </div>

                {/* body */}
                <div className="pr-card-body">
                  <div className="pr-plan-name">{plan.name}</div>
                  <p className="pr-plan-desc">{plan.desc}</p>

                  {/* price */}
                  <div className="pr-price">
                    {!isFree && <span className="pr-currency">$</span>}
                    <span className={`pr-amount ${plan.amountClass}`}>
                      {isFree ? "Free" : price}
                    </span>
                    {!isFree && <span className="pr-period">/mo</span>}
                  </div>

                  <div className="pr-annual-note">
                    {annual && !isFree
                      ? `Billed annually — $${price * 12}/yr`
                      : !isFree
                      ? `Switch to annual & save $${(plan.monthly - plan.annual) * 12}/yr`
                      : ""}
                  </div>

                  {/* cta */}
                  <button className={`pr-btn ${plan.btnClass}`}>
                    {plan.btnLabel}
                    {plan.btnClass === "pr-btn-primary" && (
                      <span aria-hidden="true">→</span>
                    )}
                  </button>

                  {/* features */}
                  <div className="pr-divider" />
                  <ul className="pr-features" role="list">
                    {plan.features.map((f, i) => (
                      <li key={i} className={`pr-feature${f.icon === "cross" ? " muted" : ""}`}>
                        <span className={`pr-feature-icon ${f.icon}`} aria-hidden="true">
                          {f.icon === "check"  && "✓"}
                          {f.icon === "cross"  && "✗"}
                          {f.icon === "bullet" && "▸"}
                        </span>
                        {f.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Compare table ── */}
        <div className="pr-compare">
          <div className="pr-compare-header">
            <span className="pr-compare-title">Feature Comparison Matrix</span>
            <button
              className="pr-compare-toggle"
              onClick={() => setShowCompare((v) => !v)}
              aria-expanded={showCompare}
            >
              {showCompare ? "[ collapse −]" : "[ expand + ]"}
            </button>
          </div>

          {showCompare && (
            <>
              {/* column heads */}
              <div className="pr-compare-row head">
                <span className="pr-compare-feat" />
                {PLANS.map((p) => (
                  <span
                    key={p.id}
                    className="pr-compare-head-cell"
                    style={{ color: p.barDot }}
                  >
                    {p.name}
                  </span>
                ))}
              </div>

              {COMPARE_ROWS.map((row, i) => (
                <div key={i} className="pr-compare-row">
                  <span className="pr-compare-feat">{row.feat}</span>
                  <span className={cellClass(row.free)}>{row.free}</span>
                  <span className={cellClass(row.pro)}>{row.pro}</span>
                  <span className={cellClass(row.team)}>{row.team}</span>
                </div>
              ))}
            </>
          )}
        </div>

        {/* ── Footnotes ── */}
        <div className="pr-footnote">
          {FOOTNOTES.map(({ icon, text }) => (
            <div className="pr-footnote-item" key={text}>
              <span>{icon}</span>
              {text}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}