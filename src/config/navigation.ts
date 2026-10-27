export const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Segmentos", href: "#segmentos" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Contato", href: "#contato" },
] as const;

export const footerNavigation = [
  ...navigation,
  { label: "Áreas de atuação", href: "#presenca" },
  { label: "Perguntas frequentes", href: "#faq" },
] as const;
