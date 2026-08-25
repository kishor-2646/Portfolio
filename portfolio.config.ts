// ╔══════════════════════════════════════════════════════════════════════════════╗
//  portfolio.config.ts  —  KISHOR KUMAR S — MASTER CONFIGURATION
//
//  ★  THIS IS THE SINGLE SOURCE OF TRUTH FOR YOUR ENTIRE PORTFOLIO  ★
//
//  Organized in the EXACT 1:1 ORDER of your portfolio sections:
//    1. HERO SECTION        (#hero)         — Identity, Photo, Roles, CTAs, Tech Dock
//    2. ABOUT SECTION       (#about)        — Tagline, Bio, Editorial Lines, Carousel
//    3. PROJECTS SECTION    (#projects)     — Selected Case Studies + Fun Projects
//    4. JOURNEY SECTION     (#journey)      — Career Timeline, Roles, Milestones
//    5. ACHIEVEMENTS        (#achievements) — Marquee Honors, Podium Wins, Credentials
//    6. BLOGS & STUDY NOTES (#blogs)        — Bento Grid, Articles, Notes, Logs, Rules
//    7. CONTACT SECTION     (#contact)      — Email, Availability, Location, Socials
//    8. FOOTER                              — Vibe-Coded Badges, Copyright
//    9. SEO & METADATA                      — Browser Title, Description, OG Image
//
//  HOW TO CUSTOMIZE:
//    1. Modify any text, image path, or link in this file.
//    2. Save (Ctrl + S) — your entire website updates instantly!
// ╚══════════════════════════════════════════════════════════════════════════════╝

