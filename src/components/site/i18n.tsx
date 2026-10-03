import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copy, type Lang } from "./content";
import { LangContext } from "./lang";
import { getLenis } from "./smooth";

const KEY = "novarc-lang";
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Index of the top-level block currently around the upper-middle of the viewport. */
function currentBlock() {
  const mid = innerHeight * 0.45;
  let idx = 0;
  document.querySelectorAll<HTMLElement>("main > *").forEach((el, i) => {
    if (el.getBoundingClientRect().top <= mid) idx = i;
  });
  return idx;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const busy = useRef(false);

  useIsoLayoutEffect(() => {
    if (localStorage.getItem(KEY) === "ar") setLang("ar");
  }, []);

  // Layout effect so `dir` is in place before section motion (a passive effect) reads it.
  useIsoLayoutEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const apply = useCallback((next: Lang) => {
    localStorage.setItem(KEY, next);
    setLang(next);
  }, []);

  const toggle = useCallback(() => {
    if (busy.current) return;
    const next: Lang = lang === "en" ? "ar" : "en";
    const curtain = document.querySelector<HTMLElement>("[data-curtain]");
    const label = curtain?.querySelector<HTMLElement>("[data-curtain-label]");
    if (!curtain || !label) {
      apply(next);
      return;
    }

    busy.current = true;
    const block = currentBlock();
    label.textContent = copy[next].ui.langName;
    label.dir = next === "ar" ? "rtl" : "ltr";
    getLenis()?.stop();

    gsap
      .timeline({
        onComplete: () => {
          busy.current = false;
        },
      })
      .set(curtain, { display: "flex", clipPath: "inset(100% 0 0 0)" })
      .to(curtain, { clipPath: "inset(0% 0 0 0)", duration: 0.7, ease: "expo.inOut" })
      .fromTo(label, { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: "expo.out" }, "-=0.25")
      .add(() => apply(next))
      .add(() => {
        ScrollTrigger.refresh();
        const lenis = getLenis();
        const el = document.querySelectorAll<HTMLElement>("main > *")[block];
        lenis?.start();
        if (el && block > 0) lenis?.scrollTo(el, { immediate: true, force: true });
      }, "+=0.4")
      .to(label, { yPercent: -100, duration: 0.45, ease: "expo.in" }, "+=0.1")
      .to(curtain, { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "expo.inOut" }, "-=0.1")
      .set(curtain, { display: "none" });
  }, [lang, apply]);

  return (
    <LangContext.Provider value={{ lang, t: copy[lang], toggle }}>{children}</LangContext.Provider>
  );
}
