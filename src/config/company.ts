/**
 * Central company data. Contact details are rendered from here only.
 * Leave website empty until a public domain is configured.
 * Optional: set NEXT_PUBLIC_SITE_URL to enable canonical, sitemap and robots host.
 */
export const company = {
  name: "InfoMídia Sistemas",
  shortName: "InfoMídia",
  product: "Software de Gestão Empresarial",
  tagline: "Software de gestão empresarial para negócios que querem evoluir.",
  city: "Cafelândia",
  state: "PR",
  stateName: "Paraná",
  country: "Brasil",
  customers: 400,
  /** Digits only: country + area + number, used by wa.me. */
  whatsapp: "5545999222216",
  whatsappDisplay: "(45) 99922-2216",
  email: "",
  instagram: "",
  website: "",
  copyrightYear: 2026,
} as const;

export const customerStatement = `Mais de ${company.customers} clientes atendidos no Brasil`;

export const contactSegments = [
  "Supermercado / Mercado",
  "Restaurante",
  "Bar / Lanchonete",
  "Comércio varejista",
  "Outro",
] as const;

export const seo = {
  title: "InfoMídia Sistemas | Software de Gestão Empresarial",
  description:
    "Conheça a InfoMídia Sistemas. Soluções de gestão empresarial, controle de vendas e emissão de notas fiscais para mercados, restaurantes, bares e comércios. Mais de 400 clientes atendidos no Brasil.",
} as const;
