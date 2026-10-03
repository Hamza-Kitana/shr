import { createContext, useContext } from "react";
import type { Copy, Lang } from "./content";

export type LangCtx = { lang: Lang; t: Copy; toggle: () => void };
export const LangContext = createContext<LangCtx | null>(null);

export const isRtl = () =>
  typeof document !== "undefined" && document.documentElement.dir === "rtl";

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
