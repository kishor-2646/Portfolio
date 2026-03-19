"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code2, Terminal, User, Cpu, Briefcase, History, MessageSquare, Menu, X, Trophy, BookOpen } from 'lucide-react';
import { BRAND } from '../lib/data';
import type { NavbarProps, NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  { id: 'hero',         label: 'Home',        icon: <Terminal size={18} />  },
  { id: 'about',        label: 'About',       icon: <User size={18} />      },
  { id: 'skills',       label: 'Skills',      icon: <Cpu size={18} />       },
  { id: 'projects',     label: 'Projects',    icon: <Briefcase size={18} /> },
  { id: 'achievements', label: 'Wins',        icon: <Trophy size={18} />    },
  { id: 'blogs',        label: 'Blogs',       icon: <BookOpen size={18} />  },
  { id: 'timeline',     label: 'Timeline',    icon: <History size={18} />   },
  { id: 'contact',      label: 'Contact',     icon: <MessageSquare size={18} /> },
];

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 font-black text-2xl text-white tracking-tighter">
            <div className="bg-white text-black p-1 rounded-lg">
              <Code2 size={24} />
            </div>
            {BRAND.navLogo}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-6 flex items-center space-x-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-white bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/20'
                      : 'text-slate-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {NAV_ITEMS.map((item) => (
                <button key={item.id}
                  onClick={() => { setActiveSection(item.id); setIsOpen(false); }}
                  className="flex items-center gap-4 w-full px-4 py-4 text-lg font-bold text-slate-200 hover:text-white hover:bg-white/10 rounded-2xl transition-all">
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;