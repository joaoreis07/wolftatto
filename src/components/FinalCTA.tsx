"use client";

import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { works } from "@/lib/gallery";
import { messages, site, whatsappHref } from "@/lib/site";

const background = works.find((work) => work.id === "costas-egito") ?? works[0];

const notes = [
  "Conversa sobre a sua ideia",
  "Orçamento a partir do projeto",
  `${site.city}, ${site.state}`,
];

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const pending = !whatsappHref(messages.closing);

  return (
    <section id="contato" ref={ref} className="relative min-h-[88svh] overflow-hidden">
      <Image
        src={background.src}
        alt={background.alt}
        fill
        unoptimized
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-[1440px] flex-col justify-end px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Vamos conversar?</p>
          <h2 className="font-display mt-4 max-w-[12ch] text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.88] font-black tracking-[-0.02em] text-ivory uppercase">
            Pronto para sua próxima <span className="text-gold">tattoo?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/80">
            Compartilhe sua ideia e converse com o estúdio sobre seu próximo projeto.
          </p>
          <WhatsAppButton className="mt-8 w-full sm:w-auto" message="closing">
            Agendar pelo WhatsApp
          </WhatsAppButton>
          {pending ? (
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory/65">
              O botão de WhatsApp será ativado assim que o número do estúdio estiver confirmado.
            </p>
          ) : null}
        </Reveal>
        <ul className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-10">
          {notes.map((note) => (
            <li key={note} className="text-[11px] tracking-[0.18em] text-ivory/75 uppercase">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
