"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Github, Trophy, Server, Smartphone, Database, AlertTriangle, 
  CheckCircle, Terminal, Activity, ArrowRight, Zap, ArrowLeft,
  ExternalLink, ChevronRight
} from 'lucide-react';

/* ── Reusable fade-in wrapper ─────────────────────────────── */
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1.0, 0.36, 1.0] }}
  >
    {children}
  </motion.div>
);

/* ── Floating particles background ────────────────────────── */
const FloatingParticles = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: `${3 + i * 2}px`,
          height: `${3 + i * 2}px`,
          background: `rgba(52, 211, 153, ${0.08 + i * 0.03})`,
          left: `${10 + i * 15}%`,
          top: `${20 + (i % 3) * 25}%`,
        }}
        animate={{
          y: [0, -30 - i * 10, 0],
          x: [0, 10 + i * 5, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6 + i * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.8,
        }}
      />
    ))}
  </div>
);

/* ── Code window chrome ───────────────────────────────────── */
const CodeWindow = ({ filename, children, lang = "text-emerald-300" }: { filename: string; children: React.ReactNode; lang?: string }) => (
  <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#0a0a0a]">
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <span className="ml-2 text-xs text-white/30 font-mono">{filename}</span>
    </div>
    <pre className={`p-5 text-sm ${lang} font-mono overflow-x-auto leading-relaxed`}>
      {children}
    </pre>
  </div>
);

