// ============================================================
//  app/lib/data.ts
//  Reads from portfolio.config.ts and shapes data for
//  components. Edit portfolio.config.ts — not this file.
// ============================================================

import { BookOpen, Binary, Rocket, Cpu, Server, Workflow } from 'lucide-react';
import portfolioConfig from '../../portfolio.config';
import type { Project, FailureLog, TimelinePath, SkillCategory, Skill } from '../types';

// ── Icon maps ───────────────────────────────────────────────

const SKILL_ICON_MAP: Record<string, React.ElementType> = {
  "Languages & Frameworks":  Cpu,
  "Backend & Database":      Server,
  "Tools & Infrastructure":  Workflow,
  "Frontend Engine":         Cpu,
  "Backend Core":            Server,
  "Infrastructure":          Workflow,
};

const TIMELINE_ICON_MAP: Record<string, React.ElementType> = {
  "Learning Path":    BookOpen,
  "DSA Path":         Binary,
  "Development Path": Rocket,
};

// ── Derived exports ─────────────────────────────────────────

export const PROJECTS: Project[] = portfolioConfig.projects.map((p: any) => ({
  slug:        p.slug,
  title:       p.title,
  description: p.description,
  tags:        p.tags,
  isFeatured:  p.isFeatured ?? false,
  github:      p.github,
  live:        p.live,
  image:       p.image,
  details:     p.details,
}));

export const FAILURE_LOGS: FailureLog[] = portfolioConfig.failureLogs.map((f) => ({
  code:   f.code,
  title:  f.title,
  lesson: f.lesson,
  year:   f.year,
}));

export const TIMELINE_PATHS: TimelinePath[] = portfolioConfig.timeline.map((track) => ({
  title: track.track,
  color: track.color,
  icon:  TIMELINE_ICON_MAP[track.track] ?? BookOpen,
  timeline: track.milestones.map((m) => ({
    date:  m.year,
    label: m.title,
    focus: m.description,
  })),
}));

// Normalise skills — config entries can be { name, level } objects or plain strings
// Plain strings get level 3 (Intermediate) by default
export const SKILL_CATEGORIES: SkillCategory[] = portfolioConfig.skills.map((cat) => ({
  name: cat.category,
  icon: SKILL_ICON_MAP[cat.category] ?? Cpu,
  skills: (cat.skills as Array<string | { name: string; level: number }>).map(
    (s): Skill =>
      typeof s === 'string'
        ? { name: s, level: 3 }
        : { name: s.name, level: s.level ?? 3 }
  ),
}));

export const STATS                = portfolioConfig.stats;
export const FEATURED_ACHIEVEMENT = portfolioConfig.featuredAchievement;

// ── Identity exports ────────────────────────────────────────
export const NAME           = portfolioConfig.name;
export const ROLE           = portfolioConfig.role;
export const TAGLINE        = portfolioConfig.tagline;
export const BIO            = portfolioConfig.bio;
export const EMAIL          = portfolioConfig.email;
export const SOCIAL         = portfolioConfig.social;
export const RESUME_URL     = portfolioConfig.resumeUrl;
export const CONTACT        = portfolioConfig.contact;
export const AVAILABLE      = portfolioConfig.availableForWork;
export const HERO_SUBTITLE  = portfolioConfig.heroSubtitle;
export const ABOUT_TAGLINE  = portfolioConfig.aboutTagline;
export const HERO_UI              = portfolioConfig.hero;
export const ABOUT_UI             = portfolioConfig.about;
export const SKILLS_SECTION_UI    = portfolioConfig.skillsSection;
export const PROJECTS_SECTION_UI  = portfolioConfig.projectsSection;
export const ACHIEVEMENTS_UI      = portfolioConfig.achievementsSection;
export const BLOGS_UI             = portfolioConfig.blogsSection;
export const TIMELINE_UI          = portfolioConfig.timelineSection;
export const BRAND                = portfolioConfig.brand;
export const LOCATION             = portfolioConfig.location;
export const RESPONSE_TIME        = portfolioConfig.responseTime;
export const AVAILABILITY_STATUS  = portfolioConfig.availabilityStatus;
export const CONTACT_BADGE        = portfolioConfig.contact.badge;
export const ACHIEVEMENTS         = portfolioConfig.achievements;
export const BLOGS                = portfolioConfig.blogs;