import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/Sections";
import { FAQ, NextPage, Offices, PageHero } from "@/components/site/Pages";
import { Page } from "@/components/site/Shell";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Novarc" }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Page>
      <PageHero page="contact" scene="0.58,0.05,1.1" />
      <Contact />
      <Offices scene="-0.7,0.4,0.55" />
      <FAQ />
      <NextPage href="/about" />
    </Page>
  );
}
