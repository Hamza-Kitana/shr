import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { Compass, Home, Languages, LayoutGrid, MessageCircle, Users } from "lucide-react";
import { COMPANY, EMAIL, PHONE, navHrefs, socialHrefs } from "./content";
import { useLang } from "./lang";
import { useRouterState } from "@tanstack/react-router";
import { useGo } from "./go";
import { getLenis } from "./smooth";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      dir="ltr"
      className={`flex items-center gap-2.5 font-display text-lg font-bold tracking-tight ${className}`}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
        <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeOpacity=".35" />
        <path
          d="M9 23V9l14 14V9"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {COMPANY.toUpperCase()}
    </span>
  );
}

export function Magnetic({
  children,
  strength = 0.35,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(pointer:fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1,0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1,0.4)" });
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * strength);
      yTo((e.clientY - r.top - r.height / 2) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);
  return (
    <span ref={ref} className="inline-block">
      {children}
    </span>
  );
}

export function Loader({ onDone }: { onDone: () => void }) {
  const STAGES = useLang().t.loader;
  const [n, setN] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = { v: 0 };
    const tl = gsap.timeline();
    tl.fromTo(
      "[data-loader-ring]",
      { strokeDashoffset: 92 },
      { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" },
    )
      .fromTo(
        "[data-loader-mark]",
        { strokeDashoffset: 60 },
        { strokeDashoffset: 0, duration: 1.1, ease: "power3.inOut" },
        "-=0.8",
      )
      .fromTo(
        "[data-loader-name] span",
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.05, duration: 0.8, ease: "expo.out" },
        "-=0.7",
      )
      .to(
        o,
        {
          v: 100,
          duration: 2.2,
          ease: "power2.inOut",
          onUpdate: () => setN(Math.round(o.v)),
        },
        0,
      )
      .to("[data-loader-logo]", {
        scale: 0.9,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.5,
        ease: "power2.in",
      })
      .to(
        root.current,
        { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" },
        "-=0.1",
      )
      .add(onDone, "-=0.7");
    return () => {
      tl.kill();
    };
  }, [onDone]);
  const stage = STAGES[Math.min(STAGES.length - 1, Math.floor(n / 25))];
  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <div data-loader-logo className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-4">
          <svg viewBox="0 0 32 32" className="h-14 w-14" aria-hidden>
            <circle
              data-loader-ring
              cx="16"
              cy="16"
              r="14.5"
              fill="none"
              stroke="var(--line)"
              strokeDasharray="92"
            />
            <path
              data-loader-mark
              d="M9 23V9l14 14V9"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60"
            />
          </svg>
          <span
            data-loader-name
            className="flex overflow-hidden font-display text-4xl font-bold tracking-tight"
          >
            {COMPANY.toUpperCase()
              .split("")
              .map((ch, i) => (
                <span key={i} className="inline-block">
                  {ch}
                </span>
              ))}
          </span>
        </div>
        <div className="h-px w-64 overflow-hidden bg-line">
          <div
            className="h-full bg-gradient-to-r from-primary to-gold"
            style={{ width: `${n}%` }}
          />
        </div>
        <div className="flex w-64 justify-between font-mono text-[10px] text-muted-foreground">
          {[0, 25, 50, 75, 100].map((s) => (
            <span
              key={s}
              className={`transition-colors duration-300 ${n >= s ? "text-primary" : ""}`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <span
        dir="ltr"
        className="absolute bottom-8 end-8 font-display text-[18vw] font-bold leading-none text-outline md:text-[12vw]"
      >
        {n}%
      </span>
      <span className="eyebrow absolute bottom-10 start-8">{stage}</span>
    </div>
  );
}

export function Curtain() {
  return (
    <div
      data-curtain
      className="fixed inset-0 z-[95] hidden items-center justify-center bg-card"
      style={{ clipPath: "inset(100% 0 0 0)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-glow)" }}
      />
      <span className="overflow-hidden">
        <span
          data-curtain-label
          className="block font-display text-[14vw] font-bold uppercase leading-none tracking-tighter text-gradient md:text-[9vw]"
        />
      </span>
    </div>
  );
}

type CursorMode = "idle" | "link" | "label";

export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const ringShape = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("idle");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!matchMedia("(pointer:fine)").matches) return;
    document.body.classList.add("has-cursor");
    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { ...mouse };
    const look = { scale: 1, press: 1 };
    let current: CursorMode = "idle";
    let currentLabel = "";
    let shown = false;

    const dx = gsap.quickSetter(dot.current, "x", "px");
    const dy = gsap.quickSetter(dot.current, "y", "px");
    const rx = gsap.quickSetter(ring.current, "x", "px");
    const ry = gsap.quickSetter(ring.current, "y", "px");
    const bx = gsap.quickSetter(bubble.current, "x", "px");
    const by = gsap.quickSetter(bubble.current, "y", "px");

    const apply = (next: CursorMode, text: string) => {
      if (next === current && text === currentLabel) return;
      current = next;
      currentLabel = text;
      setMode(next);
      if (text) setLabel(text);
      gsap.to(look, {
        scale: next === "link" ? 1.7 : next === "label" ? 0 : 1,
        duration: 0.5,
        ease: "expo.out",
      });
      gsap.to(dot.current, { scale: next === "idle" ? 1 : 0, duration: 0.35, ease: "power3.out" });
      gsap.to(bubble.current, {
        scale: next === "label" ? 1 : 0,
        duration: 0.55,
        ease: next === "label" ? "back.out(1.6)" : "power3.in",
      });
    };

    const move = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dx(mouse.x);
      dy(mouse.y);
      if (!shown) {
        shown = true;
        pos.x = mouse.x;
        pos.y = mouse.y;
        gsap.to(root.current, { autoAlpha: 1, duration: 0.3 });
      }
      const t = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor], a, button, [role=button], summary, label",
      );
      const text = t?.dataset["cursor"] ?? "";
      apply(text ? "label" : t ? "link" : "idle", text);
    };
    const leave = () => {
      shown = false;
      gsap.to(root.current, { autoAlpha: 0, duration: 0.3 });
    };
    const down = () => gsap.to(look, { press: 0.75, duration: 0.25, ease: "power3.out" });
    const up = () => gsap.to(look, { press: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" });

    const tick = (_t: number, dt: number) => {
      const k = 1 - Math.pow(0.82, dt / 16.67);
      const vx = (mouse.x - pos.x) * k;
      const vy = (mouse.y - pos.y) * k;
      pos.x += vx;
      pos.y += vy;
      rx(pos.x);
      ry(pos.y);
      bx(pos.x);
      by(pos.y);
      const speed = Math.min(Math.hypot(vx, vy) / 40, 0.35) * (current === "idle" ? 1 : 0.25);
      const s = look.scale * look.press;
      gsap.set(ringShape.current, {
        rotation: Math.atan2(vy, vx) * 57.2958,
        scaleX: s * (1 + speed),
        scaleY: s * (1 - speed),
      });
    };

    gsap.ticker.add(tick);
    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={root} className="pointer-events-none fixed inset-0 z-[90] hidden opacity-0 md:block">
      <div ref={ring} className="absolute left-0 top-0">
        <div
          ref={ringShape}
          className={`-ml-5 -mt-5 h-10 w-10 rounded-full border transition-[border-color,background-color,box-shadow] duration-500 ${
            mode === "link"
              ? "border-primary bg-primary/10 shadow-[0_0_24px_-4px_var(--primary)]"
              : "border-foreground/35"
          }`}
        />
      </div>
      <div ref={dot} className="absolute left-0 top-0">
        <div className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
      </div>
      <div ref={bubble} className="absolute left-0 top-0" style={{ transform: "scale(0)" }}>
        <div className="-ml-12 -mt-12 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-center shadow-[0_10px_40px_-10px_var(--primary)]">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground rtl:font-sans rtl:text-xs">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Progress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const f = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  return (
    <div
      ref={ref}
      className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-gradient-to-r from-primary to-gold rtl:origin-right rtl:bg-gradient-to-l"
      style={{ transform: "scaleX(0)" }}
    />
  );
}

