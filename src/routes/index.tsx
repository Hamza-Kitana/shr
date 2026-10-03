import { createFileRoute } from "@tanstack/react-router";
import {
  About,
  CTA,
  Clients,
  Contact,
  Hero,
  Process,
  Projects,
  Services,
  Stats,
  Team,
  Testimonials,
  Why,
} from "@/components/site/Sections";
import { Page } from "@/components/site/Shell";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Page>
      <Hero />
      <About teaser />
      <Services />
      <Why />
      <Stats />
      <Projects teaser />
      <Process />
      <Clients />
      <Testimonials />
      <Team teaser />
      <CTA />
      <Contact />
    </Page>
  );
}
