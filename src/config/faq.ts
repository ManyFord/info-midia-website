import { company, customerStatement } from "@/config/company";

export const faqs = [
  {
    question: "O que é o software de gestão da InfoMídia?",
    answer:
      "É um software de gestão empresarial para organizar processos, acompanhar vendas, administrar informações de produtos e apoiar a emissão de notas fiscais no dia a dia do negócio.",
  },
  {
    question: "Quais tipos de empresas podem utilizar o sistema?",
    answer:
      "A solução atende supermercados, mercados, mercearias, restaurantes, bares, lanchonetes, comércios varejistas e outras pequenas e médias empresas que precisam organizar sua operação.",
  },
  {
    question: "O sistema permite emitir notas fiscais?",
    answer:
      "Sim. O sistema oferece recursos para apoiar a emissão de notas fiscais. Um especialista pode apresentar os detalhes aplicáveis à operação da sua empresa.",
  },
  {
    question: "Como posso conhecer melhor a solução?",
    answer:
      "Pelo formulário de contato desta página ou pelo WhatsApp. A equipe da InfoMídia apresenta a solução de acordo com o segmento do seu negócio.",
  },
  {
    question: "Como entrar em contato com a InfoMídia?",
    answer: `Pelo WhatsApp ${company.whatsappDisplay} ou pelo formulário de contato. A ${company.name} fica em ${company.city}, no ${company.stateName}. ${customerStatement}.`,
  },
] as const;
