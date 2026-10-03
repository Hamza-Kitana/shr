import { useEffect, useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  Star,
  Linkedin,
  Twitter,
  Instagram,
  Dribbble,
  MapPin,
  Phone,
  Mail,
  Clock,
  Compass,
  Cloud,
  Cpu,
  Code2,
  Shield,
  Sparkles,
} from "lucide-react";
import {
  COMPANY,
  EMAIL,
  PHONE,
  clients,
  navHrefs,
  projectMedia,
  serviceColors,
  socialHrefs,
  statValues,
  strengthSpans,
  teamImgs,
  testimonialImgs,
} from "./content";
import { Logo, Magnetic } from "./Chrome";
import { useGo } from "./go";
import { useLang } from "./lang";
import { RailDots } from "./RailDots";
import { getLenis, scrollToHash } from "./smooth";

const icons = [Compass, Cloud, Cpu, Code2, Shield, Sparkles];
const socialIcons = [Linkedin, Twitter, Instagram, Dribbble];
const contactIcons = [MapPin, Phone, Mail, Clock];
/** Arrows point "forward" in reading direction. */
const flip = "rtl:-scale-x-100";
const pad = (n: number) => String(n).padStart(2, "0");

export function TeaserLink({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const go = useGo();
  return (
    <Magnetic>
      <button
        onClick={() => go(href)}
        className={`btn-fill group inline-flex items-center gap-3 rounded-full border border-line px-6 py-3 text-sm font-semibold ${className}`}
      >
        {label}{" "}
        <ArrowRight
          className={`h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${flip}`}
        />
      </button>
    </Magnetic>
  );
}

function Words({ text, cls }: { text: string; cls: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          className="-mt-[0.25em] inline-block overflow-hidden pb-[0.1em] pt-[0.25em] align-bottom"
        >
          <span className={`${cls} inline-block`}>{w}&nbsp;</span>
        </span>
      ))}
    </>
  );
}

/* ───────────────────────── HERO ───────────────────────── */

