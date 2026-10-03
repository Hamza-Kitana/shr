// Shared, non-React state bridging DOM scroll/pointer and the WebGL scene.
export const sceneState = {
  pointer: { x: 0, y: 0 },
  velocity: 0,
  /** Colour driven by scroll position (e.g. the service currently in view). */
  color: "#5fe0e0",
  /** Colour of the hovered service card; wins over `color` while set. */
  hover: null as string | null,
};

export type SceneTarget = { x: number; y: number; s: number };

type Anchor = { el: HTMLElement; x: number; y: number; s: number };
let anchors: Anchor[] = [];
let anchorsMain: Element | null = null;
let anchorsMobile = false;

/** Sections only change when <main> remounts (route or language switch); phones may use `data-scene-m`. */
function getAnchors() {
  const main = document.querySelector("main");
  const mobile = window.innerWidth < 768;
  if (main !== anchorsMain || mobile !== anchorsMobile || !anchors[0]?.el.isConnected) {
    anchorsMain = main;
    anchorsMobile = mobile;
    anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]")).map((el) => {
      const raw = (mobile && el.dataset["sceneM"]) || el.dataset["scene"] || "0,0,1";
      const [x = 0, y = 0, s = 1] = raw.split(",").map(Number);
      return { el, x, y, s };
    });
  }
  return anchors;
}

/** Interpolate the 3D object's target pose from sections marked with data-scene="x,y,scale". */
export function computeTarget(): SceneTarget {
  const els = getAnchors();
  const fallback = { x: 0, y: 0, s: 1 };
  if (!els.length) return fallback;
  const mid = window.innerHeight * 0.5;
  const parsed = els.map(({ el, x, y, s }) => ({ top: el.getBoundingClientRect().top, x, y, s }));
  let i = 0;
  for (let k = 0; k < parsed.length; k++) if (parsed[k]!.top <= mid) i = k;
  const a = parsed[i]!;
  const b = parsed[i + 1] ?? a;
  const span = b.top - a.top || 1;
  let p = Math.min(1, Math.max(0, (mid - a.top) / span));
  if (parsed[0]!.top > mid) p = 0;
  p = p * p * (3 - 2 * p);
  const side = document.documentElement.dir === "rtl" ? -1 : 1;
  return { x: (a.x + (b.x - a.x) * p) * side, y: a.y + (b.y - a.y) * p, s: a.s + (b.s - a.s) * p };
}
