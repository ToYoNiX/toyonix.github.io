"use client";

import { useEffect, useState } from "react";
import { appHref } from "@toyonix/web-kit";
import {
  Badge,
  ButtonRow,
  CardBody,
  CardCta,
  CardGrid,
  CardMeta,
  CardTitle,
  CardTop,
  LinkButton,
  LinkCard,
  Section,
  SectionLabel,
  Tag,
  Tags,
} from "@toyonix/web-kit/react";
import {
  NOTES_FEED_PATH,
  NOTES_FEED_URL,
  fetchNotesFeed,
  formatNoteDate,
  type NoteSummary,
} from "@/lib/notes-feed";

const SHOWN = 3;

function isLocalDev(): boolean {
  return ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
}

/**
 * Latest notes, refreshed in the browser from /notes/feed.json, so new notes show up without
 * redeploying root. Starts from the build-time snapshot. Renders nothing if there are no notes.
 */
export function LatestNotes({ snapshot }: { snapshot: NoteSummary[] | null }) {
  const [notes, setNotes] = useState(snapshot ?? []);

  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      let fresh = await fetchNotesFeed(NOTES_FEED_PATH, { signal: controller.signal });
      if (!fresh && isLocalDev() && !controller.signal.aborted) {
        fresh = await fetchNotesFeed(NOTES_FEED_URL, { signal: controller.signal });
      }
      if (fresh && !controller.signal.aborted) setNotes(fresh);
    })();
    return () => controller.abort();
  }, []);

  if (notes.length === 0) return null;
  const latest = notes.slice(0, SHOWN);

  return (
    <Section id="notes">
      <SectionLabel>Latest notes</SectionLabel>
      <CardGrid>
        {latest.map((note, index) => (
          <LinkCard key={note.url} href={note.url}>
            <CardTop>
              <CardMeta>
                {formatNoteDate(note.date)}
                {note.readingMinutes ? ` · ${note.readingMinutes} min read` : ""}
              </CardMeta>
              {index === 0 ? <Badge tone="accent">new</Badge> : null}
            </CardTop>
            <CardTitle>{note.title}</CardTitle>
            {note.summary ? <CardBody>{note.summary}</CardBody> : null}
            {note.tags.length ? (
              <Tags>
                {note.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Tags>
            ) : null}
            <CardCta>Read →</CardCta>
          </LinkCard>
        ))}
      </CardGrid>
      <ButtonRow className="mt-8">
        <LinkButton href={appHref("notes")} variant="secondary">
          All notes →
        </LinkButton>
      </ButtonRow>
    </Section>
  );
}
