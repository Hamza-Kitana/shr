import type Lenis from "lenis";
import gsap from "gsap";

let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenis = l;
};
export const getLenis = () => lenis;

/** Cover the screen with the curtain + label, run `mid` while hidden, then reveal. */
export function curtainWipe(text: string, mid: () => void | Promise<void>) {
  const curtain = document.querySelector<HTMLElement>("[data-curtain]");
  const label = curtain?.querySelector<HTMLElement>("[data-curtain-label]");
  if (!curtain || !label) {
    void mid();
    return;
  }
  label.textContent = text;
  label.dir = document.documentElement.dir;
  const tl = gsap.timeline();
  tl.set(curtain, { display: "flex", clipPath: "inset(100% 0 0 0)" })
    .to(curtain, { clipPath: "inset(0% 0 0 0)", duration: 0.7, ease: "expo.inOut" })
    .fromTo(label, { yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: "expo.out" }, "-=0.25")
    .add(() => {
      tl.pause();
      Promise.resolve(mid()).finally(() => tl.play());
    })
    .to(label, { yPercent: -100, duration: 0.45, ease: "expo.in" }, "+=0.2")
    .to(curtain, { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "expo.inOut" }, "-=0.1")
    .set(curtain, { display: "none" });
}

/** Smooth-scroll to a section; long jumps are covered by a curtain wipe instead of a blurry fly-by. */
export function scrollToHash(hash: string) {
  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return;
  const distance = Math.abs(el.getBoundingClientRect().top);
  if (!lenis) {
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (distance < innerHeight * 2.5) {
    lenis.scrollTo(el, { duration: 1.6, offset: 0 });
    return;
  }
  curtainWipe(el.dataset["title"] ?? hash.slice(1), () => {
    lenis?.scrollTo(el, { immediate: true, force: true });
  });
}
