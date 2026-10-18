/**
 * Landing page copy. Edit the words here; app/page.tsx only handles layout.
 */

export const profile = {
  name: "Assem Mohamed",
  eyebrow: "Assem Mohamed · backend · DevOps · Linux",
  intro:
    "I'm Assem, a backend engineer at Broker Times. I build scalable APIs and backend services, ship them on Linux with Docker and Nginx, and care about clean architecture and deployments that don't break. Outside work I run a homelab, explore new tools, and contribute to open source.",
};

export const links = {
  github: "https://github.com/ToYoNiX",
  linkedin: "https://linkedin.com/in/toyonix",
  email: "mailto:assemmohamed.toyonix@gmail.com",
  // A WhatsApp username link: on phones it opens the app; on computers WhatsApp's page offers
  // WhatsApp Desktop or WhatsApp Web. Keep the username key off, or visitors get asked for it.
  whatsapp: "https://wa.me/toyonix",
  // public/assem-mohamed-cv.pdf: replace the file to update the CV.
  cv: "/assem-mohamed-cv.pdf",
};

export const services = [
  {
    title: "Backend Engineering",
    description: "APIs that scale, built with Node.js, Express, and clean architecture.",
    items: [
      "REST APIs with Express",
      "Auth: JWT, sessions, RBAC",
      "MongoDB / PostgreSQL / MySQL",
      "API docs with OpenAPI",
    ],
  },
  {
    title: "Linux & DevOps",
    description: "Production-grade Linux servers with Docker and open-source tools.",
    items: ["Dockerizing applications", "VPS and server setup", "Nginx reverse proxies", "CI/CD pipelines"],
  },
];

export const projects = [
  {
    title: "Self-Hosted Linux Infrastructure",
    description:
      "A production-style Linux server running 13 containerized services behind a secure reverse proxy, with automated SSL and firewall hardening.",
    tags: ["linux", "docker", "self-hosting"],
    href: "https://github.com/ToYoNiX/homelab",
  },
  {
    title: "GDG Session Automation",
    description: "Automated processing and uploading of large session recordings for GDG on Campus.",
    tags: ["backend", "automation", "docker"],
    href: "https://github.com/ToYoNiX/gdgoc-records-upload-tool",
  },
];

export const howIWork = [
  "Requirement discussion",
  "System design",
  "Clean implementation",
  "Dockerized deployment",
  "Documentation",
  "Post-delivery support",
];

export const stack = [
  { group: "Backend & APIs", items: ["Node.js", "Express.js", "REST", "JWT", "htmx"] },
  { group: "Languages", items: ["JavaScript", "TypeScript", "Python", "Bash"] },
  { group: "Infra & DevOps", items: ["Linux", "Docker", "Ansible", "Proxmox", "Nginx", "CI/CD"] },
  { group: "Databases", items: ["MongoDB", "SQLite", "SQL Server"] },
  { group: "Tools", items: ["Git", "Vim", "VS Code", "Obsidian", "Zettelkasten"] },
];

export const beyondCode = [
  "Led and coordinated technical teams through university initiatives and student activities, organizing workshops and collaborative projects.",
  "Represented my university at multiple events, delivering technical presentations and public talks.",
  "Mentored students in programming fundamentals and competitive problem-solving.",
];
