/** Work history from LinkedIn, newest first. */

export interface Role {
  dates: string;
  role: string;
  org: string;
  /** Employment type and location, e.g. "Freelance · Remote". */
  meta?: string;
  summary?: string;
  bullets?: string[];
  tags?: string[];
}

/** Software engineering roles, shown in full. */
export const engineering: Role[] = [
  {
    dates: "Jun 2026 – Present",
    role: "Full Stack Developer",
    org: "The Salt Inc.",
    meta: "Mumbai, Maharashtra, India",
  },
  {
    dates: "Jul 2026 – Nov 2026",
    role: "Full Stack Engineer (project)",
    org: "Zikomo Mentorship Program",
    meta: "Freelance · Remote (Dallas County, Texas)",
    bullets: [
      "Architected and shipped a full-stack mentorship platform for Zikomo Mentorship Africa (Next.js 16, Supabase Postgres/Auth/Storage, Drizzle ORM): application intake, admin review pipeline, mentor–mentee matching, session tracking and a blog/CMS.",
      "Built role-based admin and portal dashboards with approval-gated login, archive/soft-delete with an audit trail, self-service profile photos with server-side image processing, and password management for every role.",
      "Designed privacy-first contact sharing: matched mentors and mentees opt in to share phone and WhatsApp details, with visibility enforced at the data layer, not just the UI.",
      "Found and fixed a live stored-XSS vulnerability and a production-breaking serverless dependency issue, restoring uptime with zero data loss.",
      "Added missing database indexes, cutting admin dashboard query round-trips by more than half, and introduced streaming loading states across the app.",
    ],
    tags: ["Next.js 16", "Supabase", "PostgreSQL", "Drizzle ORM"],
  },
  {
    dates: "Mar 2026 – Jun 2026",
    role: "Backend Infrastructure & Machine Learning Intern",
    org: "Koita Centre for Digital Health, Ashoka University (KCDH-A)",
    meta: "Internship · Haryana, India",
    summary: "Backend infrastructure and machine-learning work for digital health initiatives.",
    tags: ["Machine learning", "Project management"],
  },
  {
    dates: "Mar 2026 – Apr 2026",
    role: "Web Developer",
    org: "Elite Research Desk · Zambia",
    meta: "Freelance · Remote",
    summary: "Built the Elite Research Desk website: an HTML, CSS and JavaScript front end with a Google Apps Script and Node.js back end.",
    tags: ["Web development", "HTML5"],
  },
  {
    dates: "Oct 2025 – Mar 2026",
    role: "Programs Director",
    org: "EcoLight Innovation",
    meta: "Remote",
    tags: ["Data analysis", "Problem solving"],
  },
  {
    dates: "Aug 2025 – Mar 2026",
    role: "Full Stack Engineer",
    org: "EcoLight Innovation",
    meta: "Hybrid",
    summary:
      "Engineered a production-grade full-stack web application serving 1,000+ rural residents with Next.js server-side rendering, optimised for low-bandwidth use (85% mobile adoption). Implemented JWT authentication, bcrypt, role-based access control and encrypted data transmission, with zero-downtime deployments and 99.9% uptime.",
    tags: ["Next.js", "React.js", "JWT", "RBAC", "CI/CD"],
  },
  {
    dates: "Oct 2025 – Jan 2026",
    role: "Fullstack Web Developer",
    org: "Sycamore Royals International · Uganda",
    meta: "Part-time · Remote",
    summary:
      "Built an NGO donation platform from the ground up with React, Cloudflare Workers and a Node.js/Spring Boot back end: 1,000+ organic visitors in the launch quarter, 38% faster average page loads, 32% smaller JavaScript bundles, 95+ Lighthouse scores, and every pre-launch security finding resolved.",
    tags: ["React.js", "Cloudflare Workers", "Node.js", "Spring Boot", "Figma"],
  },
];

