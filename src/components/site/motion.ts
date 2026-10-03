import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { sceneState } from "./scene-state";
import { getLenis, setLenis } from "./smooth";
import { isRtl } from "./lang";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

const DEFAULT_COLOR = "#5fe0e0";
const sel = <T extends Element = HTMLElement>(q: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(q));

/** Smooth scrolling + pointer/velocity/colour bridge into the WebGL scene. */
export function useSmoothScroll(ready: boolean) {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({ lerp: reduce ? 1 : 0.09, wheelMultiplier: 0.9 });
    lenis.stop();
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
      sceneState.velocity = lenis.velocity / 15;
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const move = (e: PointerEvent) => {
      sceneState.pointer.x = (e.clientX / innerWidth) * 2 - 1;
      sceneState.pointer.y = -(e.clientY / innerHeight) * 2 + 1;
    };
    const over = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-service]");
      sceneState.hover = card?.dataset["service"] ?? null;
    };
    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerover", over, { passive: true });

    return () => {
      gsap.ticker.remove(tick);
      removeEventListener("pointermove", move);
      removeEventListener("pointerover", over);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    getLenis()?.start();
    ScrollTrigger.refresh();
    const refresh = () => ScrollTrigger.refresh();
    addEventListener("load", refresh);
    return () => removeEventListener("load", refresh);
  }, [ready]);
}

/** Every section gets its own choreography; all of it is scoped to `root` and reverted on unmount. */
export function useSectionMotion(
  root: RefObject<HTMLElement | null>,
  ready: boolean,
  lang: string,
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-word", { yPercent: 110 });
      gsap.set(".hero-fade", { autoAlpha: 0, y: 24 });
    }, root);
    return () => ctx.revert();
  }, [root, lang]);

  useEffect(() => {
    if (!ready) return;
    R = isRtl() ? -1 : 1;
    const ctx = gsap.context(() => {
      const el = root.current;
      if (!el) return;
      const cleanups = STEPS.filter(([q]) => el.querySelector(q))
        .map(([, run]) => run())
        .filter((c): c is () => void => typeof c === "function");
      return () => cleanups.forEach((c) => c());
    }, root);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [root, ready, lang]);
}

/** Horizontal direction multiplier: 1 for LTR, -1 for RTL, so every slide mirrors with the layout. */
let R = 1;

/** Each choreography runs only on pages that contain its section. The pinned reel goes first so every trigger below it measures after its spacer exists. */
const STEPS: [string, () => void | (() => void)][] = [
  [".proj-section", () => projects()],
  [".hero", () => hero()],
  [".page-hero", () => pageHero()],
  [".about-story", () => about()],
  [".svc-section", () => services()],
  [".why-grid", () => why()],
  ["[data-count]", () => numbers()],
  [".case", () => cases()],
  [".proc-section", () => processLine()],
  [".client-row", () => clients()],
  [".testi-section", () => testimonials()],
  [".team-card", () => team()],
  [".office", () => officesFx()],
  [".dept-row", () => departments()],
  [".perk", () => perks()],
  [".job", () => careers()],
  [".faq-item", () => faq()],
  [".cta-section", () => cta()],
  [".contact-form", () => contact()],
  [".next-page", () => nextPage()],
  ["[data-reveal]", () => reveals()],
  [".footer-giant", () => footer()],
];

