"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { company, contactSegments } from "@/config/company";
import { contactSchema, type ContactInput } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { contactWhatsAppMessage, specialistWhatsAppMessage, whatsappHref } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const fieldClass =
  "w-full rounded-2xl border border-white/10 bg-[#0D1424] px-4 py-3 text-base text-white outline-none placeholder:text-[#64748B] focus:border-[#2563EB]";

export function Contact() {
  const directLink = whatsappHref(specialistWhatsAppMessage());
  const [status, setStatus] = useState<"idle" | "opened" | "blocked">("idle");
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nome: "",
      empresa: "",
      whatsapp: "",
      segmento: "",
      mensagem: "",
    },
  });

  const onSubmit = (values: ContactInput) => {
    const url = whatsappHref(contactWhatsAppMessage(values));
    if (!url) {
      setStatus("blocked");
      setFallbackUrl(null);
      return;
    }

    const popup = window.open(url, "_blank", "noopener,noreferrer");
    setFallbackUrl(url);
    setStatus(popup ? "opened" : "blocked");
  };

  return (
    <section id="contato" className="scroll-mt-28 py-16 sm:py-20 lg:py-24" aria-labelledby="contato-titulo">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <SectionHeading id="contato-titulo" eyebrow="Contato" title="Fale com a InfoMídia." />
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#94A3B8]">
              Envie seus dados para abrir uma conversa no WhatsApp. O formulário não grava a mensagem em um servidor
              deste site.
            </p>
            <div className="mt-8 rounded-3xl border border-white/10 bg-[#0D1424] p-6">
              <p className="text-lg font-medium">{company.name}</p>
              <p className="mt-3 flex items-start gap-2 text-sm text-[#94A3B8]">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#7DD3FC]" aria-hidden="true" />
                {company.city} — {company.stateName}
              </p>
              {directLink && company.whatsappDisplay ? (
                <a
                  href={directLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#2563EB] px-5 text-sm font-medium text-white hover:bg-[#1D4ED8]"
                >
                  <WhatsAppIcon />
                  WhatsApp {company.whatsappDisplay}
                </a>
              ) : (
                <p className="mt-5 text-sm text-[#94A3B8]">O contato por WhatsApp ainda não está configurado.</p>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome" error={errors.nome?.message} id="nome">
                <input
                  id="nome"
                  autoComplete="name"
                  aria-invalid={errors.nome ? true : undefined}
                  aria-describedby={errors.nome ? "nome-erro" : undefined}
                  className={cn(fieldClass, errors.nome && "border-[#FCA5A5]")}
                  {...register("nome")}
                />
              </Field>
              <Field label="Empresa" error={errors.empresa?.message} id="empresa">
                <input
                  id="empresa"
                  autoComplete="organization"
                  aria-invalid={errors.empresa ? true : undefined}
                  aria-describedby={errors.empresa ? "empresa-erro" : undefined}
                  className={cn(fieldClass, errors.empresa && "border-[#FCA5A5]")}
                  {...register("empresa")}
                />
              </Field>
              <Field label="WhatsApp" error={errors.whatsapp?.message} id="whatsapp">
                <input
                  id="whatsapp"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(00) 00000-0000"
                  aria-invalid={errors.whatsapp ? true : undefined}
                  aria-describedby={errors.whatsapp ? "whatsapp-erro" : undefined}
                  className={cn(fieldClass, errors.whatsapp && "border-[#FCA5A5]")}
                  {...register("whatsapp")}
                />
              </Field>
              <Field label="Segmento" error={errors.segmento?.message} id="segmento">
                <select
                  id="segmento"
                  aria-invalid={errors.segmento ? true : undefined}
                  aria-describedby={errors.segmento ? "segmento-erro" : undefined}
                  className={cn(fieldClass, "appearance-none", errors.segmento && "border-[#FCA5A5]")}
                  {...register("segmento")}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {contactSegments.map((segment) => (
                    <option key={segment} value={segment}>
                      {segment}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Mensagem" error={errors.mensagem?.message} id="mensagem">
                <textarea
                  id="mensagem"
                  rows={5}
                  aria-invalid={errors.mensagem ? true : undefined}
                  aria-describedby={errors.mensagem ? "mensagem-erro" : undefined}
                  className={cn(fieldClass, "resize-y", errors.mensagem && "border-[#FCA5A5]")}
                  {...register("mensagem")}
                />
              </Field>
            </div>
            <Button type="submit" disabled={isSubmitting || !directLink} className="mt-6 w-full sm:w-auto">
              <WhatsAppIcon />
              Enviar pelo WhatsApp
            </Button>
            <div className="mt-4 min-h-6 text-sm leading-relaxed" aria-live="polite">
              {status === "opened" ? (
                <p className="text-[#CBD5E1]">
                  Abrimos o WhatsApp com a sua mensagem. Se a conversa não aparecer,{" "}
                  {fallbackUrl ? (
                    <a href={fallbackUrl} target="_blank" rel="noopener noreferrer" className="text-white underline">
                      use este link
                    </a>
                  ) : null}
                  .
                </p>
              ) : null}
              {status === "blocked" && fallbackUrl ? (
                <p className="text-[#CBD5E1]">
                  O navegador bloqueou a nova janela.{" "}
                  <a href={fallbackUrl} target="_blank" rel="noopener noreferrer" className="text-white underline">
                    Abrir o WhatsApp com a mensagem
                  </a>
                  .
                </p>
              ) : null}
              {status === "blocked" && !fallbackUrl ? (
                <p className="text-[#CBD5E1]">O WhatsApp da InfoMídia ainda não está configurado neste site.</p>
              ) : null}
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = `${id}-erro`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-[#CBD5E1]">
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-sm text-[#FCA5A5]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
