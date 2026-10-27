"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { faqs } from "@/config/faq";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" className="scroll-mt-28 bg-[#0D1424] py-20 sm:py-24 lg:py-28" aria-labelledby="faq-titulo">
      <Container>
        <SectionHeading id="faq-titulo" eyebrow="Dúvidas" title="Perguntas frequentes" />
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-white/10">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            const buttonId = `${baseId}-button-${index}`;
            const panelId = `${baseId}-panel-${index}`;

            return (
              <div key={item.question} className="border-b border-white/10 last:border-b-0">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    <span className="text-base font-medium sm:text-lg">{item.question}</span>
                    <ChevronDown
                      className={cn("size-5 shrink-0 text-[#94A3B8] transition-transform", open && "rotate-180")}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div className={cn("grid transition-[grid-template-rows] duration-300", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    inert={!open}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-[#94A3B8] sm:text-base">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