/** Everything else, in LinkedIn's order, shown as compact rows. */
export const otherRoles: Role[] = [
  { dates: "May 2025 – Aug 2025", role: "Sales Executive", org: "Bookworld Zambia", meta: "Full-time · Lusaka, Zambia", summary: "Sales and marketing strategy." },
  {
    dates: "Aug 2024 – May 2025",
    role: "Resident Assistant",
    org: "Ashoka University",
    meta: "Sonipat, Haryana, India",
    summary: "Managed a floor of 70 residents: community events, conflict resolution, emergency response and resident documentation.",
  },
  { dates: "Mar 2025 – Apr 2025", role: "Software Platform Beta Tester", org: "Ministry of Technology", meta: "Part-time · Hybrid", summary: "Manual testing, reporting and analysis." },
  { dates: "May 2024 – Dec 2024", role: "Senior Student Ambassador", org: "Extern", summary: "Career counselling." },
  { dates: "Sep 2024 – Nov 2024", role: "Research Assistant", org: "YouthClimate Connect", summary: "Research and technical documentation." },
  {
    dates: "Sep 2024 – Nov 2024",
    role: "Business Analyst",
    org: "HP Tech Ventures: Corporate Venture Capital & Business Analytics",
    meta: "Remote",
    summary: "Marketing strategy and qualitative research.",
  },
  {
    dates: "Jun 2024 – Jul 2024",
    role: "Remote Extern",
    org: "National Geographic Society + The Nature Conservancy",
    meta: "Internship · Remote",
    summary: "Researched marine-conservation issues and protected areas, and told the story through an ArcGIS StoryMap.",
  },
  { dates: "Jan 2024 – May 2024", role: "Student Ambassador", org: "Paragon One", meta: "Remote", summary: "Student welfare and career counselling." },
  {
    dates: "Jan 2024",
    role: "Market Research Analyst, AI-Powered Product Discovery Externship Lab",
    org: "Paragon One",
    meta: "Internship · Remote",
    summary: "Product market research, SWOT analysis, usability testing, bug and defect reporting, and end-user interviews.",
  },
  {
    dates: "Feb 2024 – Apr 2024",
    role: "Data Analyst, Gaming Market Research & Analytics Externship",
    org: "Mobalytics",
    meta: "Internship · Remote",
    summary: "Analysed gaming data for player-performance insights; built and optimised SQL queries and analytics databases.",
  },
  { dates: "Dec 2023 – Jan 2024", role: "Software Testing Intern", org: "Softek", meta: "Remote · Monterrey, Mexico", summary: "DNS and systems engineering." },
  {
    dates: "Jan 2021 – Aug 2021",
    role: "Information Technology Intern",
    org: "Kucetekela Foundation",
    meta: "Lusaka, Zambia",
    summary: "Network administration and IT infrastructure.",
  },
  { dates: "Dec 2020 – Jan 2021", role: "Sales Assistant", org: "Bookworld Zambia", meta: "Lusaka, Zambia", summary: "Store management and marketing." },
  { dates: "Jul 2018 – Sep 2018", role: "Audit Intern", org: "Legal Aid Board", meta: "Lusaka, Zambia", summary: "Translation and data entry." },
];

export const education: { title: string; place: string; dates: string }[] = [
  { title: "B.Sc. (Hons) Computer Science", place: "Ashoka University · Sonipat, Haryana, India", dates: "2025" },
  { title: "IGCSE · Science & IT", place: "Chalo Trust School", dates: "2019 – 2020" },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5 / CSS3", "Responsive design"] },
  { group: "Backend", items: ["Node.js", "Spring Boot", "Python", "Supabase", "Drizzle ORM", "C / C++"] },
  { group: "Mobile", items: ["Kotlin", "Android SDK", "Flutter"] },
  { group: "Data & ML", items: ["PostgreSQL", "SQL & database design", "Machine learning", "Power BI / Tableau", "Market research"] },
  {
    group: "Cloud & security",
    items: ["AWS", "Cloudflare Workers & Pages", "JWT / RBAC / bcrypt", "Web & network pen-testing", "Linux", "Git & CI/CD"],
  },
];

/** Scrolling stack strip under the hero. */
export const marquee = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Spring Boot",
  "PostgreSQL",
  "Supabase",
  "AWS",
  "Kotlin",
  "Android SDK",
  "Python",
  "XGBoost",
  "Reinforcement learning",
  "Cloudflare Workers",
  "Flutter",
  "HTML5 Canvas",
];
