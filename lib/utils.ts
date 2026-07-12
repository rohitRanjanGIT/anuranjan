import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Turn arbitrary text into a URL-friendly slug.
 * e.g. "Modern Villa & Co." -> "modern-villa-co"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Build the canonical detail-page slug for a project.
 * The numeric id is appended so the URL stays unique and stable
 * even if two projects share a title, and can be parsed back out.
 * e.g. { id: 12, title: "Modern Villa" } -> "modern-villa-12"
 */
export function projectSlug(project: { id: number; title: string }): string {
  const base = slugify(project.title)
  return base ? `${base}-${project.id}` : String(project.id)
}

/** Href to a project's detail page. */
export function projectHref(project: { id: number; title: string }): string {
  return `/projects/${projectSlug(project)}`
}

/**
 * Extract the numeric project id from a slug produced by `projectSlug`.
 * Returns null when the slug carries no trailing id.
 */
export function parseProjectId(slug: string): number | null {
  const match = slug.match(/(\d+)$/)
  return match ? Number(match[1]) : null
}
