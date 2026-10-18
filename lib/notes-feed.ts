/**
 * The latest notes, read from the notes app's JSON Feed (https://jsonfeed.org) at
 * /notes/feed.json. Notes owns its content; root only reads the feed, so publishing a note
 * redeploys notes but never root.
 */

export const NOTES_FEED_PATH = "/notes/feed.json";
export const NOTES_FEED_URL = `https://toyonix.github.io${NOTES_FEED_PATH}`;

export interface NoteSummary {
  url: string;
  title: string;
  summary: string;
  /** ISO 8601, or "" if the feed item has no date. */
  date: string;
  tags: string[];
  readingMinutes: number | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Validates untrusted JSON. Bad items are skipped; anything that isn't a JSON Feed gives null. */
export function parseNotesFeed(value: unknown): NoteSummary[] | null {
  if (
    !isRecord(value) ||
    typeof value.version !== "string" ||
    !value.version.startsWith("https://jsonfeed.org/")
  ) {
    return null;
  }
  if (!Array.isArray(value.items)) return null;
  const notes: NoteSummary[] = [];
  for (const item of value.items) {
    if (!isRecord(item) || typeof item.url !== "string" || typeof item.title !== "string") continue;
    const extension = isRecord(item._toyonix) ? item._toyonix : {};
    notes.push({
      url: item.url,
      title: item.title,
      summary: typeof item.summary === "string" ? item.summary : "",
      date: typeof item.date_published === "string" ? item.date_published : "",
      tags: Array.isArray(item.tags) ? item.tags.filter((tag): tag is string => typeof tag === "string") : [],
      readingMinutes: typeof extension.reading_minutes === "number" ? extension.reading_minutes : null,
    });
  }
  return notes.sort((a, b) => b.date.localeCompare(a.date));
}

/** Never throws: null if the feed is unreachable or invalid. */
export async function fetchNotesFeed(url: string, init?: RequestInit): Promise<NoteSummary[] | null> {
  try {
    const response = await fetch(url, {
      ...init,
      headers: { accept: "application/feed+json, application/json" },
    });
    if (!response.ok) return null;
    return parseNotesFeed(await response.json());
  } catch {
    return null;
  }
}

/** Build-time snapshot from production, so the static HTML already lists the latest notes. */
export function getNotesSnapshot(): Promise<NoteSummary[] | null> {
  return fetchNotesFeed(NOTES_FEED_URL, { signal: AbortSignal.timeout(10_000) });
}

/** "Nov 7, 2025"; feed dates are calendar dates, so format in UTC. */
export function formatNoteDate(date: string): string {
  const parsed = new Date(date);
  if (!date || Number.isNaN(parsed.getTime())) return "";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" }).format(parsed);
}
