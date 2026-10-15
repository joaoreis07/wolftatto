"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { StyleId } from "@/lib/gallery";

type SiteContextValue = {
  style: StyleId | null;
  setStyle: (style: StyleId | null) => void;
  lightbox: number | null;
  setLightbox: (index: number | null) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [style, setStyle] = useState<StyleId | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const value = useMemo(
    () => ({ style, setStyle, lightbox, setLightbox }),
    [style, lightbox],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite precisa estar dentro de SiteProvider.");
  }
  return context;
}
