"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

/* ── Nav items — adapted from reference (About/Work/etc.) ── */
const NAV_ITEMS = [
  { id: "about",    label: "About"    },
  { id: "projects", label: "Work"     },
  { id: "skills",   label: "Skills"   },
  { id: "journey",  label: "Journey"  },
  { id: "contact",  label: "Contact"  },
];

interface Props {
  activeSection:    string;
  setActiveSection: (id: string) => void;
}

export default function FloatingNavigation({ activeSection, setActiveSection }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted]   = useState(false);

  /* Mount-fade so nav appears as part of the entrance sequence */
  useEffect(() => { setMounted(true); }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Desktop pill ─────────────────────────────────────── */}
      <motion.nav
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -12 }}
        animate={mounted ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1.0, 0.36, 1.0] }}
        style={{
          position:       "fixed",
          top:            20,
          left:           "50%",
          transform:      "translateX(-50%)",
          zIndex:         100,
          display:        "flex",
          alignItems:     "center",
          gap:            0,
          background:     "rgba(18,18,18,0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border:         "1px solid rgba(255,255,255,0.09)",
          borderRadius:   999,
          padding:        "6px 8px 6px 12px",
          whiteSpace:     "nowrap",
        }}
      >
        {/* Logo monogram */}
        <button
          onClick={() => scrollTo("hero")}
          aria-label="Back to top"
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            width:          30,
            height:         30,
            borderRadius:   999,
            background:     "rgba(255,255,255,0.10)",
            border:         "1px solid rgba(255,255,255,0.12)",
            marginRight:    14,
            cursor:         "pointer",
            flexShrink:     0,
          }}
        >
          {/* Monogram — uses first letter of name */}
          <span style={{
            color:      "#fff",
            fontSize:   12,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight:  1,
          }}>
            K
          </span>
        </button>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center" style={{ gap: 2 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  position:    "relative",
                  padding:     "7px 15px",
                  borderRadius: 999,
                  fontSize:    13.5,
                  fontWeight:  isActive ? 500 : 400,
                  color:       isActive ? "#ffffff" : "rgba(255,255,255,0.48)",
                  background:  isActive ? "rgba(255,255,255,0.09)" : "transparent",
                  cursor:      "pointer",
                  transition:  "color 0.2s ease, background 0.2s ease",
                  letterSpacing: "0.005em",
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.78)";
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.48)";
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    style={{
                      position:     "absolute",
                      inset:        0,
                      borderRadius: 999,
                      background:   "rgba(255,255,255,0.08)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 36 }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: subtle resume / CTA pill */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex"
          style={{
            alignItems:   "center",
            marginLeft:   10,
            padding:      "7px 16px",
            borderRadius: 999,
            fontSize:     13,
            fontWeight:   500,
            color:        "rgba(255,255,255,0.55)",
            border:       "1px solid rgba(255,255,255,0.10)",
            cursor:       "pointer",
            transition:   "color 0.2s, border-color 0.2s",
            textDecoration: "none",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.9)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.10)";
          }}
        >
          Resume
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            width:          32,
            height:         32,
            borderRadius:   999,
            background:     "rgba(255,255,255,0.06)",
            color:          "rgba(255,255,255,0.7)",
            marginLeft:     8,
            cursor:         "pointer",
          }}
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </motion.nav>

      {/* ── Mobile dropdown ──────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1.0, 0.36, 1.0] }}
            style={{
              position:       "fixed",
              top:            72,
              left:           "50%",
              transform:      "translateX(-50%)",
              zIndex:         99,
              background:     "rgba(14,14,14,0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border:         "1px solid rgba(255,255,255,0.08)",
              borderRadius:   20,
              padding:        "10px 8px",
              display:        "flex",
              flexDirection:  "column",
              gap:            2,
              minWidth:       180,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  padding:      "11px 18px",
                  borderRadius: 12,
                  fontSize:     14,
                  fontWeight:   activeSection === item.id ? 500 : 400,
                  color:        activeSection === item.id ? "#fff" : "rgba(255,255,255,0.5)",
                  background:   activeSection === item.id ? "rgba(255,255,255,0.07)" : "transparent",
                  textAlign:    "left",
                  cursor:       "pointer",
                  transition:   "all 0.15s",
                }}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding:        "11px 18px",
                borderRadius:   12,
                fontSize:       14,
                fontWeight:     400,
                color:          "rgba(255,255,255,0.5)",
                textDecoration: "none",
                cursor:         "pointer",
                transition:     "all 0.15s",
              }}
            >
              Resume ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
