/** Work history, newest first. Carried over from the previous version of the site. */
export const experience: { dates: string; role: string; org: string; summary: string; tags?: string[] }[] = [
  {
    dates: "Mar 2026 – Present",
    role: "Backend Infrastructure & ML Intern",
    org: "Koita Centre for Digital Health, Ashoka University · Haryana, India",
    summary: "Working on backend infrastructure and machine learning systems for digital health initiatives.",
  },
  {
    dates: "Mar 2026 – Apr 2026",
    role: "Web Developer",
    org: "Elite Research Desk · Zambia",
    summary: "Developed web solutions for the research desk platform.",
  },
  {
    dates: "Oct 2025 – Jan 2026",
    role: "Fullstack Web Developer",
    org: "Sycamore Royals International · Uganda",
    summary:
      "Architected an NGO donation platform with Cloudflare Workers, achieving 1,000+ organic visitors in launch quarter, 38% faster page loads, 32% smaller JS bundles, 95+ Lighthouse score, and 100% elimination of pre-launch vulnerabilities.",
    tags: ["React.js", "Cloudflare Workers", "Node.js", "Spring Boot", "Figma"],
  },
  {
    dates: "Aug 2025 – Mar 2026",
    role: "Programs Director & Full Stack Engineer",
    org: "EcoLight Innovation · Zambia",
    summary:
      "Engineered a production-grade Next.js platform serving 1,000+ rural residents with 85% mobile adoption. Implemented JWT auth, bcrypt, RBAC, and encrypted data transmission. Maintained 99.9% uptime with zero-downtime deployments.",
    tags: ["Next.js", "React.js", "Node.js", "JWT", "bcrypt", "CI/CD"],
  },
  {
    dates: "Sep 2024 – Nov 2024",
    role: "Business Analyst",
    org: "HP Tech Ventures (Corporate Venture Capital & Business Analytics)",
    summary: "Conducted venture analysis and business intelligence reporting for tech startups.",
    tags: ["Business analytics", "Market research"],
  },
  {
    dates: "Jun 2024 – Jul 2024",
    role: "Remote Extern",
    org: "National Geographic Society + The Nature Conservancy",
    summary:
      "Conducted primary and secondary research on marine conservation. Produced an ArcGIS StoryMap article and applied visual storytelling to communicate marine issues.",
    tags: ["ArcGIS", "Research"],
  },
  {
    dates: "Feb 2024 – Apr 2024",
    role: "Gaming Market Research & Data Analyst",
    org: "Mobalytics",
    summary:
      "Analyzed gaming data for player performance insights. Developed optimized SQL queries for in-game data retrieval and maintained gaming analytics databases.",
    tags: ["SQL", "Gaming analytics"],
  },
  {
    dates: "Dec 2023 – Jan 2024",
    role: "Software Tester",
    org: "Softek · Monterrey, Mexico",
    summary: "Software quality assurance and testing for production applications.",
  },
  {
    dates: "Jan 2021 – Aug 2021",
    role: "Information Technology Intern",
    org: "Kucetekela Foundation · Lusaka, Zambia",
    summary: "Provided IT support and contributed to digital systems for the foundation.",
  },
];

export const education: { title: string; place: string; dates: string }[] = [
  { title: "B.Sc. (Hons) Computer Science", place: "Ashoka University · Sonipat, Haryana, India", dates: "2025" },
  { title: "IGCSE · Science & IT", place: "Chalo Trust School", dates: "2019 – 2020" },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5 / CSS3", "Responsive design"] },
  { group: "Backend", items: ["Node.js", "Python", "Spring Boot", "C / C++", "Flutter"] },
  { group: "Data & ML", items: ["SQL & database design", "Machine learning", "Power BI / Tableau", "Market research & analytics"] },
  {
    group: "Security & DevOps",
    items: ["Web & network pen-testing", "JWT / RBAC / bcrypt", "Cloudflare Workers & Pages", "Linux", "Git & CI/CD", "AWS"],
  },
];

/** Scrolling stack strip under the hero. */
export const marquee = [
  "TypeScript",
  "Next.js",
  "React",
  "Python",
  "Node.js",
  "Spring Boot",
  "SQL",
  "XGBoost",
  "Reinforcement learning",
  "Power BI",
  "Tableau",
  "Cloudflare Workers",
  "AWS",
  "Flutter",
  "HTML5 Canvas",
  "Linux",
];
