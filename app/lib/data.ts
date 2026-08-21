// ============================================================
//  app/lib/data.ts
//  Reads from portfolio.config.ts and shapes data for
//  components. Edit portfolio.config.ts — not this file.
// ============================================================

import portfolioConfig from '../../portfolio.config';
import type { Project, FailureLog } from '../types';

// ── Derived exports ─────────────────────────────────────────

export const PROJECTS: Project[] = (portfolioConfig.projects || []).map((p: any) => ({
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

export const FUN_PROJECTS = portfolioConfig.funProjects || [];

export const FAILURE_LOGS: FailureLog[] = (portfolioConfig.blogsSection?.warRoomLogs ? [
  {
    code:   "LOG_FAIL_01",
    title:  portfolioConfig.blogsSection.warRoomLogs.title,
    lesson: portfolioConfig.blogsSection.warRoomLogs.description,
    year:   "2025",
  }
] : []);

// ── Identity exports ────────────────────────────────────────
export const NAME                 = portfolioConfig.name;
export const MONOGRAM             = portfolioConfig.monogram;
export const ROLE                 = portfolioConfig.role;
export const PROFILE_IMAGE        = portfolioConfig.profileImage;
export const ROTATING_TAGLINES    = portfolioConfig.rotatingTaglines;
export const BIO                  = portfolioConfig.about?.bio;
export const ABOUT_TAGLINE        = portfolioConfig.about?.tagline;
export const EMAIL                = portfolioConfig.email;
export const SOCIAL               = portfolioConfig.social;
export const RESUME_URL           = portfolioConfig.resumeUrl;
export const CONTACT              = portfolioConfig.contact;
export const AVAILABLE            = portfolioConfig.availableForWork;
export const HERO_UI              = portfolioConfig.hero;
export const ABOUT_UI             = portfolioConfig.about;
export const PROJECTS_SECTION_UI  = portfolioConfig.projectsSection;
export const ACHIEVEMENTS_UI      = portfolioConfig.achievementsSection;
export const BLOGS_UI             = portfolioConfig.blogsSection;
export const JOURNEY_UI           = portfolioConfig.journeySection;
export const LOCATION             = portfolioConfig.location;
export const RESPONSE_TIME        = portfolioConfig.responseTime;
export const AVAILABILITY_STATUS  = portfolioConfig.availabilityStatus;
export const CONTACT_BADGE        = portfolioConfig.contact?.badge;
export const ACHIEVEMENTS         = portfolioConfig.achievements;
export const EXPERIENCES          = portfolioConfig.experiences;
export const FOOTER_UI            = portfolioConfig.footer;
export const META                 = portfolioConfig.meta;