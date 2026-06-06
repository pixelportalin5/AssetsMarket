const SLUG_MAX_LENGTH = 200;

export function slugifyTitle(title: string): string {
  const slug = title
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (slug || "asset").slice(0, SLUG_MAX_LENGTH);
}

export function buildAssetSlugCandidate(title: string, suffix?: string): string {
  const base = slugifyTitle(title);

  if (!suffix) {
    return base.slice(0, 220);
  }

  const trimmedSuffix = suffix.replace(/[^a-z0-9-]/gi, "").slice(0, 16);
  const combined = `${base}-${trimmedSuffix}`;

  return combined.slice(0, 220);
}
