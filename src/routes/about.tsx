import { createFileRoute } from "@tanstack/react-router";
import { About, Clients, Stats, Why } from "@/components/site/Sections";
import { NextPage, Offices, PageHero } from "@/components/site/Pages";
import { Page } from "@/components/site/Shell";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Novarc" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Page>
      <PageHero page="about" scene="0.55,0.05,1.05" />
      <About />
      <Stats />
      <Offices scene="0,0.75,0.5" />
      <Why />
      <Clients />
      <NextPage href="/projects" />
    </Page>
  );
}
