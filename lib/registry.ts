import type { Registry } from "@toyonix/web-kit/registry";
import { buildRegistry } from "@toyonix/web-kit/registry/build";

/** GitHub account that owns every toyonix site repo. */
export const OWNER = "ToYoNiX";

let pending: Promise<Registry> | undefined;

/**
 * The app registry, built from GitHub at build time: public repos owned by OWNER with the
 * `toyonix-site` topic, plus the "toyonix" field of each repo's package.json.
 * Memoized per build process, so the layout, the landing page, and /registry.json agree.
 *
 * In CI a failure fails the build (the previous deploy stays live). Locally it falls back to an
 * empty registry so you can work offline; set GITHUB_TOKEN (e.g. `GITHUB_TOKEN=$(gh auth token)`)
 * to avoid anonymous rate limits.
 */
export function getRegistry(): Promise<Registry> {
  pending ??= buildRegistry({ owner: OWNER, token: process.env.GITHUB_TOKEN }).catch((error: unknown) => {
    if (process.env.CI) throw error;
    console.warn(`[registry] ${String(error)}; using an empty registry for local development.`);
    return { version: 1, generatedAt: new Date(0).toISOString(), apps: [] };
  });
  return pending;
}