/* ── Section number badge ─────────────────────────────────── */
const SectionBadge = ({ icon: Icon, color, number, title }: { 
  icon: React.ElementType; color: string; number: string; title: string 
}) => (
  <div className="flex items-center gap-4 mb-8">
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0`}>
      <Icon className="w-6 h-6" />
    </div>
    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{number}. {title}</h2>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   GREENWAVE ENGINEERING CASE STUDY PAGE
   Route: /greenwave-casestudy
   ═══════════════════════════════════════════════════════════════ */
export default function GreenWaveCaseStudy() {
  return (
    <div className="min-h-screen text-white/70 font-[var(--font-outfit,'Outfit'),system-ui,sans-serif] selection:bg-emerald-500/20 selection:text-white" style={{ background: '#000' }}>

      {/* ── BACK NAV ──────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          <a 
            href="https://github.com/kishor-2646/GreenWave.git" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 text-sm text-emerald-400/70 hover:text-emerald-300 transition-colors duration-300"
          >
            <Github className="w-4 h-4" />
            Source Code
          </a>
        </div>
      </motion.nav>

      {/* ════════════════════════════════════════════════════════
          HEADER
         ════════════════════════════════════════════════════════ */}
      <header className="relative pt-32 pb-24 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 70% 10%, rgba(16,185,129,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(6,182,212,0.04) 0%, transparent 50%)'
        }} />
        <FloatingParticles />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Phase badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-emerald-400 text-xs font-medium mb-8 tracking-wide uppercase"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}
          >
            <Server className="w-3.5 h-3.5" />
            Phase 1.0 → 2.0 Architectural Overhaul
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
          >
            From Siren to Spring Boot:{' '}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(135deg, #34d399, #22d3ee)'
            }}>
              Re-Engineering GreenWave
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-lg md:text-xl text-white/40 mb-12 max-w-2xl leading-relaxed"
          >
            Transitioning from a 24-Hour Hackathon MVP to an Enterprise Geospatial Engine.
          </motion.p>

          {/* Meta grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm border-t border-white/[0.06] pt-8"
          >
            <div>
              <span className="block text-white/30 mb-1.5 text-xs uppercase tracking-wider">Author</span>
              <span className="text-white/80 font-medium">Kishor Kumar S</span>
              <span className="block text-white/30 text-xs mt-0.5">Team Omnipotence</span>
            </div>
            <div>
              <span className="block text-white/30 mb-1.5 text-xs uppercase tracking-wider">Track</span>
              <span className="text-white/80 font-medium">Healthcare & Smart Mobility</span>
            </div>
            <div>
              <span className="block text-white/30 mb-1.5 text-xs uppercase tracking-wider">Award</span>
              <div className="flex items-center gap-2 text-yellow-400/90 font-medium">
                <Trophy className="w-4 h-4" /> Most Innovative Solution
              </div>
            </div>
            <div>
              <span className="block text-white/30 mb-1.5 text-xs uppercase tracking-wider">Repository</span>
              <a 
                href="https://github.com/kishor-2646/GreenWave.git" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 text-emerald-400/80 hover:text-emerald-300 transition-colors duration-300"
              >
                <Github className="w-4 h-4" /> View Source
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════
          MAIN CONTENT
         ════════════════════════════════════════════════════════ */}
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-36">

        {/* ─── 1. THE SPARK ────────────────────────────────────── */}
        <FadeIn>
          <section>
            <SectionBadge icon={Activity} color="bg-blue-500/10 text-blue-400" number="1" title='The Spark: Why We Didn&apos;t Build Another "Smart Traffic Light"' />

            <div className="space-y-6 text-[17px] leading-relaxed">
              <h3 className="text-xl font-semibold text-white mt-2">The Incident at the Junction</h3>
              <p>
                A few months ago, my friend was waiting at a gridlocked traffic signal in Bangalore. Out of nowhere, the blaring siren of an emergency ambulance echoed through the intersection.
              </p>
              <p>
                The traffic officer stationed at the junction immediately sprang into action, trying frantically to part three jammed lanes of cars, auto-rickshaws, and transit buses. But by the time the siren&apos;s sound reached the officer&apos;s ears, the ambulance was already less than 80 meters away, stuck behind a wall of stationary vehicles. In bumper-to-bumper city traffic, clearing a congested junction takes <strong className="text-white/90">3 to 5 minutes</strong> of manual whistle-blowing and vehicle shunting. The officer had less than <strong className="text-white/90">30 seconds</strong>.
              </p>
              <p>
                The siren was loud, but it was physically heard far too late. The ambulance came to a dead halt, burning precious seconds of the patient&apos;s <strong className="text-white/90">Golden Hour</strong>.
              </p>

              {/* Latency gap diagram */}
              <FadeIn delay={0.15}>
                <div className="rounded-xl p-6 my-8 font-mono text-sm text-white/40 overflow-x-auto border border-white/[0.06]" style={{ background: '#0a0a0a' }}>
                  <div className="text-emerald-400 mb-4 text-center font-bold tracking-wider text-xs uppercase">The Critical Latency Gap</div>
                  <pre className="leading-relaxed">{`  [ Ambulance Begins Approach ]
                │
                │  (1.2 km away — In Transit)
                ▼
  [ Siren Audible Radius: ~100m ] ──► Traffic Police Hears Siren
                │                     ├── Needs 3–5 mins to clear 3 lanes
                │                     └── Has only 30–45 seconds!
                ▼
  [ Complete Junction Gridlock ]  ──► Ambulance trapped at red light`}</pre>
                </div>
              </FadeIn>

              <h3 className="text-xl font-semibold text-white pt-4">The Pragmatic Epiphany: Technology Meets Ground Reality</h3>
              <p>
                During the hackathon, almost every single team tackling emergency mobility proposed the exact same thing: <strong className="text-white/90">&ldquo;Automated AI / IoT Traffic Signals.&rdquo;</strong> Their pitch was always: <em>&ldquo;Install microcontrollers, cameras, and automated relays on every traffic signal pole in the city so the light switches green automatically.&rdquo;</em>
              </p>
              <p>We stepped back and looked at the actual ground reality of Indian cities:</p>
              <ul className="list-none space-y-3 pl-0">
                <li className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-400/60 mt-0.5 shrink-0" />
                  <span><strong className="text-white/90">Infrastructure Costs:</strong> Equipping hundreds of thousands of legacy intersections across India with synchronized IoT hardware and fail-safe automated relays costs millions of dollars and takes years of municipal procurement.</span>
                </li>
                <li className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-400/60 mt-0.5 shrink-0" />
                  <span><strong className="text-white/90">The Human Resource:</strong> Nearly every busy, high-risk junction in Indian cities already has a dedicated, hard-working <strong className="text-white/90">Traffic Police Officer</strong> managing flow on the tarmac.</span>
                </li>
              </ul>

              {/* Core thesis callout */}
              <FadeIn delay={0.1}>
                <div className="rounded-xl p-6 my-8 border-l-[3px] border-emerald-500" style={{ background: 'rgba(16,185,129,0.04)' }}>
                  <h4 className="text-emerald-400 font-bold mb-2.5 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <Zap className="w-4 h-4" /> The Core Thesis
                  </h4>
                  <p className="text-white/60 m-0 leading-relaxed">
                    <strong className="text-white/80">Don&apos;t wait a decade for multi-million-dollar automated hardware that may never arrive.</strong> Solve the problem <em>today</em> by giving the human officer already stationed at the intersection <strong className="text-emerald-400/80">proactive situational awareness</strong> minutes before the siren can ever be heard.
                  </p>
                </div>
              </FadeIn>

              <p>
                By shifting our focus from <em>&ldquo;automating the concrete&rdquo;</em> to <em>&ldquo;empowering the traffic officer on duty,&rdquo;</em> our team—<strong className="text-white/90">Omnipotence (&ldquo;The Saviours&rdquo;)</strong>—built a solution grounded in real-world deployment feasibility. That pragmatic decision won us the <strong className="text-yellow-400/80">&ldquo;Most Innovative Solution&rdquo;</strong> award.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* ─── 2. PHASE 1: HACKATHON MVP ──────────────────────── */}
        <FadeIn>
          <section>
            <SectionBadge icon={Smartphone} color="bg-orange-500/10 text-orange-400" number="2" title="Phase 1: The 24-Hour Hackathon Prototype (The BaaS MVP)" />

            <div className="space-y-6 text-[17px] leading-relaxed">
              <p>
                We had 24 hours to prove our concept. We built a dual-interface mobile ecosystem powered by a <strong className="text-white/90">Flutter</strong> frontend and <strong className="text-white/90">Firebase Firestore</strong> as our real-time state bus.
              </p>

              <FadeIn delay={0.1}>
                <CodeWindow filename="PHASE 1: HACKATHON MVP TOPOLOGY" lang="text-orange-300/80">
{`   ┌──────────────────────────┐           ┌──────────────────────────┐
   │  Ambulance Driver App    │           │   Traffic Police Portal  │
   │     (Flutter / Dart)     │           │     (Flutter / Web)      │
   └────────────┬─────────────┘           └────────────▲─────────────┘
                │                                      │
         GPS Broadcast                               Snapshot
         (1-2s Latency)                              Listener
                │                                      │
                ▼                                      │
          ┌──────────────────────────────────────────────────┐
          │             Firebase Firestore BaaS              │
          │   - /trips/{tripId} document collection          │
          │   - /junctions/{junctionId} document updates     │
          └──────────────────────────────────────────────────┘
                                   │
                     ┌─────────────┴─────────────┐
                     ▼                           ▼
           Google Maps API / TTS        flutter_local_notif
         (Route Polyline Decoding)     (Hardware Heads-up Alert)`}
                </CodeWindow>
              </FadeIn>

              <h3 className="text-xl font-semibold text-white mt-10">The Hackathon User Journey & Live Workflow</h3>
              <FadeIn delay={0.15}>
                <div className="rounded-xl p-6 border border-white/[0.06] space-y-3 font-mono text-sm" style={{ background: '#0a0a0a' }}>
                  {[
                    ['Driver Enters Destination', 'Selects Hospital: Koramangala 5th Block'],
                    ['Emergency Broadcast Starts', 'Live Route Drawn: Dynamic Violet/Pink Polyline'],
                    ['Police Mobile Intercept', 'Alert Banner: "Incoming Ambulance | ETA 76m"'],
                    ['Officer Clears Lanes Manually', 'Taps Green "CLEAR TRAFFIC" Button'],
                    ['Real-Time State Reversal', 'Polyline Turns Dynamic GREEN for Driver & Officer'],
                    ['Gemini AI Voice TTS Alert', '"The Koramangala 5th Block junction has been cleared by police. Proceed safely."'],
                  ].map(([left, right], i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="flex items-start gap-3 text-white/50"
                    >
                      <ArrowRight className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>[{left}] <span className="text-white/20">──►</span> [{right}]</span>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>

              <h3 className="text-xl font-semibold text-white mt-10">What Worked Wonderfully in the Demo</h3>
              <ul className="list-none space-y-3 pl-0">
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400/60 mt-0.5 shrink-0" />
                  <span><strong className="text-white/90">The &ldquo;Clear Traffic&rdquo; Handshake:</strong> When the officer tapped &ldquo;Clear Traffic,&rdquo; the map polyline turned from urgent violet/pink to safe green on both devices simultaneously, followed by an automated eyes-free voice confirmation for the driver.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400/60 mt-0.5 shrink-0" />
                  <span><strong className="text-white/90">Impact Modeling:</strong> Based on India&apos;s staggering statistic of <strong className="text-white/90">24,012 daily deaths</strong> caused by emergency medical transit delays, cutting junction clearance bottlenecks by 30–50% within the Golden Hour window proved that simple, reliable coordination saves lives.</span>
                </li>
              </ul>
            </div>
          </section>
        </FadeIn>

        {/* ─── 3. THE TURNING POINT ───────────────────────────── */}
        <FadeIn>
          <section>
            <SectionBadge icon={AlertTriangle} color="bg-red-500/10 text-red-400" number="3" title='The Turning Point: Why "Vibe Coding" & BaaS Hit an Architectural Wall' />

            <div className="space-y-6 text-[17px] leading-relaxed">
              <p>
                Winning the hackathon was exciting, but inspecting the code with engineering rigor revealed that our 24-hour prototype was held together by duct tape and Firebase SDK magic. When we tested the system against edge cases—multiple ambulances crossing the same corridor, network drops, and scaling to hundreds of signals—the architecture fell apart.
              </p>

              <h3 className="text-xl font-semibold text-white">The Architectural Autopsy: 4 Critical Flaws</h3>

              <FadeIn delay={0.1}>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {[
                    { title: '1. Client-Side Security Hole', desc: 'In Firebase, we relied on client-side state flags (isPolice: true). Anyone with a modified APK could forge a request, spoof an officer\'s account, and falsify green-corridor clearances without server-side validation.' },
                    { title: '2. Database Thrashing', desc: 'Streaming continuous GPS ticks directly into Firestore document collections exhausted read/write operations. High-frequency GPS telemetry cannot live in persistent document stores.' },
                    { title: '3. The 2D Math Trap', desc: 'We used naive Euclidean distance math. Earth is an oblate spheroid. Running manual loops across hundreds of coordinates causes O(N) linear scans. We needed logarithmic spatial bounding boxes (R-Trees / GiST) via PostGIS.' },
                    { title: '4. Engineering Reality', desc: 'Client-side BaaS apps don\'t teach real systems engineering (IoC, Thread safety, Connection pooling, STOMP WebSockets, Layered decoupling)—the very things placement drives look for.' },
                  ].map((flaw, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="p-5 rounded-xl border border-white/[0.06]"
                      style={{ background: '#0a0a0a' }}
                    >
                      <h4 className="text-red-400/90 font-bold mb-2 text-sm">{flaw.title}</h4>
                      <p className="text-sm text-white/50 leading-relaxed m-0">{flaw.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="mt-10 p-6 rounded-xl text-center border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <p className="text-white/80 font-medium m-0">
                    We made a definitive decision: <strong className="text-emerald-400">Scrap the client-side BaaS backend. Keep Flutter as a lean UI presentation layer, and engineer an industrial-grade Java & Spring Boot distributed backend from scratch.</strong>
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>
        </FadeIn>

        {/* ─── 4. PHASE 2: SPRING BOOT ────────────────────────── */}
        <FadeIn>
          <section>
            <SectionBadge icon={Database} color="bg-cyan-500/10 text-cyan-400" number="4" title="Phase 2: The Enterprise Spring Boot & PostGIS Engine" />

            <FadeIn delay={0.1}>
              <CodeWindow filename="PHASE 2: ENTERPRISE DISTRIBUTED SYSTEM DESIGN" lang="text-cyan-300/80">
{`   ┌──────────────────────────┐          ┌──────────────────────────┐
   │  Ambulance Flutter Client │          │   Police Flutter Client  │
   │  - Device GPS Sensor     │          │   - Map Viewport         │
   │  - STOMP WebSocket Dart  │          │   - STOMP WebSocket Dart │
   └─────────────▲────────────┘          └─────────────▲────────────┘
                 │                                     │
                 │    (STOMP over WebSocket / JSON)    │
                 └──────────────────┬──────────────────┘
                                    ▼
   ┌────────────────────────────────────────────────────────────────┐
   │               SPRING BOOT 4.x APPLICATION ENGINE               │
   │                                                                │
   │  ┌──────────────────────┐            ┌──────────────────────┐  │
   │  │ Spring Security Filter│           │  STOMP Message Broker│  │
   │  │ - Stateless JWT Auth  │           │  - /app/telemetry    │  │
   │  │ - Role-Gated Endpoints│           │  - /topic/junctions  │  │
   │  └──────────┬───────────┘            └──────────┬───────────┘  │
   │             │                                   │              │
   │  ┌──────────▼───────────────────────────────────▼───────────┐  │
   │  │                     Service Layer                        │  │
   │  │  - Geofencing Engine (JTS Topology Suite)               │  │
   │  │  - Dynamic ETA Calculator & Corridor State Machine       │  │
   │  └──────────────────────────┬───────────────────────────────┘  │
   └─────────────────────────────┼──────────────────────────────────┘
                                 │
                ┌────────────────┴────────────────┐
                ▼                                 ▼
   ┌──────────────────────────┐     ┌───────────────────────────────┐
   │  PostgreSQL 16 + PostGIS │     │   Firebase Cloud Messaging    │
   │  - GiST Spatial Indexing │     │   - Narrow Push Notification  │
   │  - ST_DWithin Geofences  │     │     Delivery Pipe (Admin SDK) │
   └──────────────────────────┘     └───────────────────────────────┘`}
              </CodeWindow>
            </FadeIn>

            <div className="mt-12 space-y-6 text-[17px] leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Relational Entity Schema with Spatial Types</h3>
              <p className="text-white/50">
                Instead of unstructured documents, our entities are mapped with strict relational types using <code className="text-emerald-400/70 text-sm px-1.5 py-0.5 rounded" style={{ background: 'rgba(16,185,129,0.08)' }}>hibernate-spatial</code>:
              </p>

              <FadeIn delay={0.1}>
                <CodeWindow filename="Junction.java">
{`@Entity
@Table(name = "junctions")
public class Junction {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String name;

    // PostGIS Native Point: Longitude & Latitude on WGS 84 Ellipsoid (SRID 4326)
    @Column(columnDefinition = "geography(Point, 4326)")
    private Point location;

    @Enumerated(EnumType.STRING)
    private CorridorStatus status; // IDLE, APPROACHING, CLEARED
}`}
                </CodeWindow>
              </FadeIn>

              <p className="text-white/50 pt-4">This unlocks native spatial queries running in logarithmic time:</p>

              <FadeIn delay={0.15}>
                <CodeWindow filename="JunctionRepository.java">
{`public interface JunctionRepository extends JpaRepository<Junction, UUID> {
    // Find all junctions within :radiusMeters of the ambulance location
    @Query(value = """
        SELECT * FROM junctions j 
        WHERE ST_DWithin(
            j.location, 
            ST_SetSRID(ST_MakePoint(:lon, :lat), 4326), 
            :radiusMeters
        ) = true
        ORDER BY ST_Distance(
            j.location, 
            ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)
        ) ASC
    """, nativeQuery = true)
    List<Junction> findApproachingJunctions(
        double lon, double lat, double radiusMeters
    );
}`}
                </CodeWindow>
              </FadeIn>
            </div>
          </section>
        </FadeIn>

        {/* ─── 5. WAR STORIES ─────────────────────────────────── */}
        <FadeIn>
          <section>
            <SectionBadge icon={Terminal} color="bg-purple-500/10 text-purple-400" number="5" title="Engineering War Stories: Bootstrapping Failures & Fixes" />

            <p className="text-[17px] text-white/50 mb-10 leading-relaxed">
              Real software development is defined by debugging obscure runtime exceptions. Here are the exact breaking issues we encountered while spinning up our enterprise engine.
            </p>

            <div className="space-y-8">
              {/* BUG 1 */}
              <FadeIn delay={0.05}>
                <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                  <div className="p-4 flex items-center gap-3 border-b border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <AlertTriangle className="w-4 h-4 text-yellow-500/80" />
                    <h4 className="font-bold text-white text-sm m-0">Bug #1: The Transitive Dependency Clash</h4>
                  </div>
                  <div className="p-6 space-y-5" style={{ background: '#050505' }}>
                    <div>
                      <h5 className="text-white/30 text-xs font-bold uppercase tracking-widest mb-2">What Happened</h5>
                      <p className="text-white/50 text-sm m-0">When we initialized the project with JWT dependencies and ran IntelliJ&apos;s security scanner, the build threw warnings flagging duplicate Jackson core modules.</p>
                    </div>
                    <div>
                      <h5 className="text-white/30 text-xs font-bold uppercase tracking-widest mb-2">The Root Cause</h5>
                      <p className="text-white/50 text-sm m-0">Spring Boot migrated to Jackson 3 (<code className="text-cyan-400/60 text-xs">tools.jackson.core</code>), but <code className="text-cyan-400/60 text-xs">jjwt-jackson</code> (v0.12.6) expected legacy Jackson 2 (<code className="text-cyan-400/60 text-xs">com.fasterxml.jackson.core</code>). Our classpath carried two conflicting JSON engines!</p>
                    </div>
                    <div>
                      <h5 className="text-emerald-400/80 text-xs font-bold uppercase tracking-widest mb-2">The Fix</h5>
                      <p className="text-white/50 text-sm mb-3">Swapped <code className="text-cyan-400/60 text-xs">jjwt-jackson</code> for <code className="text-cyan-400/60 text-xs">jjwt-orgjson</code> to purge the legacy Jackson 2 dependency entirely:</p>
                      <CodeWindow filename="pom.xml (diff)" lang="text-blue-300/80">
{`<!-- REMOVED: Conflicted with Spring Boot Jackson 3 -->
<!-- <dependency> <groupId>io.jsonwebtoken</groupId> ... -->

<!-- ADDED: Clean, lightweight JSON parser -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-orgjson</artifactId>
    <version>0.12.6</version>
    <scope>runtime</scope>
</dependency>`}
                      </CodeWindow>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* BUG 2 */}
              <FadeIn delay={0.1}>
                <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                  <div className="p-4 flex items-center gap-3 border-b border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <AlertTriangle className="w-4 h-4 text-yellow-500/80" />
                    <h4 className="font-bold text-white text-sm m-0">Bug #2: The Missing DataSource Crash</h4>
                  </div>
                  <div className="p-6 space-y-5" style={{ background: '#050505' }}>
                    <div>
                      <h5 className="text-white/30 text-xs font-bold uppercase tracking-widest mb-2">What Happened</h5>
                      <p className="text-white/50 text-sm mb-3">The JVM crashed on startup with:</p>
                      <div className="rounded-lg p-4 text-xs font-mono text-red-400/80 overflow-x-auto border border-red-900/20" style={{ background: 'rgba(239,68,68,0.04)' }}>
{`***************************
APPLICATION FAILED TO START
***************************
Failed to configure a DataSource: 'url' attribute is not specified
and no embedded datasource could be configured.`}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-white/30 text-xs font-bold uppercase tracking-widest mb-2">The Root Cause</h5>
                      <p className="text-white/50 text-sm m-0">Spring Boot&apos;s autoconfiguration detected <code className="text-cyan-400/60 text-xs">spring-data-jpa</code>, attempted to initialize HikariCP connection pool, found zero credentials in the empty <code className="text-cyan-400/60 text-xs">application.yml</code>, and aborted.</p>
                    </div>
                    <div>
                      <h5 className="text-emerald-400/80 text-xs font-bold uppercase tracking-widest mb-2">The Fix</h5>
                      <p className="text-white/50 text-sm mb-3">1. Spun up an isolated PostgreSQL container with PostGIS:</p>
                      <CodeWindow filename="terminal" lang="text-white/60">
{`docker run --name greenwave-db \\
  -e POSTGRES_USER=greenwave_user -e POSTGRES_PASSWORD=changeme \\
  -e POSTGRES_DB=greenwave -p 5432:5432 -d postgis/postgis:16-3.4`}
                      </CodeWindow>
                      <p className="text-white/50 text-sm my-3">2. Populated <code className="text-cyan-400/60 text-xs">application.yml</code> with PostGIS dialects:</p>
                      <CodeWindow filename="application.yml" lang="text-yellow-300/80">
{`spring:
  datasource:
    url: jdbc:postgresql://\${DB_HOST:localhost}:5432/\${DB_NAME:greenwave}
    username: \${DB_USERNAME:greenwave_user}
    password: \${DB_PASSWORD:changeme}
  jpa:
    properties:
      hibernate:
        dialect: org.hibernate.spatial.dialect.postgis.PostgisPG10Dialect`}
                      </CodeWindow>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        </FadeIn>

        {/* ─── 6. MATRIX & ROADMAP ────────────────────────────── */}
        <FadeIn>
          <section className="space-y-20">
            {/* Matrix */}
            <div>
              <SectionBadge icon={Activity} color="bg-emerald-500/10 text-emerald-400" number="6" title="The Architectural Evolution Matrix" />

              <FadeIn delay={0.1}>
                <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
                  <table className="w-full text-left text-sm text-white/50">
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <th className="p-4 text-white/80 font-semibold border-b border-white/[0.06]">Engineering Dimension</th>
                        <th className="p-4 text-white/60 font-semibold border-b border-l border-white/[0.06]">Phase 1: Hackathon MVP</th>
                        <th className="p-4 text-emerald-400/80 font-semibold border-b border-l border-white/[0.06]" style={{ background: 'rgba(16,185,129,0.03)' }}>Phase 2: Enterprise Engine</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {[
                        ['Backend Core', 'Serverless BaaS (Firebase Firestore)', 'Java 21 & Spring Boot 4.x REST/WebSocket'],
                        ['Identity & Access', 'Client-side flags (isPolice: true)', 'Stateless JWT + @PreAuthorize Role-Based Access'],
                        ['Geospatial Engine', 'Naive Euclidean calculations on mobile', 'PostgreSQL + PostGIS (ST_DWithin on GiST)'],
                        ['Live Telemetry', 'High-frequency document database writes', 'In-memory Redis Geospatial Caching (GEOADD)'],
                        ['Real-Time Delivery', 'Firestore .snapshots() listeners', 'STOMP protocol over persistent WebSockets'],
                        ['Push Alerts', 'Direct mobile notification bridge', 'Spring Boot business logic → FCM Admin Pipe'],
                      ].map(([dim, p1, p2], i) => (
                        <tr key={i}>
                          <td className="p-4 font-medium text-white/80">{dim}</td>
                          <td className="p-4 border-l border-white/[0.04] text-white/40">{p1}</td>
                          <td className="p-4 border-l border-white/[0.04] text-white/60" style={{ background: 'rgba(16,185,129,0.02)' }}>{p2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </FadeIn>
            </div>

            {/* Roadmap */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">7. Current Progress & Live Implementation Roadmap</h2>

              <FadeIn delay={0.1}>
                <div className="rounded-xl p-6 border border-white/[0.06] space-y-3" style={{ background: '#0a0a0a' }}>
                  {/* Completed items */}
                  {[
                    'Phase 1.0 — 24-Hour Hackathon MVP (Flutter + Firestore)',
                    'Phase 1.5 — Retrospective, Systems Profiling & Failure Analysis',
                    'Phase 2.1 — Spring Boot 4 Bootstrapping, PostGIS Docker Node & Dependency De-clash',
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="flex items-center gap-3 text-emerald-400/80"
                    >
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      <span className="line-through text-white/25 text-sm">{text}</span>
                    </motion.div>
                  ))}

                  {/* Current */}
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="flex items-center gap-3 text-cyan-400 p-3 rounded-lg border border-cyan-500/15"
                    style={{ background: 'rgba(6,182,212,0.04)' }}
                  >
                    <div className="w-5 h-5 border-2 border-cyan-400 rounded-full shrink-0 animate-pulse" />
                    <span className="font-medium text-sm">Phase 2.2 — Core Domain JPA Entities, Spatial Repositories & Swagger Contracts (Current)</span>
                  </motion.div>

                  {/* Upcoming */}
                  {[
                    'Phase 2.3 — STOMP over WebSocket Real-Time Corridor State Handler',
                    'Phase 2.4 — Flutter Client Migration (Swapping Firestore for STOMP & Dio Clients)',
                    'Phase 2.5 — AWS Production Deployment (RDS PostGIS + EC2)',
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                      className="flex items-center gap-3 text-white/25"
                    >
                      <div className="w-5 h-5 border-2 border-white/15 rounded-full shrink-0" />
                      <span className="text-sm">{text}</span>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Closing quote + CTA */}
            <FadeIn delay={0.1}>
              <div className="border-t border-white/[0.06] pt-16 text-center">
                <p className="text-xl text-white/50 italic mb-10 max-w-2xl mx-auto leading-relaxed">
                  &ldquo;Building a quick hackathon prototype is about <strong className="text-white/80">speed of delivery</strong>; turning that prototype into a production platform is about <strong className="text-white/80">architectural integrity</strong>.&rdquo;
                </p>
                <a 
                  href="https://github.com/kishor-2646/GreenWave.git" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2.5 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                  <Github className="w-5 h-5" /> View Project Repository
                </a>
              </div>
            </FadeIn>
          </section>
        </FadeIn>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs text-white/20">
          <span>© {new Date().getFullYear()} Kishor Kumar S</span>
          <Link href="/" className="hover:text-white/50 transition-colors duration-300">
            ← Back to Portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}
