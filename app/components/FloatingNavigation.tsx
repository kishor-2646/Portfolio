"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Menu, X, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { MONOGRAM, RESUME_URL, NAME, PROFILE_IMAGE } from "../lib/data";

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

/* ── Spring Physics for Silky Smooth Navbar Morphing ─────── */
const SMOOTH_NAV_SPRING = {
  type: "spring" as const,
  stiffness: 140,
  damping: 22,
  mass: 0.75,
};

/* ── Interactive Nav Link Button with Active Glass Pill ── */
function NavLinkItem({
  item,
  activeSection,
  hoveredId,
  setHoveredId,
  scrollTo,
}: {
  item: { id: string; label: string };
  activeSection: string;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  scrollTo: (id: string) => void;
}) {
  const isActive = activeSection === item.id;
  const isHovered = hoveredId === item.id;

  return (
    <motion.button
      key={item.id}
      id={`nav-${item.id}`}
      onClick={() => scrollTo(item.id)}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
      className={`
        relative px-3 py-1.5 rounded-full text-[13px] font-normal
        transition-colors duration-200 cursor-pointer select-none
        ${
          isActive
            ? "text-white font-medium"
            : isHovered
            ? "text-white/95"
            : "text-white/70"
        }
      `}
    >
      {/* Hover Background Glass Pill */}
      {isHovered && !isActive && (
        <motion.span
          layoutId="nav-hover-pill"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 rounded-full bg-white/[0.08] pointer-events-none"
        />
      )}

      {/* Active Highlight Glass Pill */}
      {isActive && (
        <motion.span
          layoutId="nav-active-pill"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="
            absolute inset-0 rounded-full
            bg-white/[0.14] border border-white/20
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
            pointer-events-none
          "
        />
      )}

      <span className="relative z-10 tracking-tight">{item.label}</span>
    </motion.button>
  );
}

