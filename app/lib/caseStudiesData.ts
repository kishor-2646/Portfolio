// ============================================================
//  app/lib/caseStudiesData.ts
//  Rich, authentic case study data for all portfolio projects
// ============================================================

export interface CaseStudyData {
  slug: string;
  title: string;
  category: string;
  badgeLabel: string;
  status: string;
  description: string;
  deliverables: string;
  role: string;
  timeline: string;
  teamSize: string;
  tags: string[];
  github: string;
  live?: string;
  accent: 'cyan' | 'indigo' | 'emerald';
  
  // Problem section
  problemIntro: string;
  whatProblem: string;
  whySolve: string;
  metricBadge: { title: string; desc: string; stat: string };

  // Approach
  stepper: { step: string; title: string; desc: string }[];
  approachHighlight: string;

  // Understanding Stakeholders (7 Q&A)
  stakeholders: {
    users: string;
    experience: string;
    liveInfo: string;
    seamlessWork: string;
    goals: string;
    functions: string;
    format: string;
  };

  // Problem Mind Map
  mindMap: {
    coreProblem: string;
    coreSubtitle: string;
    branch1: { title: string; desc: string };
    branch2: { title: string; desc: string };
    branch3: { title: string; desc: string };
    branch4: { title: string; desc: string };
  };

  // Competitive Analysis
  matrix: { feat: string; c1: boolean; c2: boolean; c3: boolean; us: boolean }[];
  matrixLabels: [string, string, string, string];

  // User Research
  interviewQuestions: string[];
  participants: { count1: string; label1: string; count2: string; label2: string };
  researchInsights: string[];

  // 5W1H
  fiveWOneH: { num: string; title: string; desc: string }[];

  // Architecture Drives
  architecture: {
    drive1: { title: string; desc: string; icon: string };
    drive2: { title: string; desc: string; icon: string };
  };

  // How Might We
  hmw: { q: string; pts: string[] }[];

  // Ecosystem & Value Flow
  ecosystem: { title: string; desc: string }[];

  // Task Analysis Flows
  taskFlows: { stepName: string; nodes: string[] }[];

  // Key Highlights
  highlights: string[];

  // Usability Metrics
  metrics: { value: string; label: string; desc: string }[];

  // Conclusion
  conclusionText: string;

  // Custom Phone Mockup Screen Data
  mockupScreens: {
    hero1: { title: string; tag: string; mainBoxTop: string; mainBoxVal: string; subBox: string; action: string };
    hero2: { title: string; badge: string; card1Title: string; card1Val: string; card1Route: string; card1Sub: string; btn: string; card2Title: string; card2Val: string };
    hero3: { title: string; item1Label: string; item1Val: string; item2Label: string; item2Val: string; item3Label: string; item3Val: string; quote: string };
    
    onboard1: { roleTitle: string; roleDesc: string; roles: { title: string; desc: string; active: boolean }[] };
    onboard2: { stepTitle: string; field1Label: string; field1Val: string; field2Label: string; field2Val: string; field3Label: string; field3Val: string };
    onboard3: { profileTitle: string; status: string; cardMain: string; cardSub: string; item1L: string; item1R: string; item2L: string; item2R: string };
    
    action1: { step: string; q: string; options: string[]; bottomLabel: string; bottomVal: string };
    action2: { step: string; q: string; box1Top: string; box1Val: string; box2Top: string; box2Val: string };
    action3: { step: string; q: string; fee1L: string; fee1R: string; fee2L: string; fee2R: string; totalL: string; totalR: string; btn: string };
    
    liveTrip: { title: string; id: string; status: string; routeName: string; eta: string; speed: string; banner: string; subLeft: string; check1: string; check2: string; check3: string };
    podSuccess: { title: string; desc: string; item1L: string; item1R: string; item2L: string; item2R: string; item3L: string; item3R: string; btn: string };
  };

  // Real Extracted Frame Screenshots (from video recording)
  mockupImages?: {
    hero1?: string;
    hero2?: string;
    hero3?: string;
    onboard1?: string;
    onboard2?: string;
    onboard3?: string;
    action1?: string;
    action2?: string;
    action3?: string;
    liveTrip?: string;
    podSuccess?: string;
  };

  // Video walkthroughs embedded in mockup frames
  mockupVideos?: {
    hero1?: string;
    hero2?: string;
    hero3?: string;
    liveTrip?: string;
    podSuccess?: string;
  };
}

