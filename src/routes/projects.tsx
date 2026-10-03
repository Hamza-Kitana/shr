import { createFileRoute } from "@tanstack/react-router";
import { Process, Projects } from "@/components/site/Sections";
import { CaseStudies, NextPage, PageHero } from "@/components/site/Pages";
import { Page } from "@/components/site/Shell";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — Novarc" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <Page>
      <PageHero page="projects" scene="0.58,0.1,1" />
      <Projects />
      <CaseStudies />
      <Process />
      <NextPage href="/team" />
    </Page>
  );
}
