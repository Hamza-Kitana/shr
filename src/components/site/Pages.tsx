import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Brain, GraduationCap, Globe2, Gem, Plus } from "lucide-react";
import { caseMetrics, departmentSizes, navHrefs, offices, projectMedia } from "./content";
import { Magnetic } from "./Chrome";
import { useGo } from "./go";
import { useLang } from "./lang";
import { RailDots } from "./RailDots";

type PageKey = "about" | "projects" | "team" | "contact";
const flip = "rtl:-scale-x-100";
const pad = (n: number) => String(n).padStart(2, "0");

function SectionHead({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div data-reveal className={`mb-16 ${className}`}>
      <p className="eyebrow mb-4 flex items-center gap-3">
        <span className="h-px w-10 bg-primary" />
        {eyebrow}
      </p>
      <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
        {title}
      </h2>
    </div>
  );
}

/* ───────────────────────── PAGE HERO ───────────────────────── */

export function PageHero({ page, scene }: { page: PageKey; scene: string }) {
  const { t } = useLang();
  const p = t.pages[page];
  return (
    <section
      data-title={t.nav[navHrefs.indexOf(`/${page}`)]}
      data-scene={scene}
      className="page-hero relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/85 via-background/25 to-transparent rtl:bg-gradient-to-l" />
      <span
        dir="ltr"
        className="ph-index pointer-events-none absolute -top-[3vw] end-[-3vw] select-none font-display text-[44vw] font-bold leading-none tracking-tighter text-outline md:text-[34vw]"
      >
        {p.index}
      </span>
      <div className="ph-inner relative px-6 md:px-12">
        <p className="ph-fade eyebrow mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-primary" />
          <span dir="ltr" className="text-primary">
            {p.index} / 04
          </span>{" "}
          — {p.eyebrow}
        </p>
        <h1 className="font-display text-[14vw] font-bold leading-[0.9] tracking-[-0.045em] [perspective:900px] md:text-[8.6vw]">
          {[p.l1, p.l2, p.l3].map((line, li) => (
            <span key={li} className="block">
              {line.split(" ").map((w, k) => (
                <span
                  key={k}
                  className="-mt-[0.25em] inline-block overflow-hidden pb-[0.12em] pt-[0.25em] align-bottom"
                >
                  <span
                    className={`ph-word inline-block ${li === 1 ? "text-gradient" : "text-hover"}`}
                  >
                    {w}&nbsp;
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>
        <div className="ph-line mt-10 h-px origin-left bg-gradient-to-r from-primary via-line to-transparent rtl:origin-right rtl:bg-gradient-to-l" />
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="ph-fade max-w-xl text-lg leading-relaxed text-muted-foreground md:col-span-7">
            {p.lead}
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 md:col-span-5 md:justify-end">
            {p.meta.map((m) => (
              <li key={m} className="ph-fade eyebrow flex items-center gap-2 text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="ph-marquee pointer-events-none mt-16 whitespace-nowrap font-display text-[8vw] font-bold leading-none tracking-tight text-foreground/[0.06]">
        {p.marquee.repeat(4)}
      </div>
    </section>
  );
}

/* ───────────────────────── OFFICES ───────────────────────── */

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function Offices({ scene }: { scene: string }) {
  const { t } = useLang();
  const o = t.offices;
  const now = useNow();
  return (
    <section data-scene={scene} className="relative px-6 py-32 md:px-12">
      <SectionHead eyebrow={o.eyebrow} title={o.title} />
      <div className="m-rail grid gap-5 [perspective:1400px] md:grid-cols-2 xl:grid-cols-4">
        {o.items.map((item, i) => {
          const tz = offices[i]!.tz;
          const time = now
            ? new Intl.DateTimeFormat("en-GB", {
                timeZone: tz,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(now)
            : "--:--:--";
          const hour = now
            ? Number(
                new Intl.DateTimeFormat("en-GB", {
                  timeZone: tz,
                  hour: "2-digit",
                  hourCycle: "h23",
                }).format(now),
              )
            : 0;
          const open = hour >= 9 && hour < 18;
          return (
            <article
              key={i}
              className="office glass group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl p-7 transition-colors duration-500 hover:border-primary/60"
            >
              <span className="pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full bg-primary/0 blur-3xl transition-colors duration-700 group-hover:bg-primary/20" />
              <div className="flex items-center justify-between">
                <span dir="ltr" className="font-mono text-xs text-muted-foreground">
                  {pad(i + 1)}
                </span>
                <span
                  className={`eyebrow rounded-full border px-3 py-1 ${offices[i]!.hq ? "border-primary/50 text-primary" : "border-line"}`}
                >
                  {offices[i]!.hq ? o.hq : o.hub}
                </span>
              </div>
              <div>
                <h3 className="font-display text-4xl font-bold tracking-tight transition-transform duration-500 group-hover:-translate-y-1 md:text-5xl">
                  {item.city}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.country}</p>
                <p className="mt-6 border-t border-line pt-4 text-sm text-foreground/80">
                  {item.addr}
                </p>
              </div>
              <div className="flex items-end justify-between">
                <bdi dir="ltr" className="font-mono text-2xl tabular-nums">
                  {time}
                </bdi>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span
                    className={`h-2 w-2 rounded-full ${open ? "bg-emerald-400" : "bg-muted-foreground/50"}`}
                    style={open ? { animation: "pulse-ring 2s infinite" } : undefined}
                  />
                  {open ? o.open : o.closed}
                </span>
              </div>
            </article>
          );
        })}
      </div>
      <RailDots count={o.items.length} />
    </section>
  );
}

/* ───────────────────────── CASE STUDIES ───────────────────────── */

export function CaseStudies() {
  const { t } = useLang();
  const c = t.cases;
  return (
    <section data-scene="-0.82,0.55,0.4" className="relative px-6 py-32 md:px-12">
      <SectionHead eyebrow={c.eyebrow} title={c.title} />
      <div className="space-y-36 md:space-y-48">
        {c.items.map((item, i) => {
          const pr = t.projects.items[i]!;
          const media = projectMedia[i]!;
          return (
            <article key={i} className="case grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div
                data-cursor={t.projects.cursor}
                className={`case-mask relative aspect-[4/3] overflow-hidden rounded-2xl lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}
              >
                <img
                  src={media.img}
                  alt={pr.name}
                  loading="lazy"
                  decoding="async"
                  className="case-img h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20" />
                <span
                  dir="ltr"
                  className="absolute start-6 top-4 font-display text-7xl font-bold text-foreground/15 md:text-8xl"
                >
                  {pad(i + 1)}
                </span>
                <span className="eyebrow glass absolute bottom-6 start-6 rounded-full px-4 py-2 text-foreground">
                  {pr.cat}
                </span>
              </div>
              <div className="lg:col-span-5">
                <div className="case-reveal eyebrow mb-3 flex gap-4">
                  <span className="text-primary">{pr.cat}</span>
                  <span>{media.year}</span>
                </div>
                <h3 className="case-reveal font-display text-4xl font-bold tracking-tight md:text-6xl">
                  {pr.name}
                </h3>
                <dl className="mt-8 space-y-6">
                  <div className="case-reveal">
                    <dt className="eyebrow mb-2 text-primary">{c.challenge}</dt>
                    <dd className="leading-relaxed text-muted-foreground">{item.challenge}</dd>
                  </div>
                  <div className="case-reveal">
                    <dt className="eyebrow mb-2 text-primary">{c.approach}</dt>
                    <dd className="leading-relaxed text-muted-foreground">{item.approach}</dd>
                  </div>
                </dl>
                <div className="case-reveal mt-10 border-t border-line pt-6">
                  <p className="eyebrow mb-4">{c.impact}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {caseMetrics[i]!.map((m, k) => (
                      <div key={k}>
                        <p className="font-display text-3xl font-bold text-foreground md:text-4xl">
                          <span dir="ltr" className="inline-block">
                            <span data-count={m.v}>0</span>
                            {m.s}
                          </span>
                        </p>
                        <p className="mt-1 text-xs leading-snug text-muted-foreground">
                          {item.metrics[k]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ───────────────────────── DEPARTMENTS ───────────────────────── */

export function Departments() {
  const { t } = useLang();
  const d = t.departments;
  const max = Math.max(...departmentSizes);
  return (
    <section data-scene="0.78,0.3,0.5" className="relative px-6 py-32 md:px-12">
      <SectionHead eyebrow={d.eyebrow} title={d.title} />
      <ul className="border-t border-line">
        {d.items.map((name, i) => {
          const size = departmentSizes[i]!;
          return (
            <li
              key={i}
              className="dept-row group grid grid-cols-12 items-center gap-4 border-b border-line py-7"
            >
              <span dir="ltr" className="col-span-1 font-mono text-xs text-primary">
                {pad(i + 1)}
              </span>
              <span className="col-span-5 font-display text-2xl font-semibold transition-colors duration-500 group-hover:text-primary md:col-span-3 md:text-4xl">
                {name}
              </span>
              <div className="relative col-span-4 h-[6px] overflow-hidden rounded-full bg-line md:col-span-7">
                <div
                  className="dept-bar absolute inset-y-0 start-0 origin-left rounded-full bg-gradient-to-r from-primary to-gold rtl:origin-right rtl:bg-gradient-to-l"
                  style={{ width: `${(size / max) * 100}%` }}
                />
              </div>
              <span className="col-span-2 text-end font-display text-3xl font-bold md:col-span-1 md:text-4xl">
                <span data-count={size}>0</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ───────────────────────── PERKS ───────────────────────── */

const perkIcons = [Brain, GraduationCap, Globe2, Gem];

export function Perks() {
  const { t } = useLang();
  const p = t.perks;
  return (
    <section data-scene="-0.75,-0.2,0.6" className="relative px-6 py-32 md:px-12">
      <SectionHead eyebrow={p.eyebrow} title={p.title} />
      <div className="m-rail grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {p.items.map((item, i) => {
          const Icon = perkIcons[i] ?? Gem;
          return (
            <div
              key={i}
              className="perk service-card group relative flex min-h-[300px] flex-col justify-between rounded-2xl p-8 backdrop-blur-md"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line transition-all duration-700 group-hover:rotate-[20deg] group-hover:border-primary group-hover:bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.d}</p>
              </div>
            </div>
          );
        })}
      </div>
      <RailDots count={p.items.length} />
    </section>
  );
}

/* ───────────────────────── ACCORDION (careers / faq) ───────────────────────── */

function Expand({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-700 [transition-timing-function:var(--ease-out-expo)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

export function Careers() {
  const { t } = useLang();
  const go = useGo();
  const c = t.careers;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section data-scene="0.8,0.45,0.42" className="relative px-6 py-32 md:px-12">
      <SectionHead eyebrow={c.eyebrow} title={c.title} />
      <ul className="border-t border-line">
        {c.items.map((job, i) => {
          const on = open === i;
          return (
            <li
              key={i}
              className={`job group border-b border-line transition-colors duration-500 ${on ? "bg-card/60" : "hover:bg-card/40"}`}
            >
              <button
                onClick={() => setOpen(on ? null : i)}
                aria-expanded={on}
                className="flex w-full flex-wrap items-center gap-x-8 gap-y-3 px-2 py-8 text-start md:px-6"
              >
                <span dir="ltr" className="font-mono text-xs text-primary">
                  {pad(i + 1)}
                </span>
                <span className="flex-1 font-display text-2xl font-semibold transition-transform duration-500 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 md:text-4xl">
                  {job.t}
                </span>
                <span className="flex flex-wrap gap-2">
                  {[job.dept, job.loc, job.type].map((x) => (
                    <span
                      key={x}
                      className="rounded-full border border-line px-3 py-1 text-xs text-muted-foreground"
                    >
                      {x}
                    </span>
                  ))}
                </span>
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full border border-line transition-all duration-500 ${on ? "rotate-45 border-primary bg-primary text-primary-foreground" : ""}`}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <Expand open={on}>
                <div className="flex flex-col gap-6 px-2 pb-8 md:flex-row md:items-end md:justify-between md:px-6 md:ps-16">
                  <p className="max-w-2xl leading-relaxed text-muted-foreground">{job.d}</p>
                  <Magnetic>
                    <button
                      onClick={() => go("/contact")}
                      className="group/apply flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                    >
                      {c.apply}{" "}
                      <ArrowRight
                        className={`h-4 w-4 transition-transform group-hover/apply:translate-x-1 rtl:group-hover/apply:-translate-x-1 ${flip}`}
                      />
                    </button>
                  </Magnetic>
                </div>
              </Expand>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function FAQ() {
  const { t } = useLang();
  const f = t.faq;
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section data-scene="0.82,0.1,0.55" className="relative px-6 py-32 md:px-12">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <SectionHead eyebrow={f.eyebrow} title={f.title} className="!mb-0" />
          </div>
        </div>
        <ul className="border-t border-line md:col-span-8">
          {f.items.map((item, i) => {
            const on = open === i;
            return (
              <li key={i} className="faq-item border-b border-line">
                <button
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className="group flex w-full items-center justify-between gap-6 py-7 text-start"
                >
                  <span
                    className={`font-display text-xl font-semibold transition-colors duration-500 md:text-2xl ${on ? "text-primary" : "group-hover:text-primary"}`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-500 ${on ? "rotate-45 border-primary text-primary" : ""}`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <Expand open={on}>
                  <p className="max-w-2xl pb-8 leading-relaxed text-muted-foreground">{item.a}</p>
                </Expand>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── NEXT PAGE ───────────────────────── */

export function NextPage({ href }: { href: string }) {
  const { t } = useLang();
  const go = useGo();
  const label = t.nav[navHrefs.indexOf(href)] ?? "";
  return (
    <section
      data-scene="0,-1.15,2.2"
      className="next-page relative overflow-hidden border-t border-line px-6 py-28 md:px-12 md:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-glow)" }}
      />
      <button
        data-cursor={t.next.cursor}
        onClick={() => go(href)}
        className="group relative block w-full text-start"
      >
        <span className="eyebrow flex items-center gap-3">
          <span className="h-px w-10 bg-primary" />
          {t.next.label}
        </span>
        <span className="mt-8 flex items-center justify-between gap-6">
          <span className="next-title relative block font-display text-[15vw] font-bold leading-[1] tracking-tighter md:text-[10vw]">
            <span className="block text-outline">{label}</span>
            <span aria-hidden className="next-fill absolute inset-0 block text-gradient">
              {label}
            </span>
          </span>
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-700 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground md:h-36 md:w-36">
            <ArrowRight className={`next-arrow h-8 w-8 md:h-12 md:w-12 ${flip}`} />
          </span>
        </span>
      </button>
    </section>
  );
}
