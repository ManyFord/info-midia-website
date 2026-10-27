import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="conteudo" className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col justify-center px-4 pt-32 pb-24">
      <p className="text-sm text-[#94A3B8]">Página não encontrada</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">Não encontramos este endereço.</h1>
      <p className="mt-4 text-base leading-relaxed text-[#94A3B8]">
        O conteúdo pode ter sido movido ou o link está incorreto.
      </p>
      <Button href="/" className="mt-8 w-fit">
        Voltar ao início
      </Button>
    </main>
  );
}
