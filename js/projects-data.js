/**
 * Modular Projects Database
 * 
 * HOW TO USE:
 * - Plug in or out projects by toggling `active: true` or `active: false`.
 * - Assign relevant roles in `roles` array (e.g. 'software-engineering', 'backend', 'fullstack', 'data-ai').
 * - Clicking "View Case Study" renders the dedicated project page populated with the `caseStudy` object below.
 */

const projectsData = [
  {
    id: "distributed-task-runner",
    title: "Distributed Asynchronous Task Engine",
    tagline: "High-throughput distributed background worker and task queue system with Redis and Node.js.",
    active: true,
    featured: true,
    roles: ["software-engineering", "backend"],
    period: "Spring 2025",
    tags: ["Node.js", "Redis", "TypeScript", "Docker", "Prometheus", "REST API"],
    accentColor: "from-blue-600 to-indigo-700",
    metrics: [
      { label: "Throughput", value: "8,500+ tasks/sec" },
      { label: "P99 Latency", value: "< 24ms" },
      { label: "Worker Resiliency", value: "Automatic failover" }
    ],
    summary: "Engineered a scalable, event-driven background job execution engine supporting prioritized scheduling, exponential retry policies, and dead-letter queueing.",
    links: {
      github: "https://github.com/Timothy-Loh-bc/distributed-task-engine",
      demo: "https://github.com/Timothy-Loh-bc"
    },
    caseStudy: {
      overview: "In modern distributed architectures, long-running processes (image resizing, notification fanouts, report compilation) shouldn't block user-facing HTTP request-response cycles. I engineered this distributed task runner to provide lightweight, fault-tolerant background scheduling with Redis atomic primitives.",
      problem: "Traditional synchronous API architectures suffer severe timeouts, memory bloat, and degraded user experience when handling bursty computational tasks.",
      solution: "Implemented an asynchronous worker pool with Redis Streams and Lua scripts to ensure exactly-once delivery guarantees, heartbeating for worker crash detection, and dynamic worker autoscaling.",
      architecture: [
        "API Gateway & Producer: Node.js/TypeScript REST service validating and enqueuing tasks into Redis Streams with priority weighting.",
        "Worker Cluster: Independent worker daemons polling tasks using Redis consumer groups, executing sandboxed job handlers.",
        "Reliability Engine: Dead-Letter Queue (DLQ) with exponential backoff retry jitter to prevent thundering herd problems on failing external services.",
        "Observability: Prometheus metrics exporter scraping queue depth, worker CPU/memory usage, and task execution duration, visualized on Grafana."
      ],
      keyFeatures: [
        "Priority-based queue scheduling (Urgent, High, Normal, Batch).",
        "At-least-once task execution with idempotent deduplication keys.",
        "Distributed lock mechanisms using Redis Redlock algorithm to prevent race conditions.",
        "Heartbeat monitoring: Stalled workers automatically forfeit lock leases to healthy workers within 5 seconds.",
        "Interactive CLI & Web Dashboard for real-time queue inspection and manual task re-triggering."
      ],
      technicalChallenges: [
        {
          challenge: "Preventing task starvation for lower-priority jobs during high-volume spikes.",
          resolution: "Implemented a weighted-round-robin token bucket algorithm across priority queues, ensuring high-priority jobs execute first while guaranteeing low-priority tasks receive guaranteed execution slots."
        },
        {
          challenge: "Handling worker crashes mid-task without duplicate processing side-effects.",
          resolution: "Utilized Redis Pending Entries List (PEL) coupled with consumer group ack acknowledgments and client-side transaction logs for strict state reconciliation."
        }
      ],
      technologies: {
        "Core & Runtime": ["Node.js", "TypeScript", "ES6+"],
        "Messaging & Caching": ["Redis (Streams, Pub/Sub, Lua scripts)"],
        "Containerization & Ops": ["Docker Compose", "Prometheus", "Grafana"],
        "Testing": ["Jest", "Supertest", "k6 Load Testing"]
      },
      learnings: "Deepened practical mastery in distributed concurrency, eventual consistency models, atomic data operations in Redis, and designing software resilient to partial system failures."
    }
  },

  {
    id: "collaborative-workspace",
    title: "Synapse: Real-Time Collaborative Workspace",
    tagline: "Full-stack real-time document editing and canvas application powered by WebSockets and CRDTs.",
    active: true,
    featured: true,
    roles: ["software-engineering", "fullstack", "frontend"],
    period: "Fall 2024",
    tags: ["React", "WebSockets", "Node.js", "CRDT (Yjs)", "Tailwind CSS", "MongoDB"],
    accentColor: "from-purple-600 to-pink-600",
    metrics: [
      { label: "Sync Latency", value: "< 15ms" },
      { label: "Simultaneous Users", value: "50+ per room" },
      { label: "Conflict Rate", value: "0% loss (CRDT)" }
    ],
    summary: "Built an interactive collaborative text editor and virtual whiteboard with multi-cursor presence, revision history, and conflict-free peer synchronization.",
    links: {
      github: "https://github.com/Timothy-Loh-bc/synapse-collaborative-workspace",
      demo: "https://github.com/Timothy-Loh-bc"
    },
    caseStudy: {
      overview: "Synapse enables distributed teams to co-author markdown notes and brainstorm on a collaborative canvas with zero sync lag. Built to explore peer-to-peer real-time algorithms, state replication, and low-latency frontend state management.",
      problem: "Co-authoring documents often leads to lock contention, clobbered edits, and jarring UI desynchronization when users edit simultaneously on unstable networks.",
      solution: "Utilized Conflict-Free Replicated Data Types (CRDTs via Yjs) over bidirectional WebSockets, ensuring seamless peer convergence without requiring centralized operational transformation servers.",
      architecture: [
        "Frontend: React 18, Tailwind CSS, customized TipTap/ProseMirror editor engine bound to Yjs shared documents.",
        "Real-Time Transport: WebSocket layer transmitting binary delta updates with fallback to long-polling.",
        "Backend & Persistence: Express.js server handling JWT auth, room authorization, and periodic document snapshots to MongoDB.",
        "Awareness Protocol: Ephemeral user presence broadcasting cursor coordinates, selected text ranges, and user status indicators."
      ],
      keyFeatures: [
        "Live multi-user cursor tracking with personalized color avatars and names.",
        "Offline-first support: Edits made while disconnected automatically synchronize upon reconnection.",
        "Full document version history with snapshot diffing and point-in-time restoration.",
        "Rich text formatting, code block syntax highlighting, and export to Markdown/PDF."
      ],
      technicalChallenges: [
        {
          challenge: "Preventing UI jank and cursor jumping during rapid concurrent remote edits.",
          resolution: "Decoupled local user typing from remote update rendering by buffering remote delta operations into microtask queues and applying them between browser frame repaints."
        },
        {
          challenge: "Scaling WebSocket connection memory footprint under high concurrency.",
          resolution: "Constructed lightweight room state managers that prune inactive listener connections and compress binary CRDT payloads using Brotli."
        }
      ],
      technologies: {
        "Frontend": ["React", "TypeScript", "Tailwind CSS", "TipTap", "Yjs"],
        "Backend": ["Node.js", "Express", "WebSocket (ws)"],
        "Database": ["MongoDB", "Mongoose"],
        "Deployment": ["Render", "Vercel"]
      },
      learnings: "Mastered distributed state management, WebSocket lifecycle and reconnection handling, CRDT data structures, and optimizing React render cycles for high-frequency streaming events."
    }
  },

  {
    id: "predictive-analytics-platform",
    title: "InsightPulse: Financial Time-Series Analytics",
    tagline: "End-to-end data pipeline & predictive dashboard for equity volatility and anomaly detection.",
    active: true,
    featured: true,
    roles: ["software-engineering", "backend", "data-ai"],
    period: "Summer 2024",
    tags: ["Python", "FastAPI", "Pandas", "Scikit-Learn", "PostgreSQL", "Chart.js"],
    accentColor: "from-emerald-600 to-teal-700",
    metrics: [
      { label: "Data Ingested", value: "2.4M+ datapoints" },
      { label: "Prediction Accuracy", value: "87.4% directional" },
      { label: "Query Speed", value: "3x faster with indexing" }
    ],
    summary: "Architected a Python data pipeline that ingests daily market data, calculates statistical momentum indicators, detects price anomalies, and renders interactive analytical visualizations.",
    links: {
      github: "https://github.com/Timothy-Loh-bc/insightpulse-analytics",
      demo: "https://github.com/Timothy-Loh-bc"
    },
    caseStudy: {
      overview: "InsightPulse provides automated anomaly detection and technical trend forecasting for quantitative equity analysis. Designed to bridge robust data engineering pipelines with clean API delivery.",
      problem: "Analyzing historical market volatility across thousands of securities requires computationally intensive time-series transformations that bog down standard relational database queries.",
      solution: "Engineered an ETL pipeline using Python, Pandas, and PostgreSQL TimescaleDB hypertables, paired with an asynchronous FastAPI endpoint delivering cached analytical projections.",
      architecture: [
        "Data Pipeline: Scheduled Python jobs fetching market feeds, validating schema integrity, and cleaning missing data.",
        "Statistical Modeling: Implemented moving average convergence divergence (MACD), Bollinger Bands, and Isolation Forest for anomaly identification.",
        "Backend API: Asynchronous FastAPI server serving aggregated historical metrics with server-side caching.",
        "Interactive Dashboard: Responsive visualization interface rendering multi-timeframe charts and volatility alerts."
      ],
      keyFeatures: [
        "Automated outlier and price spike detection using unsupervised machine learning (Isolation Forests).",
        "Dynamic rolling window calculations for RSI, SMA, and volatility metrics.",
        "REST API with comprehensive OpenAPI/Swagger documentation and query parameter filtering.",
        "Exportable data reports in JSON and CSV formats."
      ],
      technicalChallenges: [
        {
          challenge: "Sub-second query performance across multi-million row time-series tables.",
          resolution: "Created composite multi-column indexes on (symbol, timestamp DESC) and partitioned time ranges into monthly chunks, cutting query latency from 1.8s down to 65ms."
        }
      ],
      technologies: {
        "Languages & Frameworks": ["Python", "FastAPI", "SQL"],
        "Data Science & ML": ["Pandas", "NumPy", "Scikit-Learn", "Isolation Forest"],
        "Storage": ["PostgreSQL", "TimescaleDB"],
        "Frontend & Viz": ["HTML5/CSS3", "JavaScript", "Chart.js"]
      },
      learnings: "Gained hands-on experience in time-series database optimizations, asynchronous Python web development, and practical machine learning deployment."
    }
  },

  {
    id: "microservices-ecommerce-api",
    title: "CloudMart: Scalable Microservices E-Commerce API",
    tagline: "Resilient e-commerce backend built with modular microservices, JWT authentication, and Stripe payments.",
    active: true,
    featured: false,
    roles: ["software-engineering", "backend", "fullstack"],
    period: "Spring 2024",
    tags: ["Node.js", "Express", "PostgreSQL", "Stripe API", "Docker", "JWT"],
    accentColor: "from-amber-600 to-orange-700",
    metrics: [
      { label: "Service Uptime", value: "99.9%" },
      { label: "Security", value: "OWASP Compliant" },
      { label: "Payment Flow", value: "Stripe Webhook Verified" }
    ],
    summary: "Built a production-grade REST API backend featuring modular services for authentication, catalog management, cart persistence, and asynchronous Stripe webhook reconciliation.",
    links: {
      github: "https://github.com/Timothy-Loh-bc/cloudmart-microservices-api",
      demo: "https://github.com/Timothy-Loh-bc"
    },
    caseStudy: {
      overview: "CloudMart is an e-commerce backend platform built to demonstrate production-ready architectural patterns: separation of concerns, secure transaction isolation, and decoupled services.",
      problem: "Monolithic e-commerce backends often risk cascading failures where payment provider delays or inventory lock contention freeze the entire store catalog.",
      solution: "Separated the domain logic into distinct service modules (Auth, Inventory, Orders, Payments) with database connection pooling and asynchronous transaction handling.",
      architecture: [
        "Authentication Service: Role-based access control (RBAC), Argon2 password hashing, and rotating JWT refresh tokens.",
        "Order & Cart Service: ACID-compliant transaction blocks in PostgreSQL ensuring stock decrements never oversell inventory.",
        "Payment Gateway: Stripe Checkout integration with cryptographically signed webhook handlers for asynchronous fulfillment."
      ],
      keyFeatures: [
        "Strict database transaction rollbacks on payment or inventory allocation failure.",
        "Idempotent order placement preventing accidental double charges.",
        "Full suite of integration tests covering edge cases in checkout flows."
      ],
      technicalChallenges: [
        {
          challenge: "Preventing race conditions where multiple users buy the last item in stock concurrently.",
          resolution: "Implemented PostgreSQL SELECT FOR UPDATE row-level locking inside isolated transaction blocks, guaranteeing atomic inventory verification."
        }
      ],
      technologies: {
        "Backend": ["Node.js", "Express.js", "TypeScript"],
        "Database": ["PostgreSQL", "Prisma ORM"],
        "Security & Auth": ["Argon2", "JWT", "Helmet", "Express-Rate-Limit"],
        "Payment": ["Stripe API & Webhooks"]
      },
      learnings: "Mastered relational transaction management, webhook security verification, and designing APIs that gracefully handle unexpected payment timeouts."
    }
  }
];

// Helper functions for easy filtering and retrieval
const ProjectsManager = {
  // Returns all active projects
  getActiveProjects() {
    return projectsData.filter(project => project.active);
  },

  // Returns projects filtered by role ID
  getProjectsByRole(roleId) {
    if (!roleId || roleId === "all") {
      return this.getActiveProjects();
    }
    return this.getActiveProjects().filter(project => 
      project.roles && project.roles.includes(roleId.toLowerCase())
    );
  },

  // Find a specific project by id/slug
  getProjectById(id) {
    return projectsData.find(project => project.id.toLowerCase() === id.toLowerCase());
  }
};

// Export for module or global window usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = { projectsData, ProjectsManager };
} else {
  window.projectsData = projectsData;
  window.ProjectsManager = ProjectsManager;
}
