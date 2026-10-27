"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { DashboardMock, type DashboardView } from "@/components/ui/DashboardMock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const tabs: Array<{ id: DashboardView; title: string; text: string }> = [
  {
    id: "overview",
    title: "Visão geral",
    text: "Uma leitura simples das rotinas de gestão, vendas, produtos e documentos fiscais.",
  },
  {
    id: "sales",
    title: "Vendas",
    text: "Acompanhe e organize as operações comerciais do estabelecimento.",
  },
  {
    id: "products",
    title: "Produtos",
    text: "Mantenha as informações dos produtos organizadas para facilitar a operação.",
  },
  {
    id: "invoices",
    title: "Notas fiscais",
    text: "Recursos para apoiar a emissão de documentos fiscais no dia a dia.",
  },
];

export function ProductShowcase() {
  const [view, setView] = useState<DashboardView>("overview");
  const active = tabs.find((tab) => tab.id === view) ?? tabs[0];

  return (
    <section className="scroll-mt-28 bg-[#0D1424] py-20 sm:py-24 lg:py-28" aria-labelledby="plataforma-titulo">
      <Container>
        <SectionHeading
          id="plataforma-titulo"
          eyebrow="Plataforma"
          title="Tudo o que seu negócio precisa, em uma gestão mais simples."
        />
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-12">
          <div className="min-w-0">
            <div
              className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
              role="tablist"
              aria-label="Áreas ilustradas do sistema"
            >
              {tabs.map((tab) => {
                const selected = tab.id === view;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls="painel-ilustrativo"
                    onClick={() => setView(tab.id)}
                    className={cn(
                      "min-w-[220px] shrink-0 rounded-2xl border px-4 py-4 text-left transition-colors lg:min-w-0",
                      selected
                        ? "border-[#2563EB]/50 bg-[#2563EB]/12"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20",
                    )}
                  >
                    <span className="block text-base font-medium">{tab.title}</span>
                    <span className="mt-1 hidden text-sm leading-relaxed text-[#94A3B8] lg:block">
                      {tab.text}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#94A3B8] lg:hidden">{active.text}</p>
          </div>
          <div id="painel-ilustrativo" role="tabpanel" aria-labelledby={`tab-${view}`} className="min-w-0">
            <DashboardMock view={view} idPrefix="showcase" />
          </div>
        </div>
      </Container>
    </section>
  );
}
