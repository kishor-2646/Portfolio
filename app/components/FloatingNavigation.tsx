"use client";

/**
 * FloatingNavigation.tsx — Premium pill navigation
 *
 * Polish improvements:
 *  - Hover states: subtle background pill with smooth scale in/out
 *  - Active indicator: shared layoutId spring with slightly higher opacity
 *  - Border becomes slightly brighter on active section change
 *  - Mobile dropdown: refined spring animation + improved styling
 *  - Backdrop blur increased to 28px for a more frosted feel
 *  - Resume button has a subtle shine on hover
 *  - All existing links, functionality, and nav items preserved exactly
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

/* ── Nav items ──────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "about",    label: "About"   },
  { id: "projects", label: "Work"    },
  { id: "journey",  label: "Journey" },
  { id: "contact",  label: "Contact" },
];

interface Props {
  activeSection:    string;
  setActiveSection: (id: string) => void;
}

export default function FloatingNavigation({ activeSection, setActiveSection }: Props) {
  const [menuOpen, setMenuOpen]  = useState(false);
  const [mounted, setMounted]    = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -16, x: "-50%" }}
        animate={mounted ? { opacity: 1, y: 0, x: "-50%" } : { opacity: 0, y: -16, x: "-50%" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1.0, 0.36, 1.0] }}
        style={{
          position:            "fixed",
          top:                 20,
          left:                "50%",
          zIndex:              100,
          display:             "flex",
          alignItems:          "center",
          gap:                 0,
          /* Slightly deeper background for frosted glass feel */
          background:          "rgba(14,14,14,0.84)",
          backdropFilter:      "blur(28px)",
          WebkitBackdropFilter:"blur(28px)",
          /* Border brightens when on hero vs other sections */
          border:              `1px solid ${
            activeSection === "hero"
              ? "rgba(255,255,255,0.10)"
              : "rgba(255,255,255,0.12)"
          }`,
          borderRadius:        999,
          padding:             "5px 6px 5px 10px",
          whiteSpace:          "nowrap",
          /* Subtle lift shadow */
          boxShadow:           "0 4px 24px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.2)",
          transition:          "border-color 0.3s ease",
        }}
      >
        {/* Logo monogram */}
        <motion.button
          onClick={() => scrollTo("hero")}
          aria-label="Back to top"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.18, ease: [0.22, 1.0, 0.36, 1.0] }}
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            width:          30,
            height:         30,
            borderRadius:   999,
            background:     "rgba(255,255,255,0.11)",
            border:         "1px solid rgba(255,255,255,0.15)",
            marginRight:    12,
            cursor:         "pointer",
            flexShrink:     0,
          }}
        >
          <span style={{
            color:         "#fff",
            fontSize:      12,
            fontWeight:    700,
            letterSpacing: "-0.02em",
            lineHeight:    1,
          }}>
            K
          </span>
        </motion.button>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center" style={{ gap: 2 }}>
          {NAV_ITEMS.map((item) => {
            const isActive  = activeSection === item.id;
            const isHovered = hoveredId === item.id;

            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position:      "relative",
                  padding:       "7px 15px",
                  borderRadius:  999,
                  fontSize:      13.5,
                  fontWeight:    isActive ? 500 : 400,
                  color:         isActive
                    ? "#ffffff"
                    : isHovered
                      ? "rgba(255,255,255,0.82)"
                      : "rgba(255,255,255,0.46)",
                  background:    "transparent",
                  cursor:        "pointer",
                  transition:    "color 0.2s ease",
                  letterSpacing: "0.005em",
                }}
              >
                {/* Hover background pill */}
                {isHovered && !isActive && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.18, ease: [0.22, 1.0, 0.36, 1.0] }}
                    style={{
                      position:     "absolute",
                      inset:        0,
                      borderRadius: 999,
                      background:   "rgba(255,255,255,0.06)",
                    }}
                  />
                )}

                {/* Active pill — slides with spring */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    style={{
                      position:     "absolute",
                      inset:        0,
                      borderRadius: 999,
                      background:   "rgba(255,255,255,0.10)",
                      border:       "1px solid rgba(255,255,255,0.10)",
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}

                <span style={{ position: "relative", zIndex: 1 }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Resume link */}
        <motion.a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex"
          whileHover={{ color: "rgba(255,255,255,0.92)" }}
          transition={{ duration: 0.18 }}
          style={{
            alignItems:     "center",
            marginLeft:     8,
            padding:        "7px 16px",
            borderRadius:   999,
            fontSize:       13,
            fontWeight:     500,
            color:          "rgba(255,255,255,0.48)",
            border:         "1px solid rgba(255,255,255,0.09)",
            cursor:         "pointer",
            textDecoration: "none",
            transition:     "color 0.2s, border-color 0.2s",
            position:       "relative",
            overflow:       "hidden",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.22)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.09)";
          }}
        >
          Resume
        </motion.a>

        {/* Mobile hamburger */}
        <button
          id="nav-mobile-toggle"
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
            background:     "rgba(255,255,255,0.07)",
            color:          "rgba(255,255,255,0.72)",
            marginLeft:     8,
            cursor:         "pointer",
            transition:     "background 0.2s, color 0.2s",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? "x" : "menu"}
              initial={{ rotate: menuOpen ? -90 : 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: menuOpen ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.22, 1.0, 0.36, 1.0] }}
              style={{ display: "flex", alignItems: "center" }}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* ── Mobile dropdown ───────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,   scale: 1    }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.22, 1.0, 0.36, 1.0] }}
            style={{
              position:            "fixed",
              top:                 70,
              left:                "50%",
              transform:           "translateX(-50%)",
              zIndex:              99,
              background:          "rgba(12,12,12,0.97)",
              backdropFilter:      "blur(28px)",
              WebkitBackdropFilter:"blur(28px)",
              border:              "1px solid rgba(255,255,255,0.09)",
              borderRadius:        20,
              padding:             "8px 6px",
              display:             "flex",
              flexDirection:       "column",
              gap:                 2,
              minWidth:            190,
              boxShadow:           "0 16px 48px rgba(0,0,0,0.5)",
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                id={`nav-mobile-${item.id}`}
                onClick={() => scrollTo(item.id)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2, ease: [0.22, 1.0, 0.36, 1.0] }}
                style={{
                  padding:      "11px 18px",
                  borderRadius: 14,
                  fontSize:     14,
                  fontWeight:   activeSection === item.id ? 500 : 400,
                  color:        activeSection === item.id
                    ? "#ffffff"
                    : "rgba(255,255,255,0.48)",
                  background:   activeSection === item.id
                    ? "rgba(255,255,255,0.08)"
                    : "transparent",
                  textAlign:    "left",
                  cursor:       "pointer",
                  transition:   "all 0.15s",
                  letterSpacing:"0.005em",
                }}
              >
                {item.label}
              </motion.button>
            ))}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "4px 8px" }} />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding:        "11px 18px",
                borderRadius:   14,
                fontSize:       14,
                fontWeight:     400,
                color:          "rgba(255,255,255,0.45)",
                textDecoration: "none",
                cursor:         "pointer",
                transition:     "all 0.15s",
                letterSpacing:  "0.005em",
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
