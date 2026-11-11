import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { profile } from "@/lib/site";

/** Shared by app/opengraph-image.tsx and app/twitter-image.tsx: the card shown when a link is shared. */
export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${profile.name}, ${profile.role}`;

const TEXT = {
  bold: "LazarousMoyo",
  regular: "FULL STACK DEVELOPER · THE SALT INC.React · Node.js · Spring Boot · PostgreSQL · AWS · Kotlinlazarousmoyo.vercel.app",
};

async function googleFont(family: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    return src ? await (await fetch(src[1])).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function renderOgImage() {
  const [bold, mono, photo] = await Promise.all([
    googleFont("Geist:wght@600", TEXT.bold),
    googleFont("Geist+Mono:wght@400", TEXT.regular),
    readFile(path.join(process.cwd(), "public/images/profile.jpg")).catch(() => null),
  ]);
  const fonts = [
    bold && { name: "Geist", data: bold, weight: 600 as const, style: "normal" as const },
    mono && { name: "GeistMono", data: mono, weight: 400 as const, style: "normal" as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  const accent = "#3EE0CF";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0A0D12", position: "relative", padding: "64px 72px" }}>
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -160,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(62,224,207,0.18), rgba(62,224,207,0) 65%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontFamily: "GeistMono", fontSize: 20, letterSpacing: 4, color: accent }}>
            FULL STACK DEVELOPER · THE SALT INC.
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Geist" }}>
            <div style={{ fontSize: 132, fontWeight: 600, color: "#ECEEF1", letterSpacing: -6, lineHeight: 0.92 }}>Lazarous</div>
            <div style={{ fontSize: 132, fontWeight: 600, color: accent, letterSpacing: -6, lineHeight: 0.92 }}>Moyo</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: "GeistMono" }}>
            <div style={{ fontSize: 24, color: "#A3AAB5" }}>React · Node.js · Spring Boot · PostgreSQL · AWS · Kotlin</div>
            <div style={{ fontSize: 22, color: "#6E7682" }}>lazarousmoyo.vercel.app</div>
          </div>
        </div>
        {photo && (
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`data:image/jpeg;base64,${photo.toString("base64")}`}
              width={300}
              height={300}
              alt=""
              style={{ borderRadius: 32, border: "2px solid rgba(255,255,255,0.12)", objectFit: "cover" }}
            />
          </div>
        )}
      </div>
    ),
    { ...ogSize, fonts: fonts.length ? fonts : undefined },
  );
}
