import type { Config } from "tailwindcss";

/**
 * Colours are CSS variables (RGB channels) defined in globals.css for dark (default) and light themes,
 * so every utility switches theme automatically.
 */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1120px" },
    },
    extend: {
      colors: {
        bg: v("bg"),
        surface: v("surface"),
        raised: v("raised"),
        ink: { DEFAULT: v("ink"), 2: v("ink-2"), 3: v("ink-3") },
        accent: { DEFAULT: v("accent"), ink: v("accent-ink") },
        warm: v("warm"),
        line: v("line"),
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        name: ["clamp(3.5rem, 11vw, 8.5rem)", { lineHeight: "0.9", letterSpacing: "-0.055em" }],
        "display-md": ["clamp(1.875rem, 3.6vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.035em" }],
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        blink: { "0%, 49%": { opacity: "1" }, "50%, 100%": { opacity: "0" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        blink: "blink 1.1s step-end infinite",
      },
      transitionTimingFunction: { apple: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
    },
  },
  plugins: [],
};

export default config;
