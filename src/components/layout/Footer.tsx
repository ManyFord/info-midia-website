import Link from "next/link";
import { company } from "@/config/company";
import { footerNavigation } from "@/config/navigation";
import { specialistWhatsAppMessage, whatsappHref } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const whatsapp = whatsappHref(specialistWhatsAppMessage());

  return (
    <footer className="border-t border-white/10 bg-[#070B14]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_0.9fr] lg:px-8">
        <div className="max-w-md">
          <Logo size="sm" />
          <p className="mt-5 text-sm leading-relaxed text-[#94A3B8]">{company.tagline}</p>
        </div>

        <nav aria-label="Rodapé">
          <p className="text-sm font-medium text-white">Navegação</p>
          <ul className="mt-4 space-y-2">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-[#94A3B8] hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-medium text-white">Contato</p>
          <ul className="mt-4 space-y-2 text-sm text-[#94A3B8]">
            <li>{company.name}</li>
            <li>
              {company.city} — {company.state}
            </li>
            {whatsapp && company.whatsappDisplay ? (
              <li>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp {company.whatsappDisplay}
                </a>
              </li>
            ) : null}
            {company.email ? (
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-white">
                  {company.email}
                </a>
              </li>
            ) : null}
          </ul>
          <div className="mt-6 flex flex-col gap-2 text-sm">
            <Link href="/privacidade" className="text-[#94A3B8] hover:text-white">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="text-[#94A3B8] hover:text-white">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-sm text-[#94A3B8] sm:px-6 lg:px-8">
          © {company.copyrightYear} {company.name}.
        </p>
      </div>
    </footer>
  );
}