/* HERO — staggered word rise on load, then the whole block drifts up and blurs out as the story begins. */
function hero() {
  gsap
    .timeline()
    .to(".hero-word", { yPercent: 0, duration: 1.3, stagger: 0.08, ease: "expo.out" })
    .to(
      ".hero-fade",
      { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
      "-=0.9",
    );
  gsap.to(".hero-inner", {
    y: () => -innerHeight * 0.18,
    opacity: 0.15,
    filter: "blur(6px)",
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to(".hero-side", {
    yPercent: -200,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });
}

/* ABOUT — five chapters, five techniques: scrubbed highlight, drawn timeline, mask reveal, focus pull, card flip. */
function about() {
  gsap.to(".about-year", {
    yPercent: 40,
    ease: "none",
    scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: true },
  });
  gsap.fromTo(
    ".about-marquee",
    { xPercent: 0 },
    {
      xPercent: -35 * R,
      ease: "none",
      scrollTrigger: {
        trigger: ".about-marquee",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    },
  );
  sel(".chap-label").forEach((el) =>
    gsap.from(el, {
      x: -30 * R,
      autoAlpha: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
    }),
  );

  gsap.to(".scrub-word", {
    opacity: 1,
    stagger: 0.1,
    ease: "none",
    scrollTrigger: { trigger: ".chapter-0", start: "top 75%", end: "bottom 40%", scrub: true },
  });

  gsap.from(".chapter-1 .chap-text", {
    yPercent: 30,
    autoAlpha: 0,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".chapter-1",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });
  gsap.to(".story-line", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { trigger: ".story-timeline", start: "top 80%", end: "bottom 50%", scrub: true },
  });
  gsap.from(".story-node", {
    scale: 0.6,
    autoAlpha: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "back.out(2)",
    scrollTrigger: {
      trigger: ".story-timeline",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  const mission = { trigger: ".chapter-2", start: "top 85%", end: "center 50%", scrub: true };
  gsap.fromTo(
    ".mission-mask",
    { clipPath: "inset(100% 0% 0% 0% round 1rem)" },
    { clipPath: "inset(0% 0% 0% 0% round 1rem)", ease: "none", scrollTrigger: mission },
  );
  gsap.fromTo(".mission-img", { scale: 1.5 }, { scale: 1, ease: "none", scrollTrigger: mission });
  gsap.from(".mission-text", {
    x: 80 * R,
    autoAlpha: 0,
    duration: 1.2,
    ease: "expo.out",
    scrollTrigger: {
      trigger: ".chapter-2",
      start: "top 60%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.fromTo(
    ".vision-text",
    { filter: "blur(24px)", opacity: 0, scale: 1.15 },
    {
      filter: "blur(0px)",
      opacity: 1,
      scale: 1,
      ease: "none",
      scrollTrigger: { trigger: ".chapter-3", start: "top 85%", end: "center 55%", scrub: true },
    },
  );

  gsap.from(".value-card", {
    rotationX: -90,
    transformOrigin: "50% 0%",
    autoAlpha: 0,
    stagger: 0.12,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".chapter-4",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });
}

/* SERVICES — cards fall in from depth; the section glow and the 3D core follow whichever service is in view. */
function services() {
  gsap.from(".svc-title-line", {
    yPercent: 130,
    stagger: 0.1,
    duration: 1.2,
    ease: "expo.out",
    scrollTrigger: {
      trigger: ".svc-title",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
  ScrollTrigger.batch(".svc-card", {
    start: "top 88%",
    once: true,
    onEnter: (els) =>
      gsap.fromTo(
        els,
        {
          rotationX: 55,
          y: 120,
          z: -200,
          autoAlpha: 0,
          transformOrigin: "50% 0%",
          transition: "none",
        },
        {
          rotationX: 0,
          y: 0,
          z: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "expo.out",
          clearProps: "transform,transition,transformOrigin",
        },
      ),
  });

  const section = document.querySelector<HTMLElement>(".svc-section");
  const setColor = (c: string) => {
    sceneState.color = c;
    section?.style.setProperty("--svc", c);
  };
  sel(".svc-card").forEach((card) =>
    ScrollTrigger.create({
      trigger: card,
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (self) => {
        if (self.isActive) setColor(card.dataset["service"] ?? DEFAULT_COLOR);
      },
    }),
  );
  ScrollTrigger.create({
    trigger: ".svc-section",
    start: "top bottom",
    end: "bottom top",
    onLeave: () => setColor(DEFAULT_COLOR),
    onLeaveBack: () => setColor(DEFAULT_COLOR),
  });
}

/* WHY — headline words hinge up; grid cells are wiped open, each from a different edge. */
function why() {
  gsap.from(".why-word", {
    rotationX: -90,
    transformOrigin: "50% 100%",
    autoAlpha: 0,
    stagger: 0.06,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".why-title",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
  const from = [
    "inset(0% 100% 0% 0%)",
    "inset(100% 0% 0% 0%)",
    "inset(0% 0% 0% 100%)",
    "inset(0% 0% 100% 0%)",
    "inset(50% 50% 50% 50%)",
    "inset(0% 100% 0% 0%)",
  ];
  sel(".why-cell").forEach((cell, i) =>
    gsap.fromTo(
      cell,
      { clipPath: from[i % from.length]! },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        delay: i * 0.08,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: ".why-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    ),
  );
}

/* NUMBERS — each row slides in from alternating sides while its counter runs from zero. */
function numbers() {
  sel(".stat-row").forEach((row) => {
    const dir = Number(row.dataset["dir"] ?? 1) * R;
    gsap.fromTo(
      row.querySelector(".stat-num"),
      { x: () => dir * innerWidth * 0.3 },
      {
        x: 0,
        ease: "none",
        scrollTrigger: {
          trigger: row,
          start: "top bottom",
          end: "center 55%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
    gsap.from(row.querySelector(".stat-label"), {
      autoAlpha: 0,
      x: -dir * 40,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: row, start: "top 80%", toggleActions: "play none none reverse" },
    });
  });
  sel("[data-count]").forEach((el) => {
    const o = { v: 0 };
    gsap.to(o, {
      v: Number(el.dataset["count"]),
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = String(Math.round(o.v));
      },
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}

/* PROJECTS — pinned horizontal reel on desktop with mask-wiped, parallaxing frames; vertical wipes on mobile. */
function projects() {
  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    const track = document.querySelector<HTMLElement>(".proj-track");
    if (!track) return;
    const dist = () => track.scrollWidth - innerWidth;
    const st = {
      trigger: ".proj-section",
      start: "top top",
      end: () => `+=${dist()}`,
      scrub: 1,
      invalidateOnRefresh: true,
    };
    const rtl = R < 0;
    const tween = gsap.to(track, {
      x: () => -dist() * R,
      ease: "none",
      scrollTrigger: { ...st, pin: true },
    });
    gsap.to(".proj-ghost", { xPercent: -30 * R, ease: "none", scrollTrigger: st });
    gsap.to(".proj-progress", { scaleX: 1, ease: "none", scrollTrigger: st });

    sel(".proj-card").forEach((card) => {
      const ca = { trigger: card, containerAnimation: tween, scrub: true };
      gsap.fromTo(
        card.querySelector(".proj-mask"),
        { clipPath: rtl ? "inset(0% 100% 0% 0% round 1rem)" : "inset(0% 0% 0% 100% round 1rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 1rem)",
          ease: "none",
          scrollTrigger: {
            ...ca,
            start: rtl ? "right 0%" : "left 100%",
            end: rtl ? "right 55%" : "left 45%",
          },
        },
      );
      gsap.fromTo(
        card.querySelector(".proj-img"),
        { scale: 1.35, xPercent: -6 * R },
        {
          scale: 1.05,
          xPercent: 6 * R,
          ease: "none",
          scrollTrigger: {
            ...ca,
            start: rtl ? "right left" : "left right",
            end: rtl ? "left right" : "right left",
          },
        },
      );
      gsap.from(card.querySelector(".proj-info"), {
        y: 50,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          ...ca,
          start: rtl ? "right 20%" : "left 80%",
          end: rtl ? "right 50%" : "left 50%",
        },
      });
    });
  });
  mm.add("(max-width: 1023px)", () => {
    sel(".proj-card").forEach((card) => {
      const st = { trigger: card, start: "top 90%", end: "top 35%", scrub: true };
      gsap.fromTo(
        card.querySelector(".proj-mask"),
        { clipPath: "inset(0% 0% 100% 0% round 1rem)" },
        { clipPath: "inset(0% 0% 0% 0% round 1rem)", ease: "none", scrollTrigger: st },
      );
      gsap.fromTo(
        card.querySelector(".proj-img"),
        { scale: 1.35 },
        { scale: 1.05, ease: "none", scrollTrigger: st },
      );
    });
  });
}

/* PROCESS — a glowing orb travels the line; each step focuses as it is reached and the sticky counter rolls. */
function processLine() {
  const st = { trigger: ".proc-section ol", start: "top 60%", end: "bottom 60%", scrub: true };
  gsap.to(".proc-line", { scaleY: 1, ease: "none", scrollTrigger: st });
  const orb = document.querySelector<HTMLElement>(".proc-orb");
  if (orb)
    gsap.to(orb, {
      y: () => orb.parentElement?.offsetHeight ?? 0,
      ease: "none",
      scrollTrigger: { ...st, invalidateOnRefresh: true },
    });

  const counter = document.querySelector<HTMLElement>(".proc-counter");
  sel(".proc-step").forEach((step, i) =>
    ScrollTrigger.create({
      trigger: step,
      start: "top 62%",
      end: "bottom 38%",
      toggleClass: "is-on",
      onToggle: (self) => {
        if (self.isActive && counter) counter.style.transform = `translateY(${-i * 9}rem)`;
      },
    }),
  );
}

/* CLIENTS — rows converge from opposite sides and skew with scroll velocity. */
function clients() {
  const rows = sel(".client-row");
  rows.forEach((row, i) =>
    gsap.fromTo(
      row,
      { x: (i % 2 ? 1 : -1) * 200 },
      {
        x: 0,
        ease: "none",
        scrollTrigger: { trigger: row, start: "top bottom", end: "top 50%", scrub: true },
      },
    ),
  );
  const setters = rows.map((r) => gsap.quickTo(r, "skewX", { duration: 0.5, ease: "power3" }));
  const tick = () => {
    const s = gsap.utils.clamp(-8, 8, -sceneState.velocity * 1.5);
    setters.forEach((set) => set(s));
  };
  gsap.ticker.add(tick);
  return () => gsap.ticker.remove(tick);
}

/* TESTIMONIALS — the stack swings in on a 3D hinge. */
function testimonials() {
  gsap.from(".testi-stack", {
    rotationY: -25 * R,
    x: 120 * R,
    autoAlpha: 0,
    transformPerspective: 1200,
    duration: 1.4,
    ease: "expo.out",
    scrollTrigger: {
      trigger: ".testi-section",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  });
}

/* TEAM — portraits are unveiled bottom-up while their images settle from a zoom. */
function team() {
  gsap.from(".team-title-line", {
    yPercent: 130,
    duration: 1.2,
    ease: "expo.out",
    scrollTrigger: {
      trigger: ".team-title",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
  const cards = sel(".team-card");
  const grid = cards[0]?.parentElement;
  if (!grid) return;
  gsap.to(cards, {
    clipPath: "inset(0% 0% 0% 0% round 1rem)",
    stagger: 0.15,
    duration: 1.4,
    ease: "expo.inOut",
    scrollTrigger: { trigger: grid, start: "top 80%", toggleActions: "play none none reverse" },
  });
  gsap.from(".team-img", {
    scale: 1.4,
    stagger: 0.15,
    duration: 1.8,
    ease: "expo.out",
    scrollTrigger: { trigger: grid, start: "top 80%", toggleActions: "play none none reverse" },
  });
}

/* CTA — lines pull focus out of depth while concentric rings expand around the enlarged core. */
function cta() {
  gsap.fromTo(
    ".cta-line",
    { opacity: 0, filter: "blur(20px)", scale: 1.4, yPercent: 40 },
    {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      yPercent: 0,
      stagger: 0.15,
      ease: "none",
      scrollTrigger: { trigger: ".cta-section", start: "top 85%", end: "center 55%", scrub: true },
    },
  );
  gsap.fromTo(
    ".cta-ring",
    { scale: 0.2, opacity: 0 },
    {
      scale: 1.1,
      opacity: 1,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    },
  );
  gsap.from(".cta-fade", {
    y: 30,
    autoAlpha: 0,
    stagger: 0.15,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".cta-section",
      start: "top 40%",
      toggleActions: "play none none reverse",
    },
  });
}

/* CONTACT — details slide in, the form panel wipes open, the map scales into place. */
function contact() {
  gsap.from(".contact-info", {
    x: -40 * R,
    autoAlpha: 0,
    stagger: 0.08,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#contact",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  });
  gsap.fromTo(
    ".contact-form",
    { clipPath: "inset(100% 0% 0% 0% round 1rem)" },
    {
      clipPath: "inset(0% 0% 0% 0% round 1rem)",
      duration: 1.4,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
    },
  );
  gsap.from(".contact-map", {
    scale: 0.9,
    autoAlpha: 0,
    duration: 1.2,
    ease: "expo.out",
    scrollTrigger: {
      trigger: ".contact-map",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });
}

/* PAGE HERO — words swing up out of depth and focus; the giant index drifts while the block blurs away. */
function pageHero() {
  gsap
    .timeline({ delay: 0.1 })
    .from(".ph-word", {
      yPercent: 120,
      rotationX: -75,
      filter: "blur(14px)",
      autoAlpha: 0,
      transformOrigin: "50% 100%",
      stagger: 0.07,
      duration: 1.5,
      ease: "expo.out",
    })
    .from(".ph-line", { scaleX: 0, duration: 1.6, ease: "expo.inOut" }, 0.15)
    .from(".ph-index", { yPercent: 25, autoAlpha: 0, duration: 2, ease: "expo.out" }, 0)
    .from(
      ".ph-fade",
      { autoAlpha: 0, y: 24, stagger: 0.07, duration: 1, ease: "power3.out" },
      0.55,
    );
  const st = { trigger: ".page-hero", start: "top top", end: "bottom top", scrub: true };
  gsap.to(".ph-inner", {
    y: () => -innerHeight * 0.15,
    opacity: 0.1,
    filter: "blur(8px)",
    ease: "none",
    scrollTrigger: st,
  });
  gsap.to(".ph-index", { yPercent: 45, rotation: 4 * R, ease: "none", scrollTrigger: st });
  gsap.fromTo(
    ".ph-marquee",
    { xPercent: 0 },
    { xPercent: -30 * R, ease: "none", scrollTrigger: { ...st, start: "top bottom" } },
  );
}

/* CASE STUDIES — frames open from an inset card into full bleed while the copy stacks in beside them. */
function cases() {
  sel(".case").forEach((c) => {
    gsap.fromTo(
      c.querySelector(".case-mask"),
      { clipPath: "inset(18% 12% 18% 12% round 2rem)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 1rem)",
        ease: "none",
        scrollTrigger: { trigger: c, start: "top 90%", end: "top 30%", scrub: true },
      },
    );
    gsap.fromTo(
      c.querySelector(".case-img"),
      { scale: 1.45 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: c, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
    gsap.from(c.querySelectorAll(".case-reveal"), {
      y: 60,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 1.1,
      ease: "expo.out",
      scrollTrigger: { trigger: c, start: "top 65%", toggleActions: "play none none reverse" },
    });
  });
}

/* OFFICES — cards tip up from their bottom edge like boards being raised. */
function officesFx() {
  sel(".office").forEach((card, i) =>
    gsap.from(card, {
      y: 120,
      rotationX: -40,
      transformPerspective: 1000,
      transformOrigin: "50% 100%",
      autoAlpha: 0,
      duration: 1.3,
      delay: (i % 4) * 0.1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: card.parentElement,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }),
  );
}

/* DEPARTMENTS — rows slide in from the reading edge and their bars fill with scroll. */
function departments() {
  sel(".dept-row").forEach((row) => {
    gsap.fromTo(
      row.querySelector(".dept-bar"),
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: row, start: "top 92%", end: "top 55%", scrub: true },
      },
    );
    gsap.from(row, {
      x: 60 * R,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none reverse" },
    });
  });
}

/* PERKS — cards bloom outward from the centre, pulling focus as they scale up. */
function perks() {
  gsap.from(".perk", {
    scale: 0.82,
    y: 60,
    autoAlpha: 0,
    filter: "blur(10px)",
    stagger: { each: 0.1, from: "center" },
    duration: 1.2,
    ease: "expo.out",
    clearProps: "transform,filter",
    scrollTrigger: { trigger: ".perk", start: "top 85%", toggleActions: "play none none reverse" },
  });
}

/* CAREERS — each opening is wiped open from the reading edge. */
function careers() {
  sel(".job").forEach((job, i) =>
    gsap.fromTo(
      job,
      { clipPath: R > 0 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        delay: i * 0.08,
        ease: "expo.inOut",
        scrollTrigger: { trigger: job, start: "top 92%", toggleActions: "play none none reverse" },
      },
    ),
  );
}

/* FAQ — questions rise one after another. */
function faq() {
  gsap.from(".faq-item", {
    y: 40,
    autoAlpha: 0,
    stagger: 0.08,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".faq-item",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
}

/* NEXT PAGE — the destination title rises into place as the page runs out. */
function nextPage() {
  gsap.from(".next-title", {
    yPercent: 50,
    autoAlpha: 0,
    ease: "none",
    scrollTrigger: { trigger: ".next-page", start: "top 95%", end: "top 45%", scrub: true },
  });
}

/* Section headings on inner pages. */
function reveals() {
  sel("[data-reveal]").forEach((el) =>
    gsap.from(el, {
      y: 50,
      autoAlpha: 0,
      duration: 1.1,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
    }),
  );
}

/* FOOTER — the giant wordmark rises letter by letter as the page ends. */
function footer() {
  gsap.from(".footer-letter", {
    yPercent: 100,
    stagger: 0.06,
    ease: "none",
    scrollTrigger: {
      trigger: ".footer-giant",
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
    },
  });
}
