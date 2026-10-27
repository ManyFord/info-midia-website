import { Eye, ListTree, Timer } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const problems = [
  {
    icon: ListTree,
    index: "01",
    title: "Processos desorganizados",
    text: "Tenha mais clareza e organização nas atividades do seu negócio.",
  },
  {
    icon: Timer,
    index: "02",
    title: "Rotinas que consomem tempo",
    text: "Simplifique atividades operacionais e concentre seus esforços no que realmente importa.",
  },
  {
    icon: Eye,
    index: "03",
    title: "Falta de visibilidade",
    text: "Centralize informações importantes para acompanhar melhor sua operação.",
  },
];

export function BusinessProblems() {
  return (
    <section className="scroll-mt-28 py-20 sm:py-24 lg:py-28" aria-labelledby="problemas-titulo">
      <Container>
        <Reveal>
          <SectionHeading
            id="problemas-titulo"
            eyebrow="O dia a dia"
            title="Sua empresa precisa de gestão, não de complicação."
            description="Processos desorganizados, informações dispersas e rotinas manuais podem dificultar o dia a dia de qualquer negócio."
          />
          <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] md:grid md:grid-cols-3 md:divide-x md:divide-white/10">
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <article key={problem.title} className="border-b border-white/10 p-6 last:border-b-0 sm:p-8 md:border-b-0">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-[#2563EB]/12 text-[#93C5FD]">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-4xl font-semibold tracking-tight text-white/10">{problem.index}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">{problem.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#94A3B8] sm:text-base">{problem.text}</p>
                </article>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
