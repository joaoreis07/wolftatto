"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { useSite } from "@/components/SiteProvider";
import { Reveal } from "@/components/Reveal";
import { styleGroups, workById, type StyleId } from "@/lib/gallery";
import { cn } from "@/lib/cn";

export function TattooStyles() {
  const reduce = useReducedMotion();
  const { setStyle } = useSite();
  const [active, setActive] = useState<StyleId>(styleGroups[0].id);
  const current = styleGroups.find((group) => group.id === active) ?? styleGroups[0];
  const photo = workById(current.workId);

  function explore(id: StyleId) {
    setStyle(id);
    document.getElementById("trabalhos")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
    });
  }

  return (
    <section id="estilos" className="relative overflow-hidden py-20 sm:py-28">
      <Image
        src="/images/backgrounds/estilos.png"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-ink/82" />
      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-12">
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Estilos</p>
            <h2 className="font-display mt-3 text-[clamp(2.6rem,4.8vw,4.6rem)] leading-[0.9] font-extrabold tracking-[-0.02em] text-ivory uppercase">
              Especialidades
            </h2>
          </Reveal>
          <ul className="mt-8">
            {styleGroups.map((group, index) => {
              const selected = group.id === active;
              return (
                <li key={group.id}>
                  <button
                    type="button"
                    className="flex w-full items-baseline justify-between gap-4 border-b border-white/10 py-4 text-left"
                    aria-pressed={selected}
                    onMouseEnter={() => {
                      if (window.matchMedia("(hover: hover)").matches) setActive(group.id);
                    }}
                    onFocus={() => setActive(group.id)}
                    onClick={() => setActive(group.id)}
                  >
                    <span
                      className={cn(
                        "font-display text-3xl font-bold tracking-wide uppercase transition-colors sm:text-4xl",
                        selected ? "text-ivory" : "text-ivory/35",
                      )}
                    >
                      {group.title}
                    </span>
                    <span className="text-[11px] tracking-[0.18em] text-gold">
                      0{index + 1}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/70">{current.description}</p>
          <button type="button" className="btn btn-ghost mt-6" onClick={() => explore(current.id)}>
            Ver na galeria
          </button>
        </div>

        <div className="relative order-1 aspect-[3/4] overflow-hidden bg-ash lg:order-2">
          <AnimatePresence mode="wait">
            {photo ? (
              <motion.div
                key={photo.id}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className={cn("object-cover", photo.frame)}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/50 to-transparent p-6 pt-24">
            <p className="font-display text-3xl font-bold text-ivory uppercase sm:text-4xl">{current.title}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