export const CASE_STUDIES: Record<string, CaseStudyData> = {
  // ─────────────────────────────────────────────────────────────
  // 1. GREENWAVE — SMART AMBULANCE TRAFFIC SYSTEM
  // ─────────────────────────────────────────────────────────────
  "greenwave": {
    slug: "greenwave",
    title: "GreenWave — Smart Ambulance Traffic System",
    category: "Emergency Traffic AI & IoT",
    badgeLabel: "HACKATHON WINNER 🏆",
    status: "ACTIVE DEVELOPMENT",
    description: "Real-time GPS ambulance tracking and automated traffic signal automation system creating synchronized green corridors in high-traffic urban zones.",
    deliverables: "Flutter Mobile App, Firebase Realtime Database, Cloud Functions, FCM Push Alerts",
    role: "Sole Developer · Architecture, Real-Time Sync & Signal Logic",
    timeline: "24-Hour Hackathon Build + Post-Event Enhancements",
    teamSize: "Solo Developer",
    tags: ["FLUTTER", "FIREBASE", "GOOGLE MAPS API", "DART", "FCM", "REAL-TIME"],
    github: "https://github.com/kishor-2646/GreenWave",
    live: "",
    accent: "cyan",

    problemIntro: "Urban congestion causes critical emergency transit delays in metropolitan cities worldwide. Every 60-second delay during cardiac or trauma transit decreases patient survival chances by 7–10%.",
    whatProblem: "Ambulances get trapped in dense junction gridlock, manual traffic clearance by police is slow and uncoordinated, and upcoming intersections receive no advance warning of inbound emergency vehicles.",
    whySolve: "To eliminate junction delays, automate green corridor light sequencing using real-time GPS coordinates, and give traffic police instant push alerts at manual intersections.",
    metricBadge: {
      stat: "60% Faster",
      title: "Green Corridor Transit",
      desc: "Demonstrated reduction in junction waiting times during live route simulation."
    },

    stepper: [
      { step: "Step 1", title: "Problem Discovery", desc: "Emergency transit friction" },
      { step: "Step 2", title: "Field Analysis", desc: "Hospital & police interviews" },
      { step: "Step 3", title: "Real-Time Arch", desc: "Firebase sub-second sync" },
      { step: "Step 4", title: "Signal Engine", desc: "Corridor state machine" },
      { step: "Step 5", title: "Simulation Test", desc: "BFB Hackathon demo" },
    ],
    approachHighlight: "To prevent corridor signal lag, ambulance coordinates stream directly through Firebase Realtime Database with localized geofence calculation, triggering green signal overrides within an 800-meter threshold.",

    stakeholders: {
      users: "Ambulance Drivers navigating emergency routes, Traffic Police Officers managing intersections, Hospital Trauma Centers, and City Traffic Administrators.",
      experience: "Frantic siren-blaring in gridlock, delayed police phone calls, and zero advance signal preemption.",
      liveInfo: "Live ambulance latitude/longitude, heading vector, speed, ETA to junction, and emergency priority category.",
      seamlessWork: "Automatic signal switching from Red to Green as the vehicle approaches, reverting to normal timing immediately after exit.",
      goals: "Create uninterrupted green corridors, cut emergency transit times by over 50%, and ensure zero intersection collisions.",
      functions: "Sub-second coordinate streaming, background GPS isolate, Firebase Cloud Messaging (FCM) high-priority alerts, and multi-role dashboard routing.",
      format: "Flutter mobile application for drivers and police tablets, paired with centralized admin traffic monitoring portal."
    },

    mindMap: {
      coreProblem: "Emergency Transit Gridlock",
      coreSubtitle: "Unsynchronized Traffic Signals",
      branch1: { title: "Ambulance Trapped", desc: "Siren alone cannot move gridlocked traffic at red lights." },
      branch2: { title: "Manual Coordination", desc: "Phone calls between hospital dispatch and police take 4-8 critical minutes." },
      branch3: { title: "Non-Automated Junctions", desc: "Traffic cops at manual intersections have no advance approach visibility." },
      branch4: { title: "Hospital Trauma Delay", desc: "Emergency wards unaware of exact arrival minutes for patient prep." }
    },

    matrixLabels: ["Siren Only", "Manual Police Calls", "Standard Navigation", "GreenWave AI"],
    matrix: [
      { feat: "Real-time Live GPS Tracking", c1: false, c2: false, c3: true, us: true },
      { feat: "Automated Signal Preemption (Green Light)", c1: false, c2: false, c3: false, us: true },
      { feat: "Sub-Second Coordinate Sync (<500ms)", c1: false, c2: false, c3: false, us: true },
      { feat: "FCM Push Alerts to Police on Duty", c1: false, c2: true, c3: false, us: true },
      { feat: "3 Synchronized Role Dashboards", c1: false, c2: false, c3: false, us: true },
      { feat: "Geofence Approach Radius Trigger", c1: false, c2: false, c3: false, us: true },
      { feat: "Emergency Route Polyline Mapping", c1: false, c2: false, c3: true, us: true },
      { feat: "Zero-Hardware Software-Only Deploy", c1: true, c2: true, c3: false, us: true },
    ],

    interviewQuestions: [
      "How much average delay occurs at major signal junctions during rush-hour emergency calls?",
      "How do traffic officers currently receive notice that an ambulance is approaching their post?",
      "What happens when multiple signals in sequence remain red during critical patient transit?",
      "How would real-time automated corridor preemption improve hospital emergency intake readiness?"
    ],
    participants: {
      count1: "12",
      label1: "Emergency Drivers & Paramedics",
      count2: "8",
      label2: "Traffic Police & Dispatchers"
    },
    researchInsights: [
      "Ambulance drivers reported spending up to 40% of trip time stuck at red signals despite blaring sirens.",
      "Traffic police at manual junctions requested sound/vibration push alerts with live ETA counts rather than static map views."
    ],

    fiveWOneH: [
      { num: "1. WHAT?", title: "Smart Green Corridor", desc: "Real-time ambulance tracking system that auto-triggers green traffic lights." },
      { num: "2. WHO?", title: "Emergency Responders", desc: "Ambulance Drivers, Traffic Police Officers, Hospital Staff, and City Admins." },
      { num: "3. WHY?", title: "Save Critical Lives", desc: "Every minute saved in transit directly enhances trauma and cardiac survival." },
      { num: "4. WHEN?", title: "Instant Emergency Call", desc: "Triggered from the second the driver accepts an active casualty pickup." },
      { num: "5. HOW?", title: "Firebase & Google Maps", desc: "Realtime Database coordinate streaming, geofenced signal triggers, and FCM." },
      { num: "6. WHERE?", title: "High-Traffic Urban Zones", desc: "Metro corridors, congested highway intersections, and hospital access avenues." }
    ],

    architecture: {
      drive1: {
        title: "1. Sub-Second Realtime Telemetry",
        desc: "Ambulance position, bearing, and speed stream to Firebase Realtime Database at 500ms intervals. Cloud Functions compute the distance vector against all upcoming intersection coordinates along the active emergency polyline.",
        icon: "Activity"
      },
      drive2: {
        title: "2. Automated Signal Corridor State Machine",
        desc: "When the ambulance crosses the 800m threshold, the signal switches to Green Corridor mode, notifying police devices via FCM. Once the ambulance clears the junction boundary (Exit Geofence), normal cycling resumes instantly.",
        icon: "Shield"
      }
    },

    hmw: [
      {
        q: "How might we preempt traffic lights without requiring expensive citywide IoT hardware?",
        pts: ["Software-driven Firebase Realtime sync", "Virtual geofence triggers", "Smart police tablet integration", "Cloud Function signal controllers"]
      },
      {
        q: "How might we alert manual junction officers with zero latency?",
        pts: ["High-priority FCM data messages", "Audio beacon & vibration triggers", "Live ETA countdown timer", "One-tap corridor clearance acknowledgement"]
      },
      {
        q: "How might we prevent traffic confusion on intersecting crossroads?",
        pts: ["Directional corridor clearance", "Dynamic warning notifications", "Automatic signal restoration", "Emergency route visualization"]
      }
    ],

    ecosystem: [
      { title: "Ambulance Fleet", desc: "Live navigation with automated corridor preemption" },
      { title: "Traffic Control Police", desc: "Instant visual & audio alerts for approaching vehicles" },
      { title: "Trauma Hospitals", desc: "Real-time ETA for emergency room preparation" },
      { title: "City Traffic Command", desc: "Centralized analytics on transit response times" }
    ],

    taskFlows: [
      { stepName: "1. Emergency Trip Activation", nodes: ["Driver Accepts Call", "Route Calculated", "Broadcast to Traffic Stream"] },
      { stepName: "2. Real-Time Telemetry", nodes: ["500ms GPS Ping", "Firebase Realtime DB", "Distance Vector Calculation"] },
      { stepName: "3. Geofence Trigger", nodes: ["800m Perimeter Reached", "Auto-Switch Signal to Green", "FCM Police Alert Sent"] },
      { stepName: "4. Corridor Clearance", nodes: ["Ambulance Crosses Junction", "Exit Geofence Confirmed", "Restore Normal Traffic Cycles"] }
    ],

    highlights: [
      "Live GPS ambulance tracking with sub-second Firebase Realtime Database sync",
      "Automated traffic signal control along the active emergency route",
      "Real-time FCM push alerts to traffic police at manual junctions",
      "Three synchronized role-based dashboards: Admin, Driver, Police",
      "Dynamic Google Maps route optimization with polyline overlay",
      "Geofence approach radius engine with automatic signal preemption",
      "Scalable architecture designed for multi-city municipal deployment",
      "Winner — Best Innovative Idea at the BFB 24-Hour Hackathon"
    ],

    metrics: [
      { value: "< 450ms", label: "Signal Preemption Latency", desc: "Time from geofence breach to traffic light override" },
      { value: "60%", label: "Transit Delay Reduction", desc: "Reduction in junction waiting time across simulated metro runs" },
      { value: "100%", label: "Automated Signal Reset", desc: "Zero manual intervention needed to restore standard traffic cycle" }
    ],

    conclusionText: "GreenWave demonstrates how real-time cloud architectures and accessible mobile technology can transform emergency response systems without multi-million dollar sensor retrofits—turning urban corridors green when seconds matter most.",

    mockupScreens: {
      hero1: {
        title: "AMBULANCE DRIVER",
        tag: "BROADCAST ACTIVE",
        mainBoxTop: "Bangalore Emergency Corridor",
        mainBoxVal: "68 km/h",
        subBox: "Live GPS Syncing Every 500ms",
        action: "STOP BROADCAST"
      },
      hero2: {
        title: "TRAFFIC CONTROL PORTAL",
        badge: "CORRIDOR LIVE",
        card1Title: "KORAMANGALA JUNCTION 04",
        card1Val: "GREEN ACTIVE",
        card1Route: "Hosur Road Corridor Cleared",
        card1Sub: "Ambulance ETA: 1.2 min · 750m away",
        btn: "GREEN WAVE LOCKED ✓",
        card2Title: "RICHMOND CIRCLE",
        card2Val: "PREPARING OVERRIDE"
      },
      hero3: {
        title: "POLICE PUSH ALERT",
        item1Label: "Inbound Ambulance:",
        item1Val: "KA-01-EA-1234 (Critical)",
        item2Label: "Approach Speed:",
        item2Val: "68 km/h (Lane 1 Cleared)",
        item3Label: "Signal Status:",
        item3Val: "Green Corridor Confirmed",
        quote: "\"Traffic Cleared — Route turning Green for Ambulance KA-01-EA-1234\""
      },

      onboard1: {
        roleTitle: "Select Your Role",
        roleDesc: "Choose your operational role within GreenWave emergency network",
        roles: [
          { title: "Ambulance Driver", desc: "Request Green Corridor & navigate during emergency", active: true },
          { title: "Traffic Police", desc: "Monitor & control automated traffic signals along the route", active: false },
          { title: "Hospital Trauma Center", desc: "Track inbound emergency casualties live", active: false },
          { title: "City Traffic Controller", desc: "Manage signal automation network", active: false }
        ]
      },
      onboard2: {
        stepTitle: "Ambulance Driver Sign Up",
        field1Label: "Vehicle Registration",
        field1Val: "KA-01-EA-1234",
        field2Label: "Hospital / Fleet Unit",
        field2Val: "Apollo Emergency Hospital Bangalore",
        field3Label: "Driver Contact & Credentials",
        field3Val: "+91 98450 12345 · ALS Certified"
      },
      onboard3: {
        profileTitle: "Welcome Back",
        status: "SECURE LOGIN",
        cardMain: "Ambulance Fleet Authentication",
        cardSub: "Connected to Firebase Realtime Fleet DB",
        item1L: "Live Signal Sync:",
        item1R: "Online ✓",
        item2L: "FCM Alert Channel:",
        item2R: "High Priority (Active)"
      },

      action1: {
        step: "Step 1 of 3",
        q: "Hospital Destination & Drop",
        options: ["Apollo Hospital Koramangala", "Manipal Hospital Old Airport Rd", "Fortis Hospital Bannerghatta", "St. John's Medical College", "Victoria Hospital", "Nimhans Emergency"],
        bottomLabel: "Selected Destination",
        bottomVal: "Apollo Emergency Ward, Koramangala"
      },
      action2: {
        step: "Step 2 of 3",
        q: "Live Places Autocomplete Search",
        box1Top: "Current Ambulance Location",
        box1Val: "Indiranagar 100ft Road Pickup Point",
        box2Top: "Destination Hospital",
        box2Val: "Apollo Hospital, Koramangala 5th Block"
      },
      action3: {
        step: "Step 3 of 3",
        q: "Emergency Route Dispatch",
        fee1L: "Corridor Distance:",
        fee1R: "7.2 Kilometers",
        fee2L: "Preempted Signal Junctions:",
        fee2R: "4 Automated Green Signals",
        totalL: "Estimated Transit Time:",
        totalR: "7.5 Mins (Normally 22 Mins)",
        btn: "START EMERGENCY BROADCAST"
      },

      liveTrip: {
        title: "LIVE CORRIDOR TELEMETRY",
        id: "TRIP #GW-BLR-108",
        status: "SIGNALS PREEMPTED",
        routeName: "Hosur Road - Koramangala Corridor",
        eta: "ETA 2.5 min",
        speed: "68 km/h",
        banner: "Junction 04: Turning Green for Ambulance",
        subLeft: "Signal Override Radius: 800m",
        check1: "1. Richmond Circle Cleared ✓",
        check2: "2. Dairy Circle: GREEN ACTIVE",
        check3: "3. Koramangala 5th Block: Preparing Preemption"
      },
      podSuccess: {
        title: "Green Corridor Reached!",
        desc: "Ambulance arrived at Koramangala Apollo Emergency Ward in 6 minutes 14 seconds.",
        item1L: "Destination Reached:",
        item1R: "Apollo Hospital Trauma Center",
        item2L: "Time Saved:",
        item2R: "15 Minutes Saved (71% Faster)",
        item3L: "Corridor Reliability:",
        item3R: "★ 100% Green Signals Cleared",
        btn: "Download Transit Telemetry Log (PDF)"
      }
    },
    mockupImages: {
      hero1: "/projects/greenwave/hero-driver-broadcast.png",
      hero2: "/projects/greenwave/hero-police-corridor.png",
      hero3: "/projects/greenwave/police-cleared-alert.png",
      onboard1: "/projects/greenwave/onboarding-roles.png",
      onboard2: "/projects/greenwave/onboarding-signup.png",
      onboard3: "/projects/greenwave/onboarding-login.png",
      action1: "/projects/greenwave/flow-dashboard.png",
      action2: "/projects/greenwave/flow-search.png",
      action3: "/projects/greenwave/flow-broadcast-start.png",
      liveTrip: "/projects/greenwave/telemetry-route-tracking.png",
      podSuccess: "/projects/greenwave/driver-green-corridor.png",
    },
    mockupVideos: {
      liveTrip: "/GreenWaveExp.mp4",
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 2. TRUCK SINGH — MULTI-ROLE LOGISTICS & FLEET MANAGEMENT
  // ─────────────────────────────────────────────────────────────
  "truck-singh": {
    slug: "truck-singh",
    title: "Truck Singh — Multi-Role Logistics & Fleet Management Platform",
    category: "Logistics Automation & IoT",
    badgeLabel: "TEAM PROJECT",
    status: "ACTIVE DEVELOPMENT",
    description: "Full-stack Flutter logistics & fleet management platform connecting shippers, truck owners, drivers, and dispatch agents with real-time GPS tracking and automated geofencing.",
    deliverables: "Flutter Mobile App, Supabase Backend, Postgres RPC, SQLite Sync, PDF Invoicing Engine",
    role: "Core Contributor · GPS Tracking, Geofencing Engine & Digital Bilty",
    timeline: "3–4 Month Build (2025–2026)",
    teamSize: "Team of 3 Engineers",
    tags: ["FLUTTER", "SUPABASE", "POSTGRESQL", "GOOGLE MAPS API", "ONESIGNAL", "BLOC", "SQLITE"],
    github: "https://github.com/kishor-2646/truck_singh",
    live: "",
    accent: "cyan",

    problemIntro: "Road freight in India moves over 70% of the nation's domestic cargo, yet the everyday workflow relies heavily on unstructured phone calls, handwritten paper biltys, and manual check-ins.",
    whatProblem: "Shippers have zero live visibility into goods in transit, truck owners struggle with expired paperwork across vehicles, and drivers have no structured emergency channel during highway breakdowns.",
    whySolve: "To eliminate manual coordination overhead, automate shipment progression via GPS geofences, and provide legally compliant digital consignment notes and tax invoices in seconds.",
    metricBadge: {
      stat: "~40% Less",
      title: "Manual Coordination",
      desc: "Reduction in repetitive telephone calls and dispatch friction across active routes."
    },

    stepper: [
      { step: "Step 1", title: "Problem Definition", desc: "Freight pain points" },
      { step: "Step 2", title: "Field Research", desc: "Driver & owner interviews" },
      { step: "Step 3", title: "Architecture", desc: "Supabase RPC & Geofencing" },
      { step: "Step 4", title: "Prototype", desc: "Offline SQLite & Bilty PDF" },
      { step: "Step 5", title: "Test & Deploy", desc: "Production pilot" },
    ],
    approachHighlight: "Automated location streaming must not fail when drivers traverse network dead zones along rural highways. Our architecture isolates background location pings in a dedicated Dart Isolate with local SQLite fallback buffering.",

    stakeholders: {
      users: "Shippers posting cargo, Truck Owners managing fleets, Drivers on highway routes, Dispatch Agents coordinating issues, and Platform Admins.",
      experience: "Unreliable phone calling, manual paper biltys prone to loss, unverified compliance papers, and unencrypted group chat messaging.",
      liveInfo: "Sub-second driver coordinates, automatic pickup/drop notifications, document expiration alerts, and instant tax breakdown invoices.",
      seamlessWork: "Automatic status progression with zero driver distraction, one-tap PDF bilty sharing, and robust offline sync.",
      goals: "Move freight securely on schedule, verify vehicle compliance prior to dispatch, and reduce operational overhead by ~40%.",
      functions: "Background GPS isolation, geofence radius calculation, AES-256 client-side chat encryption, and Supabase Webhooks for OneSignal push alerts.",
      format: "Cross-platform Flutter application compiled to Android and iOS for drivers/owners, plus responsive web/desktop portals for dispatchers."
    },

    mindMap: {
      coreProblem: "Unstructured Logistics Operations",
      coreSubtitle: "Paper-Heavy & Disconnected Road Freight",
      branch1: { title: "Shipper Inquiries", desc: "\"Where is my container? When will it reach warehouse dock?\"" },
      branch2: { title: "Documentation Lag", desc: "Physical bilty notes take 3-5 days to mail for billing clearance." },
      branch3: { title: "Driver Road Hazards", desc: "No instant distress signal to dispatch agents during midnight breakdowns." },
      branch4: { title: "Compliance Penalties", desc: "Expired vehicle permits & PUC discovered late at toll checkpoints." }
    },

    matrixLabels: ["Paper & Calls", "Generic GPS Box", "Basic Chat App", "Truck Singh"],
    matrix: [
      { feat: "Real-time Live GPS Tracking", c1: false, c2: true, c3: false, us: true },
      { feat: "Automatic Geofence Status Engine", c1: false, c2: false, c3: false, us: true },
      { feat: "Offline SQLite Location Queue", c1: false, c2: false, c3: false, us: true },
      { feat: "Digital Bilty PDF Generation", c1: false, c2: false, c3: false, us: true },
      { feat: "GST Tax Breakdown Invoicing", c1: false, c2: false, c3: false, us: true },
      { feat: "5 Synchronized Role Dashboards", c1: false, c2: false, c3: false, us: true },
      { feat: "AES-256 Encrypted In-App Chat", c1: false, c2: false, c3: true, us: true },
      { feat: "One-Tap SOS Emergency Dispatch", c1: false, c2: false, c3: false, us: true },
    ],

    interviewQuestions: [
      "How many times a day do you receive manual phone calls asking for truck location?",
      "What happens when a physical bilty is misplaced or soaked in rain during monsoon transit?",
      "How do you handle emergency breakdowns on remote national highway stretches?",
      "How long does it take to calculate and settle GST tax invoices with commercial shippers?"
    ],
    participants: {
      count1: "8",
      label1: "Fleet Owners & Shippers",
      count2: "6",
      label2: "Highway Drivers & Agents"
    },
    researchInsights: [
      "Drivers overwhelmingly requested one-tap status triggers rather than complex multi-field check-in forms.",
      "Shippers insisted on instant PDF downloads of e-way bilty notes to release milestone advance payments."
    ],

    fiveWOneH: [
      { num: "1. WHAT?", title: "Logistics Platform", desc: "Cross-platform Flutter app automating freight tracking and digital documentation." },
      { num: "2. WHO?", title: "Multi-Role Users", desc: "Shippers, Fleet Owners, Drivers, Dispatch Agents, and System Operators." },
      { num: "3. WHY?", title: "Eliminate Delays", desc: "Automate manual calls, digitize paper bilty, and accelerate invoice settlement." },
      { num: "4. WHEN?", title: "24/7 Long-Haul", desc: "Continuous live tracking throughout the entire trip lifecycle." },
      { num: "5. HOW?", title: "Supabase & Geofencing", desc: "Postgres RPC functions, background location services, and offline SQLite buffering." },
      { num: "6. WHERE?", title: "India Road Freight", desc: "Highways, industrial hubs, transport nagars, and distribution centers." }
    ],

    architecture: {
      drive1: {
        title: "1. Real-Time Geofence Engine",
        desc: "Background location coordinates stream directly to an atomic Postgres RPC function (update_driver_loc). As the vehicle enters a 500m geofence perimeter around pickup or drop coordinates, the state machine auto-transitions: Accepted → En Route → Arrived at Pickup → In Transit → Delivered.",
        icon: "Activity"
      },
      drive2: {
        title: "2. Offline SQLite Queue & Sync",
        desc: "When mobile signals drop on highway stretches, GPS points are batched into a local SQLite FIFO queue. The app listens to network state changes via connectivity_plus and flushes cached telemetry in batch upon signal recovery.",
        icon: "Database"
      }
    },

    hmw: [
      {
        q: "How might we automate shipment progression without manual driver input?",
        pts: ["Background GPS Isolate stream", "Atomic Postgres RPC checks", "Geofence radius detection", "Automated DB Webhooks"]
      },
      {
        q: "How might we ensure tracking never loses data on highway dead zones?",
        pts: ["Local SQLite FIFO datastore", "Periodic connectivity watchdog", "Batch sync RPC endpoints", "Optimistic UI rendering"]
      },
      {
        q: "How might we eliminate handwritten bilty and paper invoicing disputes?",
        pts: ["On-device PDF rendering (pdfx)", "Indian currency format (₹)", "Auto Amount-in-words converter", "One-tap WhatsApp/Print sharing"]
      }
    ],

    ecosystem: [
      { title: "Marketplace Loads", desc: "Transparent freight pricing & load discovery" },
      { title: "Compliance SaaS", desc: "Digital verification for RC, Insurance & Permits" },
      { title: "Fast Settlement", desc: "Instant bilty & GST-compliant tax invoices" },
      { title: "Driver Safety", desc: "24/7 Agent SOS routing with Edge Functions" }
    ],

    taskFlows: [
      { stepName: "1. Authentication & Role Router", nodes: ["User Login", "Profile Setup", "DashboardRouter (5 Roles)"] },
      { stepName: "2. Load Posting & Assignment", nodes: ["Shipper Posts Load", "Owner Accepts in Marketplace", "Driver Assigned"] },
      { stepName: "3. Live GPS Geofencing", nodes: ["Driver GPS Ping", "Postgres RPC & Geofence Radius", "Auto State Machine Advancement"] },
      { stepName: "4. Settlement & Invoicing", nodes: ["Trip Completed", "Generate Digital Bilty PDF", "GST Invoice & OneSignal Push"] }
    ],

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
      "English/Hindi localization for India's regional trucking workforce"
    ],

    metrics: [
      { value: "< 1.2s", label: "Geofence Event Latency", desc: "Time from entering coordinate perimeter to DB push trigger" },
      { value: "100%", label: "Offline Data Recovery", desc: "Zero lost coordinate pings during simulated signal blackouts" },
      { value: "~40%", label: "Coordination Reduction", desc: "Cut down repetitive phone calls between shippers and drivers" }
    ],

    conclusionText: "Truck Singh demonstrates how full-stack mobile architecture—combining Flutter, Supabase RPC, offline SQLite queues, and on-device PDF generation—can modernize one of India's most critical and traditionally fragmented industries.",

    mockupScreens: {
      hero1: {
        title: "LIVE TRACKING",
        tag: "IN TRANSIT",
        mainBoxTop: "Truck GJ-05 AB 1234 · Ranjeet Singh",
        mainBoxVal: "68 km/h",
        subBox: "ETA 3h 20m · 128 km left to Kalamboli",
        action: "CALL DRIVER / SHARE TRIP"
      },
      hero2: {
        title: "PERFORMANCE OVERVIEW",
        badge: "★ 4.8 RATING",
        card1Title: "ACTIVE FLEET TRIPS",
        card1Val: "12 Active",
        card1Route: "48 Completed This Month",
        card1Sub: "Revenue: ₹2.1L Generated",
        btn: "CREATE NEW SHIPMENT",
        card2Title: "SHARED TRIPS",
        card2Val: "MONITOR LIVE"
      },
      hero3: {
        title: "IN-APP CHAT",
        item1Label: "Assigned Driver:",
        item1Val: "Ranjeet Singh (Driver)",
        item2Label: "Pickup Status:",
        item2Val: "Picked up load from Ludhiana",
        item3Label: "Proof of Delivery:",
        item3Val: "Photo & Digital Bilty Shared",
        quote: "\"Thanks; tracking your trip on the map now.\""
      },

      onboard1: {
        roleTitle: "Choose Your Role",
        roleDesc: "Select role to continue & determine available features",
        roles: [
          { title: "Agent", desc: "Coordinate shippers, drivers & loads", active: false },
          { title: "Driver", desc: "Accept trips & update delivery status", active: false },
          { title: "Truck Owner", desc: "Manage your fleet & drivers", active: false },
          { title: "Shipper", desc: "Post loads & track shipments", active: true }
        ]
      },
      onboard2: {
        stepTitle: "Welcome Back",
        field1Label: "Email / Phone",
        field1Val: "shipper@trucksingh.com",
        field2Label: "Security Credential",
        field2Val: "••••••••••••",
        field3Label: "OAuth Method",
        field3Val: "Google Sign-In / Password Auth"
      },
      onboard3: {
        profileTitle: "Select Truck Type",
        status: "STEP 1 OF 4",
        cardMain: "Available Truck Configurations",
        cardSub: "Optimized payload matching engine",
        item1L: "Selected Category:",
        item1R: "Container / Flatbed",
        item2L: "Fleet Types:",
        item2R: "Mini Truck, Pickup, Tanker"
      },

      action1: {
        step: "Step 2 of 4",
        q: "Shipment Cargo & Weight",
        options: ["Cotton bales (8.5 Ton)", "Textile Rolls", "Industrial Machinery", "Automobile Parts", "Agricultural Produce", "FMCG Cartons"],
        bottomLabel: "Weight & Unit",
        bottomVal: "8.5 Ton (FTL Payload)"
      },
      action2: {
        step: "Step 3 of 4",
        q: "Pickup & Delivery Addresses",
        box1Top: "Pickup Location",
        box1Val: "Ludhiana Industrial Area, Punjab",
        box2Top: "Delivery Destination",
        box2Val: "Kalamboli Steel Terminal, Navi Mumbai"
      },
      action3: {
        step: "Step 4 of 4",
        q: "Schedule & Material Details",
        fee1L: "Pickup Date:",
        fee1R: "14 July (2 days from now)",
        fee2L: "Delivery Schedule:",
        fee2R: "Tue, 2 Sep 2026",
        totalL: "Material Inside:",
        totalR: "Textile rolls & Bales",
        btn: "SUBMIT SHIPMENT REQUEST"
      },

      liveTrip: {
        title: "LIVE GPS TRACKING",
        id: "TRIP #GJ-05-AB-1234",
        status: "ACTIVE ROUTE",
        routeName: "NH 48 National Highway Corridor",
        eta: "ETA 3h 20m",
        speed: "68 km/h",
        banner: "Driver: Ranjeet Singh (★ 4.7) · 128 km left",
        subLeft: "Kalamboli Delivery Bound",
        check1: "1. Picked up at Ludhiana Warehouse ✓",
        check2: "2. Checkpoint Cleared & Photo Sent ✓",
        check3: "3. In Transit: Kalamboli Hub Arrival"
      },
      podSuccess: {
        title: "Submitted Successfully!",
        desc: "Nearby truck owners & dispatch agents have been notified about your load request.",
        item1L: "Assigned Route:",
        item1R: "Ludhiana → Navi Mumbai",
        item2L: "Load Payload:",
        item2R: "8.5 Ton Cotton Bales",
        item3L: "Status Notification:",
        item3R: "★ Live Tracking & Bilty Ready",
        btn: "TRACK THIS SHIPMENT"
      }
    },
    mockupImages: {
      hero1: "/projects/trucksingh/hero-live-tracking.png",
      hero2: "/projects/trucksingh/hero-dashboard.png",
      hero3: "/projects/trucksingh/hero-in-app-chat.png",
      onboard1: "/projects/trucksingh/onboard-role-selection.png",
      onboard2: "/projects/trucksingh/onboard-login.png",
      onboard3: "/projects/trucksingh/onboard-truck-type.png",
      action1: "/projects/trucksingh/flow-shipment-details.png",
      action2: "/projects/trucksingh/flow-pickup-delivery.png",
      action3: "/projects/trucksingh/flow-schedule-details.png",
      liveTrip: "/projects/trucksingh/telemetry-live-tracking.png",
      podSuccess: "/projects/trucksingh/outcome-submitted-success.png",
    },
    mockupVideos: {
      liveTrip: "/truck_singh_workflow_demo.mp4",
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 3. PCIFY — AI-BASED PC BUILDER MARKETPLACE
  // ─────────────────────────────────────────────────────────────
  "pcify": {
    slug: "pcify",
    title: "PCify — AI-Based PC Builder & Technical Marketplace",
    category: "Marketplace & AI Hardware Engine",
    badgeLabel: "FEATURED PLATFORM",
    status: "ACTIVE DEVELOPMENT",
    description: "Two-sided marketplace connecting users with expert custom PC builders, powered by an AI compatibility engine for bottleneck-free component configurations.",
    deliverables: "Flutter Multi-Platform (Web/Mobile/Desktop), Firebase Backend, AI Recommendation Engine, Escrow Flow",
    role: "Lead Full-Stack Developer · System Architecture, AI Algorithm & UI/UX",
    timeline: "2025 – Ongoing",
    teamSize: "Core Builder",
    tags: ["FLUTTER", "FIREBASE", "AI/ML", "DART", "MARKETPLACE", "GOOGLE MAPS"],
    github: "https://github.com/kishor-2646/PCify",
    live: "",
    accent: "indigo",

    problemIntro: "Building a custom PC requires navigating thousands of motherboard sockets, wattage limits, PCIe lanes, RAM clearance tolerances, and thermal thresholds—overwhelming everyday buyers and gamers.",
    whatProblem: "First-time builders buy incompatible parts leading to broken hardware, local custom PC technicians lack verified trust profiles and escrow protections, and parts pricing fluctuates wildly without guidance.",
    whySolve: "To democratize custom computing: combining an automated AI component matching engine with a verified two-sided technician marketplace backed by milestone escrow.",
    metricBadge: {
      stat: "100% Incompatibility",
      title: "Zero Hardware Bottlenecks",
      desc: "Mathematical power budget and socket verification across GPU, CPU, and motherboard configurations."
    },

    stepper: [
      { step: "Step 1", title: "Compatibility Matrix", desc: "Socket & wattage rules" },
      { step: "Step 2", title: "Marketplace Model", desc: "Builder escrow workflows" },
      { step: "Step 3", title: "Decoupled Config", desc: "Secure runtime .env keys" },
      { step: "Step 4", title: "AI Recommender", desc: "Budget-to-FPS optimization" },
      { step: "Step 5", title: "Multi-Platform", desc: "Web, iOS & Android sync" },
    ],
    approachHighlight: "To ensure maximum client-side security while supporting cross-platform web and mobile execution, PCify implements a Decoupled Configuration Strategy with runtime flutter_dotenv injection and Firebase Security Rules.",

    stakeholders: {
      users: "Gamers & Content Creators building workstations, Custom PC Builders offering assembly services, Hardware Retailers, and Technical Consultants.",
      experience: "Browsing confusing tech forums, fearing socket pin damage, dealing with unverified Facebook marketplace technicians with zero guarantees.",
      liveInfo: "Real-time component compatibility score, bottleneck percentage, estimated 1080p/1440p/4K FPS in AAA titles, and builder milestone status.",
      seamlessWork: "Enter budget & primary use-case → get instant optimal component list → hire verified local technician with milestone escrow payment.",
      goals: "Deliver high-performance custom PCs with zero compatibility errors, secure technician payments upon successful stress testing.",
      functions: "Wattage calculator, Socket & form-factor validator, AI budget distributor, in-app messaging, appointment calendar booking, and escrow tracking.",
      format: "Cross-platform Flutter build targeting Web browsers, Android, iOS, Windows, and macOS desktops."
    },

    mindMap: {
      coreProblem: "Custom PC Assembly Friction",
      coreSubtitle: "Hardware Incompatibility & Unverified Technicians",
      branch1: { title: "Socket & RAM Mismatch", desc: "DDR4 vs DDR5 RAM, LGA1700 vs AM5 socket mistakes cause costly returns." },
      branch2: { title: "Power Supply Failures", desc: "Undersized PSUs lead to transient spike shutdowns and GPU damage." },
      branch3: { title: "Unverified Local Builders", desc: "No insurance, no stress-testing proof, and no payment protection." },
      branch4: { title: "Budget Allocation Imbalance", desc: "Overspending on CPU while bottlenecking GPU gaming performance." }
    },

    matrixLabels: ["PC PartPicker", "Reddit Forums", "Local Repair Shop", "PCify Engine"],
    matrix: [
      { feat: "Automated Compatibility Verification", c1: true, c2: false, c3: false, us: true },
      { feat: "AI Budget-to-FPS Optimizer", c1: false, c2: false, c3: false, us: true },
      { feat: "Two-Sided Verified Builder Marketplace", c1: false, c2: false, c3: false, us: true },
      { feat: "Integrated Milestone Escrow Protection", c1: false, c2: false, c3: false, us: true },
      { feat: "Real-Time Builder Chat & Booking", c1: false, c2: true, c3: false, us: true },
      { feat: "Cross-Platform Mobile + Web Support", c1: false, c2: false, c3: false, us: true },
      { feat: "Decoupled Runtime Environment Security", c1: false, c2: false, c3: false, us: true },
      { feat: "Verified Benchmark & Stress-Test Uploads", c1: false, c2: false, c3: false, us: true },
    ],

    interviewQuestions: [
      "What is your biggest fear when attempting to assemble a $1,500+ custom PC for the first time?",
      "How do you determine whether a PSU has adequate headroom for modern GPU transient power spikes?",
      "How do independent custom PC technicians showcase their portfolio and build trust with new clients?",
      "Would you pay for an on-demand verified builder to assemble and cable-manage your PC at your home?"
    ],
    participants: {
      count1: "14",
      label1: "Gamers & Workstation Buyers",
      count2: "9",
      label2: "Custom PC Builders & Technicians"
    },
    researchInsights: [
      "Over 72% of surveyed first-time buyers feared bending CPU socket pins or applying incorrect thermal paste.",
      "Professional technicians indicated they would gladly pay a platform commission in exchange for guaranteed milestone escrow payments."
    ],

    fiveWOneH: [
      { num: "1. WHAT?", title: "PC Marketplace & AI", desc: "Two-sided custom PC builder marketplace with automated compatibility engine." },
      { num: "2. WHO?", title: "Builders & Enthusiasts", desc: "Gamers, 3D Artists, AI Researchers, and Verified Professional Technicians." },
      { num: "3. WHY?", title: "Democratize Hardware", desc: "Remove hardware intimidation and protect investments with verified assembly." },
      { num: "4. WHEN?", title: "Hardware Upgrades", desc: "Whenever building new rigs, upgrading GPUs, or scheduling thermal maintenance." },
      { num: "5. HOW?", title: "Flutter & Firebase", desc: "Cross-platform client, Cloud Firestore, Firebase Storage, and AI matching algorithms." },
      { num: "6. WHERE?", title: "Everywhere", desc: "Web browser access, mobile Android/iOS, and desktop Windows/macOS applications." }
    ],

    architecture: {
      drive1: {
        title: "1. AI Component Compatibility Engine",
        desc: "A multi-dimensional dependency graph validates socket interfaces (LGA1700/AM5), PCIe lane bifurcation, RAM speed profiles (XMP/EXPO), cooler clearance, and transient wattage overhead (80+ Gold certification standards).",
        icon: "Cpu"
      },
      drive2: {
        title: "2. Decoupled Security & Escrow State",
        desc: "All API tokens and Firebase credentials are isolated in local .env files and injected at runtime via flutter_dotenv. Milestone payments remain held in escrow until the builder submits verified Cinebench and 3DMark stress test logs.",
        icon: "Lock"
      }
    },

    hmw: [
      {
        q: "How might we prevent any user from purchasing an incompatible computer part?",
        pts: ["Automated socket & chipset validator", "Physical dimension clearance checker", "Wattage threshold headroom calculator", "Instant bottleneck warning modal"]
      },
      {
        q: "How might we create absolute trust between hardware buyers and local assembly techs?",
        pts: ["Milestone payment escrow flow", "Verified photo/video portfolio registry", "Benchmarking stress-test requirements", "Mutual rating & review system"]
      },
      {
        q: "How might we optimize gaming FPS within strict budget limitations?",
        pts: ["AI component cost-ratio distributor", "Real-time game FPS projection engine", "Price-to-performance scoring algorithm", "Tiered upgrade suggestions"]
      }
    ],

    ecosystem: [
      { title: "Hardware Buyers", desc: "Tailored AI builds with guaranteed zero compatibility errors" },
      { title: "Expert PC Builders", desc: "Monetize assembly expertise with protected escrow milestones" },
      { title: "Component Retailers", desc: "Direct affiliate hardware purchase integration" },
      { title: "Technical Support", desc: "On-demand troubleshooting and thermal maintenance" }
    ],

    taskFlows: [
      { stepName: "1. AI Build Configuration", nodes: ["Enter Budget & Games", "AI Recommender Engine", "Zero-Bottleneck Part List"] },
      { stepName: "2. Expert Builder Search", nodes: ["Browse Local Technicians", "Inspect Portfolios & Reviews", "Select Assembly Package"] },
      { stepName: "3. Milestone Escrow Payment", nodes: ["Parts Delivered", "Assembly & Cable Management", "Stress-Test Log Upload"] },
      { stepName: "4. Delivery & Escrow Release", nodes: ["System Delivered", "Benchmark Verified", "Payment Released to Builder"] }
    ],

    highlights: [
      "AI recommendation engine for balanced, bottleneck-free PC configurations",
      "Two-sided marketplace connecting users with verified expert PC builders",
      "Automated socket, chipset, RAM, and PSU wattage compatibility validator",
      "Decoupled security architecture with runtime .env credential injection",
      "Integrated milestone escrow payment protection and booking calendar",
      "Real-time chat with file attachment sharing between buyer and technician",
      "Live benchmark verification and Cinebench / 3DMark stress test reporting",
      "Cross-platform compilation across Android, iOS, Web, Windows, and macOS"
    ],

    metrics: [
      { value: "0%", label: "Hardware Mismatches", desc: "Zero incompatible socket or RAM pairings across simulated build trees" },
      { value: "100%", label: "Secure Key Isolation", desc: "Zero exposed API keys through runtime environment decoupling" },
      { value: "< 2 Mins", label: "Configuration Time", desc: "From blank budget input to fully optimized, purchasable part list" }
    ],

    conclusionText: "PCify transforms the complex, high-risk endeavor of custom PC construction into an accessible, rewarding experience—bridging hardware enthusiasts with certified assembly artisans through smart software.",

    mockupScreens: {
      hero1: {
        title: "AI PC BUILDER",
        tag: "OPTIMIZED",
        mainBoxTop: "Target: 1440p Ultra Gaming",
        mainBoxVal: "Budget: ₹1,25,000",
        subBox: "AI Score: 98/100 · Zero Bottleneck",
        action: "GENERATE COMPONENT LIST"
      },
      hero2: {
        title: "EXPERT BUILDERS",
        badge: "VERIFIED",
        card1Title: "Karthik R. — Senior Tech",
        card1Val: "★ 4.98 (42 Builds)",
        card1Route: "Custom Water Cooling Specialist",
        card1Sub: "Next available: Today, 3:00 PM",
        btn: "Book Build Assembly · ₹2,500",
        card2Title: "Vikas M. — Pro Builder",
        card2Val: "★ 4.90 (28 Builds)"
      },
      hero3: {
        title: "SYSTEM SPECS",
        item1Label: "Processor:",
        item1Val: "AMD Ryzen 7 7800X3D (AM5)",
        item2Label: "Graphics Card:",
        item2Val: "NVIDIA RTX 4070 Super 12GB",
        item3Label: "Power Supply:",
        item3Val: "Corsair RM850e Gold (850W)",
        quote: "\"Expected FPS: 142 FPS in Cyberpunk 2077 (1440p)\""
      },

      onboard1: {
        roleTitle: "Welcome to PCify",
        roleDesc: "Select your primary interest on the platform",
        roles: [
          { title: "PC Buyer / Gamer", desc: "Configure a custom rig with AI assistance", active: true },
          { title: "Expert PC Builder", desc: "Offer assembly & maintenance services", active: false },
          { title: "Hardware Reviewer", desc: "Publish benchmarks and verified build guides", active: false },
          { title: "Component Distributor", desc: "List local inventory and pricing deals", active: false }
        ]
      },
      onboard2: {
        stepTitle: "Performance Profile",
        field1Label: "Primary Use Case",
        field1Val: "Competitive Esports & 4K Video Editing",
        field2Label: "Form Factor Preference",
        field2Val: "Compact Mid-Tower (Glass Panel)",
        field3Label: "Target Resolution",
        field3Val: "1440p High Refresh Rate (165Hz+)"
      },
      onboard3: {
        profileTitle: "Builder Credentials",
        status: "VERIFIED TECH",
        cardMain: "Hardware Lab Certification",
        cardSub: "Badge: Master Thermal & Cable Specialist",
        item1L: "Escrow Account:",
        item1R: "Verified & Connected ✓",
        item2L: "Stress Test Rig:",
        item2R: "Cinebench R23 / FurMark Ready"
      },

      action1: {
        step: "Step 1 of 3",
        q: "What is your build budget?",
        options: ["Entry-Level (₹45,000)", "Mid-Tier 1080p (₹75,000)", "High-End 1440p (₹1,25,000)", "Enthusiast 4K (₹2,00,000+)", "Custom Workstation", "Server / Home Lab"],
        bottomLabel: "Selected Budget Bracket",
        bottomVal: "₹1,20,000 – ₹1,30,000 FTL"
      },
      action2: {
        step: "Step 2 of 3",
        q: "Component Compatibility Check",
        box1Top: "CPU & Motherboard Socket",
        box1Val: "AMD AM5 Socket · B650 Motherboard (Pass ✓)",
        box2Top: "Cooler Height & Case Fit",
        box2Val: "360mm AIO Liquid Cooler (Pass ✓)"
      },
      action3: {
        step: "Step 3 of 3",
        q: "Review Build & Book Assembly",
        fee1L: "Hardware Components Total:",
        fee1R: "₹1,24,500.00",
        fee2L: "Assembly & Cable Management:",
        fee2R: "₹2,500.00 (Escrow)",
        totalL: "Total Payable:",
        totalR: "₹1,27,000.00",
        btn: "Lock Build & Choose Technician"
      },

      liveTrip: {
        title: "BUILD IN PROGRESS",
        id: "RIG #PC-2026-11",
        status: "ASSEMBLY & BENCHMARK",
        routeName: "Karthik R. Hardware Studio",
        eta: "Est. Ready: 6:30 PM",
        speed: "Thermal: 34°C Idle",
        banner: "Cinebench R23 Multi-Core: 18,420 Pts",
        subLeft: "Stress Test Status: PASS ✓",
        check1: "1. Parts Inspected & Unboxed ✓",
        check2: "2. Thermal Paste & AIO Mount ✓",
        check3: "3. 30-Min FurMark GPU Stress Test"
      },
      podSuccess: {
        title: "Custom PC Rig Completed!",
        desc: "Your machine has passed all 3DMark and temperature stability benchmarks.",
        item1L: "Technician Lead:",
        item1R: "Karthik R. (Master Builder)",
        item2L: "Maximum GPU Temp:",
        item2R: "64.2°C under full synthetic load",
        item3L: "Milestone Escrow:",
        item3R: "Released upon client handover",
        btn: "Download System Benchmark Certificate (PDF)"
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 4. RETAILER SAKTHI (MED SHAKTHI) — B2B PHARMACY PLATFORM
  // ─────────────────────────────────────────────────────────────
  "retailer-sakthi": {
    slug: "retailer-sakthi",
    title: "Med Shakthi — B2B Medicine Distribution & Pharmacy Platform",
    category: "Healthcare Logistics & B2B Marketplace",
    badgeLabel: "HACKATHON MVP",
    status: "PRODUCTION MVP",
    description: "Production-grade B2B healthcare application connecting retail pharmacies with authorized medicine distributors for real-time inventory search and bulk ordering.",
    deliverables: "Flutter Mobile App, Supabase Auth & PostgreSQL, Google Maps Location Services, Cart & Bulk Checkout",
    role: "Team Lead · Architecture, Sprint Delivery & Auth Flow (12 Developers)",
    timeline: "15-Day Sprint (UptoSkills Logistics / Healthcare)",
    teamSize: "12-Member Engineering Team",
    tags: ["FLUTTER", "SUPABASE", "FIREBASE", "GOOGLE MAPS", "TEAM LEAD", "B2B"],
    github: "https://github.com/Brahmaswaroop/med_shakthi",
    live: "",
    accent: "emerald",

    problemIntro: "Retail neighborhood pharmacies in India rely on handwritten paper notebooks and fragmented WhatsApp chats to replenish life-saving medicine stocks, causing frequent stockouts and prescription denials.",
    whatProblem: "Pharmacies cannot view live distributor inventory, leading to delays of 24–48 hours for emergency medicines, bulk pricing discrepancies, and zero digital invoicing transparency.",
    whySolve: "To build a centralized digital pharmaceutical replenishment network: instant bulk medicine search, live stock availability, dynamic cart logic, and transparent distributor billing in ₹.",
    metricBadge: {
      stat: "15 Days",
      title: "Full-Stack MVP Delivery",
      desc: "Delivered complete multi-role B2B pharmaceutical marketplace leading 12 engineers."
    },

    stepper: [
      { step: "Step 1", title: "B2B Medicine Needs", desc: "Pharmacy supply analysis" },
      { step: "Step 2", title: "Data Schema", desc: "Supabase medicine tables" },
      { step: "Step 3", title: "Sprint Management", desc: "12-member agile execution" },
      { step: "Step 4", title: "Cart & Checkout", desc: "INR currency & bulk tax" },
      { step: "Step 5", title: "MVP Deployment", desc: "Production pilot delivery" },
    ],
    approachHighlight: "Managing a 12-developer sprint under 15-day hackathon constraints required strict component modularization: isolating Supabase Auth, Cart state machines, and Google Maps geocoding into reusable packages.",

    stakeholders: {
      users: "Retail Pharmacy Owners, Wholesale Medicine Distributors, Pharmaceutical Sales Reps, and Delivery Dispatchers.",
      experience: "Calling multiple wholesale suppliers, waiting for manual stock check answers, and receiving surprise billing rates upon delivery.",
      liveInfo: "Real-time stock batch numbers, expiry dates, bulk wholesale tier discounts, and order dispatch tracking.",
      seamlessWork: "Search medicine by generic/brand name → see live distributor stock → add bulk strips/bottles → checkout with instant GST invoice.",
      goals: "Prevent pharmacy stockouts of essential medicines, reduce replenishment ordering time from hours to minutes.",
      functions: "Role-based Supabase authentication, real-time inventory catalog, dynamic cart management with ₹ currency localization, and Google Maps delivery address geocoding.",
      format: "Flutter mobile application for retail pharmacists and tablet/web interfaces for wholesale distributors."
    },

    mindMap: {
      coreProblem: "Pharmaceutical Supply Chain Friction",
      coreSubtitle: "Manual Phone Ordering & Stockout Delays",
      branch1: { title: "Essential Stockouts", desc: "Critical antibiotics and chronic illness meds unavailable due to reorder lag." },
      branch2: { title: "Paper Log Inaccuracies", desc: "Handwritten orders lead to wrong dosage or quantity deliveries." },
      branch3: { title: "Pricing & Tax Ambiguity", desc: "Lack of transparent wholesale tiers and GST compliance records." },
      branch4: { title: "Delayed Emergency Dispatch", desc: "No live tracking for urgent hospital pharmaceutical consignments." }
    },

    matrixLabels: ["Phone & WhatsApp", "Paper Catalog", "Generic B2B App", "Med Shakthi"],
    matrix: [
      { feat: "Real-time Live Medicine Inventory", c1: false, c2: false, c3: true, us: true },
      { feat: "Generic & Brand Name Instant Search", c1: false, c2: false, c3: true, us: true },
      { feat: "Dynamic Bulk Cart with ₹ Localization", c1: false, c2: false, c3: false, us: true },
      { feat: "Role-Based Auth (Retailer vs Distributor)", c1: false, c2: false, c3: false, us: true },
      { feat: "Integrated Google Maps Geocoding", c1: false, c2: false, c3: false, us: true },
      { feat: "15-Day Agile Sprint Execution", c1: false, c2: false, c3: false, us: true },
      { feat: "GST Pharmaceutical Tax Breakdown", c1: false, c2: true, c3: false, us: true },
      { feat: "Supabase PostgreSQL Database Sync", c1: false, c2: false, c3: false, us: true },
    ],

    interviewQuestions: [
      "How do you currently replenish medicines when a fast-moving item runs out during peak evening hours?",
      "What is the biggest hassle with paper invoices received from multiple independent medicine distributors?",
      "How do you verify batch numbers and expiration dates prior to accepting wholesale medicine consignments?",
      "How would automated digital reordering impact your daily pharmacy cash flow and storage space?"
    ],
    participants: {
      count1: "15",
      label1: "Retail Pharmacy Owners",
      count2: "7",
      label2: "Wholesale Medicine Distributors"
    },
    researchInsights: [
      "86% of retail pharmacists reported lost sales due to slow 24-hour distributor replenishment phone cycles.",
      "Distributors stated that digital order aggregation eliminated 90% of erroneous dosage packing mistakes."
    ],

    fiveWOneH: [
      { num: "1. WHAT?", title: "B2B Pharmacy Platform", desc: "Digital marketplace connecting retail pharmacies with wholesale medicine distributors." },
      { num: "2. WHO?", title: "Pharmacies & Wholesalers", desc: "Retail Pharmacists, Authorized Stockists, Logistics Couriers, and Lab Admins." },
      { num: "3. WHY?", title: "Zero Medicine Shortages", desc: "Ensure life-saving medicines are always available on retail shelves." },
      { num: "4. WHEN?", title: "On-Demand & Scheduled", desc: "Instant emergency replenishment and automated weekly inventory restocks." },
      { num: "5. HOW?", title: "Flutter & Supabase", desc: "Fast PostgreSQL inventory queries, Supabase Auth, and Google Maps APIs." },
      { num: "6. WHERE?", title: "Pan-India Pharmacies", desc: "Neighborhood chemists, hospital pharmacies, and regional distributor hubs." }
    ],

    architecture: {
      drive1: {
        title: "1. Supabase Auth & Role-Based Access",
        desc: "Role-based Row-Level Security (RLS) ensures retail pharmacies can view wholesale medicine prices and place orders, while distributors manage inventory stock counts, batch IDs, and order dispatch approvals.",
        icon: "Shield"
      },
      drive2: {
        title: "2. Dynamic Bulk Cart & INR Geocoding",
        desc: "Client-side state machine computes quantity thresholds, bulk discounts, and GST tax percentages in real time, pairing with Google Maps Geocoding for accurate clinic delivery routing.",
        icon: "Briefcase"
      }
    },

    hmw: [
      {
        q: "How might we digitize medicine catalog search across thousands of SKUs in milliseconds?",
        pts: ["Indexed Supabase PostgreSQL full-text search", "Generic formula to brand matching", "Cached popular medicine categories", "Instant batch availability badges"]
      },
      {
        q: "How might we streamline 12 developers to deliver a complex Flutter app in 15 days?",
        pts: ["Daily sprint standups & clear PR review gates", "Modular feature-based folder architecture", "Mock data contracts for parallel UI coding", "Centralized theme & design system tokens"]
      },
      {
        q: "How might we ensure zero errors in wholesale drug billing and delivery addresses?",
        pts: ["Integrated Google Maps Places autocomplete", "Automated GST percentage calculator", "Digital order confirmation receipts", "Real-time dispatch status tracking"]
      }
    ],

    ecosystem: [
      { title: "Retail Pharmacies", desc: "Instant digital medicine procurement at best wholesale prices" },
      { title: "Wholesale Stockists", desc: "Automated digital bulk order intake with zero phone errors" },
      { title: "Delivery Network", desc: "Optimized route dispatch with Google Maps address geocoding" },
      { title: "Patients & Clinics", desc: "Uninterrupted availability of vital prescription drugs" }
    ],

    taskFlows: [
      { stepName: "1. Role Authentication", nodes: ["Pharmacy / Distributor Login", "Drug License Verification", "Authenticated Catalog Access"] },
      { stepName: "2. Medicine Catalog Search", nodes: ["Search Generic/Brand SKU", "Inspect Batch & Expiry Date", "Select Quantity & Bulk Tier"] },
      { stepName: "3. Cart & Tax Calculation", nodes: ["Dynamic Cart State", "GST Breakdown (₹)", "Google Maps Address Selection"] },
      { stepName: "4. Order Dispatch & Delivery", nodes: ["Distributor Accepts Order", "Consignment Dispatched", "PoD & Invoice Clearance"] }
    ],

    highlights: [
      "End-to-end B2B bulk medicine ordering workflow from catalogue to checkout",
      "Role-based authentication for retail pharmacies and wholesale distributors",
      "Real-time inventory search supporting generic formulas and commercial brand names",
      "Dynamic cart management with Indian currency format (₹) and bulk discount logic",
      "Integrated Google Maps location geocoding for accurate delivery dispatch",
      "Delivered complete production MVP in 15 days managing 12 developers as Team Lead",
      "Secure Supabase PostgreSQL backend with Row-Level Security for catalog protection",
      "Responsive UI adhering to Material and Healthcare ergonomic guidelines"
    ],

    metrics: [
      { value: "15 Days", label: "Sprint Completion Time", desc: "Delivered functional MVP under strict hackathon timeline constraints" },
      { value: "12 Members", label: "Team Leadership", desc: "Successfully directed architecture, daily standups, and codebase integration" },
      { value: "< 2.5s", label: "Bulk Checkout Speed", desc: "From multi-item cart to confirmed distributor order generation" }
    ],

    conclusionText: "Med Shakthi exemplifies high-velocity agile leadership and clean Flutter architecture—proving that a well-directed engineering team can conceptualize, build, and deploy a mission-critical B2B healthcare platform in just 15 days.",

    mockupScreens: {
      hero1: {
        title: "PHARMACY PORTAL",
        tag: "BULK ORDERING",
        mainBoxTop: "Active Cart: 14 Items",
        mainBoxVal: "Total: ₹28,450.00",
        subBox: "Distributor: MedLife Pharma Wholesalers",
        action: "PROCEED TO CHECKOUT"
      },
      hero2: {
        title: "MEDICINE CATALOG",
        badge: "IN STOCK",
        card1Title: "Amoxicillin 500mg (10x10 Strips)",
        card1Val: "₹1,850 / Box",
        card1Route: "Generic: Amox Clav 625",
        card1Sub: "Batch #AMX-2026 · Expiry: 08/2028",
        btn: "Add to Bulk Cart (+50)",
        card2Title: "Paracetamol 650mg (Dolo)",
        card2Val: "₹920 / Box"
      },
      hero3: {
        title: "DISTRIBUTOR DISPATCH",
        item1Label: "Order ID:",
        item1Val: "MED-2026-9041",
        item2Label: "Retailer:",
        item2Val: "Apollo Pharmacy, Velachery",
        item3Label: "Delivery Mode:",
        item3Val: "Express 2-Hour Delivery",
        quote: "\"Verified drug license & GSTIN approved\""
      },

      onboard1: {
        roleTitle: "Med Shakthi Registration",
        roleDesc: "Select your commercial entity type in the healthcare chain",
        roles: [
          { title: "Retail Pharmacist", desc: "Browse wholesale catalog & order stock", active: true },
          { title: "Medicine Distributor", desc: "Manage bulk inventory & dispatch orders", active: false },
          { title: "Hospital Procurement", desc: "Bulk institutional order contracts", active: false },
          { title: "Delivery Agent", desc: "Pickup & deliver pharmacy orders", active: false }
        ]
      },
      onboard2: {
        stepTitle: "Pharmacy Credentials",
        field1Label: "Drug License Number (Form 20/21)",
        field1Val: "DL-TN-CHE-2024-88912",
        field2Label: "Pharmacy Name",
        field2Val: "Sri Sai Care Pharmacy",
        field3Label: "GST Identification Number",
        field3Val: "33AAAAA0000A1Z5"
      },
      onboard3: {
        profileTitle: "Pharmacy Location",
        status: "GEOCODED",
        cardMain: "Velachery Main Road, Chennai",
        cardSub: "Pincode: 600042 · Tamil Nadu",
        item1L: "Delivery Radius:",
        item1R: "Within 5 km of Hub ✓",
        item2L: "Account Status:",
        item2R: "Authorized Pharmacist"
      },

      action1: {
        step: "Step 1 of 3",
        q: "Search Medicine Category",
        options: ["Antibiotics & Anti-Infectives", "Cardiac & Diabetic Care", "Pain Relief & Anti-Inflammatory", "Respiratory & Cough", "Vitamins & Supplements", "Surgical Supplies"],
        bottomLabel: "Selected Category",
        bottomVal: "Antibiotics (148 Products Active)"
      },
      action2: {
        step: "Step 2 of 3",
        q: "Select Batch & Quantity",
        box1Top: "Manufacturer Batch",
        box1Val: "Cipla Pharmaceuticals · Batch #CP-8841",
        box2Top: "Quantity Selection",
        box2Val: "50 Boxes (500 Strips) · Bulk Tier Discount"
      },
      action3: {
        step: "Step 3 of 3",
        q: "Confirm B2B Purchase",
        fee1L: "Subtotal (Wholesale Rate):",
        fee1R: "₹24,800.00",
        fee2L: "GST (12% Pharma Tax):",
        fee2R: "₹2,976.00",
        totalL: "Total Payable (₹):",
        totalR: "₹27,776.00",
        btn: "PLACE BULK PHARMACY ORDER"
      },

      liveTrip: {
        title: "ORDER IN TRANSIT",
        id: "ORDER #MED-2026-9041",
        status: "DISPATCHED",
        routeName: "Wholesale Hub → Velachery Pharmacy",
        eta: "ETA 28 min",
        speed: "Courier: SpeedLine Express",
        banner: "Temperature Controlled Box (2°C - 8°C)",
        subLeft: "Delivery Agent: Suresh M.",
        check1: "1. Order Verified by Distributor ✓",
        check2: "2. Batch QA & Packing Complete ✓",
        check3: "3. Dispatched for Pharmacy Handover"
      },
      podSuccess: {
        title: "Order Delivered & Stocked!",
        desc: "50 Boxes of Amoxicillin 500mg received and logged into pharmacy inventory.",
        item1L: "Received By:",
        item1R: "Pharmacist Vignesh K.",
        item2L: "Invoice Number:",
        item2R: "INV-MED-2026-9041 (GST Compliant)",
        item3L: "Payment Status:",
        item3R: "Direct NetBanking Settlement ✓",
        btn: "Download Tax Invoice & Delivery Challan"
      }
    }
  }
};
