import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span className="font-serif text-[1.7rem] leading-none tracking-[0.04em] text-ivory italic">
        Wolff
      </span>
      <span className="mt-1 text-[9px] tracking-[0.38em] text-gold uppercase">
        Tattoo Studio
      </span>
    </span>
  );
}
