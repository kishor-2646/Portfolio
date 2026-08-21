"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { MONOGRAM, RESUME_URL } from "../lib/data";

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

/* ── Interactive Nav Link Button with Scroll-Driven Gap Compression ── */
function NavLinkItem({
  item,
  index,
  total,
  scrollY,
  activeSection,
  hoveredId,
  setHoveredId,
  scrollTo,
}: {
  item: { id: string; label: string };
  index: number;
  total: number;
  scrollY: MotionValue<number>;
  activeSection: string;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  scrollTo: (id: string) => void;
}) {
  // Center anchor point
  const mid = (total - 1) / 2;
  const initialOffset = (index - mid) * 8.5; // subtle spread at top

  const rawX = useTransform(scrollY, [0, 160], [initialOffset, 0]);
  const springX = useSpring(rawX, { stiffness: 240, damping: 28, mass: 0.15 });

  const isActive = activeSection === item.id;
  const isHovered = hoveredId === item.id;

  return (
    <motion.button
      key={item.id}
      id={`nav-${item.id}`}
      onClick={() => scrollTo(item.id)}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
      style={{
        x: springX,
        willChange: "transform",
      }}
      className={`
        relative px-3.5 py-1.5 rounded-full text-[13.5px] font-normal
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
          transition={{ duration: 0.15 }}
          className="absolute inset-0 rounded-full bg-white/[0.08] pointer-events-none"
        />
      )}

      {/* Active Highlight Glass Pill */}
      {isActive && (
        <motion.span
          layoutId="nav-active-pill"
          transition={{ type: "spring", stiffness: 450, damping: 35 }}
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
  const [menuOpen, setMenuOpen]   = useState(false);
  const [mounted, setMounted]     = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Separation gap for logo and resume (140px)
  const sideOffset = 140;

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ── Scroll-driven 1:1 continuous interpolation ───────────── */
  const { scrollY } = useScroll();

  // Scroll range: 0px to 160px of vertical scroll
  const rawLogoX = useTransform(scrollY, [0, 160], [-sideOffset, 0]);
  const rawResumeX = useTransform(scrollY, [0, 160], [sideOffset, 0]);

  // Spring smoothing for organic physical feel
  const springCfg = { stiffness: 240, damping: 28, mass: 0.15 };
  const logoX = useSpring(rawLogoX, springCfg);
  const resumeX = useSpring(rawResumeX, springCfg);

  // Border & Glass opacities interpolate directly with scroll
  const glassOpacity = useTransform(scrollY, [50, 160], [0, 1]);

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
      {/* ── Fixed Center Anchor Wrapper ── */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        
        {/* Floating Nav Pill Container with Premium Refractive Glass Effect */}
        <motion.nav
          aria-label="Main navigation"
          initial={{ opacity: 0, y: -16 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: [0.22, 1.0, 0.36, 1.0] }}
          className="
            pointer-events-auto
            relative inline-flex items-center
            p-1.5 rounded-full
            whitespace-nowrap
          "
        >
          {/* Animated Frosted Glass Layer matching Reference Image */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              opacity: glassOpacity,
              background: "linear-gradient(180deg, rgba(38, 38, 38, 0.45) 0%, rgba(16, 16, 16, 0.32) 100%)",
              backdropFilter: "blur(32px) saturate(190%)",
              WebkitBackdropFilter: "blur(32px) saturate(190%)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              boxShadow:
                "inset 0 1px 1px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4), 0 20px 48px -8px rgba(0, 0, 0, 0.75)",
            }}
          />

          {/* Monogram Logo (Glass badge) */}
          <motion.button
            onClick={() => scrollTo("hero")}
            aria-label="Back to top"
            style={{
              x: mounted ? logoX : 0,
              willChange: "transform",
            }}
            className="
              relative z-10
              flex items-center justify-center
              w-8 h-8 rounded-full
              bg-white/[0.08] hover:bg-white/[0.15]
              border border-white/20
              shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]
              text-white font-bold text-xs tracking-tight
              transition-colors duration-200 hover:scale-105 active:scale-95 shrink-0
            "
          >
            {MONOGRAM || "K"}
          </motion.button>

          {/* Divider between Logo & Links (Desktop) */}
          <motion.div
            style={{ opacity: glassOpacity }}
            className="hidden md:block w-px h-4 bg-white/15 mx-1.5 pointer-events-none relative z-10"
          />

          {/* Center Nav Links (Glass container) */}
          <div className="relative z-10 hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, index) => (
              <NavLinkItem
                key={item.id}
                item={item}
                index={index}
                total={NAV_ITEMS.length}
                scrollY={scrollY}
                activeSection={activeSection}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                scrollTo={scrollTo}
              />
            ))}
          </div>

          {/* Divider between Links & Resume (Desktop) */}
          <motion.div
            style={{ opacity: glassOpacity }}
            className="hidden md:block w-px h-4 bg-white/15 mx-1.5 pointer-events-none relative z-10"
          />

          {/* Resume Button (Glass button — synchronized velocity with Logo) */}
          <motion.a
            href={RESUME_URL || "/resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"

            style={{
              x: mounted ? resumeX : 0,
              willChange: "transform",
            }}
            className="
              relative z-10
              hidden md:inline-flex items-center gap-1
              px-3.5 py-1.5 rounded-full
              text-[12.5px] font-medium text-white/85 hover:text-white
              bg-white/[0.08] hover:bg-white/[0.16]
              border border-white/15 hover:border-white/30
              shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
              transition-colors duration-200 shrink-0
            "
          >
            <span>Resume</span>
            <ArrowUpRight size={13} />
          </motion.a>

          {/* Mobile Hamburger Toggle */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="
              relative z-10 md:hidden flex items-center justify-center
              w-8 h-8 rounded-full
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
              bg-[#121212]/80 backdrop-blur-3xl
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
              href="/resume.pdf"
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
