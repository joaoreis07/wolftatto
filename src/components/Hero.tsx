import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";

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
  return (
    <section id="inicio" className="relative flex flex-col overflow-hidden lg:min-h-svh">
      <div className="relative h-[min(54svh,440px)] min-h-[230px] w-full lg:absolute lg:inset-0 lg:h-auto lg:min-h-0">
        <Image
          src="/images/backgrounds/hero.png"
          alt="Tatuagem realista de tigre e retrato no Wolff Tattoo Studio"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-pan object-cover object-[72%_22%] lg:object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink lg:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,#090909_0%,rgba(9,9,9,0.9)_18%,rgba(9,9,9,0.45)_32%,transparent_46%)] lg:block" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-ink/80 to-transparent" />

      <div className="relative z-10 -mt-16 flex flex-col justify-end bg-gradient-to-b from-transparent via-ink to-ink px-5 pt-4 pb-8 sm:px-8 lg:mt-0 lg:min-h-svh lg:max-w-[52%] lg:justify-center lg:bg-transparent lg:px-14 lg:pt-32 lg:pb-12 xl:px-20">
        <p className="hero-rise text-[11px] tracking-[0.28em] text-gold uppercase sm:tracking-[0.34em]" style={{ animationDelay: "0.05s" }}>
          Realismo • Arte • Identidade
        </p>

        <h1
          className="hero-rise font-display mt-4 max-w-[12ch] text-[clamp(1.7rem,8vw,2.15rem)] leading-[0.98] font-black tracking-[0.02em] text-ivory uppercase min-[390px]:max-w-none min-[390px]:text-[2.05rem] lg:mt-5 lg:max-w-none lg:text-[clamp(1.9rem,2.85vw,3.35rem)] lg:leading-[1.08] lg:tracking-[0.055em]"
          style={{ animationDelay: "0.12s" }}
        >
          <span className="block lg:whitespace-nowrap">Tattoos que</span>
          <span className="mt-1.5 block text-gold lg:mt-2 lg:whitespace-nowrap">contam histórias</span>
        </h1>

        <p
          className="hero-rise mt-5 max-w-md text-[0.95rem] leading-relaxed text-ivory/85 sm:mt-6 sm:text-[1.05rem]"
          style={{ animationDelay: "0.2s" }}
        >
          Mais que tatuagens, são marcas da sua história. Realismo, cor, fé e
          originalidade em cada detalhe. Aqui, sua ideia se transforma em arte.
        </p>

        <div className="hero-rise mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row" style={{ animationDelay: "0.28s" }}>
          <WhatsAppButton className="w-full sm:w-auto" message="quote">
            Agendar tattoo
          </WhatsAppButton>
          <a href="#trabalhos" className="btn btn-ghost inline-flex w-full sm:w-auto">
            Ver trabalhos
            <span aria-hidden="true">→</span>
          </a>
        </div>
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
                <span className="text-[10px] leading-snug tracking-[0.12em] text-ivory uppercase sm:text-[11px] sm:tracking-[0.14em]">
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
