/** Earned badges from the Google Developer Program profile. Artwork is Google's official badge image. */
export const badges: { name: string; earned: string; image: string }[] = [
  { name: "Android Studio · Rabbit releases", earned: "2026-10-25", image: "/images/badges/android-studio-rabbit.png" },
  { name: "Android Studio · Quail releases", earned: "2026-07-14", image: "/images/badges/android-studio-quail.png" },
  { name: "Android Studio User", earned: "2026-07-14", image: "/images/badges/android-studio-user.svg" },
  { name: "Android SDK Platform Tools", earned: "2026-07-14", image: "/images/badges/android-sdk-platform-tools.svg" },
  {
    name: "Joined the Google Developer Program",
    earned: "2025-04-10",
    image: "/images/badges/joined-google-developer-program.svg",
  },
];

/**
 * Achievements from github.com/Sh0tgvn45off?tab=achievements, in the order GitHub shows them.
 * Artwork is GitHub's official badge image. `tier` is the multiplier label GitHub puts beside the name.
 */
export const githubAchievements: { name: string; tier?: string; description: string; image: string }[] = [
  {
    name: "Pair Extraordinaire",
    description: "Coauthored commits on merged pull requests",
    image: "/images/badges/github/pair-extraordinaire.png",
  },
  {
    name: "Pull Shark",
    tier: "x2",
    description: "Opened pull requests that have been merged",
    image: "/images/badges/github/pull-shark.png",
  },
  {
    name: "YOLO",
    description: "Merged a pull request without a code review",
    image: "/images/badges/github/yolo.png",
  },
  {
    name: "Quickdraw",
    description: "Closed an issue or pull request within 5 minutes of opening",
    image: "/images/badges/github/quickdraw.png",
  },
];
