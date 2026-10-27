import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  return ["", "/privacidade", "/termos"].map((path) => ({
    url: new URL(path || "/", siteUrl).toString(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.3,
  }));
}
