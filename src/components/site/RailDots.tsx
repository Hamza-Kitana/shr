import { useEffect, useRef, useState } from "react";

/** Page dots for the `.m-rail` sitting right before it; phones only. */
export function RailDots({ count }: { count: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rail = ref.current?.previousElementSibling as HTMLElement | null;
    if (!rail) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const items = Array.from(rail.children).filter(
        (el) => !(el as HTMLElement).classList.contains("absolute"),
      ) as HTMLElement[];
      const step = (items[1]?.offsetLeft ?? 0) - (items[0]?.offsetLeft ?? 0);
      if (!step) return;
      const max = rail.scrollWidth - rail.clientWidth;
      const x = Math.abs(rail.scrollLeft);
      setActive(x >= max - 4 ? items.length - 1 : Math.round(x / Math.abs(step)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      rail.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="mt-5 flex justify-center gap-1.5 md:hidden">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-primary" : "w-1.5 bg-foreground/25"}`}
        />
      ))}
    </div>
  );
}
