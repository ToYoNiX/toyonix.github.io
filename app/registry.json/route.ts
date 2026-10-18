import { getRegistry } from "@/lib/registry";

// Generated once at build time into out/registry.json. Every toyonix app reads it for the shared nav.
export const dynamic = "force-static";

export async function GET() {
  return Response.json(await getRegistry());
}
