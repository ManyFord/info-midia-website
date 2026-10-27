import { FileText, LayoutDashboard, ListChecks, Package, ShoppingCart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const solutions = [
  {
    icon: LayoutDashboard,
    title: "Gestão empresarial",
    text: "Organize processos e informações essenciais para a administração da sua empresa.",
    span: "md:col-span-2 xl:col-span-2",
  },
  {
    icon: FileText,
    title: "Emissão de notas fiscais",
    text: "Conte com recursos para apoiar a emissão de documentos fiscais no dia a dia.",
    span: "",
  },
  {
    icon: ShoppingCart,
    title: "Controle de vendas",
    text: "Acompanhe e organize as operações comerciais do seu estabelecimento.",
    span: "",
  },
  {
    icon: Package,
    title: "Gestão de produtos",
    text: "Mantenha as informações dos seus produtos organizadas para facilitar a operação.",
    span: "",
  },
  {
    icon: ListChecks,
    title: "Organização operacional",
    text: "Simplifique rotinas e tenha mais controle sobre as atividades da empresa.",
    span: "",
  },
];

export function Solutions() {
  return (
    <section id="solucoes" className="scroll-mt-28 bg-[#0D1424] py-20 sm:py-24 lg:py-28" aria-labelledby="solucoes-titulo">
      <Container>
        <Reveal>
          <SectionHeading
            id="solucoes-titulo"
            eyebrow="Soluções"
            title="Uma solução de gestão pensada para o seu negócio."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <li key={solution.title} className={cn(solution.span)}>
                  <article className="group h-full rounded-3xl border border-white/10 bg-[#070B14]/70 p-6 transition-colors hover:border-[#2563EB]/40 hover:bg-[#10192d] sm:p-7">
                    <span className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-[#2563EB]/10 text-[#93C5FD]">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-xl font-semibold tracking-tight">{solution.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#94A3B8] sm:text-base">
                      {solution.text}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
