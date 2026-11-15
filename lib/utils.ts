import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const parse = (iso: string) => {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d || 1));
};

// en-US gives three-letter months everywhere ("Sep", where en-GB writes "Sept").
const month = (d: Date) => new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(d);

/** "25 Oct 2026", independent of the viewer's timezone. */
export function formatDate(iso: string) {
  const d = parse(iso);
  return `${d.getUTCDate()} ${month(d)} ${d.getUTCFullYear()}`;
}

/** "Oct 2026" */
export function formatMonth(iso: string) {
  const d = parse(iso);
  return `${month(d)} ${d.getUTCFullYear()}`;
}
