import { company } from "@/config/company";

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || company.website;
  if (!raw) return null;

  try {
    return new URL(raw);
  } catch {
    return null;
  }
}