const tabs = [
  { href: "/", Icon: Home },
  { href: "/about", Icon: Compass },
  { href: "/projects", Icon: LayoutGrid },
  { href: "/team", Icon: Users },
  { href: "/contact", Icon: MessageCircle },
];

/** App-style bottom tab bar for phones & tablets; tucks away while reading down, returns on scroll up. */
export function TabBar() {
  const { t } = useLang();
  const go = useGo();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [hidden, setHidden] = useState(false);
  const active = tabs.findIndex((tab) => tab.href === path);

  useEffect(() => {
    let last = scrollY;
    const f = () => {
      const y = scrollY;
      const nearEnd = y + innerHeight >= document.documentElement.scrollHeight - 80;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 240 && !nearEnd);
      last = y;
    };
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);

  useEffect(() => setHidden(false), [path]);

  return (
    <nav
      aria-label={t.ui.menu}
      className={`fixed inset-x-0 bottom-0 z-[75] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] lg:hidden ${hidden ? "translate-y-[150%]" : ""}`}
    >
      <div className="glass relative mx-auto flex max-w-md rounded-[1.75rem] p-1.5 shadow-[var(--shadow-deep)]">
        {active >= 0 && (
          <span
            aria-hidden
            className="absolute inset-y-1.5 rounded-[1.4rem] bg-primary/12 ring-1 ring-primary/30 transition-[inset-inline-start] duration-500 [transition-timing-function:var(--ease-out-expo)]"
            style={{
              width: "calc((100% - 0.75rem) / 5)",
              insetInlineStart: `calc(0.375rem + ${active} * (100% - 0.75rem) / 5)`,
            }}
          />
        )}
        {tabs.map(({ href, Icon }, i) => {
          const on = i === active;
          return (
            <button
              key={href}
              onClick={() => {
                navigator.vibrate?.(8);
                go(href);
              }}
              aria-current={on ? "page" : undefined}
              className={`relative z-10 flex flex-1 flex-col items-center gap-1 rounded-[1.4rem] py-2 transition-colors duration-300 ${on ? "text-primary" : "text-muted-foreground"}`}
            >
              <Icon
                className={`h-5 w-5 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] ${on ? "-translate-y-px scale-110" : ""}`}
                strokeWidth={on ? 2.2 : 1.6}
              />
              <span className="text-[10px] font-semibold leading-none rtl:text-[11px]">
                {t.nav[navHrefs.indexOf(href)]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function LangSwitch() {
  const { t, toggle } = useLang();
  return (
    <Magnetic>
      <button
        onClick={toggle}
        aria-label={t.ui.switchAria}
        title={t.ui.switchAria}
        className="btn-fill flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold"
      >
        <Languages className="h-4 w-4 text-primary" />
        <span lang={t.ui.switchLabel === "EN" ? "en" : "ar"}>{t.ui.switchLabel}</span>
      </button>
    </Magnetic>
  );
}

export function Nav() {
  const { t, lang } = useLang();
  const nav = navHrefs.map((href, i) => ({ href, label: t.nav[i]! }));
  const corner = lang === "ar" ? "0% 0%" : "100% 0%";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [onServices, setOnServices] = useState(false);
  const active = path === "/" ? (onServices ? "/#services" : "/") : path;
  const menu = useRef<HTMLDivElement>(null);
  const navigate = useGo();
  useEffect(() => {
    const f = () => {
      setScrolled(scrollY > 60);
      const svc = document.getElementById("services");
      const r = svc?.getBoundingClientRect();
      setOnServices(!!r && r.top <= innerHeight * 0.45 && r.bottom > innerHeight * 0.45);
    };
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, [path]);
  useEffect(() => {
    if (open) getLenis()?.stop();
    else getLenis()?.start();
  }, [open]);
  useEffect(() => {
    if (!menu.current) return;
    gsap.to(menu.current, {
      clipPath: open ? `circle(150% at ${corner})` : `circle(0% at ${corner})`,
      duration: 0.9,
      ease: "expo.inOut",
    });
    if (open)
      gsap.fromTo(
        "[data-menu-item]",
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.06, delay: 0.3, duration: 0.8, ease: "expo.out" },
      );
  }, [open, corner]);
  const go = (h: string) => {
    setOpen(false);
    navigate(h);
  };
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <div
          className={`flex w-full items-center justify-between transition-all duration-700 ${scrolled ? "glass max-w-5xl rounded-full px-5 py-2.5 shadow-[var(--shadow-deep)]" : "max-w-full px-2 py-4"}`}
        >
          <button onClick={() => go("/")} aria-label={t.nav[0]}>
            <Logo />
          </button>
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <button
                key={n.href}
                onClick={() => go(n.href)}
                className={`link-line relative text-sm transition-colors hover:text-foreground ${active === n.href ? "text-foreground" : "text-muted-foreground"}`}
              >
                {n.label}
                <span
                  className={`absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary transition-all duration-500 ${active === n.href ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                />
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <LangSwitch />
            <Magnetic>
              <button
                onClick={() => go("/contact")}
                className="btn-fill hidden rounded-full border border-line px-5 py-2 text-sm font-medium transition-colors sm:inline-block"
              >
                {t.ui.getStarted}
              </button>
            </Magnetic>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative z-[85] flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label={t.ui.menu}
            >
              <span
                className={`h-px w-6 bg-foreground transition-transform duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-6 bg-foreground transition-transform duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>
      <div
        ref={menu}
        className="fixed inset-0 z-[78] flex flex-col justify-between bg-card px-6 pb-10 pt-28 lg:hidden"
        style={{ clipPath: `circle(0% at ${corner})` }}
      >
        <ul className="space-y-2">
          {nav.map((n, i) => (
            <li key={n.href} className="overflow-hidden">
              <button
                data-menu-item
                onClick={() => go(n.href)}
                className="flex items-baseline gap-4 font-display text-5xl font-bold"
              >
                <span className="font-mono text-xs text-primary">0{i + 1}</span>
                {n.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {t.socials.map((label, k) => (
              <a key={k} href={socialHrefs[k]} className="link-line text-sm text-muted-foreground">
                {label}
              </a>
            ))}
          </div>
          <p className="eyebrow">
            {EMAIL} — <bdi dir="ltr">{PHONE}</bdi>
          </p>
        </div>
      </div>
    </>
  );
}
