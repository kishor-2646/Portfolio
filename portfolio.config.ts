// ╔══════════════════════════════════════════════════════════════════════╗
//  portfolio.config.ts  —  KISHOR KUMAR S
//
//  ★  THIS IS THE ONLY FILE YOU EVER NEED TO EDIT  ★
//
//  Every piece of text, every link, every card, every label visible
//  anywhere in the portfolio is controlled from this file.
//
//  HOW IT WORKS:
//    1. Change any value below
//    2. Save the file
//    3. Your entire portfolio UI updates automatically — no code needed
// ╚══════════════════════════════════════════════════════════════════════╝

const portfolioConfig = {

  // ┌──────────────────────────────────────────────────────────────────┐
  //  SITE BRAND
  //  The logo text shown in the navbar and footer.
  // └──────────────────────────────────────────────────────────────────┘
  brand: {
    // Short logo shown in navbar top-left and footer
    // Example: "DEVPORT.26" | "KK.DEV" | "KISHOR"
    navLogo:    "DEVPORT.26",

    // Longer version shown in footer
    footerLogo: "DEVPORT_CORE_26",

    // Footer copyright line — {year} is auto-replaced with current year
    copyright:  "© 2026 Engineered with precision.",

    // Footer tagline next to copyright
    madeBy:     "Made by Kishor.",

    // Footer links (leave href as "#" to hide the link)
    footerLinks: [
      { label: "GitHub", href: "https://github.com/kishor-2646" },
      { label: "Resume", href: "/resume.pdf" },
    ],
  },


  // ┌──────────────────────────────────────────────────────────────────┐
  //  IDENTITY
  //  Your name, role, headline shown in Hero + About sections.
  // └──────────────────────────────────────────────────────────────────┘

  // Your full name — shown below your photo in the Hero section
  name: "Kishor Kumar S",

  // Your job title — shown in the hero subtitle
  role: "Software Engineer",

  // The BIG headline on the hero page.
  // ⚠️  The LAST 3 WORDS automatically get the gradient colour.
  tagline: "Building Systems That Actually Work.",

  // Shown as: "{role} — {heroSubtitle}"
  heroSubtitle: "specialising in real-time mobile systems, backend integration, and scalable app architecture.",

  // Short bio paragraph shown in the About section bio card
  bio: "Since 2022, I've been building production-grade systems used by 100+ real users — reducing manual operations by 40% and improving real-time communication efficiency by 60%+. Currently exploring AI & ML while delivering full-stack solutions under real-world constraints.",

  // Bold tagline at the TOP of the bio card.
  // ⚠️  Words 2–3 (e.g. "real-time systems") automatically get emerald→cyan gradient.
  aboutTagline: "Crafting real-time systems that bridge the gap between complex problems and elegant solutions.",

  // Your city — shown in Contact section footer strip
  location: "Krishnagiri, Tamil Nadu — Remote OK",

  // Response time — shown in Contact section footer strip
  responseTime: "Usually responds within 24h",

  // Availability status — shown in Contact section footer strip
  availabilityStatus: "Available for new opportunities",

  // set true/false — reserved for future "open to work" badge feature
  availableForWork: true,


  // ┌──────────────────────────────────────────────────────────────────┐
  //  HERO SECTION UI STRINGS
  // └──────────────────────────────────────────────────────────────────┘
  hero: {
    // White (primary) CTA button label
    primaryBtn: "View Work",

    // Glass (secondary) CTA button — links to resumeUrl below
    secondaryBtn: "Get Resume",

    // Tiny ALL-CAPS label above your name ("identity" | "dev" | "engineer")
    identityLabel: "identity",

    // The 3 quick-stats shown in the strip between subtitle and buttons
    // Change val to update the number; lbl to update the label underneath
    statsStrip: [
      { val: "100+", lbl: "Live Users"  },
      { val: "04",   lbl: "Projects"    },
      { val: "1+",   lbl: "Yrs Exp"     },
    ],

    // The 4 tech tags shown next to the stats strip (your main stack at a glance)
    techTags: ["Flutter", "Firebase", "Java", "Supabase"],
  },


  // ┌──────────────────────────────────────────────────────────────────┐
  //  ABOUT SECTION UI STRINGS
  // └──────────────────────────────────────────────────────────────────┘
  about: {
    // Small ALL-CAPS label above the heading
    sectionLabel: "System Metadata",

    // Large heading
    sectionHeading: "Overview & Focus.",

    // Label above the Featured Achievement card
    achievementLabel: "Recent Achievement",

    // Inline label inside the achievement card
    achievementCardLabel: "Featured Achievement",

    // Skill chip tags in the bio card (shown as clickable chips)
    bioChips: ["Flutter", "Firebase", "Java", "Supabase", "Real-Time", "REST APIs", "Docker", "GCP"],
  },


  // ┌──────────────────────────────────────────────────────────────────┐
  //  SKILLS SECTION UI STRINGS
  // └──────────────────────────────────────────────────────────────────┘
  skillsSection: {
    // Small ALL-CAPS label above the heading
    sectionLabel: "System Capabilities",

    // Large heading (the & is a decorative character)
    heading: "Stack & Expertise.",

    // Subtitle below the heading
    subtitle: "Every tool earned through real production use — not just tutorials.",
  },


  // ┌──────────────────────────────────────────────────────────────────┐
  //  PROJECTS SECTION UI STRINGS
  // └──────────────────────────────────────────────────────────────────┘
  projectsSection: {
    sectionLabel: "System Output",
    heading:      "Featured",
    headingGradient: "Deployments.",
    subtitle:     "Real systems. Real users. Real constraints.",
    archiveBtnLabel: "Open Archive",
  },


  // ┌──────────────────────────────────────────────────────────────────┐
  //  ACHIEVEMENTS SECTION UI STRINGS
  // └──────────────────────────────────────────────────────────────────┘
  achievementsSection: {
    // Small ALL-CAPS label above the heading
    sectionLabel: "Hall of Records",

    // Large heading
    heading:      "The",
    headingGradient: "Achievements.",

    // Subtitle below heading
    subtitle: "Wins, certifications, and milestones earned in the field.",
  },


  // ┌──────────────────────────────────────────────────────────────────┐
  //  BLOGS SECTION UI STRINGS
  // └──────────────────────────────────────────────────────────────────┘
  blogsSection: {
    sectionLabel:    "Knowledge Base",
    heading:         "Blogs &",
    headingGradient: "Materials.",
    subtitle:        "Writing, notes, and resources built from real experience — not just research.",

    // Bottom CTA strip
    bottomCta:       "More coming as I build & learn",

    // Topic tags shown in the bottom strip
    bottomTags: ["Flutter", "Firebase", "DSA", "System Design", "AI/ML"],

    // Scrolling code strings in the background (the terminal-style text streams)
    // Add/change these to match YOUR actual commands and work
    codeStreams: [
      "flutter build apk --release",
      'git commit -m "feat: add real-time tracking"',
      "SELECT * FROM achievements ORDER BY year DESC",
      "firebase deploy --only hosting",
      "dart pub get && flutter run",
      "docker build -t portfolio .",
      "supabase db push",
      "npm run dev",
    ],
  },


  // ┌──────────────────────────────────────────────────────────────────┐
  //  TIMELINE SECTION UI STRINGS
  // └──────────────────────────────────────────────────────────────────┘
  timelineSection: {
    sectionLabel:    "Evolutionary Tracks",
    heading:         "The",
    headingGradient: "Milestones.",
  },


  // ┌──────────────────────────────────────────────────────────────────┐
  //  CONTACT & SOCIAL LINKS
  // └──────────────────────────────────────────────────────────────────┘
  email: "Kishorekumar20002646@gmail.com",
  social: {
    github:   "https://github.com/kishor-2646",
    linkedin: "https://www.linkedin.com/in/kishor-kumar-505726293",
  },
  resumeUrl: "/resume.pdf",   // Put your PDF at /public/resume.pdf


  // ┌──────────────────────────────────────────────────────────────────┐
  //  STATS  (the 4 number cards in the About section)
  //  ⚠️  If you change a "label", also update STAT_ICON_MAP in
  //      app/components/AboutSection.tsx to match the icon.
  // └──────────────────────────────────────────────────────────────────┘
  stats: [
    { label: "Experience",  value: "1+"    },
    { label: "Live Users",  value: "100+"  },
    { label: "Projects",    value: "04"    },
    { label: "Efficiency",  value: "60%+"  },
  ],


  // ┌──────────────────────────────────────────────────────────────────┐
  //  FEATURED ACHIEVEMENT  (the gold star card in About section)
  //
  //  title    → bold headline
  //  subtitle → one-line context
  //  chips    → tags shown on the right — add/remove freely
  // └──────────────────────────────────────────────────────────────────┘
  featuredAchievement: {
    title:    "Winner — Sairam SDG Ideathon 3.0",
    subtitle: "Built social-impact solution aligned with UN SDG Goal 1 (No Poverty)",
    chips:    ["SDG Goal 1", "Social Impact", "Flutter", "Firebase"],
  },


  // ┌──────────────────────────────────────────────────────────────────┐
  //  SKILLS  (the 3 category cards in the Skills section)
  //
  //  Each skill: { name: "SkillName", level: 1–5 }
  //    1 = Beginner  2 = Basic  3 = Intermediate  4 = Advanced  5 = Expert
  //
  //  HOW TO ADD A SKILL:
  //    { name: "Python", level: 2 },
  //
  //  HOW TO ADD A CATEGORY:
  //    Copy one full { category, skills } block and add it.
  //    Also add icon to SKILL_ICON_MAP in app/lib/data.ts.
  // └──────────────────────────────────────────────────────────────────┘
  skills: [
    {
      category: "Languages & Frameworks",
      skills: [
        { name: "Java",       level: 4 },
        { name: "Dart",       level: 5 },
        { name: "JavaScript", level: 3 },
        { name: "C",          level: 3 },
        { name: "SQL",        level: 3 },
        { name: "Flutter",    level: 5 },
      ],
    },
    {
      category: "Backend & Database",
      skills: [
        { name: "Supabase",           level: 4 },
        { name: "Firebase",           level: 5 },
        { name: "MongoDB",            level: 3 },
        { name: "REST APIs",          level: 4 },
        { name: "Real-Time Systems",  level: 4 },
      ],
    },
    {
      category: "Tools & Infrastructure",
      skills: [
        { name: "Git",             level: 4 },
        { name: "Docker",          level: 3 },
        { name: "Kubernetes",      level: 2 },
        { name: "GCP",             level: 3 },
        { name: "Google Maps API", level: 4 },
        { name: "OneSignal",       level: 4 },
      ],
    },
  ],


  // ┌──────────────────────────────────────────────────────────────────┐
  //  PROJECTS  (cards on the main page + full detail page per project)
  //
  //  Each project has two parts:
  //
  //  PART 1 — CARD (shown on the Projects section grid):
  //    slug        → URL-friendly ID — e.g. "greenwave" → /project/greenwave
  //                  Use only lowercase letters, numbers, hyphens. No spaces.
  //    title       → project name shown on card
  //    description → short summary shown on card (2–3 sentences)
  //    tags        → tech stack chips on the card
  //    github      → GitHub repo URL ("" to hide the button)
  //    live        → Live demo URL ("" to hide the button)
  //    image       → card thumbnail ("/projects/filename.png" or "" for placeholder)
  //    isFeatured  → true = "Featured" badge on card
  //
  //  PART 2 — DETAIL PAGE (shown when user clicks the card):
  //    details: {
  //      overview   → full paragraph(s) describing the project
  //      problem    → what problem it solves
  //      solution   → how you solved it
  //      impact     → real-world results / numbers
  //      role       → your specific role in the project
  //      duration   → how long it took
  //      teamSize   → "Solo" | "2 members" | "12-member team"
  //      status     → "Completed" | "In Progress" | "Hackathon MVP"
  //      highlights → array of key feature bullets (shown as a list)
  //      screenshots → array of image paths shown in a gallery
  //                    (put files in /public/projects/)
  //    }
  //
  //  HOW TO ADD A NEW PROJECT:
  //    Copy a full block from below, paste it, fill in both parts.
  // └──────────────────────────────────────────────────────────────────┘
  projects: [
    {
      // ── Card ──────────────────────────────────────────────
      slug:        "greenwave",
      title:       "GreenWave — Smart Ambulance Traffic System",
      description: "Real-time ambulance tracking and intelligent traffic signal automation system that creates green corridors in high-traffic zones. Winner — Best Innovative Idea, BFB 24-Hour Hackathon.",
      tags:        ["Flutter", "Firebase", "Google Maps API", "Dart", "FCM", "Real-Time"],
      github:      "https://github.com/kishor-2646/GreenWave",
      live:        "",
      image:       "/projects/greenwave.png",
      isFeatured:  true,

      // ── Detail page ───────────────────────────────────────
      details: {
        overview:  "GreenWave is a real-time smart traffic management system designed to create green corridors for ambulances in high-traffic zones. It tracks ambulance GPS live and automatically controls traffic signals along the route — removing the need for manual intervention and reducing emergency response delays.",
        problem:   "Heavy urban traffic delays ambulances by several critical minutes. Manual traffic control is inefficient, and non-automated junctions have no system to alert traffic police in real time.",
        solution:  "Built a Flutter app with three separate dashboards (Admin, Ambulance Driver, Traffic Police). Firebase Realtime Database syncs GPS coordinates live. Signal control logic auto-triggers green lights on the ambulance route. FCM sends instant alerts to police at non-automated junctions.",
        impact:    "Demonstrated reduction in emergency corridor delays during testing. Won Best Innovative Idea at the BFB 24-Hour Hackathon. Architecture supports multi-city deployment.",
        role:      "Sole developer — designed the system architecture, built all three dashboards, integrated Firebase, Google Maps API, and FCM notifications end-to-end.",
        duration:  "Built in 24 hours (hackathon), extended post-hackathon",
        teamSize:  "Solo",
        status:    "Hackathon Winner — Active Development",
        highlights: [
          "Live GPS ambulance tracking with sub-second Firebase sync",
          "Automated traffic signal control along the ambulance route",
          "Real-time FCM push alerts to traffic police at manual junctions",
          "Three role-based dashboards: Admin, Driver, Police",
          "Scalable architecture designed for multi-city deployment",
          "Winner — Best Innovative Idea, BFB 24-Hour Hackathon",
        ],
        screenshots: [
          "/projects/greenwave.png",
          // Add more: "/projects/greenwave-2.png", "/projects/greenwave-3.png"
        ],
      },
    },

    {
      // ── Card ──────────────────────────────────────────────
      slug:        "truck-singh",
      title:       "Truck Singh — Logistics Management System",
      description: "Full-stack logistics platform serving 100+ users across drivers, agents, and owners — reducing manual coordination by ~40% through end-to-end workflow automation.",
      tags:        ["Flutter", "Supabase", "Google Maps", "OneSignal", "Real-Time Chat"],
      github:      "https://github.com/kishor-2646",
      live:        "",
      image:       "",
      isFeatured:  true,

      // ── Detail page ───────────────────────────────────────
      details: {
        overview:  "Truck Singh is a production-grade logistics management platform used by 100+ real users — drivers, agents, and owners. It eliminates manual coordination through automated workflows, real-time communication, and live vehicle tracking.",
        problem:   "Logistics operations were handled through phone calls and WhatsApp — error-prone, slow, and untrackable. No real-time visibility on vehicle positions, no automated alerts, no digital paperwork.",
        solution:  "Built a Flutter multi-role app backed by Supabase. Real-time chat using Supabase Realtime. Google Maps integration for live vehicle tracking and route optimisation. OneSignal for automated push alerts. Document verification and invoice generation built in.",
        impact:    "~40% reduction in manual coordination overhead. 100+ active users across three roles. Zero-downtime production deployments during internship sprint.",
        role:      "Flutter Developer (Intern at UptoSkills) — led the final sprint as Team Lead, built backend-integrated features, resolved critical performance bottlenecks, and deployed production updates.",
        duration:  "Sep 2025 – Jan 2026 (Internship)",
        teamSize:  "4-member team (led final sprint)",
        status:    "Production — Active",
        highlights: [
          "Real-time chat system for drivers, agents, and owners",
          "Google Maps live tracking and route optimisation",
          "Automated OneSignal push notifications and alerts",
          "Document verification and digital invoice generation",
          "Scalable Supabase database schemas for real-time workflows",
          "Led final-month sprint as Team Lead under tight deadlines",
        ],
        screenshots: [
          // Add: "/projects/trucksingh-1.png", "/projects/trucksingh-2.png"
        ],
      },
    },

    {
      // ── Card ──────────────────────────────────────────────
      slug:        "pcify",
      title:       "PCify — AI-Based PC Builder Marketplace",
      description: "Two-sided marketplace connecting users with PC builders, powered by an AI recommendation engine for personalised configurations. Features real-time chat, booking, and a trust layer.",
      tags:        ["Flutter", "AI/ML", "Supabase", "Real-Time", "Marketplace"],
      github:      "https://github.com/kishor-2646",
      live:        "",
      image:       "",
      isFeatured:  false,

      // ── Detail page ───────────────────────────────────────
      details: {
        overview:  "PCify is a two-sided marketplace that connects users who want a custom PC with expert PC builders. An AI recommendation engine suggests personalised configurations based on user budget and use case. The platform handles the full transaction: discovery, chat, booking, payment, and review.",
        problem:   "Building a custom PC requires technical knowledge most users don't have. Existing solutions are fragmented — no single platform for finding trusted builders, getting personalised recommendations, and completing the transaction safely.",
        solution:  "Building a Flutter app with Supabase backend. AI-powered matching algorithm pairs users with the best-fit builder. Real-time chat, booking calendar, and payment integration. Trust layer with ratings, reviews, and portfolio showcase for builders.",
        impact:    "Currently in active development. Architecture designed to handle high concurrency with Supabase Realtime and optimised matching queries.",
        role:      "Sole developer — full-stack architecture, AI recommendation engine design, UI/UX, backend.",
        duration:  "2025 — ongoing",
        teamSize:  "Solo",
        status:    "In Progress",
        highlights: [
          "AI recommendation engine for personalised PC configurations",
          "Two-sided marketplace: users and expert PC builders",
          "Real-time chat and booking system",
          "Integrated payment flow end-to-end",
          "Trust layer with ratings, reviews, and builder portfolio showcase",
          "Matching algorithm optimised for user-expert pairing efficiency",
        ],
        screenshots: [
          // Add: "/projects/pcify-1.png", "/projects/pcify-2.png"
        ],
      },
    },

    {
      // ── Card ──────────────────────────────────────────────
      slug:        "retailer-sakthi",
      title:       "Retailer Sakthi — B2B Medicine Platform",
      description: "Led a 12-member team to deliver a B2B medicine marketplace MVP in 15 days under hackathon constraints. Built auth, bulk ordering, and seamless B2B transaction flows.",
      tags:        ["Flutter", "Firebase", "Team Lead", "Hackathon", "B2B"],
      github:      "https://github.com/kishor-2646",
      live:        "",
      image:       "",
      isFeatured:  false,

      // ── Detail page ───────────────────────────────────────
      details: {
        overview:  "Retailer Sakthi is a B2B medicine distribution platform built under hackathon pressure. It enables pharmacies and medical retailers to place bulk orders directly from distributors — replacing manual phone-based ordering with a digital, verifiable workflow.",
        problem:   "Medicine retailers relied on phone calls and paper records to place bulk orders with distributors — slow, error-prone, and completely untrackable.",
        solution:  "Built a Flutter + Firebase MVP with role-based authentication for retailers and distributors. Bulk order system with catalogue browsing and quantity selection. Structured planning and sprint-based execution across a 12-member team in 15 days.",
        impact:    "Delivered a working MVP in 15 days under hackathon constraints. Demonstrated strong team execution and leadership under pressure.",
        role:      "Team Lead — managed a 12-member team, defined architecture, divided features across the team, and personally built authentication and the bulk order system.",
        duration:  "15 days (Hackathon)",
        teamSize:  "12-member team",
        status:    "Hackathon MVP — Completed",
        highlights: [
          "Full B2B ordering workflow from catalogue to confirmation",
          "Role-based authentication for retailers and distributors",
          "Bulk order system with quantity management",
          "Delivered complete MVP in 15 days with 12-member team",
          "Demonstrated leadership under extreme deadline pressure",
        ],
        screenshots: [
          // Add: "/projects/retailersakthi-1.png"
        ],
      },
    },

    // ← Paste your next project here (include slug + details block)
  ],


  // ┌──────────────────────────────────────────────────────────────────┐
  //  ACHIEVEMENTS  (shown in the Achievements section)
  //
  //  Each achievement:
  //    title     → the achievement headline
  //    event     → event / competition / platform name
  //    year      → "2024"
  //    category  → "Hackathon" | "Certification" | "Award"
  //              (controls card colour — amber / emerald / violet)
  //    icon      → any emoji you like (🏆 💡 🎓 🤖 ⚡ 🍃 🥇 🌟)
  //    highlight → one short sentence about the impact/context
  //
  //  HOW TO ADD — copy this block inside the array:
  //  {
  //    title:     "Your Achievement",
  //    event:     "Event Name",
  //    year:      "2025",
  //    category:  "Hackathon",
  //    icon:      "🏆",
  //    highlight: "What you won or achieved.",
  //  },
  // └──────────────────────────────────────────────────────────────────┘
  achievements: [
    {
      title:     "Winner — Sairam SDG Ideathon 3.0",
      event:     "Sairam SDG Ideathon",
      year:      "2024",
      category:  "Hackathon",
      icon:      "🏆",
      highlight: "Built social-impact solution aligned with UN SDG Goal 1 (No Poverty)",
    },
    {
      title:     "Best Innovative Idea",
      event:     "BFB 24-Hour Hackathon",
      year:      "2023",
      category:  "Hackathon",
      icon:      "💡",
      highlight: "GreenWave — Smart Ambulance Traffic System won best innovation award",
    },
    {
      title:     "Google AI Essentials",
      event:     "Coursera × Google",
      year:      "2024",
      category:  "Certification",
      icon:      "🎓",
      highlight: "Certified in foundational AI concepts and practical ML workflows",
    },
    {
      title:     "AI Skills Passport",
      event:     "EY & Microsoft",
      year:      "2024",
      category:  "Certification",
      icon:      "🤖",
      highlight: "Recognised for applied AI skills by EY and Microsoft",
    },
    {
      title:     "MongoDB Certification",
      event:     "MongoDB University",
      year:      "2024",
      category:  "Certification",
      icon:      "🍃",
      highlight: "Certified in CRUD operations, Aggregation, and Indexing",
    },
    {
      title:     "Google AI Agents Intensive",
      event:     "Kaggle × Google",
      year:      "2025",
      category:  "Certification",
      icon:      "⚡",
      highlight: "Completed intensive programme on building production-ready AI agents",
    },
    // ← Add your next achievement here
  ],


  // ┌──────────────────────────────────────────────────────────────────┐
  //  BLOGS & MATERIALS  (shown in the Blogs section)
  //
  //  Each item:
  //    title    → article / resource title
  //    type     → "Blog" | "Tutorial" | "Resource" | "Note" | "Thread"
  //              (controls card colour — cyan / violet / emerald / rose / amber)
  //    tags     → topic tags (max 3 shown, add as many as you want)
  //    summary  → 1–2 sentence description
  //    link     → URL to the article — set "" if not published yet
  //    date     → "2025" or "Coming Soon"
  //    readTime → "5 min read"
  //
  //  HOW TO ADD — copy this block inside the array:
  //  {
  //    title:    "Your Article Title",
  //    type:     "Blog",
  //    tags:     ["Flutter", "Firebase"],
  //    summary:  "What this article is about.",
  //    link:     "",
  //    date:     "Coming Soon",
  //    readTime: "5 min read",
  //  },
  // └──────────────────────────────────────────────────────────────────┘
  blogs: [
    {
      title:    "Building Real-Time Systems with Firebase & Flutter",
      type:     "Blog",
      tags:     ["Flutter", "Firebase", "Real-Time"],
      summary:  "How I built GreenWave's real-time ambulance tracking system — architecture decisions, pitfalls, and lessons learned under hackathon pressure.",
      link:     "",
      date:     "Coming Soon",
      readTime: "8 min read",
    },
    {
      title:    "Scaling a Logistics App to 100+ Users",
      type:     "Blog",
      tags:     ["Supabase", "Flutter", "Architecture"],
      summary:  "The technical and design decisions behind Truck Singh — handling real-time chat, live tracking, and automated alerts at production scale.",
      link:     "",
      date:     "Coming Soon",
      readTime: "10 min read",
    },
    {
      title:    "Flutter State Management: From setState to Riverpod",
      type:     "Tutorial",
      tags:     ["Flutter", "Dart", "State Management"],
      summary:  "A practical walkthrough of my journey through Flutter state management — what broke, what worked, and how to choose the right tool.",
      link:     "",
      date:     "Coming Soon",
      readTime: "6 min read",
    },
    {
      title:    "DSA Cheat Sheet — Trees & Graphs",
      type:     "Resource",
      tags:     ["DSA", "Java", "Algorithms"],
      summary:  "My personal reference notes for tree traversals, graph algorithms, and common patterns — built while solving LeetCode problems consistently.",
      link:     "",
      date:     "2024",
      readTime: "4 min read",
    },
    // ← Add your next blog / resource here
  ],


  // ┌──────────────────────────────────────────────────────────────────┐
  //  TIMELINE  (3 parallel learning tracks in the Timeline section)
  //
  //  HOW TO ADD A MILESTONE:
  //    { year: "2025", title: "What you learned", description: "Context" },
  //
  //  AVAILABLE COLOURS: emerald | cyan | violet | indigo | rose
  //  ⚠️  UI is designed for exactly 3 tracks. Adding a 4th may break layout.
  // └──────────────────────────────────────────────────────────────────┘
  timeline: [
    {
      track: "Learning Path",
      color: "emerald",
      milestones: [
        { year: "2022", title: "C & Java",       description: "Logic, OOP & DSA foundations" },
        { year: "2023", title: "Dart & Flutter", description: "Mobile UI & async patterns" },
        { year: "2024", title: "JS & React",     description: "Web frontend & Node.js" },
        // ← Add your next learning milestone here
      ],
    },
    {
      track: "DSA Path",
      color: "cyan",
      milestones: [
        { year: "2022", title: "Arrays & Strings", description: "Core data structures" },
        { year: "2023", title: "Trees & Graphs",   description: "Traversal & recursion" },
        { year: "2024", title: "DP & Greedy",      description: "LeetCode consistency" },
        // ← Add your next DSA milestone here
      ],
    },
    {
      track: "Development Path",
      color: "violet",
      milestones: [
        { year: "2023", title: "First App",        description: "GreenWave — Hackathon Win" },
        { year: "2024", title: "Production Scale", description: "Truck Singh — 100+ users" },
        { year: "2025", title: "Intern & AI",      description: "UptoSkills + PCify + ML" },
        // ← Add your next project/career milestone here
      ],
    },
  ],


  // ┌──────────────────────────────────────────────────────────────────┐
  //  FAILURE LOGS  (the amber "My Failures" popup in Timeline)
  //
  //  HOW TO ADD:
  //  {
  //    code:   "LOG_FAIL_04",    ← increment the number
  //    year:   "2025",
  //    title:  "What went wrong",
  //    lesson: "What you learned and how you fixed it.",
  //  },
  // └──────────────────────────────────────────────────────────────────┘
  failureLogs: [
    {
      code:   "LOG_FAIL_01",
      year:   "2022",
      title:  "Pointer & Memory Confusion",
      lesson: "Struggled with C pointers early on; resolved by rebuilding from scratch with focused reading.",
    },
    {
      code:   "LOG_FAIL_02",
      year:   "2023",
      title:  "State Management Overload",
      lesson: "First Flutter app collapsed under complex state; resolved by learning Provider then Riverpod.",
    },
    {
      code:   "LOG_FAIL_03",
      year:   "2024",
      title:  "Architecture Overload",
      lesson: "First SaaS-scale build collapsed under heavy state logic; fixed with modular refactor and clean architecture.",
    },
    // ← Add your next failure log here
  ],


  // ┌──────────────────────────────────────────────────────────────────┐
  //  CONTACT SECTION
  // └──────────────────────────────────────────────────────────────────┘
  contact: {
    heading:    "Start a project.",
    subheading: "Open to high-impact full-time roles, internships, or innovative contract work. Let's build something real.",
    ctaLabel:   "Kishorekumar20002646@gmail.com",
    badge:      "Let's collaborate",   // small badge above heading
  },


  // ┌──────────────────────────────────────────────────────────────────┐
  //  SITE META  (browser tab title + SEO)
  //  Update before deploying to production.
  // └──────────────────────────────────────────────────────────────────┘
  meta: {
    title:       "Kishor Kumar S — Software Engineer",
    description: "Portfolio of Kishor Kumar S — Software Engineer specialising in Flutter, real-time systems, and scalable mobile applications.",
    url:         "https://kishor-portfolio.vercel.app",
  },

};

export default portfolioConfig;

// ── Named exports (used by components — do not edit this section) ──────
export const { name, role, tagline, heroSubtitle, bio, aboutTagline, email, social, resumeUrl }  = portfolioConfig;
export const { hero, about, skillsSection, projectsSection, achievementsSection, blogsSection }   = portfolioConfig;
export const { timelineSection, brand, location, responseTime, availabilityStatus }               = portfolioConfig;
export const { stats, featuredAchievement }                                                        = portfolioConfig;
export const { skills, projects, timeline, failureLogs, achievements, blogs }                     = portfolioConfig;
export const { contact, meta, availableForWork }                                                   = portfolioConfig;