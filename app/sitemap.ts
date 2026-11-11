import type { MetadataRoute } from "next";
import { profile } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: profile.url, changeFrequency: "weekly", priority: 1 }];
}
