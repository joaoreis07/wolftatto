export type StyleId =
  | "colorido"
  | "preto-e-cinza"
  | "retratos"
  | "grandes-projetos"
  | "composicoes"
  | "religiosas";

export type Work = {
  id: string;
  src: string;
  alt: string;
  label: string;
  styles: StyleId[];
  width: number;
  height: number;
  /** object-position para o recorte da vitrine, sem substituir a foto. */
  frame: string;
};

export const works: Work[] = [
  {
    id: "coxa-colorida",
    src: "/images/portfolio/realismo-colorido-coxa.png",
    alt: "Tatuagem em realismo colorido na coxa, com composição dividida entre faces em azul e vermelho",
    label: "Realismo colorido",
    styles: ["colorido", "composicoes"],
    width: 473,
    height: 1024,
    frame: "object-[center_46%]",
  },
  {
    id: "panturrilha-colorida",
    src: "/images/portfolio/realismo-colorido-panturrilha.png",
    alt: "Tatuagem em realismo colorido na panturrilha, reunindo um olho, uma raposa, um retrato e uma flor",
    label: "Realismo colorido",
    styles: ["colorido", "retratos", "composicoes"],
    width: 473,
    height: 1024,
    frame: "object-[center_40%]",
  },
  {
    id: "manga-pb",
    src: "/images/portfolio/realismo-pb-manga.png",
    alt: "Manga fechada em realismo preto e cinza, com figura barbada, leão e personagens ao longo do braço",
    label: "Realismo preto e cinza",
    styles: ["preto-e-cinza", "grandes-projetos"],
    width: 473,
    height: 1024,
    frame: "object-[center_42%]",
  },
  {
    id: "panturrilha-tigre",
    src: "/images/portfolio/realismo-pb-panturrilha.png",
    alt: "Tatuagem em realismo preto e cinza na panturrilha, unindo a face de um tigre e um retrato",
    label: "Realismo preto e cinza",
    styles: ["preto-e-cinza", "retratos", "composicoes"],
    width: 473,
    height: 1024,
    frame: "object-[center_40%]",
  },
  {
    id: "antebraco-fe",
    src: "/images/portfolio/religiosa-antebraco.png",
    alt: "Tatuagem religiosa no antebraço, com pomba, crucifixo, figura em oração e lettering",
    label: "Tatuagem religiosa",
    styles: ["religiosas"],
    width: 473,
    height: 1024,
    frame: "object-[center_48%]",
  },
  {
    id: "antebraco-leao",
    src: "/images/portfolio/realismo-pb-antebraco.png",
    alt: "Tatuagem em realismo preto e cinza no antebraço, com leão sobre um rosto barbado",
    label: "Realismo preto e cinza",
    styles: ["preto-e-cinza", "composicoes"],
    width: 473,
    height: 1024,
    frame: "object-[center_42%]",
  },
  {
    id: "ombro-leoa",
    src: "/images/portfolio/realismo-pb-ombro.png",
    alt: "Tatuagem em realismo preto e cinza no ombro, com leoa, filhote, rosa e lírio",
    label: "Realismo preto e cinza",
    styles: ["preto-e-cinza", "retratos", "composicoes"],
    width: 819,
    height: 1024,
    frame: "object-[38%_center]",
  },
  {
    id: "costas-egito",
    src: "/images/portfolio/realismo-colorido-costas.png",
    alt: "Fechamento das costas em realismo colorido, com temática egípcia, asas e figuras",
    label: "Grandes projetos",
    styles: ["colorido", "grandes-projetos"],
    width: 682,
    height: 1024,
    frame: "object-[center_42%]",
  },
];

export const artistPhoto = {
  src: "/images/artist/junior-wolff.png",
  alt: "Junior Wolff no estúdio, sorrindo, com tatuagens no pescoço e dois troféus nas mãos",
  width: 819,
  height: 1024,
};

export const styleGroups: {
  id: StyleId;
  title: string;
  description: string;
  workId: string;
}[] = [
  {
    id: "colorido",
    title: "Realismo colorido",
    description:
      "Volume, cor e contraste usados para dar presença à composição.",
    workId: "panturrilha-colorida",
  },
  {
    id: "preto-e-cinza",
    title: "Realismo preto e cinza",
    description: "Luz, sombra e textura construídas em preto e cinza.",
    workId: "ombro-leoa",
  },
  {
    id: "retratos",
    title: "Retratos",
    description: "Olhares e expressões tratados com atenção ao detalhe.",
    workId: "panturrilha-tigre",
  },
  {
    id: "grandes-projetos",
    title: "Grandes projetos",
    description: "Mangas e fechamentos desenhados para acompanhar o corpo.",
    workId: "costas-egito",
  },
  {
    id: "composicoes",
    title: "Composições personalizadas",
    description: "Elementos diferentes reunidos em uma leitura única.",
    workId: "coxa-colorida",
  },
  {
    id: "religiosas",
    title: "Tatuagens religiosas",
    description:
      "Símbolos de fé com o mesmo cuidado de técnica e acabamento.",
    workId: "antebraco-fe",
  },
];

export function workById(id: string) {
  return works.find((work) => work.id === id);
}
