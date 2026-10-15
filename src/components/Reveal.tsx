"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce) return;

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setHidden(false);
    };
    const inView = () => {
      const rect = node.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
    };

    if (inView()) {
      node.animate(
        [
          { opacity: 0, transform: `translateY(${y}px)` },
          { opacity: 1, transform: "translateY(0px)" },
        ],
        { duration: 700, delay: delay * 1000, easing: ease, fill: "both" },
      );
      return;
    }

    setHidden(true);
    const onScroll = () => {
      if (inView()) show();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const failsafe = window.setTimeout(show, 2200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(failsafe);
    };
  }, [reduce, delay, y]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        hidden && "translate-y-4 opacity-0",
        className,
      )}
      style={hidden ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
