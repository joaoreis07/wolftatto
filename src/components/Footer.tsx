import { Logo } from "@/components/Logo";
import { messages, nav, site, whatsappHref } from "@/lib/site";

export function Footer() {
  const whatsapp = whatsappHref(messages.quote);

  return (
    <footer className="border-t border-white/10 bg-ink pb-28 md:pb-12">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-3 lg:px-12">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">
            {site.name}. Realismo, cor e preto e cinza em {site.city}, {site.state}.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Navegação</p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={item.href} className="text-sm text-ivory/75 transition-colors hover:text-gold">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Contato</p>
          <p className="mt-4 text-sm text-ivory/80">
            {site.city}, {site.state}
          </p>
          {whatsapp ? (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-ivory/80 underline-offset-4 hover:text-gold hover:underline"
            >
              WhatsApp
            </a>
          ) : (
            <p className="mt-2 text-sm text-ivory/55">WhatsApp em configuração.</p>
          )}
          {site.instagramUrl ? (
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-ivory/80 underline-offset-4 hover:text-gold hover:underline"
            >
              Instagram
            </a>
          ) : null}
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] border-t border-white/10 px-5 py-5 sm:px-8 lg:px-12">
        <p className="text-xs text-ivory/40">
          As fotografias desta página mostram trabalhos reais de {site.artist}.
        </p>
      </div>
    </footer>
  );
}
