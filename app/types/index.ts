import React from 'react';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  isFeatured?: boolean;
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

export interface SkillCategory {
  name: string;
  icon: React.ElementType;
  skills: string[];
}
