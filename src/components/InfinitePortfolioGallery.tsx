"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { useSite } from "@/components/SiteProvider";
import { styleGroups, works, type Work } from "@/lib/gallery";
import { cn } from "@/lib/cn";

const SPEED = 42;

type Metrics = {
  gap: number;
  stride: number;
  cardW: number;
  origin: number;
};

export function InfinitePortfolioGallery() {
  const reduce = useReducedMotion();
  const { style, setStyle, setLightbox } = useSite();
  const [expanded, setExpanded] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const metricsRef = useRef<Metrics>({ gap: 16, stride: 320, cardW: 300, origin: 0 });
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    origin: 0,
    locked: false,
    moved: false,
  });

  const items = useMemo(
    () => (style ? works.filter((work) => work.styles.includes(style)) : works),
    [style],
  );
  const staticMode = Boolean(reduce) || items.length < 3;
  const styleName = styleGroups.find((group) => group.id === style)?.title;

  useEffect(() => {
    xRef.current = 0;
  }, [style, staticMode]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || staticMode) return;

    const measure = () => {
      const card = track.querySelector<HTMLElement>("[data-card]");
      if (!card) return;
      const gapValue = getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0";
      const gap = Number.parseFloat(gapValue) || 0;
      metricsRef.current = {
        gap,
        cardW: card.offsetWidth,
        stride: card.offsetWidth + gap,
        origin: viewport.getBoundingClientRect().left,
      };
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [staticMode, style, items.length]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || staticMode) return;

    let frame = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(34, now - last);
      last = now;
      const gap = metricsRef.current.gap;
      const setWidth = (track.scrollWidth + gap) / 2;
      if (setWidth > 1 && !pausedRef.current && !draggingRef.current) {
        xRef.current -= (SPEED * dt) / 1000;
      }
      if (setWidth > 1) {
        while (xRef.current <= -setWidth) xRef.current += setWidth;
        while (xRef.current > 0) xRef.current -= setWidth;
      }
      track.style.transform = `translate3d(${xRef.current}px,0,0)`;
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0.08 },
    );
    io.observe(viewport);

    const onVis = () => {
      if (document.hidden) {
        stop();
        return;
      }
      const rect = viewport.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) start();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [staticMode, style, items.length]);

  function shift(direction: 1 | -1) {
    if (staticMode) {
      scrollerRef.current?.scrollBy({
        left: direction * -1 * (metricsRef.current.stride || 300),
        behavior: reduce ? "auto" : "smooth",
      });
      return;
    }
    xRef.current += direction * (metricsRef.current.stride || 300);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (staticMode || (event.pointerType === "mouse" && event.button !== 0)) return;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      origin: xRef.current,
      locked: false,
      moved: false,
    };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag.active) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.locked) {
      if (Math.hypot(dx, dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        drag.active = false;
        return;
      }
      drag.locked = true;
    }
    drag.moved = true;
    draggingRef.current = true;
    xRef.current = drag.origin + dx;
  }

  function endDrag() {
    movedRef.current = dragRef.current.moved;
    dragRef.current.active = false;
    draggingRef.current = false;
  }

  function openWork(index: number) {
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    setLightbox(index);
  }

  const sequence = staticMode ? items : [...items, ...items];

  return (
    <section id="trabalhos" className="overflow-hidden py-20 sm:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div>
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Portfólio</p>
          <h2 className="font-display mt-3 text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.9] font-extrabold tracking-[-0.02em] text-ivory uppercase">
            Trabalhos <span className="text-gold">recentes</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-ivory/70 lg:text-right">
          Cada tatuagem é única, feita com propósito, técnica e atenção aos detalhes.
        </p>
      </div>

      {styleName ? (
        <div className="mx-auto mt-6 flex max-w-[1440px] items-center gap-4 px-5 text-sm sm:px-8 lg:px-12">
          <p className="text-ivory/70">
            Estilo: <span className="text-gold">{styleName}</span>
          </p>
          <button
            type="button"
            className="text-[11px] tracking-[0.18em] text-ivory uppercase underline-offset-4 hover:text-gold hover:underline"
            onClick={() => setStyle(null)}
          >
            Ver todos
          </button>
        </div>
      ) : null}

      <div className="relative mt-10">
        <button
          type="button"
          className="absolute top-1/3 left-3 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink/70 text-ivory backdrop-blur hover:border-gold hover:text-gold sm:flex"
          aria-label="Trabalhos anteriores"
          onClick={() => shift(1)}
        >
          <Arrow direction="left" />
        </button>
        <button
          type="button"
          className="absolute top-1/3 right-3 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink/70 text-ivory backdrop-blur hover:border-gold hover:text-gold sm:flex"
          aria-label="Próximos trabalhos"
          onClick={() => shift(-1)}
        >
          <Arrow direction="right" />
        </button>

        {staticMode ? (
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-8 lg:px-12"
          >
            {items.map((work, index) => (
              <GalleryCard
                key={work.id}
                work={work}
                index={index}
                loopIndex={index}
                hiddenCopy={false}
                onOpen={openWork}
              />
            ))}
          </div>
        ) : (
          <div
            ref={viewportRef}
            className="gallery-fade cursor-grab overflow-hidden active:cursor-grabbing"
            style={{ touchAction: "pan-y" }}
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover)").matches) pausedRef.current = true;
            }}
            onMouseLeave={() => {
              pausedRef.current = false;
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              ref={trackRef}
              className="flex w-max gap-4 md:gap-5"
            >
              {sequence.map((work, index) => (
                <GalleryCard
                  key={`${work.id}-${index}`}
                  work={work}
                  index={index % items.length}
                  loopIndex={index}
                  hiddenCopy={index >= items.length}
                  onOpen={openWork}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto mt-8 flex max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <button
          type="button"
          className="btn btn-ghost"
          aria-expanded={expanded}
          onClick={() => {
            if (!expanded) setStyle(null);
            setExpanded((value) => !value);
          }}
        >
          {expanded ? "Fechar portfólio" : "Ver portfólio completo"}
        </button>
      </div>

      <AnimatePresence>
        {expanded ? (
          <motion.ul
            id="portfolio-grade"
            className="mx-auto mt-8 grid max-w-[1440px] grid-cols-2 gap-3 px-5 sm:px-8 md:grid-cols-3 lg:grid-cols-4 lg:px-12"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {works.map((work, index) => (
              <li key={work.id}>
                <button
                  type="button"
                  className="group block w-full text-left"
                  onClick={() => {
                    setStyle(null);
                    setLightbox(index);
                  }}
                >
                  <span className="relative block aspect-[3/5] overflow-hidden bg-ash">
                    <Image
                      src={work.src}
                      alt={work.alt}
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className={cn("object-cover", work.frame)}
                    />
                  </span>
                  <span className="mt-2 block text-[10px] tracking-[0.18em] text-ivory/55 uppercase">
                    {work.label}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function GalleryCard({
  work,
  index,
  loopIndex,
  hiddenCopy,
  onOpen,
}: {
  work: Work;
  index: number;
  loopIndex: number;
  hiddenCopy: boolean;
  onOpen: (index: number) => void;
}) {
  return (
    <article
      data-card
      data-index={loopIndex}
      aria-hidden={hiddenCopy || undefined}
      className="w-[72vw] shrink-0 snap-start sm:w-[280px] lg:w-[320px]"
      style={{ transformOrigin: "center center" }}
    >
      <button
        type="button"
        className="group block w-full text-left"
        tabIndex={hiddenCopy ? -1 : 0}
        onClick={() => onOpen(index)}
      >
        <span className="relative block aspect-[3/5] overflow-hidden bg-ash">
          <Image
            src={work.src}
            alt={hiddenCopy ? "" : work.alt}
            fill
            unoptimized
            sizes="320px"
            className={cn("object-cover", work.frame)}
          />
        </span>
        <span className="mt-3 block text-[10px] tracking-[0.22em] text-ivory/55 uppercase">
          {work.label}
        </span>
      </button>
    </article>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 5 8 12l7 7" : "m9 5 7 7-7 7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
