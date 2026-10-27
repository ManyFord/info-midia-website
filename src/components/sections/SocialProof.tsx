import { company, customerStatement } from "@/config/company";
import { coverageCityCount, coverageStateCount } from "@/config/locations";
import { Container } from "@/components/ui/Container";

export function SocialProof() {
  return (
    <section className="border-y border-white/10 bg-[#0D1424]" aria-label="Presença de clientes">
      <Container className="grid gap-8 py-12 sm:py-14 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-12">
        <div>
          <p className="text-[clamp(3.2rem,6vw,4.75rem)] leading-none font-semibold tracking-tight">
            <span className="sr-only">{customerStatement}</span>
            <span aria-hidden="true">
              {company.customers}
              <span className="text-[#38BDF8]">+</span>
            </span>
          </p>
          <p aria-hidden="true" className="mt-2 max-w-[12rem] text-sm text-[#94A3B8]">
            Clientes atendidos no Brasil
          </p>
        </div>

        <p className="max-w-xl text-xl leading-snug font-medium text-balance text-[#E2E8F0] sm:text-2xl">
          Empresas de diferentes segmentos confiam na InfoMídia para apoiar sua gestão.
        </p>

        <dl className="grid grid-cols-2 gap-6 lg:min-w-56">
          <div>
            <dt className="text-sm text-[#94A3B8]">Cidades</dt>
            <dd className="mt-1 text-3xl font-semibold">{coverageCityCount}</dd>
          </div>
          <div>
            <dt className="text-sm text-[#94A3B8]">Estados</dt>
            <dd className="mt-1 text-3xl font-semibold">{coverageStateCount}</dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
