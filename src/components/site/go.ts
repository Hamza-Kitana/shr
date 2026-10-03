import { useCallback } from "react";
import { useRouter } from "@tanstack/react-router";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navHrefs } from "./content";
import { useLang } from "./lang";
import { curtainWipe, getLenis, scrollToHash } from "./smooth";

const frames = (n: number) =>
  new Promise<void>((r) => {
    const step = (k: number) => (k ? requestAnimationFrame(() => step(k - 1)) : r());
    step(n);
  });

/** Navigate to "/path" or "/path#section" — same page scrolls, other pages get a curtain transition. */
export function useGo() {
  const router = useRouter();
  const { t } = useLang();
  return useCallback(
    (href: string) => {
      const [path, hash] = href.split("#");
      const target = path || "/";
      if (target === router.state.location.pathname) {
        if (hash) scrollToHash(`#${hash}`);
        else getLenis()?.scrollTo(0, { duration: 1.4 });
        return;
      }
      const label = t.nav[navHrefs.indexOf(href)] ?? t.nav[navHrefs.indexOf(target)] ?? "";
      curtainWipe(label, async () => {
        await router.navigate({ to: target as "/" });
        await frames(3);
        const el = hash ? document.getElementById(hash) : null;
        getLenis()?.scrollTo(el ?? 0, { immediate: true, force: true });
        ScrollTrigger.refresh();
      });
    },
    [router, t],
  );
}
