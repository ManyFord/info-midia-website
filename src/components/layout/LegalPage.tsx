import Link from "next/link";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main id="conteudo" className="mx-auto min-h-[70vh] w-full max-w-3xl px-4 pt-32 pb-24 sm:px-6">
      <p className="text-xs font-medium tracking-[0.18em] text-[#7DD3FC] uppercase">Institucional</p>
      <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-balance">
        {title}
      </h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-[#94A3B8] sm:text-lg">{children}</div>
      <Link href="/" className="mt-8 inline-flex text-sm text-white underline-offset-4 hover:underline">
        Voltar ao início
      </Link>
    </main>
  );
}
