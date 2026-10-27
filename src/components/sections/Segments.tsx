import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const segments = [
  {
    title: "Supermercados e mercados",
    text: "Mais organização para acompanhar vendas, produtos e rotinas comerciais.",
    image: "/images/segments/supermercados.jpg",
    alt: "Corredor de um supermercado com prateleiras de produtos.",
  },
  {
    title: "Restaurantes",
    text: "Uma gestão mais prática para acompanhar as operações do estabelecimento.",
    image: "/images/segments/restaurantes.jpg",
    alt: "Salão de um restaurante com mesas organizadas.",
  },
  {
    title: "Bares e lanchonetes",
    text: "Agilidade e organização para negócios com operações dinâmicas.",
    image: "/images/segments/bares.jpg",
    alt: "Balcão e mesas de um café e lanchonete.",
  },
  {
    title: "Comércio varejista",
    text: "Mais controle e simplicidade para o dia a dia do seu comércio.",
    image: "/images/segments/varejo.jpg",
    alt: "Interior de uma loja de comércio varejista.",
  },
];

export function Segments() {
  return (
    <section id="segmentos" className="scroll-mt-28 py-20 sm:py-24 lg:py-28" aria-labelledby="segmentos-titulo">
      <Container>
        <Reveal>
          <SectionHeading
            id="segmentos-titulo"
            eyebrow="Segmentos"
            title="Uma gestão eficiente para diferentes tipos de negócio."
            description="Soluções para empresas que precisam de organização, agilidade e controle em suas operações."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {segments.map((segment) => (
              <li key={segment.title}>
                <article className="group relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src={segment.image}
                    alt={segment.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/55 to-[#070B14]/10" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-2xl font-semibold tracking-tight text-balance">{segment.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#E2E8F0]">{segment.text}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
