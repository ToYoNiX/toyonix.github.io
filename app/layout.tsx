import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell, ThemeScript } from "@toyonix/web-kit/react";
import { getRegistry } from "@/lib/registry";
import { profile } from "@/content";
import { site } from "@/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${profile.name} · toyonix`, template: "%s · toyonix" },
  description: site.description,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Root builds the registry itself (it's the site that publishes it).
  const registry = await getRegistry();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <AppShell registry={registry}>{children}</AppShell>
      </body>
    </html>
  );
}
