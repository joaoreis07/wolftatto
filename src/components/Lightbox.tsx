"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { useSite } from "@/components/SiteProvider";
import { works } from "@/lib/gallery";

export function Lightbox() {
  const reduce = useReducedMotion();
  const { lightbox, setLightbox, style } = useSite();
  const closeRef = useRef<HTMLButtonElement>(null);
  const drag = useRef({ x: 0, y: 0, moved: false });

  const items = useMemo(
    () => (style ? works.filter((work) => work.styles.includes(style)) : works),
    [style],
  );
  const open = lightbox !== null && items.length > 0;
  const index = open ? Math.min(lightbox ?? 0, items.length - 1) : 0;
  const work = items[index];
  const indexRef = useRef(index);
  const lengthRef = useRef(items.length);

  useEffect(() => {
    indexRef.current = index;
    lengthRef.current = items.length;
  }, [index, items.length]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      const length = lengthRef.current;
      if (!length) return;
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") {
        setLightbox((indexRef.current + 1) % length);
      }
      if (event.key === "ArrowLeft") {
        setLightbox((indexRef.current - 1 + length) % length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [open, setLightbox]);

  function go(delta: number) {
    setLightbox((index + delta + items.length) % items.length);
  }

  return (
    <AnimatePresence>
      {open && work ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Trabalho ampliado"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onPointerDown={(event) => {
            drag.current = { x: event.clientX, y: event.clientY, moved: false };
          }}
          onPointerUp={(event) => {
            const dx = event.clientX - drag.current.x;
            const dy = event.clientY - drag.current.y;
            if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
            drag.current.moved = true;
            go(dx < 0 ? 1 : -1);
          }}
          onClick={() => {
            if (drag.current.moved) {
              drag.current.moved = false;
              return;
            }
            setLightbox(null);
          }}
        >
          <button
            ref={closeRef}
            type="button"
            className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-ivory hover:border-gold hover:text-gold"
            onClick={() => setLightbox(null)}
          >
            <span className="sr-only">Fechar</span>
            <span aria-hidden="true" className="text-xl leading-none">
              ×
            </span>
          </button>

          <button
            type="button"
            className="absolute top-1/2 left-3 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-ivory hover:border-gold sm:flex"
            aria-label="Imagem anterior"
            onClick={(event) => {
              event.stopPropagation();
              go(-1);
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-3 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-ivory hover:border-gold sm:flex"
            aria-label="Próxima imagem"
            onClick={(event) => {
              event.stopPropagation();
              go(1);
            }}
          >
            ›
          </button>

          <figure
            className="flex max-h-full max-w-full flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              key={work.id}
              src={work.src}
              alt={work.alt}
              width={work.width}
              height={work.height}
              sizes="92vw"
              unoptimized
              className="max-h-[78vh] w-auto max-w-[92vw] object-contain"
              priority
            />
            <figcaption className="mt-4 flex items-center gap-4 text-center">
              <span className="text-[11px] tracking-[0.2em] text-ivory/70 uppercase">
                {work.label}
              </span>
              <span className="text-xs text-ivory/45">
                {index + 1} / {items.length}
              </span>
            </figcaption>
            <div className="mt-4 flex gap-3 sm:hidden">
              <button type="button" className="btn btn-ghost" onClick={() => go(-1)}>
                Anterior
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => go(1)}>
                Próxima
              </button>
            </div>
          </figure>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
