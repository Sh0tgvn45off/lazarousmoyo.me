export const profile = {
  name: "Lazarous Moyo",
  first: "Lazarous",
  last: "Moyo",
  role: "Full Stack Developer at The Salt Inc.",
  headline: "React, Node.js, Spring Boot · PostgreSQL, AWS, Kotlin + Android SDK",
  eyebrow: ["Full-stack developer", "The Salt Inc.", "Mumbai, India", "Zambian", "Ashoka University CS ’25"],
  intro:
    "Full-stack developer at The Salt Inc. in Mumbai. I build clean, user-focused software, from mentorship platforms and community websites to machine-learning systems for digital health.",
  location: "Mumbai, India · from Zambia",
  url: "https://lazarousmoyo.vercel.app",
  email: "moyolazarous45@gmail.com",
  links: {
    github: "https://github.com/Sh0tgvn45off",
    linkedin: "https://www.linkedin.com/in/lazarous-moyo/",
    googleDev: "https://me.developers.google.com/u/117228673861149837249",
  },
} as const;

/** What the "now" terminal panel shows. Facts only, matching LinkedIn. */
export const now = {
  roles: [{ since: "Jun 2026", title: "Full Stack Developer", org: "The Salt Inc. · Mumbai" }],
  building: { since: "Sep 2026", title: "audio-to-instrument", note: "v0.1, Python → VST3" },
  stack: ["React", "Node.js", "Spring Boot", "PostgreSQL", "AWS", "Kotlin + Android SDK"],
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Badges", href: "#badges" },
  { label: "Writing", href: "#writing" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
