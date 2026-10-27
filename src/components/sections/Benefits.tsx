import { Clock3, FileCheck2, Layers, Package, ShoppingBag, Workflow } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const benefits = [
  {
    icon: Layers,
    title: "Centralização de informações",
    text: "Informações importantes do negócio reunidas no ambiente de gestão.",
  },
  {
    icon: Workflow,
    title: "Simplificação de processos",
    text: "Rotinas mais claras para o dia a dia da operação.",
  },
  {
    icon: ShoppingBag,
    title: "Organização das vendas",
    text: "Acompanhamento das operações comerciais do estabelecimento.",
  },
  {
    icon: Package,
    title: "Gestão de produtos",
    text: "Cadastro e organização das informações de produtos.",
  },
  {
    icon: FileCheck2,
    title: "Apoio às rotinas fiscais",
    text: "Recursos para apoiar a emissão de documentos fiscais.",
  },
  {
    icon: Clock3,
    title: "Mais praticidade no dia a dia",
    text: "Menos dispersão nas atividades operacionais da empresa.",
  },
];

export function Benefits() {
  return (
    <section className="scroll-mt-28 py-20 sm:py-24 lg:py-28" aria-labelledby="beneficios-titulo">
      <Container>
        <Reveal>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <SectionHeading
              id="beneficios-titulo"
              eyebrow="Benefícios"
              title="Mais organização. Mais eficiência. Mais tempo para crescer."
              description="A InfoMídia apoia a rotina de quem precisa administrar o negócio com mais clareza."
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <li key={benefit.title}>
                    <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[#2563EB]/35">
                      <Icon className="size-5 text-[#7DD3FC]" aria-hidden="true" />
                      <h3 className="mt-4 text-base font-semibold tracking-tight">{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{benefit.text}</p>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
