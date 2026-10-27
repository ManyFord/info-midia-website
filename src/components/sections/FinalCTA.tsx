import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { specialistWhatsAppMessage, whatsappHref } from "@/lib/whatsapp";

export function FinalCTA() {
  const whatsapp = whatsappHref(specialistWhatsAppMessage());

  return (
    <section className="py-8 sm:py-12" aria-labelledby="cta-titulo">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1D4ED8] via-[#2563EB] to-[#0E7490] px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-8 size-72 rounded-full bg-[#67E8F9]/25 blur-3xl" />
          <div className="relative max-w-3xl">
            <h2 id="cta-titulo" className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] font-semibold tracking-tight text-balance">
              Seu negócio merece uma gestão mais inteligente.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              Conheça as soluções da InfoMídia e descubra como simplificar a gestão da sua empresa.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {whatsapp ? (
                <Button href={whatsapp} external variant="light" className="w-full sm:w-auto">
                  <WhatsAppIcon />
                  Conversar com um especialista
                </Button>
              ) : (
                <Button href="#contato" variant="light" className="w-full sm:w-auto">
                  Conversar com um especialista
                </Button>
              )}
              <Button href="#solucoes" variant="secondary" className="w-full border-white/25 bg-white/10 text-white hover:bg-white/15 sm:w-auto">
                Conhecer as soluções
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
