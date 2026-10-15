"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const ease = [0.22, 1, 0.36, 1] as const;

const highlights = [
  {
    title: "Arte personalizada",
    icon: "M12 3.5 14.2 9H20l-4.6 3.4L17.2 18 12 14.8 6.8 18l1.8-5.6L4 9h5.8L12 3.5Z",
  },
  {
    title: "Higiene e segurança",
    icon: "M12 3 5 6v6c0 4.2 2.8 7.2 7 9 4.2-1.8 7-4.8 7-9V6l-7-3Z",
  },
  {
    title: "Materiais de alta qualidade",
    icon: "M12 3 20 8v8l-8 5-8-5V8l8-5Zm0 6.2L8.5 12 12 14.8 15.5 12 12 9.2Z",
  },
  {
    title: "Atendimento exclusivo",
    icon: "M12 12a3.2 3.2 0 1 0-3.2-3.2A3.2 3.2 0 0 0 12 12Zm-6.2 7.2a6.2 6.2 0 0 1 12.4 0",
  },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="inicio" className="relative flex min-h-svh flex-col overflow-hidden">
      <Image
        src="/images/backgrounds/hero.png"
        alt="Tatuagem realista de tigre e retrato no Wolff Tattoo Studio"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-[84%_30%] lg:object-contain lg:object-right"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,0.62)_0%,rgba(9,9,9,0.18)_32%,rgba(9,9,9,0.9)_70%,#090909_100%)] lg:bg-[linear-gradient(90deg,#090909_0%,rgba(9,9,9,0.9)_30%,rgba(9,9,9,0.22)_48%,transparent_64%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/80 to-transparent" />

      <div className="relative z-10 flex flex-1 flex-col justify-end px-5 pt-28 pb-8 sm:px-8 lg:max-w-[52%] lg:justify-center lg:px-14 lg:pt-32 lg:pb-12 xl:px-20">
        <motion.p
          className="text-[11px] tracking-[0.34em] text-gold uppercase"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          Realismo • Arte • Identidade
        </motion.p>

        <motion.h1
          className="font-display mt-5 text-[clamp(1.9rem,2.85vw,3.35rem)] leading-[1.08] font-black tracking-[0.055em] text-ivory uppercase"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28, ease }}
        >
          <span className="block lg:whitespace-nowrap">Tattoos que</span>
          <span className="mt-2 block text-gold lg:whitespace-nowrap">contam histórias</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-md text-base leading-relaxed text-ivory/80 sm:text-[1.05rem]"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.48, ease }}
        >
          Mais que tatuagens, são marcas da sua história. Realismo, cor, fé e
          originalidade em cada detalhe. Aqui, sua ideia se transforma em arte.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.64, ease }}
        >
          <WhatsAppButton className="w-full sm:w-auto" message="quote">
            Agendar tattoo
          </WhatsAppButton>
          <a href="#trabalhos" className="btn btn-ghost inline-flex w-full sm:w-auto">
            Ver trabalhos
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-ink/35">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <Reveal
              key={item.title}
              delay={0.08 * index}
              className={`border-white/10 px-5 py-5 sm:px-8 lg:px-8 lg:py-6 ${index === 0 ? "" : "lg:border-l"}`}
            >
              <div className="flex items-center gap-3">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-gold"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path d={item.icon} strokeLinejoin="round" strokeLinecap="round" />
                </svg>
                <span className="text-[11px] tracking-[0.14em] text-ivory uppercase">
                  {item.title}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
