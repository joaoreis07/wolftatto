"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const steps = [
  {
    title: "Compartilhe sua ideia",
    text: "Envie referências e conte o que você imagina para a tatuagem.",
  },
  {
    title: "Converse sobre o projeto",
    text: "O estúdio retorna para alinhar desenho, tamanho e orçamento.",
  },
  {
    title: "Alinhe o agendamento",
    text: "Com o projeto definido, a sessão é marcada conforme a disponibilidade.",
  },
  {
    title: "Orientações da sessão",
    text: "Você recebe as orientações do estúdio para o dia da tatuagem.",
  },
];

export function BookingProcess() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="processo-titulo">
      <Image
        src="/images/backgrounds/processo.png"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Atendimento</p>
          <h2
            id="processo-titulo"
            className="font-display mt-3 max-w-[14ch] text-[clamp(2.6rem,4.8vw,4.6rem)] leading-[0.9] font-extrabold tracking-[-0.02em] text-ivory uppercase"
          >
            Como começa o seu projeto
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <motion.div
            aria-hidden="true"
            className="absolute top-5 right-0 left-0 hidden h-px origin-left bg-gold/50 md:block"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <div
            aria-hidden="true"
            className="absolute top-5 bottom-5 left-5 w-px bg-gold/40 md:hidden"
          />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={0.08 * index} y={24}>
                  <div className="flex items-start gap-4 md:flex-col md:gap-5">
                    <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/70 bg-ink text-xs tracking-[0.14em] text-gold">
                      0{index + 1}
                    </span>
                    <div className="min-w-0 pt-1 md:pt-0">
                      <h3 className="font-display text-[1.35rem] leading-tight font-bold text-ivory uppercase sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ivory/70">{step.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-10 max-w-xl text-sm leading-relaxed text-ivory/55">
          Prazos e valores dependem do desenho, do tamanho e da disponibilidade do estúdio.
        </p>
      </div>
    </section>
  );
}