export function Hero() {
  const { t } = useLang();
  const h = t.hero;
  return (
    <section
      id="home"
      data-title={t.nav[0]}
      data-scene="0.42,0.02,1.3"
      className="hero relative flex min-h-[100svh] flex-col justify-end px-6 pb-14 pt-32 md:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/85 via-background/30 to-transparent md:via-background/20 rtl:bg-gradient-to-l" />
      <div className="hero-side eyebrow pointer-events-none absolute right-6 top-1/2 hidden origin-right -translate-y-1/2 rotate-90 md:block rtl:left-6 rtl:right-auto rtl:origin-left rtl:-rotate-90">
        {h.side}
      </div>
      <div className="hero-inner relative mx-auto w-full">
        <p className="hero-fade eyebrow mb-6 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inset-0 rounded-full bg-primary"
              style={{ animation: "pulse-ring 2s infinite" }}
            />
            <span className="h-2 w-2 rounded-full bg-primary" />
          </span>
          {h.eyebrow}
        </p>
        <h1 className="font-display text-[13vw] font-bold leading-[0.88] tracking-[-0.04em] md:text-[8.4vw]">
          <Words text={h.l1} cls="hero-word text-hover" />
          <br />
          <Words text={h.l2} cls="hero-word text-gradient" />
          <br />
          <Words text={h.l3} cls="hero-word text-hover" />
        </h1>
        <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="hero-fade max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            {h.lead}
          </p>
          <div className="hero-fade flex flex-wrap gap-3">
            <Magnetic>
              <button
                onClick={() => scrollToHash("#services")}
                className="group flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                {h.explore}{" "}
                <ArrowRight
                  className={`h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${flip}`}
                />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => scrollToHash("#contact")}
                className="btn-fill rounded-full border border-line px-7 py-4 text-sm font-semibold"
              >
                {h.contact}
              </button>
            </Magnetic>
          </div>
        </div>
        <div className="hero-fade mt-14 flex items-center justify-between border-t border-line pt-5">
          <span className="eyebrow flex items-center gap-3">
            <span className="relative h-8 w-px overflow-hidden bg-line">
              <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-primary" />
            </span>
            {h.scroll}
          </span>
          <span className="eyebrow hidden md:inline">{h.cities}</span>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── ABOUT (storytelling) ───────────────────────── */

/** Planet poses that keep it beside, never behind, each chapter's copy (mirrored in RTL). */
const SCENE_STORY = "0.62,0.12,0.85";
const SCENE_TIMELINE = "-0.78,0.12,0.6";
const SCENE_TIMELINE_M = "0.95,-0.35,0.5";
const SCENE_MISSION = "0.82,-0.55,0.5";

function Chapter({
  i,
  children,
  align = "start",
  scene,
  sceneM,
}: {
  i: number;
  children: ReactNode;
  align?: "start" | "end" | "center";
  scene?: string;
  sceneM?: string;
}) {
  const { t } = useLang();
  const a =
    align === "end" ? "md:ms-auto md:text-end" : align === "center" ? "mx-auto text-center" : "";
  return (
    <div
      data-chapter={i}
      data-scene={scene}
      data-scene-m={sceneM}
      className={`chapter-${i} relative max-w-4xl ${a}`}
    >
      <p className="chap-label eyebrow mb-5 text-primary">
        0{i + 1} — {t.about.chapters[i]!.k}
      </p>
      {children}
    </div>
  );
}

export function About({ teaser = false }: { teaser?: boolean }) {
  const { t } = useLang();
  const a = t.about;
  return (
    <section
      id="about"
      data-title={t.nav[1]}
      data-scene={SCENE_STORY}
      className="about-story relative overflow-hidden py-32 md:py-48"
    >
      <div className="about-year pointer-events-none absolute -start-[5vw] top-24 select-none font-display text-[38vw] font-bold leading-none text-outline">
        2014
      </div>
      <div className="about-marquee mb-24 whitespace-nowrap font-display text-[14vw] font-bold leading-none tracking-tighter text-foreground/[0.06]">
        {a.marquee}
      </div>

      <div className="relative mx-auto space-y-40 px-6 md:space-y-56 md:px-12">
        {/* 01 — scrubbed word highlight */}
        <Chapter i={0}>
          <p className="font-display text-3xl font-semibold leading-[1.12] tracking-tight md:text-6xl">
            {a.chapters[0]!.t.split(" ").map((w, k) => (
              <span key={k} className="scrub-word inline-block opacity-[0.12]">
                {w}&nbsp;
              </span>
            ))}
          </p>
          <span aria-hidden data-scene={SCENE_STORY} className="block" />
        </Chapter>

        {/* 02 — timeline drawn by scroll */}
        <Chapter i={1} align="end" scene={SCENE_TIMELINE} sceneM={SCENE_TIMELINE_M}>
          <p className="chap-text font-display text-3xl font-semibold leading-[1.12] tracking-tight md:text-5xl">
            {a.chapters[1]!.t}
          </p>
          <div className="story-timeline relative mt-16 text-start">
            <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-line md:block" />
            <div
              className="story-line absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-gradient-to-r from-primary to-gold md:block rtl:origin-right rtl:bg-gradient-to-l"
              style={{ transform: "scaleX(0)" }}
            />
            <div className="absolute bottom-0 start-[7px] top-0 w-px bg-line md:hidden" />
            <ol className="grid gap-8 md:grid-cols-5 md:gap-4">
              {a.milestones.map((m) => (
                <li key={m.y} className="story-node relative ps-8 md:ps-0">
                  <span className="absolute start-0 top-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-primary bg-background md:relative">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  <p className="mt-0 font-display text-2xl font-bold md:mt-5">{m.y}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.t}</p>
                </li>
              ))}
            </ol>
            <span
              aria-hidden
              data-scene={SCENE_TIMELINE}
              data-scene-m={SCENE_TIMELINE_M}
              className="block"
            />
          </div>
        </Chapter>

        {/* 03 — image mask reveal */}
        <div
          data-chapter={2}
          data-scene={SCENE_MISSION}
          className="chapter-2 grid items-center gap-10 md:grid-cols-12"
        >
          <div
            className="mission-mask relative aspect-[4/5] overflow-hidden rounded-2xl md:col-span-5"
            style={{ clipPath: "inset(100% 0 0 0 round 1rem)" }}
          >
            <img
              src={projectMedia[2]!.img}
              alt=""
              loading="lazy"
              className="mission-img h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <span className="eyebrow absolute bottom-5 start-5 text-foreground/80">
              {a.missionCaption}
            </span>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="chap-label eyebrow mb-5 text-primary">03 — {a.chapters[2]!.k}</p>
            <p className="mission-text font-display text-3xl font-semibold leading-[1.12] tracking-tight md:text-5xl">
              {a.chapters[2]!.t}
            </p>
            <span aria-hidden data-scene={SCENE_MISSION} className="block" />
          </div>
        </div>

        {/* 04 — blur to focus */}
        <Chapter i={3} align="center" scene="-0.82,0,0.45">
          <p className="vision-text font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            {a.visionA} <span className="text-gradient">{a.visionB}</span>
          </p>
        </Chapter>

        {/* 05 — values flip in */}
        <div data-chapter={4} className="chapter-4">
          <p className="chap-label eyebrow mb-10 text-primary">05 — {a.chapters[4]!.k}</p>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line [perspective:1200px] md:grid-cols-4">
            {a.values.map((v, k) => (
              <div
                key={k}
                className="value-card group relative bg-background p-8 transition-colors duration-500 hover:bg-card"
              >
                <span className="font-mono text-xs text-muted-foreground">V.{k + 1}</span>
                <h3 className="mt-16 font-display text-3xl font-bold tracking-tight transition-colors duration-500 group-hover:text-primary md:text-4xl">
                  {v.t}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.d}</p>
                <span className="absolute bottom-0 start-0 h-px w-0 bg-primary transition-all duration-700 group-hover:w-full" />
              </div>
            ))}
          </div>
          {teaser && (
            <div className="mt-14 flex justify-center">
              <TeaserLink href="/about" label={t.teasers.about} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── SERVICES ───────────────────────── */

function tilt(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty("--mx", `${x * 100}%`);
  el.style.setProperty("--my", `${y * 100}%`);
  el.style.setProperty("--ry", `${(x - 0.5) * 12}deg`);
  el.style.setProperty("--rx", `${(0.5 - y) * 12}deg`);
}
function untilt(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

export function Services() {
  const { t } = useLang();
  const s = t.services;
  return (
    <section
      id="services"
      data-title={t.nav[2]}
      data-scene="0,0.1,0.95"
      className="svc-section relative px-6 py-32 md:px-12"
      style={{ ["--svc" as string]: serviceColors[0] }}
    >
      <div
        className="svc-bg pointer-events-none absolute inset-0 transition-[background] duration-1000"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 50%, color-mix(in oklab, var(--svc) 14%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto">
        <div className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="svc-title font-display text-5xl font-bold tracking-tight md:text-8xl">
            <span className="-my-[0.14em] block overflow-hidden py-[0.14em]">
              <span className="svc-title-line block">{s.t1}</span>
            </span>
            <span className="-my-[0.14em] block overflow-hidden py-[0.14em]">
              <span className="svc-title-line block text-gradient">{s.t2}</span>
            </span>
          </h2>
          <p className="max-w-sm text-muted-foreground">{s.lead}</p>
        </div>
        <div className="m-rail grid gap-5 [perspective:1400px] md:grid-cols-2 lg:grid-cols-3">
          {s.items.map((item, i) => {
            const Icon = icons[i] ?? Sparkles;
            const color = serviceColors[i]!;
            return (
              <article
                key={i}
                data-service={color}
                onMouseMove={tilt}
                onMouseLeave={untilt}
                className="svc-card service-card group relative flex min-h-[320px] cursor-pointer flex-col justify-between rounded-2xl p-8 backdrop-blur-md"
                style={{ ["--c" as string]: color }}
              >
                <div className="flex items-start justify-between">
                  <span className="svc-icon flex h-14 w-14 items-center justify-center rounded-xl border border-line transition-all duration-700 group-hover:rotate-[360deg] group-hover:border-[var(--c)] group-hover:shadow-[0_0_30px_-5px_var(--c)]">
                    <Icon className="h-6 w-6 text-[var(--c)] transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground" dir="ltr">
                    {pad(i + 1)} / 06
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold transition-transform duration-500 group-hover:-translate-y-1">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.d}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors group-hover:text-[var(--c)]">
                    {s.more}{" "}
                    <ArrowUpRight
                      className={`h-4 w-4 transition-transform group-hover:-translate-y-0.5 ${flip}`}
                    />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
        <RailDots count={s.items.length} />
      </div>
    </section>
  );
}

/* ───────────────────────── WHY CHOOSE US ───────────────────────── */

function spotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
}

export function Why() {
  const { t } = useLang();
  const w = t.why;
  return (
    <section data-scene="-0.64,0.32,0.7" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto">
        <div className="mb-16 grid gap-6 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">{w.eyebrow}</p>
          <h2 className="why-title font-display text-4xl font-bold leading-tight tracking-tight md:col-span-9 md:text-6xl">
            {w.a.split(" ").map((x, k) => (
              <span key={k} className="why-word inline-block">
                {x}&nbsp;
              </span>
            ))}
            <span className="why-word inline-block italic text-gold">{w.b}&nbsp;</span>
            {w.c.split(" ").map((x, k) => (
              <span key={k} className="why-word inline-block">
                {x}&nbsp;
              </span>
            ))}
          </h2>
        </div>
        <div
          onMouseMove={spotlight}
          className="why-grid m-rail relative grid auto-rows-[220px] gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
          style={{ ["--sx" as string]: "50%", ["--sy" as string]: "50%" }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 [.why-grid:hover_&]:opacity-100"
            style={{
              background:
                "radial-gradient(500px circle at var(--sx) var(--sy), oklch(0.84 0.12 192 / 10%), transparent 40%)",
            }}
          />
          {w.items.map((s, i) => (
            <div
              key={i}
              data-why={i}
              className={`why-cell group relative flex flex-col justify-between overflow-hidden bg-background p-7 transition-colors duration-500 hover:bg-card ${strengthSpans[i]}`}
            >
              <div className="flex items-start justify-between">
                <span dir="ltr" className="font-mono text-xs text-primary">
                  /{pad(i + 1)}
                </span>
                {i === 0 && (
                  <span
                    dir="ltr"
                    className="font-display text-[22vw] font-bold leading-[0.8] tracking-tighter text-outline md:text-[11vw]"
                  >
                    <span data-count="10">0</span>+
                  </span>
                )}
              </div>
              <div>
                <h3
                  className={`font-display font-semibold transition-transform duration-500 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 ${i === 0 ? "text-4xl md:text-6xl" : "text-2xl"}`}
                >
                  {s.t}
                </h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">{s.d}</p>
              </div>
              <span className="absolute -bottom-10 -end-10 h-32 w-32 rounded-full bg-primary/0 blur-2xl transition-all duration-700 group-hover:bg-primary/25" />
            </div>
          ))}
        </div>
        <RailDots count={w.items.length} />
      </div>
    </section>
  );
}

/* ───────────────────────── NUMBERS ───────────────────────── */

export function Stats() {
  const { t } = useLang();
  return (
    <section data-scene="-0.72,0,1.15" className="relative overflow-hidden py-32 md:py-44">
      <div className="mx-auto px-6 md:px-12">
        <p className="eyebrow mb-12 text-center">{t.stats.eyebrow}</p>
        <div className="divide-y divide-line border-y border-line">
          {t.stats.items.map((label, i) => (
            <div
              key={i}
              data-dir={i % 2 ? -1 : 1}
              className={`stat-row group flex items-center justify-between gap-6 py-6 ${i % 2 ? "flex-row-reverse" : ""}`}
            >
              <span
                dir="ltr"
                className="stat-num font-display text-[18vw] font-bold leading-[0.85] tracking-tighter transition-colors duration-500 group-hover:text-primary md:text-[10vw]"
              >
                +<span data-count={statValues[i]}>0</span>
              </span>
              <span
                className={`stat-label flex max-w-[14ch] flex-col rtl:max-w-[24ch] gap-2 ${i % 2 ? "items-start text-start" : "items-end text-end"}`}
              >
                <span className="font-mono text-xs text-primary">0{i + 1}</span>
                <span className="font-display text-lg font-semibold leading-tight text-foreground md:text-3xl lg:text-4xl">
                  {label}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── PROJECTS ───────────────────────── */

export function Projects({ teaser = false }: { teaser?: boolean }) {
  const { t } = useLang();
  const p = t.projects;
  return (
    <section
      id="projects"
      data-title={t.nav[3]}
      data-scene="0.84,-0.72,0.3"
      className="proj-section relative overflow-hidden"
    >
      <div className="proj-ghost pointer-events-none absolute bottom-[6vh] start-0 hidden whitespace-nowrap font-display text-[22vw] font-bold leading-none tracking-tighter text-foreground/[0.04] lg:block">
        {p.ghost}
      </div>
      <div className="proj-track relative flex flex-col gap-16 px-6 py-32 lg:h-screen lg:flex-row lg:items-center lg:gap-[5vw] lg:px-[6vw] lg:py-0">
        <div className="flex shrink-0 flex-col justify-center lg:w-[30vw]">
          <p className="eyebrow mb-4">{p.eyebrow}</p>
          <h2 className="font-display text-6xl font-bold leading-[0.9] tracking-tight md:text-8xl">
            {p.t1}
            <br />
            {p.t2}
          </h2>
          <p className="mt-6 max-w-xs text-muted-foreground">{p.lead}</p>
          {teaser && (
            <div className="mt-8">
              <TeaserLink href="/projects" label={t.teasers.projects} />
            </div>
          )}
          <span className="eyebrow mt-10 hidden items-center gap-3 lg:flex">
            {p.scroll} <ArrowRight className={`h-3 w-3 ${flip}`} />
          </span>
        </div>
        {p.items.map((item, i) => (
          <article
            key={i}
            data-cursor={p.cursor}
            className="proj-card group relative shrink-0 lg:w-[56vw]"
          >
            <div className="proj-mask relative aspect-[16/10] overflow-hidden rounded-2xl">
              <img
                src={projectMedia[i]!.img}
                alt={item.name}
                loading="lazy"
                decoding="async"
                width={1600}
                height={1008}
                className="proj-img h-full w-full object-cover transition-[filter] duration-700 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              <span
                dir="ltr"
                className="absolute start-6 top-6 font-mono text-xs text-foreground/80"
              >
                {pad(i + 1)} / {pad(p.items.length)}
              </span>
              <span className="absolute end-6 top-6 flex h-12 w-12 scale-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:scale-100">
                <ArrowUpRight className={`h-5 w-5 ${flip}`} />
              </span>
            </div>
            <div className="proj-info mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <div className="eyebrow mb-2 flex gap-4">
                  <span className="text-primary">{item.cat}</span>
                  <span>{projectMedia[i]!.year}</span>
                </div>
                <h3 className="font-display text-3xl font-semibold md:text-5xl">{item.name}</h3>
                <p className="mt-2 max-w-lg text-sm text-muted-foreground">{item.d}</p>
              </div>
              <span className="link-line inline-flex w-fit items-center gap-2 text-sm font-medium">
                {p.view} <ArrowUpRight className={`h-4 w-4 ${flip}`} />
              </span>
            </div>
          </article>
        ))}
      </div>
      <div className="absolute inset-x-[6vw] bottom-8 hidden h-px bg-line lg:block">
        <div
          className="proj-progress h-full origin-left bg-gradient-to-r from-primary to-gold rtl:origin-right rtl:bg-gradient-to-l"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
}

/* ───────────────────────── PROCESS ───────────────────────── */

export function Process() {
  const { t } = useLang();
  const pr = t.process;
  return (
    <section data-scene="-0.7,0,0.65" className="proc-section relative px-6 py-32 md:px-12">
      <div className="mx-auto grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <p className="eyebrow mb-4">{pr.eyebrow}</p>
            <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              {pr.t1}
              <br />
              <span className="text-muted-foreground">{pr.t2}</span>
            </h2>
            <div className="mt-12 hidden items-end gap-4 md:flex">
              <span className="relative block h-[9rem] overflow-hidden font-display text-[9rem] font-bold leading-none tracking-tighter text-outline">
                <span className="proc-counter block transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)]">
                  {pr.items.map((_, i) => (
                    <span key={i} className="block h-[9rem]">
                      {pad(i + 1)}
                    </span>
                  ))}
                </span>
              </span>
              <span className="eyebrow mb-4" dir="ltr">
                / 06
              </span>
            </div>
          </div>
        </div>
        <div className="relative md:col-span-7">
          <div className="absolute bottom-0 start-[11px] top-0 w-px bg-line" />
          <div
            className="proc-line absolute start-[11px] top-0 h-full w-px origin-top bg-gradient-to-b from-primary to-gold"
            style={{ transform: "scaleY(0)" }}
          />
          <div className="proc-orb absolute start-[11px] top-0 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_30px_6px_var(--primary)] rtl:translate-x-1/2" />
          <ol className="space-y-24">
            {pr.items.map((s, i) => (
              <li
                key={i}
                className="proc-step group relative ps-14 opacity-25 blur-[2px] transition-all duration-700 [&.is-on]:opacity-100 [&.is-on]:blur-0"
              >
                <span className="absolute start-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-background transition-colors duration-500 group-[.is-on]:border-primary">
                  <span className="h-2 w-2 scale-0 rounded-full bg-primary transition-transform duration-500 group-[.is-on]:scale-100" />
                </span>
                <span className="font-mono text-sm text-primary">{pad(i + 1)}</span>
                <h3 className="mt-1 translate-x-6 font-display text-4xl font-semibold transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-[.is-on]:translate-x-0 md:text-6xl">
                  {s.t}
                </h3>
                <p className="mt-3 max-w-md text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── CLIENTS ───────────────────────── */

const shapes: Record<string, string> = {
  circle: "rounded-full",
  square: "rounded-[2px]",
  diamond: "rotate-45 rounded-[2px]",
  triangle: "[clip-path:polygon(50%_0,100%_100%,0_100%)]",
};

function Row({ dir }: { dir: "l" | "r" }) {
  const list = dir === "l" ? clients : [...clients].reverse();
  return (
    <div
      dir="ltr"
      className="client-row flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]"
    >
      <div
        className={`flex shrink-0 gap-4 pr-4 hover:[animation-play-state:paused] ${dir === "l" ? "marquee-l" : "marquee-r"}`}
      >
        {[...list, ...list].map((c, i) => (
          <span
            key={i}
            style={{ ["--c" as string]: c.color }}
            className="group flex h-24 w-56 shrink-0 items-center justify-center gap-3 rounded-xl border border-line font-display text-2xl font-bold tracking-tight text-muted-foreground/50 transition-all duration-500 hover:border-[var(--c)] hover:text-[var(--c)] hover:shadow-[0_0_40px_-12px_var(--c)]"
          >
            <span className={`h-4 w-4 bg-current ${shapes[c.shape]}`} />
            {c.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Clients() {
  const { t } = useLang();
  return (
    <section data-scene="0.75,0.42,0.45" className="relative space-y-4 py-28">
      <p className="eyebrow mb-10 text-center">{t.clients.eyebrow}</p>
      <Row dir="l" />
      <Row dir="r" />
    </section>
  );
}

/* ───────────────────────── TESTIMONIALS ───────────────────────── */

const AUTOPLAY = 7000;

export function Testimonials() {
  const { t } = useLang();
  const tm = t.testimonials;
  const [idx, setIdx] = useState(0);
  const n = tm.items.length;
  useEffect(() => {
    const id = setTimeout(() => setIdx((i) => (i + 1) % n), AUTOPLAY);
    return () => clearTimeout(id);
  }, [idx, n]);
  return (
    <section data-scene="-0.76,0.32,0.5" className="testi-section relative px-6 py-32 md:px-12">
      <div className="mx-auto grid items-center gap-16 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">{tm.eyebrow}</p>
          <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl">
            {tm.t1}
            <br />
            {tm.t2}
          </h2>
          <div className="mt-10 flex items-center gap-3">
            <Magnetic>
              <button
                aria-label={tm.prev}
                onClick={() => setIdx((idx - 1 + n) % n)}
                className="btn-fill flex h-14 w-14 items-center justify-center rounded-full border border-line"
              >
                <ArrowLeft className={`h-5 w-5 ${flip}`} />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                aria-label={tm.next}
                onClick={() => setIdx((idx + 1) % n)}
                className="btn-fill flex h-14 w-14 items-center justify-center rounded-full border border-line"
              >
                <ArrowRight className={`h-5 w-5 ${flip}`} />
              </button>
            </Magnetic>
            <span dir="ltr" className="ms-4 font-mono text-sm text-muted-foreground">
              {pad(idx + 1)} / {pad(n)}
            </span>
          </div>
          <div className="mt-8 flex gap-2">
            {tm.items.map((item, i) => (
              <button
                key={i}
                aria-label={`${tm.show} ${item.name}`}
                onClick={() => setIdx(i)}
                className="relative h-px flex-1 overflow-hidden bg-line py-0"
              >
                {i === idx && (
                  <span
                    key={idx}
                    className="absolute inset-y-0 start-0 bg-primary"
                    style={{ animation: `grow ${AUTOPLAY}ms linear forwards` }}
                  />
                )}
                {i < idx && <span className="absolute inset-0 bg-primary/60" />}
              </button>
            ))}
          </div>
        </div>
        <div className="testi-stack relative h-[420px]">
          {tm.items.map((item, i) => {
            const pos = (i - idx + n) % n;
            return (
              <figure
                key={i}
                onClick={() => pos && setIdx(i)}
                className="testi-card glass absolute inset-0 flex cursor-pointer flex-col justify-between rounded-2xl p-8 transition-all duration-700 [transition-timing-function:var(--ease-out-expo)] md:p-10"
                style={{
                  transform: `translateY(${pos * 20}px) scale(${1 - pos * 0.05}) rotate(${pos ? (pos % 2 ? 2 : -2) : 0}deg)`,
                  opacity: pos > 2 ? 0 : 1 - pos * 0.3,
                  zIndex: n - pos,
                  filter: pos ? "blur(1.5px)" : "none",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-display text-6xl leading-none text-primary/30">"</span>
                </div>
                <blockquote className="font-display text-xl leading-snug md:text-2xl">
                  {item.r}
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <img
                    src={testimonialImgs[i]}
                    alt={item.name}
                    loading="lazy"
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/40 ring-offset-2 ring-offset-card"
                  />
                  <span>
                    <span className="block font-semibold">{item.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.role} — {item.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── TEAM ───────────────────────── */

export function Team({ teaser = false }: { teaser?: boolean }) {
  const { t } = useLang();
  const tm = t.team;
  return (
    <section
      id="team"
      data-title={t.nav[4]}
      data-scene="0,0.8,0.42"
      className="relative px-6 py-32 md:px-12"
    >
      <div className="mx-auto">
        <div className="mb-16 flex items-end justify-between">
          <h2 className="team-title font-display text-5xl font-bold tracking-tight md:text-8xl">
            <span className="-my-[0.14em] block overflow-hidden py-[0.14em]">
              <span className="team-title-line block">{tm.title}</span>
            </span>
          </h2>
          {teaser ? (
            <TeaserLink href="/team" label={t.teasers.team} />
          ) : (
            <p className="eyebrow hidden md:block">{tm.meta}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {tm.items.map((m, i) => (
            <figure
              key={i}
              data-cursor={tm.cursor}
              className={`team-card group relative overflow-hidden rounded-2xl ${i % 2 ? "md:mt-16" : ""}`}
              style={{ clipPath: "inset(100% 0 0 0 round 1rem)" }}
            >
              <img
                src={teamImgs[i]}
                alt={m.name}
                loading="lazy"
                decoding="async"
                width={768}
                height={960}
                className="team-img aspect-[4/5] w-full object-cover grayscale transition-[filter,scale] duration-1000 group-hover:scale-105 group-hover:grayscale-0"
              />
              <span className="absolute start-4 top-4 font-mono text-[10px] text-foreground/70">
                0{i + 1}
              </span>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-5 pt-16 md:translate-y-4 md:opacity-0 md:transition-all md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                <p className="font-display text-lg font-semibold">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
                <div className="mt-3 flex gap-2">
                  {[Linkedin, Twitter].map((I, k) => (
                    <a
                      key={k}
                      href="#"
                      aria-label={tm.social}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-colors hover:border-primary hover:text-primary"
                    >
                      <I className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── CTA ───────────────────────── */

export function CTA() {
  const { t } = useLang();
  const c = t.cta;
  return (
    <section
      data-scene="0,-1.3,2.5"
      className="cta-section relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {[0, 1, 2, 3].map((k) => (
          <span
            key={k}
            className="cta-ring absolute rounded-full border border-primary/20"
            style={{ width: `${30 + k * 22}vmax`, height: `${30 + k * 22}vmax` }}
          />
        ))}
      </div>
      <p className="cta-fade eyebrow relative mb-8">{c.eyebrow}</p>
      <h2 className="relative font-display text-[12vw] font-bold uppercase leading-[0.86] tracking-[-0.04em] md:text-[8vw]">
        <span className="cta-line block">{c.l1}</span>
        <span className="cta-line block text-gradient">{c.l2}</span>
        <span className="cta-line block">{c.l3}</span>
      </h2>
      <div className="cta-fade relative mt-14 flex flex-wrap justify-center gap-4">
        <Magnetic strength={0.5}>
          <button
            onClick={() => scrollToHash("#contact")}
            className="rounded-full bg-primary px-10 py-5 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
          >
            {c.start}
          </button>
        </Magnetic>
        <Magnetic strength={0.5}>
          <button
            onClick={() => scrollToHash("#contact")}
            className="btn-fill glass rounded-full px-10 py-5 text-sm font-bold uppercase tracking-widest"
          >
            {c.contact}
          </button>
        </Magnetic>
      </div>
    </section>
  );
}

/* ───────────────────────── CONTACT ───────────────────────── */

function Field({
  name,
  label,
  type = "text",
  required,
  area,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  area?: boolean;
}) {
  const cls =
    "peer w-full border-b border-line bg-transparent pb-3 pt-6 text-lg outline-none transition-colors focus:border-primary";
  return (
    <label className="relative block">
      {area ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          placeholder=" "
          className={`${cls} resize-none`}
        />
      ) : (
        <input name={name} type={type} required={required} placeholder=" " className={cls} />
      )}
      <span className="pointer-events-none absolute start-0 top-6 text-lg text-muted-foreground transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:tracking-[0.2em] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:tracking-[0.2em]">
        {label}
        {required && " *"}
      </span>
      <span className="absolute bottom-0 start-0 h-px w-0 bg-primary transition-all duration-500 peer-focus:w-full" />
    </label>
  );
}

export function Contact() {
  const { t } = useLang();
  const c = t.contact;
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    (e.target as HTMLFormElement).reset();
  };
  return (
    <section
      id="contact"
      data-title={t.nav[5]}
      data-scene="0.74,0.56,0.42"
      className="relative px-6 py-32 md:px-12"
    >
      <div className="mx-auto grid gap-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">{c.eyebrow}</p>
          <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl">
            {c.t1}
            <br />
            {c.t2}
          </h2>
          <dl className="mt-12 grid gap-8 sm:grid-cols-2">
            {c.info.map(({ l, v }, i) => {
              const I = contactIcons[i] ?? MapPin;
              return (
                <div key={i} className="contact-info">
                  <dt className="eyebrow mb-2 flex items-center gap-2">
                    <I className="h-3.5 w-3.5 text-primary" />
                    {l}
                  </dt>
                  <dd className="text-foreground/90">
                    {v === PHONE ? <bdi dir="ltr">{v}</bdi> : v}
                  </dd>
                </div>
              );
            })}
          </dl>
          <div className="contact-info mt-10 flex flex-wrap gap-2">
            {t.socials.map((label, k) => {
              const I = socialIcons[k] ?? Linkedin;
              return (
                <Magnetic key={k}>
                  <a
                    href={socialHrefs[k]}
                    className="btn-fill flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm"
                  >
                    <I className="h-4 w-4" />
                    {label}
                  </a>
                </Magnetic>
              );
            })}
          </div>
          <div className="contact-map relative mt-10 h-60 overflow-hidden rounded-2xl border border-line bg-card">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <svg
              className="absolute inset-0 h-full w-full opacity-30"
              viewBox="0 0 400 240"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M0 160 C80 140 120 190 200 150 S320 90 400 120"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="1"
              />
              <path
                d="M0 80 C100 100 160 40 240 70 S360 140 400 100"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="1"
              />
              <path d="M150 0 L170 240 M290 0 L250 240" stroke="var(--line)" strokeWidth="6" />
            </svg>
            <div className="radar absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span
                className="absolute inset-0 rounded-full bg-primary"
                style={{ animation: "pulse-ring 2s infinite" }}
              />
              <MapPin className="relative h-8 w-8 text-primary" />
            </div>
            <span className="eyebrow absolute bottom-4 start-4">{c.map}</span>
            <a href="#" className="eyebrow link-line absolute bottom-4 end-4 text-foreground">
              {c.openMaps}
            </a>
          </div>
        </div>
        <form
          onSubmit={submit}
          className="contact-form glass flex flex-col gap-6 rounded-2xl p-8 md:p-12"
        >
          <p className="eyebrow">{c.form}</p>
          <div className="grid gap-6 md:grid-cols-2">
            <Field name="name" label={c.name} required />
            <Field name="email" type="email" label={c.email} required />
          </div>
          <Field name="company" label={c.company} />
          <Field name="msg" label={c.msg} required area />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <Magnetic>
              <button
                type="submit"
                className="group flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground"
              >
                {c.send}{" "}
                <ArrowUpRight
                  className={`h-4 w-4 transition-transform group-hover:rotate-45 ${flip}`}
                />
              </button>
            </Magnetic>
            {sent && <span className="animate-fade-in text-sm text-primary">{c.thanks}</span>}
          </div>
        </form>
      </div>
    </section>
  );
}

/* ───────────────────────── FOOTER ───────────────────────── */

function DubaiClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () =>
      setT(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Dubai",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
      );
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <bdi dir="ltr" className="font-mono tabular-nums">
      {t || "--:--:--"}
    </bdi>
  );
}

export function Footer() {
  const { t } = useLang();
  const go = useGo();
  const f = t.footer;
  return (
    <footer className="relative overflow-hidden border-t border-line px-6 pt-16 md:px-12 md:pt-24">
      <div
        dir="ltr"
        className="footer-giant pointer-events-none flex select-none justify-center overflow-hidden font-display text-[19vw] md:text-[22vw] font-bold leading-[0.75] tracking-[-0.06em] text-foreground/[0.05]"
      >
        {COMPANY.toUpperCase()
          .split("")
          .map((ch, i) => (
            <span key={i} className="footer-letter inline-block">
              {ch}
            </span>
          ))}
      </div>
      <div className="relative z-10 mx-auto grid grid-cols-2 gap-x-6 gap-y-10 pb-12 pt-10 md:grid-cols-12 md:gap-12 md:pt-16">
        <div className="col-span-2 md:col-span-4">
          <Logo />
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">{f.about}</p>
          <div className="mt-6 flex gap-2">
            {socialIcons.map((I, k) => (
              <a
                key={k}
                href={socialHrefs[k]}
                aria-label={t.socials[k] ?? "Social"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-primary hover:text-primary"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="eyebrow mt-8 flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              style={{ animation: "pulse-ring 2s infinite" }}
            />
            {f.hq} <DubaiClock /> {f.tz}
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-4">{f.explore}</p>
          <ul className="space-y-2 text-sm">
            {navHrefs.map((href, i) => (
              <li key={href}>
                <button onClick={() => go(href)} className="link-line">
                  {t.nav[i]}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4">{f.services}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {t.services.items.map((s, i) => (
              <li key={i}>
                <button onClick={() => go("/#services")} className="link-line text-start">
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 md:col-span-3">
          <p className="eyebrow mb-4">{f.contact}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>{EMAIL}</li>
            <li>
              <bdi dir="ltr">{PHONE}</bdi>
            </li>
            <li>{f.address}</li>
          </ul>
          <Magnetic>
            <button
              onClick={() => getLenis()?.scrollTo(0, { duration: 2 })}
              aria-label={f.top}
              className="btn-fill mt-8 flex h-14 w-14 items-center justify-center rounded-full border border-line"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </Magnetic>
        </div>
      </div>
      <div className="relative z-10 mx-auto flex flex-col justify-between gap-2 border-t border-line py-6 text-xs text-muted-foreground md:flex-row">
        <span>
          © {new Date().getFullYear()} {f.rights}
        </span>
        <span className="flex gap-4">
          <a href="#" className="link-line">
            {f.privacy}
          </a>
          <a href="#" className="link-line">
            {f.terms}
          </a>
          <a href="#" className="link-line">
            {f.cookies}
          </a>
        </span>
      </div>
    </footer>
  );
}