const portfolioConfig = {

  // ════════════════════════════════════════════════════════════════════════════
  //  1. HERO SECTION  (#hero)
  // ════════════════════════════════════════════════════════════════════════════

  /** Your full name as displayed in headings and site identity */
  name: "Kishor Kumar S",

  /** Monogram letter or short logo displayed in the top floating navigation pill */
  monogram: "K",

  /** Primary job title / specialty */
  role: "Software Engineer",

  /** Path to your hero profile photo (transparent PNG placed in /public/) */
  profileImage: "/potrait.png",

  /** Rotating taglines displayed in the Hero section beneath \"Hi, I'm Kishor\" */
  rotatingTaglines: [
    "Software Engineer",
    "Full-Stack Developer",
    "Mobile App Developer",
    "Problem Solver",
  ],

  /** Hero CTA buttons and tech dock */
  hero: {
    primaryBtn: "View Impact & Work", // Scrolls smoothly to #projects
    secondaryBtn: "Contact",          // Scrolls smoothly to #contact
    techLabel: "Experienced in",
    techBadges: [
      { name: "Flutter", iconUrl: "https://cdn.simpleicons.org/flutter/02569B" },
      { name: "Firebase", iconUrl: "https://cdn.simpleicons.org/firebase/FFCA28" },
      { name: "Java", iconUrl: "https://cdn.simpleicons.org/java/FF7E33" },
      { name: "Supabase", iconUrl: "https://cdn.simpleicons.org/supabase/3ECF8E" },
    ],
  },


  // ════════════════════════════════════════════════════════════════════════════
  //  2. ABOUT SECTION  (#about)
  // ════════════════════════════════════════════════════════════════════════════
  about: {
    badge: "About Me",

    /** Top highlighted editorial tagline */
    tagline: "Crafting software where complex architecture translates into effortless user experiences.",

    /** Main bio paragraph describing your production scale and experience */
    bio: "Since 2025, I've been building production-grade systems used by real users — reducing manual operations and improving real-time communication efficiency.",

    /** Closing editorial statement */
    closingStatement: "That’s exactly what I build.",

    /** Slides displayed in the auto-playing Cinematic Photo Carousel on the right */
    carouselSlides: [
      {
        id: "profile",
        src: "/about1.jpeg",
        alt: "Kishor Kumar Engineering Milestone",
        tag: "Production Impact",
        title: "Production-Grade Engineering",
        subtitle: "Built systems for 100+ live users with 60%+ communication efficiency.",
      },
      {
        id: "Ideathon",
        src: "/Ideathon3.0.jpeg",
        alt: "SDG Ideathon Winner",
        tag: "Join Hands To Reduce Poverty",
        title: "Winner — Sairam SDG Ideathon 3.0",
        subtitle: "Social-impact solution aligned with UN SDG Goal 1 (No Poverty).",
      },
      {
        id: "B4B-Hackathon",
        src: "/B4B-Hackathon.jpeg",
        alt: "B4B-Hackathon Winner",
        tag: "GreenCoridor for Ambulance",
        title: "Most Innovative Tech Solution",
        subtitle: "Real-time GPS tracking and automated alert system helping to create a green corridors in high-traffic zones.",
      },
      {
        id: "Pradyut Parva",
        src: "/PradyutParva.jpeg",
        alt: "Retro Web Page",
        tag: "Web Page Creation",
        title: "Winner - Webpage Design and Development",
        subtitle: "Retro Featured Modern information provider Web Page provides premium experience to users .",
      },
      {
        id: "app building",
        src: "/Appmilestone.png",
        alt: "App development",
        tag: "App Development Milestone",
        title: "4 major Production level app projects",
        subtitle: "Contributed in Four Production level app development Project during Internship and Hackathons",
      },
    ],
  },


  // ════════════════════════════════════════════════════════════════════════════
  //  3. FEATURED PROJECTS & CASE STUDIES  (#projects)
  // ════════════════════════════════════════════════════════════════════════════
  projectsSection: {
    badge: "Featured Work",
    heading: "Selected Projects",
    subtitle: "Production-grade systems, real-time architectures, and hackathon-winning solutions built under real-world constraints.",
  },

  /** Main Featured Projects (Stacked Scroll Cards + Detail Pages) */
  projects: [
    {
      slug: "greenwave",
      title: "GreenWave — Smart Ambulance Traffic System",
      category: "Emergency Traffic AI",
      role: "Role: Sole Developer",
      badge: "Winner — BFB Hackathon",
      description: "Real-time GPS tracking and automated traffic signal automation system creating green corridors in high-traffic zones.",
      tags: ["Flutter", "Firebase", "Google Maps API", "Dart", "FCM", "Real-Time"],
      github: "https://github.com/kishor-2646/GreenWave",
      live: "",
      image: "/projects/greenwave.png",
      video: "/GreenWaveVideo.mp4",
      isFeatured: true,
      details: {
        overview: "GreenWave is a real-time smart traffic management system designed to create green corridors for ambulances in high-traffic zones. It tracks ambulance GPS live and automatically controls traffic signals along the route — removing manual delays in critical emergencies.",
        problem: "Heavy urban traffic delays ambulances by critical minutes. Manual traffic control is inefficient, and non-automated junctions lack real-time police alert mechanisms.",
        solution: "Built a Flutter app with three synchronized dashboards (Admin, Ambulance Driver, Traffic Police). Firebase Realtime Database syncs coordinates live. Signal control logic auto-triggers green lights along the route. FCM sends instant alerts to manual junctions.",
        impact: "Demonstrated reduction in emergency corridor transit delays during testing. Won Best Innovative Idea at the BFB 24-Hour Hackathon. Designed for multi-city scale.",
        role: "Sole developer — architected the real-time system, built all three role-based dashboards, and integrated Firebase, Google Maps, and FCM alerts end-to-end.",
        duration: "24-Hour Hackathon Build + Post-Event Enhancements",
        teamSize: "Solo",
        status: "Hackathon Winner — Active Development",
        highlights: [
          "Live GPS ambulance tracking with sub-second Firebase sync",
          "Automated traffic signal control along the emergency route",
          "Real-time FCM push alerts to traffic police at manual junctions",
          "Three synchronized role-based dashboards: Admin, Driver, Police",
          "Scalable architecture designed for multi-city deployment",
          "Winner — Best Innovative Idea, BFB 24-Hour Hackathon",
        ],
        screenshots: [
          "/projects/greenwave/hero-driver-broadcast.png",
          "/projects/greenwave/hero-police-corridor.png",
          "/projects/greenwave/police-cleared-alert.png",
          "/projects/greenwave/telemetry-route-tracking.png",
          "/projects/greenwave/driver-green-corridor.png",
          "/projects/greenwave/flow-dashboard.png",
          "/projects/greenwave/flow-search.png",
          "/projects/greenwave/flow-broadcast-start.png",
          "/projects/greenwave/onboarding-roles.png",
          "/projects/greenwave/onboarding-signup.png",
          "/projects/greenwave/onboarding-login.png",
        ],
      },
    },
    {
      slug: "truck-singh",
      title: "Truck Singh — Multi-Role Logistics & Fleet Management Platform",
      category: "Logistics Automation",
      role: "Role: Core Contributor",
      badge: "Team Project",
      badgeLabel: "TEAM PROJECT",
      description: "Full-stack Flutter logistics & fleet management platform connecting shippers, truck owners, drivers, and dispatch agents with real-time GPS tracking and automated geofencing.",
      tags: ["FLUTTER", "SUPABASE", "POSTGRESQL", "GOOGLE MAPS API", "ONESIGNAL", "BLOC", "SQLITE"],
      github: "https://github.com/kishor-2646/truck_singh",
      live: "",
      image: "/projects/trucksingh.png",
      video: "/TruckSinghCover.mp4",
      isFeatured: true,
      accent: "cyan",
      details: {
        overview: "Truck Singh is a cross-platform Flutter app that digitizes India's road-freight workflow, connecting shippers, truck owners, drivers, and dispatch agents on one platform. It handles live GPS tracking, automatic shipment status updates via geofencing, digital bilty and GST invoice generation, fleet document compliance, and driver SOS — all on a Supabase backend.",
        problem: "Road freight in India still runs on paper and phone calls — shippers can't see where their goods are, bilty and compliance documents are tracked on paper, and there's no way for a driver to raise an emergency alert or for an owner to know a shipment's real status without calling.",
        solution: "Built a Flutter app with five role-based dashboards (Shipper, Truck Owner, Driver, Agent, Admin) on a shared Supabase backend. A background location service streams driver GPS to a Postgres RPC function; a custom geofencing engine automatically advances shipment status (Accepted → En Route → Arrived → In Transit → Delivered) without manual input. Bilty and GST invoices are generated as PDFs on-device, and Supabase Database Webhooks + Edge Functions trigger OneSignal push notifications for status changes and SOS alerts.",
        impact: "Replaced manual bilty/logbook processes with one-tap digital generation. Automated shipment status updates via GPS geofencing, removing manual check-ins. Built offline-first location sync (SQLite queue) so tracking keeps working on poor highway connectivity. Designed to scale across five distinct user roles from one codebase.",
        role: "Designed and implemented the real-time GPS tracking and geofencing status engine, including the offline SQLite sync layer, and built the digital bilty + GST invoice PDF generation pipeline.",
        roleTitle: "Core Contributor",
        duration: "3–4 Month Build",
        teamSize: "Team of 3",
        status: "ACTIVE DEVELOPMENT",
        highlights: [
          "Real-time GPS tracking with automatic geofence-based status updates",
          "Offline-first location sync via local SQLite queue",
          "Digital bilty (e-way consignment note) generation as PDF",
          "GST-compliant invoice generation with auto amount-in-words",
          "Five role-based dashboards (Shipper, Owner, Driver, Agent, Admin) from one codebase",
          "AES-256 encrypted in-app chat between driver, owner, and agent",
          "One-tap SOS emergency alerts routed to dispatch agents via Supabase Edge Functions",
          "Fleet & driver document compliance tracking (RC, insurance, permit, PUC, license)",
          "Push notifications via Supabase Database Webhooks + OneSignal",
          "English/Hindi localization for India's regional trucking workforce",
        ],
        screenshots: [
          "/projects/trucksingh/hero-live-tracking.png",
          "/projects/trucksingh/hero-dashboard.png",
          "/projects/trucksingh/hero-in-app-chat.png",
          "/projects/trucksingh/telemetry-live-tracking.png",
          "/projects/trucksingh/onboard-role-selection.png",
          "/projects/trucksingh/onboard-login.png",
          "/projects/trucksingh/onboard-truck-type.png",
          "/projects/trucksingh/flow-shipment-details.png",
          "/projects/trucksingh/flow-pickup-delivery.png",
          "/projects/trucksingh/flow-schedule-details.png",
          "/projects/trucksingh/outcome-submitted-success.png",
        ],
      },
    },
    {
      slug: "pcify",
      title: "PCify — AI-Based PC Builder & Technical Marketplace",
      category: "Marketplace & AI Hardware Engine",
      role: "Role: Full Stack Developer",
      badge: "Featured Platform",
      badgeLabel: "FEATURED PLATFORM",
      description: "Two-sided marketplace connecting users with expert custom PC builders, powered by an AI compatibility engine for bottleneck-free component configurations.",
      tags: ["FLUTTER", "FIREBASE", "AI/ML", "DART", "MARKETPLACE", "GOOGLE MAPS"],
      github: "https://github.com/kishor-2646/PCify",
      live: "",
      image: "/projects/PCify.png",
      isFeatured: true,
      accent: "indigo",
      details: {
        overview: "PCify is a two-sided marketplace connecting custom PC enthusiasts with verified expert builders. An AI engine evaluates user budgets and use-cases to generate optimal, bottleneck-free component configurations.",
        problem: "Building custom hardware requires deep component compatibility knowledge. Market options lack verified builder trust, integrated escrow, and tailored guidance.",
        solution: "Architecting a Flutter frontend with Firebase backend. AI matching algorithm pairs buyers with builders based on budget, form-factor, and performance needs.",
        impact: "Architecture designed for sub-second search, zero incompatible parts, and concurrent real-time builder booking flows.",
        role: "Sole developer — full-stack architecture, AI recommendation engine, UI/UX, and database design.",
        roleTitle: "Lead Full-Stack Developer",
        duration: "2025 — Ongoing",
        teamSize: "Core Builder",
        status: "ACTIVE DEVELOPMENT",
        highlights: [
          "AI recommendation engine for balanced, bottleneck-free PC configurations",
          "Two-sided marketplace connecting users with verified expert PC builders",
          "Automated socket, chipset, RAM, and PSU wattage compatibility validator",
          "Decoupled security architecture with runtime .env credential injection",
          "Integrated milestone escrow payment protection and booking calendar",
          "Real-time chat with file attachment sharing between buyer and technician",
          "Live benchmark verification and Cinebench / 3DMark stress test reporting",
          "Cross-platform compilation across Android, iOS, Web, Windows, and macOS",
        ],
        screenshots: [
          "/projects/PCify.png",
          "",
          "",
          "",
        ],
      },
    },
    {
      slug: "retailer-sakthi",
      title: "Med Shakthi — B2B Medicine Distribution & Pharmacy Platform",
      category: "Healthcare Logistics & B2B Marketplace",
      role: "Role: Team Lead (12 Members)",
      badge: "Hackathon MVP",
      badgeLabel: "HACKATHON MVP",
      description: "Led a 12-member engineering team to deliver a digital medicine distribution and bulk ordering marketplace MVP in 15 days.",
      tags: ["FLUTTER", "SUPABASE", "FIREBASE", "GOOGLE MAPS", "TEAM LEAD", "B2B"],
      github: "https://github.com/Brahmaswaroop/med_shakthi",
      live: "",
      image: "/projects/MedSakthi.png",
      isFeatured: true,
      accent: "emerald",
      details: {
        overview: "Med Shakthi (Retailer Sakthi) is a production-grade B2B pharmaceutical marketplace engineered during a 15-day hackathon sprint. It connects pharmacies and distributors with digital inventory and bulk order workflows.",
        problem: "Pharmacy bulk replenishment relied on manual paper records and phone orders — causing stockouts, pricing discrepancies, and delivery delays.",
        solution: "Built a Flutter + Supabase/Firebase MVP with role-based auth for retailers and distributors, real-time inventory search, and automated bulk order generation.",
        impact: "Delivered a working multi-role MVP in 15 days under hackathon constraints, managing 12 developers successfully.",
        role: "Team Lead — directed architecture, daily sprint deliverables, and built authentication and bulk order flows.",
        roleTitle: "Team Lead (12 Developers)",
        duration: "15-Day Hackathon Sprint",
        teamSize: "12-Member Team",
        status: "PRODUCTION MVP",
        highlights: [
          "End-to-end B2B bulk medicine ordering workflow from catalogue to checkout",
          "Role-based authentication for retail pharmacies and wholesale distributors",
          "Real-time inventory search supporting generic formulas and commercial brand names",
          "Dynamic cart management with Indian currency format (₹) and bulk discount logic",
          "Integrated Google Maps location geocoding for accurate delivery dispatch",
          "Delivered complete production MVP in 15 days managing 12 developers as Team Lead",
          "Secure Supabase PostgreSQL backend with Row-Level Security for catalog protection",
          "Responsive UI adhering to Material and Healthcare ergonomic guidelines",
        ],
        screenshots: [
          "/projects/MedSakthi.png",
          "",
          "",
          "",
        ],
      },
    },
  ],

  /** 2 Cards displayed under "Fun and Learning Projects" */
  funProjects: [
    {
      title: "Cargo Flow",
      description: "An AI driven Cargo web app to manage shipments and communication.",
      image: "/projects/greenwave.png",
      btnLabel: "View case study",
    },
    {
      title: "PCify Architecture Lab",
      description: "Experimental AI component compatibility engine and automated benchmark evaluator.",
      image: "/projects/PCify.png",
      btnLabel: "View case study",
    },
  ],


  // ════════════════════════════════════════════════════════════════════════════
  //  4. JOURNEY & EXPERIENCE TIMELINE  (#journey)
  // ════════════════════════════════════════════════════════════════════════════
  journeySection: {
    badge: "EXPERIENCE",
    heading: "the journey so far",
    subtitle: "From hackathon wins to production logistics systems — engineering roles and milestones across my journey.",
  },

  experiences: [
    {
      id: "uptoskills",
      role: "Flutter Developer & Team Lead",
      company: "UptoSkills Logistics",
      location: "New Delhi (Remote)",
      date: "Sep '25 - Jan '26",
      isCurrent: true,
      rotation: "-1.8deg",
      highlights: [
        { bold: "Led final sprint as Team Lead", text: ", delivering production updates for Truck Singh logistics platform." },
        { bold: "Engineered real-time chat", text: ", Google Maps live fleet tracking, and automated OneSignal push alerts." },
        { bold: "Reduced manual coordination by ~40%", text: " across 100+ active users with Supabase backend." },
      ],
      skills: ["Flutter", "Supabase", "Google Maps", "OneSignal", "Team Lead"],
    },
    {
      id: "retailer-sakthi",
      role: "Engineering Team Lead",
      company: "Retailer Sakthi",
      location: "Chennai, TN",
      date: "Hackathon Sprint '25",
      rotation: "2.2deg",
      highlights: [
        { bold: "Managed a 12-member engineering team", text: " to design and deploy a B2B medicine marketplace MVP in 15 days." },
        { bold: "Architected role-based auth", text: " and bulk inventory ordering workflow with Firebase backend." },
        { bold: "Structured daily sprint deliverables", text: " under extreme hackathon deadline pressure." },
      ],
      skills: ["Flutter", "Firebase", "Architecture", "Team Lead", "B2B"],
    },
    {
      id: "greenwave",
      role: "Solo Full Stack Developer",
      company: "GreenWave Systems",
      location: "BFB 24-Hr Hackathon",
      date: "2023 - 2024",
      rotation: "-1.5deg",
      highlights: [
        { bold: "Engineered automated green corridors", text: " for emergency ambulances with real-time GPS coordinate synchronization." },
        { bold: "Won Best Innovative Idea Award", text: " at BFB 24-Hour Hackathon competing against 40+ teams." },
        { bold: "Built three synchronized dashboards", text: " using Flutter, Firebase Realtime Database, and FCM alerts." },
      ],
      skills: ["Flutter", "Firebase", "Google Maps API", "IoT AI", "FCM"],
    },
    {
      id: "academic-lead",
      role: "Computer Science & Engineering",
      company: "Sairam Institutions",
      location: "Chennai, TN",
      date: "2022 - 2026",
      rotation: "1.9deg",
      highlights: [
        { bold: "Won 1st Prize at Sairam SDG Ideathon 3.0", text: " for UN SDG Goal 1 poverty alleviation technology." },
        { bold: "Maintained strong core foundations", text: " in Data Structures, Algorithms, Object-Oriented Architecture, and Distributed Systems." },
        { bold: "Led peer developer study circles", text: " on Flutter mobile development and full-stack system design." },
      ],
      skills: ["Data Structures", "Algorithms", "Java", "System Design", "Leadership"],
    },
  ],


  // ════════════════════════════════════════════════════════════════════════════
  //  5. ACHIEVEMENTS & CERTIFICATIONS  (#achievements)
  // ════════════════════════════════════════════════════════════════════════════
  achievementsSection: {
    badge: "Honors & Certifications",
    heading: "Achievements & Certifications",
    subtitle: "Hackathon podiums, industry certifications, and validated engineering credentials earned under real evaluation.",
  },

  achievements: [
    {
      id: "sdg-ideathon",
      title: "Winner — Sairam SDG Ideathon 3.0",
      event: "Sairam SDG Ideathon",
      year: "2024",
      category: "Hackathon",
      highlight: "Built social-impact solution aligned with UN SDG Goal 1 (No Poverty) presenting to industry leaders.",
      tags: ["SDG Goal 1", "Social Impact", "Flutter", "1st Prize"],
    },
    {
      id: "bfb-hackathon",
      title: "Best Innovative Idea Winner",
      event: "BFB 24-Hour Hackathon",
      year: "2023",
      category: "Hackathon",
      highlight: "GreenWave — Smart Ambulance Traffic System won best innovation award for automated green corridors.",
      tags: ["GreenWave", "Real-Time IoT", "Firebase", "Emergency AI"],
    },
    {
      id: "google-ai",
      title: "Google AI Essentials Certified",
      event: "Coursera × Google",
      year: "2024",
      category: "Certification",
      highlight: "Certified in foundational AI architectures, prompt engineering, and production ML workflows.",
      tags: ["Google", "Generative AI", "ML Workflows", "Verified"],
    },
    {
      id: "ey-microsoft",
      title: "AI Skills Passport Recognition",
      event: "EY & Microsoft",
      year: "2024",
      category: "Certification",
      highlight: "Recognised for applied artificial intelligence skills, ethical AI design, and enterprise problem solving.",
      tags: ["Microsoft", "EY", "Enterprise AI", "Skills Passport"],
    },
    {
      id: "mongodb",
      title: "MongoDB Certified Developer",
      event: "MongoDB University",
      year: "2024",
      category: "Certification",
      highlight: "Certified in document data modeling, aggregation pipelines, and high-performance database indexing.",
      tags: ["MongoDB", "NoSQL", "Aggregation", "Indexing"],
    },
    {
      id: "kaggle-ai",
      title: "Google AI Agents Intensive",
      event: "Kaggle × Google",
      year: "2025",
      category: "Certification",
      highlight: "Completed intensive track on autonomous agent architectures and tool-calling LLM integrations.",
      tags: ["Kaggle", "AI Agents", "Tool Calling", "Python"],
    },
  ],


  // ════════════════════════════════════════════════════════════════════════════
  //  6. BLOGS & STUDY NOTES BENTO GRID  (#blogs)
  // ════════════════════════════════════════════════════════════════════════════
  blogsSection: {
    heading: "Blogs & Study Notes",
    subtitle: "Deep dives, cheat sheets, architecture blueprints, and lessons learned from the trenches.",

    // Left Column Featured Article
    featuredArticle: {
      tag: "Architecture Deep Dive",
      readTime: "8 min read",
      title: "Building Real-Time Systems with Firebase & Flutter",
      description: "How I built GreenWave's sub-second GPS tracking system — architecture decisions, websocket pitfalls, and lessons learned under hackathon pressure.",
    },

    // Left Column Notes
    compactNotes: [
      {
        title: "DSA Cheat Sheet — Trees & Graphs",
        description: "Reference notes for BFS/DFS traversals, topological sort, and DP recursion patterns.",
        category: "DSA Reference",
      },
      {
        title: "Flutter Architecture: Riverpod vs Bloc",
        description: "Comparing async state management performance across high-frequency GPS stream updates.",
        category: "State Management",
      },
    ],

    // Center Column Profile Showcase Card
    centerCard: {
      badge: "Engineering Journal",
      year: "2025",
      photoSrc: "/potrait.png",
      roleBadge: "Software Engineer",
      name: "Kishor Kumar S.",
      description: "Building production systems, real-time architectures, and scalable mobile apps.",
      tags: ["Full-Stack & Flutter", "100+ Live Users"],
    },

    // Right Column War Room Post-Mortem Card
    warRoomLogs: {
      badge: "WAR ROOM LOGS",
      title: "What Broke in Production (And How I Fixed It)",
      description: "Post-mortems from real-time websocket storms, memory leaks in infinite scroll feeds, and racing async states.",
      codeSnippet: [
        "> FATAL: StreamSubscription leak",
        "> FIX: autoDispose + debounce",
      ],
      readTime: "5 min read",
    },

    // Right Column Quick Rules
    quickRules: [
      "Never trust client GPS accuracy without Kalman filtering.",
      "Database indexes matter more than micro-optimizing loops.",
      "Write code for the next engineer who will debug it at 2 AM.",
    ],

    // Right Column Note (Fills the grid symmetrically)
    rightCompactNote: {
      title: "API Protocols: REST vs gRPC & WebSockets",
      description: "Serialization overhead, payload benchmarks, and event-stream latency for real-time mobile apps.",
      category: "Network & Systems",
    },

    // Bottom Wide Cards
    bottomCards: [
      {
        category: "System Design",
        title: "Designing Fault-Tolerant IoT Pipelines",
        description: "Handling network disconnects, offline queuing, and backpressure.",
      },
      {
        category: "Hackathon Playbook",
        title: "How to Win 24-Hour Hackathons",
        description: "Team leadership, ruthless scoping, MVP prioritization, and winning pitch decks.",
      },
    ],
  },


  // ════════════════════════════════════════════════════════════════════════════
  //  7. CONTACT SECTION & SOCIAL PROFILES  (#contact)
  // ════════════════════════════════════════════════════════════════════════════
  contact: {
    badge: "Get In Touch",
    heading: "Let's build something exceptional.",
    subheading: "Open to high-impact full-time roles, internships, or innovative contract work. Let's build something real.",
    timezone: "IST (UTC+5:30) • Flexible",
  },

  /** Primary contact email */
  email: "Kishorekumar20002646@gmail.com",

  /** Geographic location */
  location: "Krishnagiri, Tamil Nadu — Remote OK",

  /** Average response time */
  responseTime: "Within 24 Hours",

  /** Work availability status */
  availabilityStatus: "Available for new opportunities",
  availableForWork: true,

  /** Social profile URLs */
  social: {
    github: "https://github.com/kishor-2646",
    linkedin: "https://www.linkedin.com/in/kishor-kumar-505726293",
  },

  /** Path to your downloadable resume PDF in /public/ */
  resumeUrl: "/resume.pdf",


  // ════════════════════════════════════════════════════════════════════════════
  //  8. FOOTER
  // ════════════════════════════════════════════════════════════════════════════
  footer: {
    vibeText: "Vibe-coded this website with",
    techPills: ["▲ Next.js", "Tailwind", "Motion"],
    copyright: "Copyright © 2026 Kishor Kumar S. All Rights Reserved.",
  },


  // ════════════════════════════════════════════════════════════════════════════
  //  9. SEO & BROWSER METADATA
  // ════════════════════════════════════════════════════════════════════════════
  meta: {
    title: "Kishor Kumar S — Software Engineer",
    description: "Portfolio of Kishor Kumar S — Software Engineer specialising in Flutter, real-time systems, and scalable full-stack applications.",
    url: "https://kishor-portfolio.vercel.app",
    ogImage: "/potrait.png",
  },

};

export default portfolioConfig;

// ── NAMED EXPORTS (Used across components for clean tree-shaking) ─────────────
export const {
  name,
  monogram,
  role,
  profileImage,
  rotatingTaglines,
  hero,
  about,
  projectsSection,
  projects,
  funProjects,
  journeySection,
  experiences,
  achievementsSection,
  achievements,
  blogsSection,
  contact,
  email,
  location,
  responseTime,
  availabilityStatus,
  availableForWork,
  social,
  resumeUrl,
  footer,
  meta,
} = portfolioConfig;
