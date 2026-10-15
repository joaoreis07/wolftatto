/**
 * Dados confirmados do estúdio.
 *
 * whatsappNumber: somente dígitos, com DDI do Brasil.
 * Exemplo: "5543999999999"
 * Deixe vazio até o responsável confirmar o telefone.
 *
 * instagramUrl: cole o link completo quando estiver confirmado.
 * Exemplo: "https://instagram.com/usuario"
 */
export const site = {
  artist: "Junior Wolff",
  name: "Junior Wolff Tattoo",
  studio: "Wolff Tattoo Studio",
  city: "Siqueira Campos",
  state: "Paraná",
  whatsappNumber: "5543996094906",
  instagramUrl: "",
  awards: 70,
} as const;

export const messages = {
  quote:
    "Olá, Junior! Conheci seu trabalho pelo site e gostaria de solicitar um orçamento para uma tatuagem.",
  portfolio:
    "Olá, Junior! Vi seus trabalhos no site e gostaria de conversar sobre um projeto de tatuagem.",
  closing:
    "Olá, Junior! Conheci seu trabalho pelo site e gostaria de conversar sobre uma tatuagem.",
} as const;

export const nav = [
  { href: "#inicio", id: "inicio", label: "Início" },
  { href: "#sobre", id: "sobre", label: "Sobre" },
  { href: "#estilos", id: "estilos", label: "Estilos" },
  { href: "#trabalhos", id: "trabalhos", label: "Trabalhos" },
  { href: "#contato", id: "contato", label: "Contato" },
] as const;

export function whatsappHref(message: string): string | null {
  const digits = site.whatsappNumber.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
