"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Rect = { top: number; left: number; width: number; height: number };

type Transition = { slug: string; rect: Rect; image: string };

type MenuCtx = {
  go: (slug: string, el: HTMLElement, image: string) => void;
  activeSlug: string | null;
};

const Ctx = createContext<MenuCtx | null>(null);

const SPRING = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.85 };

export function useMenuGo() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useMenuGo outside MenuShell");
  return c.go;
}

export function useMenuActive() {
  return useContext(Ctx)?.activeSlug ?? null;
}

export function MenuShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [t, setT] = useState<Transition | null>(null);

  const go = useCallback(
    (slug: string, el: HTMLElement, image: string) => {
      const r = el.getBoundingClientRect();
      setT({
        slug,
        image,
        rect: { top: r.top, left: r.left, width: r.width, height: r.height },
      });
      const q =
        typeof window !== "undefined" ? window.location.search : "";
      router.push(`/menu/${slug}${q}`);
    },
    [router],
  );

  return (
    <Ctx.Provider value={{ go, activeSlug: t?.slug ?? null }}>
      {children}
      <AnimatePresence>
        {t ? (
          <>
            <motion.div
              key={`dim-${t.slug}`}
              className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            />
            <motion.div
              key={`zoom-${t.slug}`}
              className="fixed z-[80] overflow-hidden bg-[#07070c] will-change-[top,left,width,height,border-radius]"
              style={{ transformOrigin: "center center" }}
              initial={{
                top: t.rect.top,
                left: t.rect.left,
                width: t.rect.width,
                height: t.rect.height,
                borderRadius: "50%",
              }}
              animate={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100dvh",
                borderRadius: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{
                ...SPRING,
                borderRadius: { duration: 0.38, ease: [0.25, 0.1, 0.2, 1] },
              }}
              onAnimationComplete={() => setT(null)}
            >
              <Image
                src={t.image}
                alt=""
                fill
                className="object-cover brightness-110 saturate-110"
                priority
              />
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
