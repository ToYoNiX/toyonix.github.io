import Image from "next/image";
import { appHref } from "@toyonix/web-kit";
import {
  Badge,
  ButtonRow,
  Card,
  CardBody,
  CardCta,
  CardGrid,
  CardMeta,
  CardTitle,
  CardTop,
  Container,
  Display,
  Eyebrow,
  Lead,
  LinkButton,
  LinkCard,
  Section,
  SectionLabel,
  Tag,
  Tags,
} from "@toyonix/web-kit/react";
import type { AppStatus } from "@toyonix/web-kit/registry";
import { beyondCode, howIWork, links, profile, projects, services, stack } from "@/content";
import { LatestNotes } from "@/components/LatestNotes";
import { Portrait } from "@/components/Portrait";
import { getNotesSnapshot } from "@/lib/notes-feed";
import { getRegistry } from "@/lib/registry";

const STATUS_TONE: Record<AppStatus, "success" | "warning" | "neutral"> = {
  live: "success",
  beta: "warning",
  archived: "neutral",
};

export default async function Home() {
  const [registry, notesSnapshot] = await Promise.all([getRegistry(), getNotesSnapshot()]);
  const apps = registry.apps.filter((app) => app.status !== "archived");
  const notes = apps.find((app) => app.id === "notes");

  return (
    <Container>
      <section className="grid items-center gap-x-16 gap-y-12 pt-20 pb-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:pt-24">
        <div>
          <Eyebrow>{profile.eyebrow}</Eyebrow>
          <Display className="max-w-[16ch]">
            I build <em>backends</em>, servers, and the systems around them.
          </Display>
          <Lead>{profile.intro}</Lead>
          <ButtonRow>
            {notes ? <LinkButton href={appHref("notes")}>Read my notes</LinkButton> : null}
            <LinkButton href={links.cv} variant={notes ? "secondary" : "primary"}>
              Download CV
            </LinkButton>
            <LinkButton href="#contact" variant="secondary">
              Get in touch
            </LinkButton>
            <LinkButton href={links.github} variant="ghost">
              GitHub ↗
            </LinkButton>
          </ButtonRow>
        </div>
        {/* Above the headline on small screens, beside it on large ones. */}
        <Portrait className="order-first ml-6 max-w-[260px] lg:order-none lg:ml-0 lg:max-w-none" />
      </section>

      {/* Refreshed in the browser from /notes/feed.json: new notes appear without redeploying root. */}
      <LatestNotes snapshot={notesSnapshot} />

      {apps.length > 0 ? (
        <Section id="apps">
          <SectionLabel>Apps</SectionLabel>
          <CardGrid>
            {apps.map((app) => (
              <LinkCard key={app.id} href={app.path}>
                <CardTop>
                  <CardMeta>{app.path}</CardMeta>
                  <Badge tone={STATUS_TONE[app.status]}>{app.status}</Badge>
                </CardTop>
                <CardTitle>{app.title}</CardTitle>
                {app.description ? <CardBody>{app.description}</CardBody> : null}
                <CardCta>Open →</CardCta>
              </LinkCard>
            ))}
          </CardGrid>
        </Section>
      ) : null}

      <Section id="services">
        <SectionLabel>What I do</SectionLabel>
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title}>
              <CardTitle>{service.title}</CardTitle>
              <CardBody>{service.description}</CardBody>
              <Tags>
                {service.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </Tags>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="projects">
        <SectionLabel>Projects</SectionLabel>
        <CardGrid>
          {projects.map((project) => (
            <LinkCard key={project.title} href={project.href}>
              <CardTop>
                <CardMeta>github ↗</CardMeta>
              </CardTop>
              <CardTitle>{project.title}</CardTitle>
              <CardBody>{project.description}</CardBody>
              <Tags>
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Tags>
            </LinkCard>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <div className="tx-grid-2">
          <div>
            <SectionLabel>How I work</SectionLabel>
            <ol className="m-0 grid list-none gap-3 p-0">
              {howIWork.map((step, index) => (
                <li key={step} className="flex items-baseline gap-4 text-lg">
                  <span className="font-mono text-sm text-accent-text">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-6 font-serif text-2xl italic">I absolutely love structure.</p>
          </div>
          <div>
            <SectionLabel>Stack</SectionLabel>
            <dl className="m-0 grid gap-4">
              {stack.map(({ group, items }) => (
                <div key={group}>
                  <dt className="tx-eyebrow mb-1.5">{group}</dt>
                  <dd className="m-0">
                    <Tags>
                      {items.map((item) => (
                        <Tag key={item}>{item}</Tag>
                      ))}
                    </Tags>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section>
        <SectionLabel>Beyond the code</SectionLabel>
        <ul className="m-0 grid max-w-[880px] list-none gap-10 p-0">
          {beyondCode.map((item, index) => (
            <li key={item.image} className="grid items-center gap-6 sm:grid-cols-[240px_1fr]">
              <Image
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="240px"
                className={`aspect-[4/3] w-full border-[2.5px] border-border object-cover shadow-tx ${
                  index % 2 === 0 ? "-rotate-[1.2deg]" : "rotate-[1deg]"
                }`}
                style={{ objectPosition: item.position }}
              />
              <p className="m-0 border-l-[6px] border-accent pl-5 font-serif text-xl">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="contact">
        <SectionLabel>Let&apos;s build something</SectionLabel>
        <Lead>Open to work, freelance projects, and collaborations. I respond fast on WhatsApp.</Lead>
        <ButtonRow>
          <LinkButton href={links.whatsapp}>Message me on WhatsApp</LinkButton>
          <LinkButton href={links.email} variant="secondary">
            Email
          </LinkButton>
          <LinkButton href={links.cv} variant="secondary">
            CV (PDF)
          </LinkButton>
          <LinkButton href={links.linkedin} variant="secondary">
            LinkedIn ↗
          </LinkButton>
          <LinkButton href={links.github} variant="ghost">
            GitHub ↗
          </LinkButton>
        </ButtonRow>
      </Section>
    </Container>
  );
}
