import {
  Suspense,
  createContext,
  lazy,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Cursor, Curtain, Loader, Nav, Progress, TabBar } from "./Chrome";
import { Footer } from "./Sections";
import { LangProvider } from "./i18n";
import { useLang } from "./lang";
import { useSectionMotion, useSmoothScroll } from "./motion";
import { getLenis } from "./smooth";

const Scene = lazy(() => import("./Scene"));
const ReadyCtx = createContext(false);

/** Persistent frame shared by every page: loader, curtain, cursor, nav and the WebGL planet. */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <Frame>{children}</Frame>
    </LangProvider>
  );
}

function Frame({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(id);
  }, [ready]);

  useSmoothScroll(ready);

  return (
    <div className="grain relative overflow-x-clip">
      {loading && <Loader onDone={onDone} />}
      <Curtain />
      <Cursor />
      <Progress />
      <Nav />
      <TabBar />
      <div className="pointer-events-none fixed inset-0 z-0">
        {mounted && (
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        )}
      </div>
      <ReadyCtx.Provider value={ready}>{children}</ReadyCtx.Provider>
    </div>
  );
}

/** A routed page: owns its scroll choreography and ends with the shared footer. */
export function Page({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const ready = useContext(ReadyCtx);
  const { lang } = useLang();
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true, force: true });
  }, []);
  useSectionMotion(root, ready, lang);
  return (
    <main key={lang} ref={root} className="relative z-10">
      {children}
      <Footer />
    </main>
  );
}
