import { BookOpen, Binary, Rocket } from 'lucide-react';
import { Cpu as CpuIcon, Server, Workflow } from 'lucide-react';
import type { Project, FailureLog, TimelinePath, SkillCategory } from '../types';

export const PROJECTS: Project[] = [
  {
    title: "Vortex Analytics",
    description:
      "Real-time data visualization engine for high-throughput sensor data using WebAssembly and custom canvas rendering logic.",
    tags: ["Next.js", "Rust", "WASM", "Charts"],
  },
  {
    title: "OmniFlow SaaS",
    description:
      "Enterprise project management platform with infinite-canvas workflows, real-time collaboration, and automated reporting.",
    tags: ["TypeScript", "PostgreSQL", "Socket.io", "Redis"],
  },
  {
    title: "Secure Vault 2.0",
    description:
      "Advanced AES-256 encrypted storage solution with multi-factor biometric authentication and zero-knowledge proofs.",
    tags: ["Cryptography", "Cloudflare", "React", "Node"],
  },
];

export const FAILURE_LOGS: FailureLog[] = [
  {
    code: "LOG_FAIL_01",
    title: "Pointer Arithmetic Gaps",
    lesson:
      "Initially struggled with memory management; resolved via deep C source review.",
    year: "2018",
  },
  {
    code: "LOG_FAIL_02",
    title: "DSA Logic Bottleneck",
    lesson:
      "Failed first 5 Dynamic Programming attempts; resolved via visual recursive mapping.",
    year: "2021",
  },
  {
    code: "LOG_FAIL_03",
    title: "Architecture Overload",
    lesson:
      "First SaaS build collapsed under heavy state; resolved via Redux & Modular refactor.",
    year: "2024",
  },
];

export const TIMELINE_PATHS: TimelinePath[] = [
  {
    title: "Learning Path",
    icon: BookOpen,
    color: "emerald",
    timeline: [
      { date: "2018", label: "C Foundations", focus: "Logic & Pointers" },
      { date: "2019", label: "Java OOP", focus: "Inheritance & Patterns" },
      { date: "2020", label: "Dart Mastery", focus: "Async & UI Syntax" },
    ],
  },
  {
    title: "DSA Path",
    icon: Binary,
    color: "cyan",
    timeline: [
      { date: "2021", label: "Structures", focus: "Trees, Graphs, Heaps" },
      { date: "2022", label: "Algorithms", focus: "DP & Greedy Logic" },
      { date: "2023", label: "Solving", focus: "LeetCode consistency" },
    ],
  },
  {
    title: "Development Path",
    icon: Rocket,
    color: "violet",
    timeline: [
      { date: "2023", label: "Mini Apps", focus: "CLI & Logic Tools" },
      { date: "2024", label: "React Builds", focus: "Full-Stack Dashboards" },
      { date: "2025", label: "Architecture", focus: "Scalable SaaS" },
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Frontend Engine",
    icon: CpuIcon,
    skills: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    name: "Backend Core",
    icon: Server,
    skills: ["Node.js", "PostgreSQL", "Supabase", "Prisma", "Python", "GraphQL"],
  },
  {
    name: "Infrastructure",
    icon: Workflow,
    skills: ["AWS", "Docker", "Vercel", "Git/GitHub", "Redis", "Terraform"],
  },
];
