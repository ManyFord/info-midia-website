import { company } from "@/config/company";

export function whatsappHref(message?: string) {
  if (!company.whatsapp) return null;

  const base = `https://wa.me/${company.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function specialistWhatsAppMessage() {
  return "Olá! Vim pelo site da InfoMídia Sistemas e gostaria de falar com um especialista.";
}

export function contactWhatsAppMessage(input: {
  nome: string;
  empresa: string;
  whatsapp: string;
  segmento: string;
  mensagem: string;
}) {
  return [
    "Olá! Vim pelo site da InfoMídia Sistemas.",
    "",
    `Nome: ${input.nome}`,
    `Empresa: ${input.empresa}`,
    `WhatsApp: ${input.whatsapp}`,
    `Segmento: ${input.segmento}`,
    "",
    "Mensagem:",
    input.mensagem,
  ].join("\n");
}
