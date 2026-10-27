import { company, customerStatement } from "@/config/company";
import { coverageCityCount, coverageStateCount } from "@/config/locations";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const facts = [
  { label: "Origem", value: `${company.city}, ${company.stateName}` },
  { label: "Clientes", value: customerStatement },
  { label: "Atuação", value: `${coverageStateCount} estados e ${coverageCityCount} cidades` },
  { label: "Foco", value: "Gestão empresarial" },
];

export function About() {
  return (
    <section id="sobre" className="scroll-mt-28 py-20 sm:py-24 lg:py-28" aria-labelledby="sobre-titulo">
      <Container>
        <Reveal>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div>
              <SectionHeading id="sobre-titulo" eyebrow="A empresa" title="Tecnologia que acompanha o seu negócio." />
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#94A3B8] sm:text-lg">
                A InfoMídia Sistemas é uma empresa de {company.city}, no {company.stateName}, especializada em
                soluções de gestão empresarial. Com mais de {company.customers} clientes atendidos no Brasil, atua
                oferecendo ferramentas para apoiar a organização e as operações de negócios de diferentes segmentos.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:col-span-2">
                <Logo />
                <p className="mt-6 text-sm leading-relaxed text-[#94A3B8]">
                  Da sede em {company.city} para empresas em diferentes regiões do país, com ferramentas de gestão
                  pensadas para a rotina comercial.
                </p>
              </div>
              {facts.map((fact) => (
                <article key={fact.label} className="rounded-3xl border border-white/10 bg-[#0D1424] p-5">
                  <p className="text-xs tracking-[0.16em] text-[#7DD3FC] uppercase">{fact.label}</p>
                  <p className="mt-2 text-base font-medium text-balance">{fact.value}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
