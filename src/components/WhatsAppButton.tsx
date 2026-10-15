"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { messages, whatsappHref } from "@/lib/site";

type MessageKey = keyof typeof messages;

const variants = {
  gold: "btn btn-gold",
  ghost: "btn btn-ghost",
} as const;

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      className={cn("h-[18px] w-[18px] shrink-0", className)}
      fill="currentColor"
    >
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.32 4.95L2 22l5.39-1.41a10.1 10.1 0 0 0 4.65 1.14h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 13.89c-.24.68-1.4 1.25-1.93 1.33-.49.07-1.1.1-1.78-.11-.41-.13-.94-.3-1.62-.59-2.85-1.23-4.7-4.1-4.84-4.29-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.27.64-.39.86-.39.21 0 .43 0 .62.01.2.01.46-.08.72.55.27.64.91 2.22.99 2.38.08.16.13.35.03.56-.1.21-.16.35-.31.54-.16.19-.33.42-.47.56-.16.16-.32.33-.14.64.19.31.83 1.37 1.78 2.22 1.23 1.09 2.26 1.43 2.58 1.59.32.16.5.13.69-.08.19-.21.8-.93 1.01-1.25.21-.32.43-.27.72-.16.29.11 1.84.87 2.16 1.03.32.16.53.24.61.37.08.13.08.76-.16 1.44z" />
    </svg>
  );
}

export function WhatsAppButton({
  message = "quote",
  children,
  variant = "gold",
  className,
}: {
  message?: MessageKey;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  const href = whatsappHref(messages[message]);
  const classes = cn(variants[variant], className);

  if (!href) {
    return (
      <a href="#contato" className={classes}>
        <WhatsAppIcon />
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      <WhatsAppIcon />
      {children}
    </a>
  );
}
