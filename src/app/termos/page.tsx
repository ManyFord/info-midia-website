import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Termos de Uso",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage title="Termos de Uso">
      <p>
        Os Termos de Uso da InfoMídia Sistemas ainda não foram publicados. Esta página é um espaço reservado e não
        constitui um contrato.
      </p>
    </LegalPage>
  );
}
