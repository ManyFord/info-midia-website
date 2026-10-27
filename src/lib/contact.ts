import { z } from "zod";
import { contactSegments } from "@/config/company";

const segmentList: readonly string[] = contactSegments;

export const contactSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome."),
  empresa: z.string().trim().min(2, "Informe o nome da empresa."),
  whatsapp: z
    .string()
    .trim()
    .refine(
      (value) => value.replace(/\D/g, "").length >= 10,
      "Informe um WhatsApp com DDD.",
    ),
  segmento: z
    .string()
    .trim()
    .min(1, "Selecione o segmento.")
    .refine((value) => segmentList.includes(value), "Selecione o segmento."),
  mensagem: z
    .string()
    .trim()
    .min(10, "Escreva uma mensagem com um pouco mais de detalhe."),
});

export type ContactInput = z.infer<typeof contactSchema>;
