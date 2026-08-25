"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ExternalLink, FileText, Image as ImageIcon } from 'lucide-react';
import { useScrollDirection } from '../lib/useScrollDirection';
import AnimatedSectionHeader from './AnimatedSectionHeader';

/* ─────────────────────────────────────────────────────────────
   ACHIEVEMENTS BADGES DATA — WITH OFFICIAL ORG LOGOS & SLEEK EMBLEMS
───────────────────────────────────────────────────────────── */
interface CertificateFile {
  name: string;
  path: string;
  type: 'pdf' | 'image';
}

export interface BadgeItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: 'Hackathon' | 'Certification' | 'Internship' | 'Research' | 'Workshop' | 'Tech Event';
  badgeStyle: 'clutch-hex' | 'tech-hex' | 'agency-banner' | 'seal-orange' | 'crest-shield' | 'gold-medal' | 'research-scroll' | 'intern-ribbon' | 'workshop-circle';
  logoType?: 'google' | 'microsoft' | 'mongodb' | 'ibm' | 'infosys' | 'aws' | 'kaggle' | 'n8n' | 'skillrack' | 'journal' | 'badge-svg';
  highlight: string;
  tags: string[];
  certificates: CertificateFile[];
}

const BADGES_LIST: BadgeItem[] = [
  // ═══════════════════ HACKATHONS (SLEEK VECTOR EMBLEMS) ═══════════════════
  {
    id: 'sdg-ideathon',
    title: 'Winner — Sairam SDG Ideathon 3.0',
    issuer: 'Sairam SDG Ideathon',
    year: '2024',
    category: 'Hackathon',
    badgeStyle: 'clutch-hex',
    logoType: 'badge-svg',
    highlight: 'Secured 1st Place presenting scalable social-impact architecture aligned with UN SDG Goal 1 (No Poverty) to an industry judging panel.',
    tags: ['SDG Goal 1', '1st Prize', 'Flutter', 'Social Impact'],
    certificates: [
      { name: 'Ideathon 3.0 Certificate', path: '/Achievements/HACKATHONS & TECH EVENTS/Ideathon3.0_Certificate.pdf', type: 'pdf' },
      { name: 'Event Photo', path: '/Ideathon3.0.jpeg', type: 'image' },
    ],
  },
  {
    id: 'bfb-hackathon',
    title: 'Best Innovative Idea Winner',
    issuer: 'BFB 24-Hour Hackathon',
    year: '2023',
    category: 'Hackathon',
    badgeStyle: 'tech-hex',
    logoType: 'badge-svg',
    highlight: 'GreenWave — Smart Ambulance Traffic System won the Best Innovation Award for automated green corridors and real-time FCM emergency alerts.',
    tags: ['GreenWave', 'Best Innovation', 'Firebase', 'Real-Time IoT'],
    certificates: [
      { name: 'BuildForBengaluru Certificate', path: '/Achievements/HACKATHONS & TECH EVENTS/BuildForBengaluru_Certificate.pdf', type: 'pdf' },
      { name: 'Hackathon Team Photo', path: '/B4B-Hackathon.jpeg', type: 'image' },
    ],
  },
  {
    id: 'epoch-hackathon',
    title: 'EPOCH \'26 Hackathon',
    issuer: 'EPOCH Hackathon',
    year: '2026',
    category: 'Hackathon',
    badgeStyle: 'clutch-hex',
    logoType: 'badge-svg',
    highlight: 'Participated in EPOCH \'26 Hackathon — an intensive competitive coding and engineering challenge fostering innovative solutions under strict time constraints.',
    tags: ['Hackathon', 'Engineering', 'Competition', '2026'],
    certificates: [
      { name: 'EPOCH \'26 Certificate', path: '/Achievements/HACKATHONS & TECH EVENTS/EPOCH _26 Hackathon .jpg', type: 'image' },
    ],
  },

  // ═══════════════════ TECH EVENTS ═══════════════════
  {
    id: 'advaya-paper',
    title: 'Advaya 2k26 Paper Presentation',
    issuer: 'Advaya 2k26',
    year: '2026',
    category: 'Tech Event',
    badgeStyle: 'workshop-circle',
    logoType: 'badge-svg',
    highlight: 'Presented a technical research paper at Advaya 2k26, demonstrating innovative engineering concepts and research methodology to a technical audience.',
    tags: ['Paper Presentation', 'Research', 'Engineering', '2026'],
    certificates: [
      { name: 'Advaya 2k26 Certificate', path: '/Achievements/HACKATHONS & TECH EVENTS/Advaya 2k26 paper presentation .jpg', type: 'image' },
    ],
  },
  {
    id: 'pradyut-parva',
    title: 'PradyutParva 2.0',
    issuer: 'PradyutParva',
    year: '2025',
    category: 'Tech Event',
    badgeStyle: 'workshop-circle',
    logoType: 'badge-svg',
    highlight: 'Secured recognition at PradyutParva 2.0 tech fest with participation certificate and a dedicated WebPage Certificate for outstanding web development demonstration.',
    tags: ['Tech Fest', 'Web Dev', 'Participation', 'Award'],
    certificates: [
      { name: 'Participation Certificate', path: '/Achievements/HACKATHONS & TECH EVENTS/PradyutParva2_Participation_Certificate.pdf', type: 'pdf' },
      { name: 'WebPage Certificate', path: '/Achievements/HACKATHONS & TECH EVENTS/PradyutParva2_WebPage_Certificate.pdf', type: 'pdf' },
      { name: 'Award Photo', path: '/PradyutParva.jpeg', type: 'image' },
    ],
  },
  {
    id: 'saiintelliverse',
    title: 'SaiIntelliverse Poster Making',
    issuer: 'SaiIntelliverse',
    year: '2025',
    category: 'Tech Event',
    badgeStyle: 'workshop-circle',
    logoType: 'badge-svg',
    highlight: 'Competed in the SaiIntelliverse poster-making challenge, creating a compelling technical poster that communicated complex AI/ML concepts visually.',
    tags: ['AI/ML', 'Poster Design', 'Competition'],
    certificates: [
      { name: 'Poster Making Certificate', path: '/Achievements/HACKATHONS & TECH EVENTS/SaiIntelliverse_PosterMaking_Certificate.pdf', type: 'pdf' },
    ],
  },

  // ═══════════════════ CERTIFICATIONS (OFFICIAL BRAND LOGOS) ═══════════════════
  {
    id: 'google-ai',
    title: 'Google AI Essentials Certified',
    issuer: 'Coursera × Google',
    year: '2024',
    category: 'Certification',
    badgeStyle: 'agency-banner',
    logoType: 'google',
    highlight: 'Certified by Google in foundational AI architectures, prompt engineering, generative AI tools, and production machine learning workflows.',
    tags: ['Google', 'Generative AI', 'ML Workflows', 'Verified'],
    certificates: [
      { name: 'Google AI Essentials (Coursera)', path: '/Achievements/Certificates/Google/Google AI Essentials (course era).pdf', type: 'pdf' },
    ],
  },
  {
    id: 'google-agents',
    title: 'Google AI Agents Intensive',
    issuer: 'Kaggle × Google',
    year: '2025',
    category: 'Certification',
    badgeStyle: 'gold-medal',
    logoType: 'kaggle',
    highlight: 'Completed intensive 5-day track on autonomous agent architectures, multi-agent systems, tool-calling pipelines, and autonomous workflows.',
    tags: ['Kaggle', 'AI Agents', 'Multi-Agent', 'Advanced'],
    certificates: [
      { name: '5-Day AI Agents Certificate', path: '/Achievements/Certificates/Google/5-Day AI Agents Intensive Course with Google.png', type: 'image' },
    ],
  },
  {
    id: 'ey-microsoft',
    title: 'AI Skills Passport Recognition',
    issuer: 'EY & Microsoft',
    year: '2024',
    category: 'Certification',
    badgeStyle: 'seal-orange',
    logoType: 'microsoft',
    highlight: 'Recognised by Ernst & Young and Microsoft for applied artificial intelligence competence, ethical AI design, and enterprise problem solving.',
    tags: ['Microsoft', 'EY', 'Enterprise AI', 'Skills Passport'],
    certificates: [
      { name: 'MS AI Skills Passport', path: '/Achievements/Certificates/Microsoft/MS_AI_SKILLS_PASSPORT.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'mongodb',
    title: 'MongoDB Certified — 12 Courses',
    issuer: 'MongoDB University',
    year: '2024',
    category: 'Certification',
    badgeStyle: 'crest-shield',
    logoType: 'mongodb',
    highlight: 'Completed 12 MongoDB University courses covering document data modeling, CRUD operations, aggregation pipelines, Atlas Search, indexes, and transactions.',
    tags: ['MongoDB', 'NoSQL', 'Database', 'Aggregation'],
    certificates: [
      { name: 'Getting Started with MongoDB Atlas', path: '/Achievements/Certificates/Monga db/Getting Started with MongoDB Atlas.pdf', type: 'pdf' },
      { name: 'Introduction to MongoDB', path: '/Achievements/Certificates/Monga db/Introduction to MongoDB (For Students).pdf', type: 'pdf' },
      { name: 'MongoDB and the Document Model', path: '/Achievements/Certificates/Monga db/MongoDB and the Document Model.pdf', type: 'pdf' },
      { name: 'Connecting to a MongoDB Database', path: '/Achievements/Certificates/Monga db/Connecting to a MongoDB Database.pdf', type: 'pdf' },
      { name: 'MongoDB CRUD: Insert and Find', path: '/Achievements/Certificates/Monga db/MongoDB CRUD Operations_ Insert and Find Documents.pdf', type: 'pdf' },
      { name: 'MongoDB CRUD: Modifying Queries', path: '/Achievements/Certificates/Monga db/MongoDB CRUD Operations_ Modifying Query Results.pdf', type: 'pdf' },
      { name: 'MongoDB CRUD: Replace and Delete', path: '/Achievements/Certificates/Monga db/MongoDB CRUD Operations_ Replace and Delete Documents.pdf', type: 'pdf' },
      { name: 'MongoDB Aggregation', path: '/Achievements/Certificates/Monga db/MongoDB Aggregation.pdf', type: 'pdf' },
      { name: 'MongoDB Atlas Search', path: '/Achievements/Certificates/Monga db/MongoDB Atlas Search.pdf', type: 'pdf' },
      { name: 'MongoDB Data Modeling Intro', path: '/Achievements/Certificates/Monga db/MongoDB Data Modeling Intro.pdf', type: 'pdf' },
      { name: 'MongoDB Indexes', path: '/Achievements/Certificates/Monga db/MongoDB Indexes.pdf', type: 'pdf' },
      { name: 'MongoDB Transactions', path: '/Achievements/Certificates/Monga db/MongoDB Transactions.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'ibm-skillsbuild',
    title: 'IBM SkillsBuild AI — 15+ Courses',
    issuer: 'IBM SkillsBuild',
    year: '2024',
    category: 'Certification',
    badgeStyle: 'tech-hex',
    logoType: 'ibm',
    highlight: 'Completed 15+ IBM SkillsBuild courses spanning AI fundamentals, ethics, LLMs, NLP, computer vision, enterprise AI, Watson Studio, and prompt engineering.',
    tags: ['IBM', 'AI Ethics', 'LLM', 'Watson', 'Enterprise'],
    certificates: [
      { name: 'Introduction to AI', path: '/Achievements/Certificates/IBM skill build/Introduction to Artificial Intelligence.pdf', type: 'pdf' },
      { name: 'Getting Started with AI', path: '/Achievements/Certificates/IBM skill build/Getting Started with Artificial Intelligence.pdf', type: 'pdf' },
      { name: 'AI Fundamentals', path: '/Achievements/Certificates/IBM skill build/Artificial Intelligence Fundamentals (Earn a credential!).pdf', type: 'pdf' },
      { name: 'AI Ethics', path: '/Achievements/Certificates/IBM skill build/AI Ethics.pdf', type: 'pdf' },
      { name: 'LLM Basics', path: '/Achievements/Certificates/IBM skill build/Large Language Model Basics.pdf', type: 'pdf' },
      { name: 'ML and Deep Learning', path: '/Achievements/Certificates/IBM skill build/Machine Learning and Deep Learning.pdf', type: 'pdf' },
      { name: 'NLP and Computer Vision', path: '/Achievements/Certificates/IBM skill build/NLP and Computer Vision.pdf', type: 'pdf' },
      { name: 'Mastering Prompting', path: '/Achievements/Certificates/IBM skill build/Mastering the Art of Prompting.pdf', type: 'pdf' },
      { name: 'Enterprise AI Solutions', path: '/Achievements/Certificates/IBM skill build/Building Trustworthy AI Enterprise Solutions.pdf', type: 'pdf' },
      { name: 'Enterprise Grade AI', path: '/Achievements/Certificates/IBM skill build/Getting started with enterprise grade AI.pdf', type: 'pdf' },
      { name: 'Advanced AI Algorithms', path: '/Achievements/Certificates/IBM skill build/Building AI Solutions Using Advanced Algorithms and Open Source Frameworks.pdf', type: 'pdf' },
      { name: 'Watson Studio', path: '/Achievements/Certificates/IBM skill build/Run AI Models with IBM Watson Studio.pdf', type: 'pdf' },
      { name: 'GenAI with WatsonX', path: '/Achievements/Certificates/IBM skill build/Workshop on Generative AI using WatsonX by IBMer R Vasudevan.pdf', type: 'pdf' },
      { name: 'Your Future in AI', path: '/Achievements/Certificates/IBM skill build/Your Future in AI ,The Job Landscape.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'infosys-springboard',
    title: 'Infosys Springboard — 12 Courses',
    issuer: 'Infosys Springboard',
    year: '2024',
    category: 'Certification',
    badgeStyle: 'seal-orange',
    logoType: 'infosys',
    highlight: 'Completed 12 Infosys Springboard certifications covering generative AI, prompt engineering, cybersecurity, cryptography, network fundamentals, and Java testing.',
    tags: ['Infosys', 'GenAI', 'Cybersecurity', 'Prompt Engineering'],
    certificates: [
      { name: 'Applied Generative AI', path: '/Achievements/Certificates/Infosys/Applied Generative AI Certification.pdf', type: 'pdf' },
      { name: 'Principles of GenAI', path: '/Achievements/Certificates/Infosys/Principles of Generative AI Certification.pdf', type: 'pdf' },
      { name: 'GenAI for Developers', path: '/Achievements/Certificates/Infosys/Generative models for developers.pdf', type: 'pdf' },
      { name: 'GPT-3 for Developers', path: '/Achievements/Certificates/Infosys/OpenAI Generative Pre-trained Transformer 3 (GPT-3) for developers.pdf', type: 'pdf' },
      { name: 'Prompt Engineering', path: '/Achievements/Certificates/Infosys/Prompt Engineering.pdf', type: 'pdf' },
      { name: 'Cyber Security Foundation', path: '/Achievements/Certificates/Infosys/Cyber Security Foundation Certification.pdf', type: 'pdf' },
      { name: 'Introduction to Cyber Security', path: '/Achievements/Certificates/Infosys/Introduction to Cyber Security.pdf', type: 'pdf' },
      { name: 'Cryptography Fundamentals', path: '/Achievements/Certificates/Infosys/Fundamentals of Cryptography.pdf', type: 'pdf' },
      { name: 'Information Security', path: '/Achievements/Certificates/Infosys/Fundamentals of Information Security.pdf', type: 'pdf' },
      { name: 'Network Fundamentals', path: '/Achievements/Certificates/Infosys/Network Fundamentals.pdf', type: 'pdf' },
      { name: 'Unit Testing in Java', path: '/Achievements/Certificates/Infosys/Unit Testing in Java - JUnit.pdf', type: 'pdf' },
    ],
  },

  // ═══════════════════ INTERNSHIP ═══════════════════
  {
    id: 'uptoskills-internship',
    title: 'UptoSkills — Flutter Dev & Team Lead',
    issuer: 'UptoSkills Logistics',
    year: '2025–2026',
    category: 'Internship',
    badgeStyle: 'intern-ribbon',
    logoType: 'badge-svg',
    highlight: 'Full internship at UptoSkills Logistics: Offer Letter → Intern of the Month → Completion Certificate → Experience Letter. Led final sprint delivering Truck Singh production platform.',
    tags: ['Flutter', 'Team Lead', 'Intern of Month', 'Full Stack'],
    certificates: [
      { name: 'Offer Letter', path: '/Achievements/Internships/UptoSkills Offer Letter.pdf', type: 'pdf' },
      { name: 'Intern of the Month', path: '/Achievements/Internships/UptoSkills Intern Of The Month.pdf', type: 'pdf' },
      { name: 'Completion Certificate', path: '/Achievements/Internships/UptoSkills Completion Certificate.pdf', type: 'pdf' },
      { name: 'Experience Letter', path: '/Achievements/Internships/UptoSkills Experience Letter.pdf', type: 'pdf' },
    ],
  },

  // ═══════════════════ RESEARCH / JOURNALS ═══════════════════
  {
    id: 'ijatem-journal',
    title: 'IJATEM Journal Publication',
    issuer: 'IJATEM Journal',
    year: '2026',
    category: 'Research',
    badgeStyle: 'research-scroll',
    logoType: 'journal',
    highlight: 'Published research paper on Image Recognition Chatbot in IJATEM (International Journal of Advanced Technology and Engineering Management), a peer-reviewed academic journal.',
    tags: ['Research Paper', 'Image Recognition', 'Chatbot', 'Published'],
    certificates: [
      { name: 'IJATEM Certificate', path: '/Achievements/JOURNALS/IJATEM JOURNAL/IJATEM_certificate.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'ijiris-journal',
    title: 'IJIRIS Journal Publication',
    issuer: 'IJIRIS Journal',
    year: '2026',
    category: 'Research',
    badgeStyle: 'research-scroll',
    logoType: 'journal',
    highlight: 'Published research work in IJIRIS (International Journal of Innovative Research in Information Security), contributing novel findings to the information security domain.',
    tags: ['Research Paper', 'Info Security', 'Published', 'Peer-Reviewed'],
    certificates: [
      { name: 'IJIRIS Certificate', path: '/Achievements/JOURNALS/IJIRIS/IJIRIS_Certificate.pdf', type: 'pdf' },
    ],
  },

  // ═══════════════════ WORKSHOPS ═══════════════════
  {
    id: 'aws-workshop',
    title: 'AWS Advanced Cloud Computing',
    issuer: 'AWS Workshop',
    year: '2024',
    category: 'Workshop',
    badgeStyle: 'workshop-circle',
    logoType: 'aws',
    highlight: 'Completed 2-day intensive AWS Advanced Cloud Computing workshop covering EC2, S3, Lambda, VPC architectures, and enterprise cloud deployment strategies.',
    tags: ['AWS', 'Cloud', 'EC2', 'Lambda'],
    certificates: [
      { name: 'AWS Cloud Computing Workshop', path: '/Achievements/Certificates/AWS 2 days Advanced Cloud Computing workshop.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'aiml-workshop',
    title: 'AI/ML 2-Day Workshop',
    issuer: 'AI/ML Workshop',
    year: '2024',
    category: 'Workshop',
    badgeStyle: 'workshop-circle',
    logoType: 'badge-svg',
    highlight: 'Intensive hands-on 2-day workshop on machine learning algorithms, neural networks, model training, and real-world AI deployment workflows.',
    tags: ['AI/ML', 'Neural Networks', 'Model Training'],
    certificates: [
      { name: 'AI/ML Workshop Certificate', path: '/Achievements/Certificates/AI ML workshop/AI_ML_2Days_Workshop.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'n8n-automation',
    title: 'n8n Workflow Automation',
    issuer: 'n8n',
    year: '2025',
    category: 'Workshop',
    badgeStyle: 'workshop-circle',
    logoType: 'n8n',
    highlight: 'Participated in n8n workflow automation workshop — building low-code/no-code automation pipelines, API integrations, and event-driven workflows.',
    tags: ['n8n', 'Automation', 'Low-Code', 'APIs'],
    certificates: [
      { name: 'n8n Participation Certificate', path: '/Achievements/Certificates/n8n Participation Certificate - Kishor Kumar S.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'green-skills-ai',
    title: 'Green Skills & AI',
    issuer: 'Green Skills Program',
    year: '2024',
    category: 'Workshop',
    badgeStyle: 'workshop-circle',
    logoType: 'badge-svg',
    highlight: 'Certified in Green Skills and AI — exploring the intersection of sustainable technology, green computing practices, and responsible AI development.',
    tags: ['Green Tech', 'Sustainability', 'AI', 'Responsible AI'],
    certificates: [
      { name: 'Green Skills & AI Certificate', path: '/Achievements/Certificates/Green skills and AI_.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'skillrack',
    title: 'SkillRack Competitive Coding',
    issuer: 'SkillRack',
    year: '2025',
    category: 'Certification',
    badgeStyle: 'crest-shield',
    logoType: 'skillrack',
    highlight: 'Active competitive programming profile on SkillRack — solving DSA problems, daily challenges, and structured coding tracks.',
    tags: ['DSA', 'Competitive Coding', 'Problem Solving'],
    certificates: [
      { name: 'SkillRack Profile', path: '/Achievements/Certificates/Skillrack/Screenshot_20250825-112812.Chrome.png', type: 'image' },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   TAG COLOR STYLING (SOLID MATTE DESIGN SYSTEM)
───────────────────────────────────────────────────────────── */
function getTagStyle(tag: string): string {
  const t = tag.toLowerCase().trim();

  if (t.includes('flutter'))   return 'bg-[#152a3a] text-[#8ec8f6] border-[#22445e]';
  if (t.includes('firebase'))  return 'bg-[#302315] text-[#f2ad55] border-[#4c3620]';
  if (t.includes('google') || t.includes('kaggle')) return 'bg-[#182a32] text-[#71c3d9] border-[#284654]';
  if (t.includes('microsoft') || t.includes('ey'))  return 'bg-[#1c2438] text-[#93abde] border-[#2e3b5a]';
  if (t.includes('mongodb') || t.includes('nosql') || t.includes('database')) return 'bg-[#152e22] text-[#63e2a2] border-[#214936]';
  if (t.includes('ai') || t.includes('agent') || t.includes('ml') || t.includes('llm')) return 'bg-[#291b36] text-[#c086fc] border-[#422b57]';
  if (t.includes('sdg') || t.includes('social')) return 'bg-[#321c1f] text-[#fca5a5] border-[#502c32]';
  if (t.includes('prize') || t.includes('1st') || t.includes('innovation') || t.includes('award')) return 'bg-[#342713] text-[#f5ca38] border-[#523d1d]';
  if (t.includes('ibm') || t.includes('watson')) return 'bg-[#142638] text-[#6eb4f7] border-[#1e3c5a]';
  if (t.includes('infosys')) return 'bg-[#1a2e3a] text-[#64c7e8] border-[#284a5e]';
  if (t.includes('aws') || t.includes('cloud') || t.includes('lambda')) return 'bg-[#2a2013] text-[#f5b84c] border-[#44351f]';
  if (t.includes('research') || t.includes('paper') || t.includes('published') || t.includes('peer')) return 'bg-[#1e2a1e] text-[#8ad08a] border-[#2f422f]';
  if (t.includes('security') || t.includes('crypto')) return 'bg-[#2d1b28] text-[#df8cb8] border-[#492b41]';
  if (t.includes('hackathon') || t.includes('competition') || t.includes('engineering')) return 'bg-[#262017] text-[#d4b878] border-[#3e3424]';
  if (t.includes('intern') || t.includes('team lead')) return 'bg-[#251f38] text-[#bca5f8] border-[#3e325c]';
  if (t.includes('dsa') || t.includes('problem') || t.includes('competitive')) return 'bg-[#1e2832] text-[#7ac0d9] border-[#2e4250]';
  if (t.includes('green') || t.includes('sustain') || t.includes('responsible')) return 'bg-[#172c23] text-[#6fc99f] border-[#254638]';
  if (t.includes('automation') || t.includes('n8n') || t.includes('low-code')) return 'bg-[#2a1e2e] text-[#c490d4] border-[#42304a]';
  if (t.includes('web') || t.includes('poster')) return 'bg-[#1c2c38] text-[#83b8d8] border-[#2c4458]';
  if (t.includes('genai') || t.includes('prompt')) return 'bg-[#2a1a34] text-[#c490e8] border-[#42294e]';

  return 'bg-[#192433] text-[#86aed6] border-[#2a3c54]';
}

/* ─────────────────────────────────────────────────────────────
   ORGANIZATION LOGO / BADGE GRAPHIC RENDERER
───────────────────────────────────────────────────────────── */
function BadgeGraphic({ badge }: { badge: BadgeItem }) {
  // 1. GOOGLE OFFICIAL 4-COLOR LOGO BADGE
  if (badge.logoType === 'google') {
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center p-2 select-none">
        <div className="w-full h-full rounded-2xl border border-[#4285F4]/30 bg-gradient-to-b from-[#4285F4]/10 via-black/40 to-black/80 backdrop-blur-xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between group-hover:border-[#4285F4]/60 transition-all duration-300">
          <span className="text-[9px] font-bold text-white/50 tracking-wider uppercase">GOOGLE</span>
          <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-[0_4px_12px_rgba(66,133,244,0.4)]">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <span className="text-[9px] font-mono text-[#4285F4] font-semibold">AI Certified</span>
        </div>
      </div>
    );
  }

  // 2. MICROSOFT OFFICIAL 4-COLOR SQUARES LOGO BADGE
  if (badge.logoType === 'microsoft') {
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center p-2 select-none">
        <div className="w-full h-full rounded-2xl border border-[#00A4EF]/30 bg-gradient-to-b from-[#00A4EF]/10 via-black/40 to-black/80 backdrop-blur-xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between group-hover:border-[#00A4EF]/60 transition-all duration-300">
          <span className="text-[9px] font-bold text-white/50 tracking-wider uppercase">MICROSOFT</span>
          <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-[0_4px_12px_rgba(0,164,239,0.3)]">
            <rect x="2" y="2" width="20" height="20" fill="#F25022" rx="1"/>
            <rect x="26" y="2" width="20" height="20" fill="#7FBA00" rx="1"/>
            <rect x="2" y="26" width="20" height="20" fill="#00A4EF" rx="1"/>
            <rect x="26" y="26" width="20" height="20" fill="#FFB900" rx="1"/>
          </svg>
          <span className="text-[9px] font-mono text-[#00A4EF] font-semibold">AI Passport</span>
        </div>
      </div>
    );
  }

  // 3. MONGODB OFFICIAL GREEN LEAF LOGO BADGE
  if (badge.logoType === 'mongodb') {
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center p-2 select-none">
        <div className="w-full h-full rounded-2xl border border-[#00ED64]/30 bg-gradient-to-b from-[#00ED64]/10 via-black/40 to-black/80 backdrop-blur-xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between group-hover:border-[#00ED64]/60 transition-all duration-300">
          <span className="text-[9px] font-bold text-white/50 tracking-wider uppercase">MONGODB</span>
          <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-[0_4px_14px_rgba(0,237,100,0.4)]">
            <path fill="#00ED64" d="M23.5 1.5C23 3 13 14 13 25.5c0 6.35 4.5 12.5 10.5 14.5 1.5.5 1.5 5 1.5 6.5 0-1.5 0-6 1.5-6.5 6-2 10.5-8.15 10.5-14.5 0-11.5-10-22.5-10.5-24-1 2-2 1-3 0z"/>
            <path fill="#00684A" d="M23.5 1.5v38.5c-6-2-10.5-8.15-10.5-14.5 0-11.5 10-22.5 10.5-24z"/>
            <path fill="#023430" d="M23.5 40v6.5c-1 0-1.2-4.5-1.2-6.5h1.2z"/>
          </svg>
          <span className="text-[9px] font-mono text-[#00ED64] font-semibold">12 Courses</span>
        </div>
      </div>
    );
  }

  // 4. IBM OFFICIAL 8-BAR BLUE LOGO BADGE
  if (badge.logoType === 'ibm') {
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center p-2 select-none">
        <div className="w-full h-full rounded-2xl border border-[#1F70C1]/30 bg-gradient-to-b from-[#1F70C1]/10 via-black/40 to-black/80 backdrop-blur-xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between group-hover:border-[#1F70C1]/60 transition-all duration-300">
          <span className="text-[9px] font-bold text-white/50 tracking-wider uppercase">IBM</span>
          <svg viewBox="0 0 64 28" className="w-14 h-7 drop-shadow-[0_4px_12px_rgba(31,112,193,0.4)] my-auto">
            <g fill="#1F70C1">
              <rect x="0" y="0" width="16" height="2.2" /><rect x="0" y="3.6" width="16" height="2.2" /><rect x="0" y="7.2" width="16" height="2.2" /><rect x="0" y="10.8" width="16" height="2.2" /><rect x="0" y="14.4" width="16" height="2.2" /><rect x="0" y="18" width="16" height="2.2" /><rect x="0" y="21.6" width="16" height="2.2" /><rect x="0" y="25.2" width="16" height="2.2" />
              <rect x="22" y="0" width="18" height="2.2" /><rect x="22" y="3.6" width="18" height="2.2" /><rect x="22" y="7.2" width="18" height="2.2" /><rect x="22" y="10.8" width="18" height="2.2" /><rect x="22" y="14.4" width="18" height="2.2" /><rect x="22" y="18" width="18" height="2.2" /><rect x="22" y="21.6" width="18" height="2.2" /><rect x="22" y="25.2" width="18" height="2.2" />
              <rect x="46" y="0" width="18" height="2.2" /><rect x="46" y="3.6" width="18" height="2.2" /><rect x="46" y="7.2" width="18" height="2.2" /><rect x="46" y="10.8" width="18" height="2.2" /><rect x="46" y="14.4" width="18" height="2.2" /><rect x="46" y="18" width="18" height="2.2" /><rect x="46" y="21.6" width="18" height="2.2" /><rect x="46" y="25.2" width="18" height="2.2" />
            </g>
          </svg>
          <span className="text-[9px] font-mono text-[#1F70C1] font-semibold">SkillsBuild</span>
        </div>
      </div>
    );
  }

  // 5. INFOSYS OFFICIAL BLUE LOGO BADGE
  if (badge.logoType === 'infosys') {
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center p-2 select-none">
        <div className="w-full h-full rounded-2xl border border-[#007CC3]/30 bg-gradient-to-b from-[#007CC3]/10 via-black/40 to-black/80 backdrop-blur-xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between group-hover:border-[#007CC3]/60 transition-all duration-300">
          <span className="text-[9px] font-bold text-white/50 tracking-wider uppercase">INFOSYS</span>
          <div className="my-auto">
            <span className="text-xl font-bold italic tracking-wide text-[#007CC3] drop-shadow-[0_2px_10px_rgba(0,124,195,0.4)]">
              Infosys
            </span>
          </div>
          <span className="text-[9px] font-mono text-[#007CC3] font-semibold">Springboard</span>
        </div>
      </div>
    );
  }

  // 6. AWS OFFICIAL AMBER SMILE LOGO BADGE
  if (badge.logoType === 'aws') {
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center p-2 select-none">
        <div className="w-full h-full rounded-2xl border border-[#FF9900]/30 bg-gradient-to-b from-[#FF9900]/10 via-black/40 to-black/80 backdrop-blur-xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between group-hover:border-[#FF9900]/60 transition-all duration-300">
          <span className="text-[9px] font-bold text-white/50 tracking-wider uppercase">AMAZON</span>
          <svg viewBox="0 0 54 36" className="w-14 h-9 drop-shadow-[0_4px_12px_rgba(255,153,0,0.4)] my-auto">
            <path fill="#FF9900" d="M12 25c7 5 22 5 29 0 1-.7.2-1.5-.7-1-6.5 3.5-19.5 3.5-26 0-.8-.5-1.5.3-.8 1z"/>
            <path fill="#FF9900" d="M43 23.5c-.8-.2-2.5-.2-3.8.3-.3.1-.2.4.1.4 1.8.2 3.8.8 4.2 1 .3.2.5 0 .4-.3-.3-.4-.5-1.1-.9-1.4z"/>
            <text x="27" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">aws</text>
          </svg>
          <span className="text-[9px] font-mono text-[#FF9900] font-semibold">Cloud Compute</span>
        </div>
      </div>
    );
  }

  // 7. KAGGLE OFFICIAL CYAN K LOGO BADGE
  if (badge.logoType === 'kaggle') {
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center p-2 select-none">
        <div className="w-full h-full rounded-2xl border border-[#20BEFF]/30 bg-gradient-to-b from-[#20BEFF]/10 via-black/40 to-black/80 backdrop-blur-xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between group-hover:border-[#20BEFF]/60 transition-all duration-300">
          <span className="text-[9px] font-bold text-white/50 tracking-wider uppercase">KAGGLE × GOOGLE</span>
          <svg viewBox="0 0 40 40" className="w-10 h-10 drop-shadow-[0_4px_12px_rgba(32,190,255,0.4)] my-auto">
            <path fill="#20BEFF" d="M8 4v32h6V22.5l11 13.5h7.5L19.5 20 31.5 4h-7.5L14 16V4H8z"/>
          </svg>
          <span className="text-[9px] font-mono text-[#20BEFF] font-semibold">AI Agents</span>
        </div>
      </div>
    );
  }

  // 8. N8N OFFICIAL CORAL LOGO BADGE
  if (badge.logoType === 'n8n') {
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center p-2 select-none">
        <div className="w-full h-full rounded-2xl border border-[#EA4B71]/30 bg-gradient-to-b from-[#EA4B71]/10 via-black/40 to-black/80 backdrop-blur-xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between group-hover:border-[#EA4B71]/60 transition-all duration-300">
          <span className="text-[9px] font-bold text-white/50 tracking-wider uppercase">N8N</span>
          <svg viewBox="0 0 48 32" className="w-12 h-8 drop-shadow-[0_4px_12px_rgba(234,75,113,0.4)] my-auto">
            <rect x="2" y="10" width="12" height="12" rx="3" fill="#EA4B71"/>
            <rect x="18" y="4" width="12" height="12" rx="3" fill="#FF6D5A"/>
            <rect x="34" y="10" width="12" height="12" rx="3" fill="#EA4B71"/>
            <path d="M14 16 L18 10 M30 10 L34 16" stroke="#FF6D5A" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span className="text-[9px] font-mono text-[#EA4B71] font-semibold">Automation</span>
        </div>
      </div>
    );
  }

  // 9. SKILLRACK BADGE
  if (badge.logoType === 'skillrack') {
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center p-2 select-none">
        <div className="w-full h-full rounded-2xl border border-[#f97316]/30 bg-gradient-to-b from-[#f97316]/10 via-black/40 to-black/80 backdrop-blur-xl p-3 shadow-[0_12px_28px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between group-hover:border-[#f97316]/60 transition-all duration-300">
          <span className="text-[9px] font-bold text-white/50 tracking-wider uppercase">SKILLRACK</span>
          <svg viewBox="0 0 48 48" className="w-10 h-10 drop-shadow-[0_4px_12px_rgba(249,115,22,0.4)] my-auto">
            <rect x="4" y="4" width="40" height="40" rx="8" fill="#1e293b" stroke="#f97316" strokeWidth="2"/>
            <path d="M16 16 L10 24 L16 32 M32 16 L38 24 L32 32 M26 12 L22 36" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[9px] font-mono text-[#f97316] font-semibold">Competitive DSA</span>
        </div>
      </div>
    );
  }

  // 10. RESEARCH JOURNAL SEAL BADGE
  if (badge.logoType === 'journal' || badge.badgeStyle === 'research-scroll') {
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center select-none">
        <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
          <rect x="14" y="10" width="92" height="120" rx="4" fill="#0d1a12" stroke="#4ade80" strokeWidth="2" />
          <rect x="20" y="16" width="80" height="108" rx="2" fill="none" stroke="rgba(74,222,128,0.15)" strokeWidth="1" />
          <text x="60" y="34" textAnchor="middle" fill="#4ade80" fontSize="6.5" fontWeight="900" letterSpacing="1.2">PUBLISHED</text>
          <line x1="28" y1="40" x2="92" y2="40" stroke="rgba(74,222,128,0.3)" strokeWidth="0.8" />
          <text x="60" y="58" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="800" letterSpacing="0.3">
            {badge.issuer.toUpperCase().substring(0, 14)}
          </text>
          <text x="60" y="72" textAnchor="middle" fill="#86efac" fontSize="5.5" fontWeight="700">RESEARCH PAPER</text>
          <g transform="translate(48, 80)" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round">
            <path d="M0 6 L24 6" /><path d="M0 12 L20 12" /><path d="M0 18 L16 18" />
          </g>
          <text x="60" y="116" textAnchor="middle" fill="#4ade80" fontSize="6" fontWeight="700">{badge.year}</text>
        </svg>
      </div>
    );
  }

  // 11. CLUTCH-STYLE HEXAGONAL BADGE (Sairam SDG / Epoch Hackathon)
  if (badge.badgeStyle === 'clutch-hex') {
    const isSairam = badge.id === 'sdg-ideathon';
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center select-none">
        <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
          <defs>
            <linearGradient id={`hexGrad-${badge.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e2229" />
              <stop offset="100%" stopColor="#0c0e12" />
            </linearGradient>
            <linearGradient id={`hexBorder-${badge.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d1d5db" />
              <stop offset="50%" stopColor="#6b7280" />
              <stop offset="100%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <polygon points="60,4 114,34 114,106 60,136 6,106 6,34" fill={`url(#hexGrad-${badge.id})`} stroke={`url(#hexBorder-${badge.id})`} strokeWidth="3.5" />
          <polygon points="60,11 107,37 107,103 60,129 13,103 13,37" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
          <text x="60" y="32" textAnchor="middle" fill="#9ca3af" fontSize="7.5" fontWeight="700" letterSpacing="0.8">
            {isSairam ? 'WINNER' : 'HACKATHON'}
          </text>
          <line x1="28" y1="36" x2="92" y2="36" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          <rect x="18" y="44" width="84" height="30" rx="2" fill="#182736" stroke="#3b82f6" strokeWidth="0.8" />
          <text x="60" y="57" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="800" letterSpacing="0.4">
            {isSairam ? 'SAIRAM SDG' : 'EPOCH \'26'}
          </text>
          <text x="60" y="68" textAnchor="middle" fill="#60a5fa" fontSize="6.5" fontWeight="700">
            {isSairam ? 'IDEATHON 3.0' : 'HACKATHON'}
          </text>
          <g fill="#fbbf24" transform="translate(36, 80) scale(0.55)">
            <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
            <polygon points="24,1 26,7 32,7 27,11 29,17 24,13 19,17 21,11 16,7 22,7" />
            <polygon points="38,1 40,7 46,7 41,11 43,17 38,13 33,17 35,11 30,7 36,7" />
            <polygon points="52,1 54,7 60,7 55,11 57,17 52,13 47,17 49,11 44,7 50,7" />
            <polygon points="66,1 68,7 74,7 69,11 71,17 66,13 61,17 63,11 58,7 64,7" />
          </g>
          <line x1="28" y1="98" x2="92" y2="98" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          <text x="60" y="112" textAnchor="middle" fill="#d1d5db" fontSize="6.5" fontWeight="700" letterSpacing="0.5">
            {isSairam ? '1ST PRIZE' : 'ENGINEERING'}
          </text>
          <text x="60" y="124" textAnchor="middle" fill="#9ca3af" fontSize="6" fontWeight="600">
            {badge.year}
          </text>
        </svg>
      </div>
    );
  }

  // 12. HEXAGONAL TECH INNOVATION BADGE (BFB 24-Hour Hackathon)
  if (badge.badgeStyle === 'tech-hex') {
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center select-none">
        <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
          <defs>
            <linearGradient id={`techGrad-${badge.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d2818" />
              <stop offset="100%" stopColor="#071510" />
            </linearGradient>
          </defs>
          <polygon points="60,4 114,34 114,106 60,136 6,106 6,34" fill={`url(#techGrad-${badge.id})`} stroke="#22c55e" strokeWidth="2.5" />
          <polygon points="60,12 108,38 108,102 60,128 12,102 12,38" fill="none" stroke="rgba(34,197,94,0.3)" strokeWidth="1.2" />
          <text x="60" y="34" textAnchor="middle" fill="#4ade80" fontSize="7" fontWeight="800" letterSpacing="1.2">
            BEST INNOVATION
          </text>
          <rect x="20" y="44" width="80" height="34" rx="2" fill="#0f2a18" stroke="#22c55e" strokeWidth="0.8" />
          <text x="60" y="58" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="800" letterSpacing="0.3">
            GreenWave
          </text>
          <text x="60" y="71" textAnchor="middle" fill="#4ade80" fontSize="6" fontWeight="700">
            BFB HACKATHON
          </text>
          <circle cx="60" cy="93" r="8" fill="none" stroke="#22c55e" strokeWidth="1.5" />
          <circle cx="60" cy="93" r="3" fill="#22c55e" />
          <text x="60" y="117" textAnchor="middle" fill="#bbf7d0" fontSize="6.5" fontWeight="700" letterSpacing="0.5">
            CERTIFIED
          </text>
        </svg>
      </div>
    );
  }

  // 13. INTERNSHIP RIBBON BADGE (UptoSkills)
  if (badge.badgeStyle === 'intern-ribbon') {
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center select-none">
        <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
          <defs>
            <linearGradient id={`internGrad-${badge.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
          </defs>
          <rect x="14" y="8" width="92" height="100" rx="6" fill="#0d0b1a" stroke={`url(#internGrad-${badge.id})`} strokeWidth="2.5" />
          <rect x="20" y="14" width="80" height="88" rx="4" fill="none" stroke="rgba(124,58,237,0.2)" strokeWidth="1" />
          <polygon points="36,108 48,128 60,108" fill="#4f46e5" opacity="0.7" />
          <polygon points="60,108 72,128 84,108" fill="#7c3aed" opacity="0.7" />
          <text x="60" y="32" textAnchor="middle" fill="#a78bfa" fontSize="6.5" fontWeight="900" letterSpacing="1.2">INTERNSHIP</text>
          <line x1="28" y1="38" x2="92" y2="38" stroke="rgba(124,58,237,0.3)" strokeWidth="0.8" />
          <text x="60" y="56" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="800">
            UPTOSKILLS
          </text>
          <text x="60" y="70" textAnchor="middle" fill="#c4b5fd" fontSize="6" fontWeight="700">TEAM LEAD</text>
          <circle cx="60" cy="86" r="8" fill="#4f46e5" stroke="#a78bfa" strokeWidth="1.5" />
          <text x="60" y="89" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="900">★</text>
          <text x="60" y="122" textAnchor="middle" fill="#a78bfa" fontSize="5.5" fontWeight="700">{badge.year}</text>
        </svg>
      </div>
    );
  }

  // 14. WORKSHOP / TECH EVENT CIRCLE BADGE (Advaya, PradyutParva, SaiIntelliverse, AI/ML, Green Skills)
  const isAdvaya = badge.id === 'advaya-paper';
  const isPradyut = badge.id === 'pradyut-parva';
  const isSai = badge.id === 'saiintelliverse';
  const isGreen = badge.id === 'green-skills-ai';

  const strokeColor = isGreen ? '#4ade80' : isAdvaya ? '#38bdf8' : isPradyut ? '#38bdf8' : isSai ? '#00e5ff' : '#38bdf8';
  const titleText = isAdvaya ? 'ADVAYA 2K26' : isPradyut ? 'PRADYUTPARVA' : isSai ? 'SAIINTELLIVERS' : isGreen ? 'GREEN SKILLS' : 'AI/ML WORKSHOP';
  const subText = isAdvaya ? 'COMPLETED' : isPradyut ? 'COMPLETED' : isSai ? 'COMPLETED' : isGreen ? 'COMPLETED' : 'COMPLETED';

  return (
    <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center select-none">
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
        <circle cx="60" cy="60" r="52" fill="#0d1520" stroke={strokeColor} strokeWidth="2.5" />
        <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(56,189,248,0.2)" strokeWidth="1" strokeDasharray="3 2" />
        <text x="60" y="32" textAnchor="middle" fill={strokeColor} fontSize="6" fontWeight="900" letterSpacing="1">
          {badge.category.toUpperCase()}
        </text>
        <text x="60" y="56" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="800" letterSpacing="0.3">
          {titleText}
        </text>
        <text x="60" y="70" textAnchor="middle" fill="#7dd3fc" fontSize="5.5" fontWeight="700">{badge.year}</text>
        <g stroke={strokeColor} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(50, 78)">
          <path d="M0 10 L10 0 L20 10" />
        </g>
        <text x="60" y="105" textAnchor="middle" fill="#7dd3fc" fontSize="5" fontWeight="700" letterSpacing="0.4">{subText}</text>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ACHIEVEMENTS & BADGES SHOWCASE SECTION
───────────────────────────────────────────────────────────── */
export default function AchievementsSection() {
  const scrollDirection = useScrollDirection();
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem>(BADGES_LIST[0]);

  return (
    <section
      id="achievements"
      className="relative w-full py-36 sm:py-48 bg-black text-white overflow-hidden border-t border-white/5"
    >
      {/* ── Background Vignette & Ambient Glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* ── Section Header with Animated Character Reveal ── */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center mb-16 sm:mb-20">
        <AnimatedSectionHeader
          kicker="HONORS & RECOGNITION"
          title="Achievements"
          subtitle="Proven engineering milestones, hackathon podium victories, published research papers, and accredited industry credentials earned through competitive real-world evaluation."
          align="center"
        />
      </div>

      {/* ── Badges Row / Showcase ── */}
      <motion.div
        initial={{ opacity: 0, y: scrollDirection === 'down' ? 24 : -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto px-6 sm:px-8 mb-12"
      >
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
          {BADGES_LIST.map((badge) => {
            const isSelected = selectedBadge.id === badge.id;

            return (
              <motion.button
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                whileHover={{ y: -8, scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.22, 1.0, 0.36, 1.0] }}
                className={`
                  relative group flex flex-col items-center cursor-pointer p-2 rounded-2xl transition-all duration-300
                  ${isSelected ? 'bg-white/[0.06] shadow-[0_0_30px_rgba(255,255,255,0.12)] ring-1 ring-white/30' : 'hover:bg-white/[0.03]'}
                `}
                aria-label={`View ${badge.title}`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="active-badge-indicator"
                    className="absolute -top-2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"
                  />
                )}
                <BadgeGraphic badge={badge} />
                <span className="mt-2 text-[11px] font-semibold text-white/50 group-hover:text-white/90 transition-colors text-center max-w-[110px] truncate">
                  {badge.issuer}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ── Active Badge Details Drawer (Frosted Glass Panel) ── */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedBadge.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1.0, 0.36, 1.0] }}
            style={{
              background: 'linear-gradient(180deg, rgba(38, 38, 38, 0.48) 0%, rgba(14, 14, 14, 0.38) 100%)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.20), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4), 0 20px 48px rgba(0, 0, 0, 0.85)',
            }}
            className="rounded-2xl p-6 sm:p-7 border border-white/[0.14] text-center sm:text-left"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                  <span className="text-[10.5px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-white/[0.08] text-white/90 border border-white/15">
                    {selectedBadge.category}
                  </span>
                  <span className="text-xs font-semibold text-white/40 font-mono">
                    {selectedBadge.year}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {selectedBadge.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/50 font-medium mt-0.5">
                  Awarded by {selectedBadge.issuer}
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium shrink-0">
                <CheckCircle2 size={14} />
                <span>Verified Credential</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-[13px] text-white/75 leading-relaxed my-4">
              {selectedBadge.highlight}
            </p>

            {/* ── Certificate Files List with View/Open Links ── */}
            {selectedBadge.certificates.length > 0 && (
              <div className="my-4 space-y-2">
                <p className="text-[10.5px] uppercase tracking-wider text-white/40 font-semibold mb-2">
                  {selectedBadge.certificates.length === 1 ? 'Certificate / Document' : `Certificates & Media (${selectedBadge.certificates.length})`}
                </p>
                <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
                  {selectedBadge.certificates.map((cert, idx) => (
                    <a
                      key={idx}
                      href={cert.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cert flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200 cursor-pointer"
                    >
                      <div className="shrink-0 w-7 h-7 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center">
                        {cert.type === 'image' ? (
                          <ImageIcon size={13} className="text-white/50" />
                        ) : (
                          <FileText size={13} className="text-white/50" />
                        )}
                      </div>
                      <span className="text-xs text-white/70 group-hover/cert:text-white/95 transition-colors font-medium truncate flex-1">
                        {cert.name}
                      </span>
                      <span className="text-[10px] text-white/30 uppercase font-mono shrink-0">
                        {cert.type === 'image' ? 'IMG' : 'PDF'}
                      </span>
                      <ExternalLink size={12} className="text-white/30 group-hover/cert:text-white/60 transition-colors shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* ── Certificate Image Preview (for single image documents) ── */}
            {selectedBadge.certificates.length === 1 && selectedBadge.certificates[0].type === 'image' && (
              <div className="my-4 rounded-lg overflow-hidden border border-white/[0.08] bg-black/40">
                <img
                  src={selectedBadge.certificates[0].path}
                  alt={selectedBadge.certificates[0].name}
                  className="w-full h-auto max-h-[300px] object-contain"
                />
              </div>
            )}

            {/* Solid Matte Tag Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-3 border-t border-white/[0.08]">
              {selectedBadge.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-[10.5px] px-2.5 py-0.5 rounded-[3px] font-medium border text-center ${getTagStyle(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
}
