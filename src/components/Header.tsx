"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cn } from "@/lib/cn";
import { nav } from "@/lib/site";

export function Header() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = nav
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setCurrent(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
        scrolled || open ? "bg-ink/95" : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-[4.5rem] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12",
          scrolled && "border-b border-white/10",
        )}
      >
        <a href="#inicio" className="relative z-50" aria-label="Wolff Tattoo Studio, início">
          <Logo />
        </a>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Seções">
          {nav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "text-[11px] tracking-[0.18em] uppercase transition-colors",
                current === item.id ? "text-gold" : "text-ivory/75 hover:text-ivory",
              )}
              aria-current={current === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="relative z-50 flex items-center gap-3">
          <WhatsAppButton className="hidden md:inline-flex">Agendar agora</WhatsAppButton>
          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            <span className={cn("h-px w-6 bg-ivory transition", open && "translate-y-[7px] rotate-45")} />
            <span className={cn("h-px w-6 bg-ivory transition", open && "opacity-0")} />
            <span className={cn("h-px w-6 bg-ivory transition", open && "-translate-y-[7px] -rotate-45")} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="menu-mobile"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pt-28 lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            aria-label="Menu"
          >
            {nav.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-display text-4xl font-bold tracking-wide text-ivory uppercase"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : 0.05 * index, duration: 0.45 }}
              >
                {item.label}
              </motion.a>
            ))}
            <WhatsAppButton className="mt-8 w-full" message="quote">
              Agendar agora
            </WhatsAppButton>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
