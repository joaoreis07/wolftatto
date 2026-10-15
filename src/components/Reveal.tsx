"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 42,
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
    if (!node || reduce) return;

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setShown(true);
      node.animate(
        [
          { opacity: 0, transform: `translateY(${y}px)` },
          { opacity: 1, transform: "translateY(0px)" },
        ],
        {
          duration: 900,
          delay: delay * 1000,
          easing,
          fill: "both",
        },
      );
    };

    const entered = () => {
      const rect = node.getBoundingClientRect();
      const view = window.visualViewport?.height ?? window.innerHeight;
      return rect.top < view * 0.82 && rect.bottom > 48;
    };

    if (entered()) show();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) show();
      },
      { threshold: [0.15, 0.35], rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);

    const onScroll = () => {
      if (entered()) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.visualViewport?.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, true);
      window.visualViewport?.removeEventListener("scroll", onScroll);
    };
  }, [delay, reduce, y]);

  const visible = reduce || shown;

  return (
    <div
      ref={ref}
      className={cn(!reduce && shown && "reveal-in", !visible && "opacity-0", className)}
      style={
        visible
          ? { animationDelay: `${delay}s` }
          : { transform: `translateY(${y}px)` }
      }
    >
      {children}
    </div>
  );
}
