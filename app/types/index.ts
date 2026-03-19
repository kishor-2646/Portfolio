import React from 'react';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  isFeatured?: boolean;
  github?: string;
  live?: string;
  image?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface NavbarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export interface TimelineEvent {
  date: string;
  label: string;
  focus: string;
}

export interface TimelinePath {
  title: string;
  icon: React.ElementType;
  color: string;
  timeline: TimelineEvent[];
}

export interface FailureLog {
  code: string;
  title: string;
  lesson: string;
  year: string;
}

// Each skill has a name and a proficiency level (1–5)
export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  icon: React.ElementType;
  skills: Skill[];   // ← Skill objects, NOT plain strings
}