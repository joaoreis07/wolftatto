"use client";

import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useSite } from "@/components/SiteProvider";

export function MobileBookingBar() {
  const { lightbox } = useSite();
  if (lightbox !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink/95 md:hidden">
      <div className="px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <WhatsAppButton className="w-full" message="quote">
          Agendar pelo WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  );
}
