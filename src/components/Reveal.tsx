"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce) {
      setShown(true);
      return;
    }

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setShown(true);
    };
    const entered = () => {
      const rect = node.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.86 && rect.bottom > 32;
    };

    if (entered()) show();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) show();
      },
      { root: null, threshold: 0.22, rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(node);

    const onScroll = () => {
      if (entered()) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, true);
    };
  }, [reduce]);

  return (
    <div
      ref={ref}
      className={cn(
        "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        shown
          ? "translate-y-0 opacity-100 transition-[opacity,transform] duration-700 ease-out"
          : "opacity-0",
        className,
      )}
      style={{
        transform: shown ? undefined : `translateY(${y}px)`,
        transitionDelay: shown ? `${delay}s` : "0s",
      }}
    >
      {children}
    </div>
  );
}
