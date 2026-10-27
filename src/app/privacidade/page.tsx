import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidade">
      <p>
        A Política de Privacidade da InfoMídia Sistemas ainda não foi publicada. Esta página é apenas um endereço
        reservado e não constitui um documento legal.
      </p>
      <p>
        O formulário de contato deste site não envia os dados a um servidor da InfoMídia. As informações são usadas
        somente para abrir uma conversa no WhatsApp do seu aparelho.
      </p>
    </LegalPage>
  );
}