export default function FloatingNavigation({ activeSection, setActiveSection }: Props) {
  const [menuOpen, setMenuOpen]             = useState(false);
  const [mounted, setMounted]               = useState(false);
  const [hoveredId, setHoveredId]           = useState<string | null>(null);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isHoverExpanded, setIsHoverExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ── Direction-Aware Scroll Detection with Hysteresis Smoothing ── */
  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let accumulatedDelta = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      // Near top of page: always expand smoothly
      if (currentScrollY < 70) {
        setIsScrolledDown(false);
        accumulatedDelta = 0;
        lastScrollY = currentScrollY;
        return;
      }

      // Reset accumulated delta on direction change
      if ((delta > 0 && accumulatedDelta < 0) || (delta < 0 && accumulatedDelta > 0)) {
        accumulatedDelta = 0;
      }
      accumulatedDelta += delta;

      // Scrolling Down threshold (smooth 18px accumulation)
      if (accumulatedDelta > 18) {
        setIsScrolledDown(true);
        accumulatedDelta = 0;
      }
      // Scrolling Up threshold (smooth 18px accumulation)
      else if (accumulatedDelta < -18) {
        setIsScrolledDown(false);
        accumulatedDelta = 0;
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isCollapsed = isScrolledDown && !isHoverExpanded;

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const displayName = (NAME ? NAME.split(" ")[0] : "KISHOR").toUpperCase();

  return (
    <>
      {/* ── Fixed Center Anchor Wrapper ── */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        
        {/* Floating Nav Pill Container with Silky Physics Morphing */}
        <motion.nav
          layout
          aria-label="Main navigation"
          initial={{ opacity: 0, y: -16 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          onMouseEnter={() => setIsHoverExpanded(true)}
          onMouseLeave={() => setIsHoverExpanded(false)}
          transition={{
            layout: SMOOTH_NAV_SPRING,
            opacity: { duration: 0.4 },
          }}
          className="
            pointer-events-auto
            relative inline-flex items-center
            p-1.5 rounded-full
            whitespace-nowrap
          "
        >
          {/* Frosted Glass Background Layer (Synchronized Morph) */}
          <motion.div
            layout
            transition={{ layout: SMOOTH_NAV_SPRING }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(38, 38, 38, 0.48) 0%, rgba(14, 14, 14, 0.36) 100%)",
              backdropFilter: "blur(32px) saturate(190%)",
              WebkitBackdropFilter: "blur(32px) saturate(190%)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              boxShadow:
                "inset 0 1px 1px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4), 0 20px 48px -8px rgba(0, 0, 0, 0.75)",
            }}
          />

          {/* Identity Capsule: Avatar + Name (Always Visible) */}
          <motion.button
            layout
            transition={{ layout: SMOOTH_NAV_SPRING }}
            onClick={() => scrollTo("hero")}
            aria-label="Back to top"
            className="
              relative z-10 flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full
              hover:bg-white/[0.08] transition-colors duration-200 cursor-pointer select-none shrink-0
            "
          >
            {/* Circular Avatar / Monogram */}
            <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20 bg-zinc-800 flex items-center justify-center shrink-0 shadow-inner">
              {PROFILE_IMAGE ? (
                <img
                  src={PROFILE_IMAGE}
                  alt={NAME}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <span className="text-white font-bold text-xs">{MONOGRAM || "K"}</span>
              )}
            </div>

            {/* User Name */}
            <span className="text-[13px] font-bold text-white tracking-wide uppercase">
              {displayName}
            </span>
          </motion.button>

          {/* ── EXPANDED DESKTOP VIEW (Visible on Scroll Up / Top) ── */}
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                key="expanded-links-container"
                layout
                initial={{ opacity: 0, width: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }}
                exit={{ opacity: 0, width: 0, filter: "blur(6px)" }}
                transition={{
                  width: SMOOTH_NAV_SPRING,
                  opacity: { duration: 0.35, ease: "easeInOut" },
                  filter: { duration: 0.35 },
                }}
                className="relative z-10 hidden md:flex items-center overflow-hidden"
              >
                {/* Divider */}
                <div className="w-px h-4 bg-white/15 mx-1.5 pointer-events-none shrink-0" />

                {/* Navigation Links */}
                <div className="flex items-center gap-0.5 shrink-0">
                  {NAV_ITEMS.map((item) => (
                    <NavLinkItem
                      key={item.id}
                      item={item}
                      activeSection={activeSection}
                      hoveredId={hoveredId}
                      setHoveredId={setHoveredId}
                      scrollTo={scrollTo}
                    />
                  ))}
                </div>

                {/* Divider */}
                <div className="w-px h-4 bg-white/15 mx-1.5 pointer-events-none shrink-0" />

                {/* Resume Button */}
                <motion.a
                  href={RESUME_URL || "/resume.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    relative z-10 inline-flex items-center gap-1
                    px-3 py-1.5 rounded-full
                    text-[12.5px] font-medium text-white/85 hover:text-white
                    bg-white/[0.08] hover:bg-white/[0.16]
                    border border-white/15 hover:border-white/30
                    shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
                    transition-colors duration-200 shrink-0 mr-0.5
                  "
                >
                  <span>Resume</span>
                  <ArrowUpRight size={13} />
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── COLLAPSED DESKTOP VIEW: Three Dots (Visible on Scroll Down) ── */}
          <AnimatePresence mode="wait">
            {isCollapsed && (
              <motion.button
                key="collapsed-dots-btn"
                layout
                initial={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
                transition={{
                  scale: SMOOTH_NAV_SPRING,
                  opacity: { duration: 0.3 },
                }}
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label="Open menu"
                className="
                  hidden md:flex relative z-10 items-center justify-center
                  w-7 h-7 rounded-full
                  bg-white/[0.06] hover:bg-white/[0.15] text-white/80 hover:text-white
                  border border-white/10 hover:border-white/25
                  transition-all duration-200 cursor-pointer shrink-0 ml-1 mr-0.5
                "
              >
                <MoreHorizontal size={15} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Mobile Hamburger Toggle (Always available on small screens) */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="
              relative z-10 md:hidden flex items-center justify-center
              w-7 h-7 rounded-full
              bg-white/10 text-white/80 hover:text-white
              transition-colors shrink-0 ml-1.5 mr-0.5
            "
          >
            {menuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </motion.nav>

      </div>

      {/* ── Dropdown Menu (Accessible when clicking three dots or on Mobile) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1.0, 0.36, 1.0] }}
            className="
              fixed top-20 left-1/2 -translate-x-1/2 z-40
              w-[90%] max-w-[280px] p-2 rounded-2xl
              bg-[#121212]/90 backdrop-blur-3xl
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
                      ? "bg-white/15 text-white font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                      : "text-white/65 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {item.label}
              </button>
            ))}

            <div className="h-px bg-white/10 my-1 mx-2" />

            <a
              href={RESUME_URL || "/resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-between px-4 py-2.5 rounded-xl
                text-sm font-medium text-white/75 hover:text-white hover:bg-white/5 transition-all
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
