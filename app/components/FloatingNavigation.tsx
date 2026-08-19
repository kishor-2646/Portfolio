"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

/* ── Nav items in exact page order ──────────────────────── */
const NAV_ITEMS = [
  { id: "about",        label: "About"        },
  { id: "projects",     label: "Work"         },
  { id: "journey",      label: "Journey"      },
  { id: "achievements", label: "Achievements" },
  { id: "blogs",        label: "Blogs"        },
  { id: "contact",      label: "Contact"      },
];

interface Props {
  activeSection:    string;
  setActiveSection: (id: string) => void;
}

export default function FloatingNavigation({ activeSection, setActiveSection }: Props) {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [mounted, setMounted]     = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Fixed Center Wrapper (Guarantees Exact Mathematical Center) ── */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        
        {/* Floating Nav Pill */}
        <motion.nav
          aria-label="Main navigation"
          initial={{ opacity: 0, y: -16 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: [0.22, 1.0, 0.36, 1.0] }}
          className="
            pointer-events-auto
            inline-flex items-center
            p-1.5 rounded-full
            bg-[#0d0d0d]/90 backdrop-blur-2xl
            border border-white/12
            shadow-[0_16px_40px_rgba(0,0,0,0.75),0_2px_8px_rgba(0,0,0,0.5)]
            whitespace-nowrap transition-colors duration-300
          "
        >
          {/* Monogram Logo */}
          <button
            onClick={() => scrollTo("hero")}
            aria-label="Back to top"
            className="
              flex items-center justify-center
              w-7 h-7 sm:w-8 sm:h-8 rounded-full
              bg-white/10 hover:bg-white/20 border border-white/15
              text-white font-bold text-xs tracking-tight
              transition-all duration-200 hover:scale-105 active:scale-95 shrink-0
            "
          >
            K
          </button>

          {/* Center Nav Links (Desktop & Tablet) */}
          <div className="hidden md:flex items-center gap-1 mx-1.5">
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
                  className={`
                    relative px-3.5 py-1.5 rounded-full text-[13px] font-medium
                    transition-colors duration-200 cursor-pointer select-none
                    ${
                      isActive
                        ? "text-white font-semibold"
                        : isHovered
                        ? "text-white/90"
                        : "text-white/50"
                    }
                  `}
                >
                  {/* Hover Background Pill */}
                  {isHovered && !isActive && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 rounded-full bg-white/[0.06] pointer-events-none"
                    />
                  )}

                  {/* Active Highlight Pill (Dynamically Shifts as User Scrolls) */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      className="absolute inset-0 rounded-full bg-white/15 border border-white/20 pointer-events-none shadow-sm"
                    />
                  )}

                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Resume Button (Desktop) */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="
              hidden md:inline-flex items-center gap-1
              px-3.5 py-1.5 rounded-full
              text-[12.5px] font-semibold text-white/75 hover:text-white
              bg-white/[0.04] hover:bg-white/[0.08]
              border border-white/10 hover:border-white/25
              transition-all duration-200 shrink-0
            "
          >
            <span>Resume</span>
            <ArrowUpRight size={13} />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="
              md:hidden flex items-center justify-center
              w-7 h-7 rounded-full
              bg-white/10 text-white/80 hover:text-white
              transition-colors shrink-0 ml-1.5
            "
          >
            {menuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </motion.nav>

      </div>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1.0, 0.36, 1.0] }}
            className="
              fixed top-20 left-1/2 -translate-x-1/2 z-40
              w-[90%] max-w-[280px] p-2 rounded-2xl
              bg-[#0e0e0e]/95 backdrop-blur-2xl
              border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)]
              flex flex-col gap-1
            "
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`
                  w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${
                    activeSection === item.id
                      ? "bg-white/10 text-white font-semibold"
                      : "text-white/55 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {item.label}
              </button>
            ))}

            <div className="h-px bg-white/10 my-1 mx-2" />

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-between px-4 py-2.5 rounded-xl
                text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all
              "
            >
              <span>Download Resume</span>
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
