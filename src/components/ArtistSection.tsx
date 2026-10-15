"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { artistPhoto } from "@/lib/gallery";
import { site } from "@/lib/site";

export function ArtistSection() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <Image
        src="/images/backgrounds/sobre.png"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/55" />

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden bg-ash">
            <Image
              src={artistPhoto.src}
              alt={artistPhoto.alt}
              fill
              unoptimized
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover object-[center_22%]"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Sobre o estúdio</p>
            <h2 className="font-display mt-3 text-[clamp(2.8rem,5vw,5rem)] leading-[0.9] font-extrabold tracking-[-0.02em] text-ivory uppercase">
              Junior <span className="text-gold">Wolff</span>
            </h2>
            <p className="font-serif mt-4 text-2xl text-gold-light italic sm:text-3xl">
              Arte, técnica e identidade em cada projeto.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/75">
              Cada tatuagem começa com uma ideia. O objetivo é transformar essa
              ideia em uma composição única, com atenção aos detalhes, à técnica
              e à identidade de cada cliente.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ivory/75">
              O atendimento acontece em {site.city}, {site.state}. O primeiro
              passo é uma conversa sobre a ideia, o desenho e o orçamento.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end">
            <p>
              <span className="font-display block text-5xl leading-none font-bold text-gold">
                {site.awards}+
              </span>
              <span className="mt-2 block text-[11px] tracking-[0.22em] text-ivory/70 uppercase">
                Prêmios
              </span>
            </p>
            <a href="#trabalhos" className="btn btn-gold">
              Conhecer o trabalho
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
