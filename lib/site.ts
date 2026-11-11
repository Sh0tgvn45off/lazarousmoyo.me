export const profile = {
  name: "Lazarous Moyo",
  first: "Lazarous",
  last: "Moyo",
  role: "Full-stack developer, data analyst and ML engineer",
  eyebrow: ["Full-stack", "Data", "Machine learning", "Zambian", "Ashoka University CS ’25"],
  intro:
    "I build clean, functional, user-focused software: community web platforms, data pipelines, and machine-learning systems for digital health. Curious about problems, precise about solutions.",
  location: "Zambia · Haryana, India",
  url: "https://lazarousmoyo.vercel.app",
  email: "moyolazarous45@gmail.com",
  links: {
    github: "https://github.com/Sh0tgvn45off",
    linkedin: "https://www.linkedin.com/in/lazarous-moyo/",
    googleDev: "https://me.developers.google.com/u/117228673861149837249",
  },
} as const;

/** What the "now" terminal panel shows. Facts only. */
export const now = {
  roles: [
    {
      since: "Mar 2026",
      title: "Backend Infrastructure & ML Intern",
      org: "Koita Centre for Digital Health, Ashoka University",
    },
  ],
  building: { since: "Sep 2026", title: "audio-to-instrument", note: "v0.1, Python → VST3" },
  stack: ["TypeScript", "Next.js", "Python", "Node.js", "SQL", "ML"],
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Badges", href: "#badges" },
  { label: "Writing", href: "#writing" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
