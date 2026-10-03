import { createFileRoute } from "@tanstack/react-router";
import { Team, Testimonials } from "@/components/site/Sections";
import { Careers, Departments, NextPage, PageHero, Perks } from "@/components/site/Pages";
import { Page } from "@/components/site/Shell";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [{ title: "Team — Novarc" }] }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <Page>
      <PageHero page="team" scene="0.6,0.1,0.95" />
      <Team />
      <Departments />
      <Perks />
      <Testimonials />
      <Careers />
      <NextPage href="/contact" />
    </Page>
  );
}
