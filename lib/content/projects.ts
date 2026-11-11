export type ProjectVisual =
  /** A screenshot shown whole inside a browser window, with the site's address in the bar. */
  | { kind: "screenshot"; src: string; alt: string; width: number; height: number; url: string }
  /** An illustration shown inside an app window. */
  | { kind: "audio-midi"; title: string }
  | { kind: "ventilation"; title: string };

export interface Project {
  /** Public GitHub repository under Sh0tgvn45off, for live stats and the Code link. Omit for private work. */
  repo?: string;
  title: string;
  kind: string;
  status: { label: string; tone: "live" | "progress" | "research" };
  summary: string;
  highlights: string[];
  stack: string[];
  visual: ProjectVisual;
  links: { live?: string; post?: string };
  /** Shown in place of GitHub stats when there's no public repo. */
  note?: string;
}

/** Descriptions come from each repo's README and the related LinkedIn posts. */
export const projects: Project[] = [
  {
    // Built and maintained at The Salt Inc.; private codebase.
    title: "MindLink by The Salt Inc.",
    kind: "AI product · The Salt Inc.",
    status: { label: "Live · maintained", tone: "live" },
    summary:
      "An AI-powered psychometric insights platform that helps marketing teams understand, target and speak to audiences by personality. I build on it, maintain it and ship its updates as a full-stack developer at The Salt Inc.",
    highlights: [
      "AI co-pilot with psychological intelligence, driven by plain-language prompts",
      "Audience network and analysis: find and decode psychometric profiles, with exports to ad platforms",
      "MindMatch Score rates how well messaging and ads resonate with each personality type",
      "A proprietary model of consumer psychology across five dimensions, from ambitions to self-expression",
    ],
    stack: ["AI", "Psychometrics", "Audience analytics", "Ad-platform integrations"],
    visual: {
      kind: "screenshot",
      src: "/images/projects/mindlink.jpg",
      alt: "MindLink home page: AI-powered psychometric insights panel for marketing efficiency",
      width: 1440,
      height: 900,
      url: "saltmindlink.com",
    },
    links: { live: "https://saltmindlink.com" },
    note: "Product at The Salt Inc. · private codebase",
  },
  {
    // Private repository: no stats or Code link, just the live site.
    title: "Zikomo Mentorship Africa",
    kind: "Full-stack platform · Freelance",
    status: { label: "Live", tone: "live" },
    summary:
      "A full-stack platform for a structured, year-long mentorship programme connecting young Africans with mentors: applications, admin review, mentor–mentee matching, session tracking and a blog.",
    highlights: [
      "Next.js 16 with Supabase (Postgres, Auth, Storage) and Drizzle ORM",
      "Role-based admin and portal dashboards with approval-gated login and soft-delete with an audit trail",
      "Privacy-first contact sharing, with visibility rules enforced at the data layer",
      "Fixed a live stored-XSS vulnerability; new indexes cut admin dashboard query round-trips by more than half",
    ],
    stack: ["Next.js 16", "Supabase", "PostgreSQL", "Drizzle ORM"],
    visual: {
      kind: "screenshot",
      src: "/images/projects/zikomo.jpg",
      alt: "Home page of Zikomo Mentorship Africa: Every young person deserves a guide",
      width: 1440,
      height: 900,
      url: "www.zikomomentorship.com",
    },
    links: { live: "https://www.zikomomentorship.com" },
    note: "Client project · private repository",
  },
  {
    repo: "ashoka-archives-the-maze",
    title: "Ashoka Archives: The Maze",
    kind: "Game · Algorithms",
    status: { label: "Live · exhibited", tone: "live" },
    summary:
      "A procedurally generated maze game that turns the Ashoka University Archives of Contemporary India into a playable story, built for the course Visualising from the Archive.",
    highlights: [
      "Multi-path mazes from a recursive backtracker plus braid algorithm",
      "Guards that chase with BFS pathfinding; fumigation gas that BFS flood-fills the corridors",
      "25 Curiosity Points unlock real archive facts; global leaderboard on Google Apps Script",
      "Exhibited live at the VA/MS Exhibition 2026, Ashoka University",
    ],
    stack: ["JavaScript", "HTML5 Canvas", "BFS", "Gamepad API", "Apps Script"],
    visual: {
      kind: "screenshot",
      src: "/images/projects/ashoka-maze.jpg",
      alt: "Title screen of Ashoka Archives: The Maze, with the map key, controls and minimap around the maze",
      width: 1440,
      height: 900,
      url: "ashoka-archives-the-maze.vercel.app",
    },
    links: {
      live: "https://ashoka-archives-the-maze.vercel.app",
      post: "https://www.linkedin.com/posts/lazarous-moyo_gamedev-javascript-html5canvas-ugcPost-7460763433529987073-XMFh/",
    },
  },
  {
    repo: "audio-to-instrument",
    title: "Audio to Instrument",
    kind: "Audio DSP · Plugin",
    status: { label: "In progress · v0.1", tone: "progress" },
    summary:
      "Turns a clean, single-melody recording (singing, humming, whistling, a guitar line) into MIDI notes. A Python research prototype on its way to a C++/JUCE VST3 plugin.",
    highlights: [
      "pYIN pitch detection with confidence filtering and smoothing",
      "Onset detection and note segmentation with change hysteresis",
      "RMS-based velocity estimation and MIDI export",
      "Next: move the stable engine into C++/JUCE as a VST3 plugin",
    ],
    stack: ["Python", "pYIN", "MIDI", "DSP", "JUCE (planned)"],
    visual: { kind: "audio-midi", title: "audio-to-instrument · v0.1 prototype" },
    links: {},
  },
  {
    repo: "mechanical_power_personalisation",
    title: "Mechanical Power Personalisation",
    kind: "Machine learning · Healthcare",
    status: { label: "Research", tone: "research" },
    summary:
      "A clinical decision-support prototype that uses offline reinforcement learning to suggest mechanical-power adjustments for ICU ventilation, aiming to limit lung injury while keeping oxygenation adequate.",
    highlights: [
      "Three strategies: static XGBoost, time-window XGBoost, and a Conservative Q-Learning agent",
      "27-dimension patient state and five discrete mechanical-power actions",
      "Seven hard-coded clinical safety rules (ARDSNet/ERS) the agent can't override",
      "Built on MIMIC-III, with off-policy evaluation and subgroup analysis",
    ],
    stack: ["Python", "XGBoost", "Offline RL (CQL)", "MIMIC-III", "Jupyter"],
    visual: { kind: "ventilation", title: "mp_personalisation_pipeline.ipynb" },
    links: {},
  },
  {
    repo: "ecolightinnovation.com",
    title: "EcoLight Innovations",
    kind: "Web · Social impact",
    status: { label: "Live", tone: "live" },
    summary:
      "Website for a Zambian social enterprise offering solar energy as a monthly subscription, with an impact calculator, subscription packages and stories from the field.",
    highlights: [
      "Next.js 15, TypeScript, Tailwind CSS and Framer Motion",
      "Kerosene-vs-solar comparison slider and a live impact calculator",
      "Server-validated enquiry form that forwards to Google Apps Script",
      "Deployed on Vercel with a custom domain",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    visual: {
      kind: "screenshot",
      src: "/images/projects/ecolight.jpg",
      alt: "Home page of the EcoLight Innovations website: Light, beyond the grid",
      width: 1440,
      height: 900,
      url: "www.ecolightinnovation.com",
    },
    links: { live: "https://www.ecolightinnovation.com" },
  },
  {
    title: "Elite Research Desk",
    kind: "Web · Client project",
    status: { label: "Live", tone: "live" },
    summary:
      "Website for an academic-support service for university students in Zambia: editing, thesis coaching and data-analysis consulting, with services, pricing and a guided enquiry flow.",
    highlights: [
      "Next.js 15, TypeScript, Tailwind CSS and Framer Motion, in a light Apple-style design",
      "Interactive example document showing editing, coaching and data-analysis support",
      "Three-step enquiry form with file upload, validated on the server and forwarded to Google Apps Script",
      "Generated social preview images and structured data for search",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    visual: {
      kind: "screenshot",
      src: "/images/projects/elite-research-desk.jpg",
      alt: "Elite Research Desk home page: Your work, at its very best",
      width: 1440,
      height: 900,
      url: "www.eliteresearchdesk.com",
    },
    links: { live: "https://www.eliteresearchdesk.com" },
    note: "Client project · private repository",
  },
];

/** Smaller pieces that still deserve a link. */
export const earlierWork: { title: string; note: string; href: string; label: string }[] = [
  {
    title: "Capture Note Assistant",
    note: "Voice-to-notes web app with AI formatting",
    href: "/Capture Note Assistant/index.html",
    label: "Demo",
  },
  {
    title: "Sickle Cell Inheritance Simulation",
    note: "Interactive genetics simulator across generations",
    href: "/sickle-cell-inheritance-simulation/sickle-cell-simulation.html",
    label: "Demo",
  },
  {
    title: "NatGeo ArcGIS StoryMap",
    note: "Marine-conservation geo-narrative, National Geographic externship",
    href: "https://storymaps.arcgis.com/stories/bb5a88f8afe34440b307cce34a972c38",
    label: "Story",
  },
];
