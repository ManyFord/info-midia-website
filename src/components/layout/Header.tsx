"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { navigation } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const items = panel?.querySelectorAll<HTMLElement>("a, button");
    items?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>("a, button"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border px-3 py-2 transition-colors sm:px-4",
          scrolled
            ? "border-white/15 bg-[#070B14]/90 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-white/10 bg-[#070B14]/60 backdrop-blur-md",
        )}
      >
        <a href="#inicio" className="min-w-0 rounded-xl" onClick={close}>
          <Logo priority />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-[#CBD5E1] transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Button href="#contato">Fale com um especialista</Button>
          </div>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          ref={panelRef}
          id={menuId}
          className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-[#0B1220]/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="rounded-xl px-3 py-3 text-base text-[#E2E8F0] hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button href="#contato" onClick={close} className="mt-2 w-full">
            Fale com um especialista
          </Button>
        </div>
      ) : null}
    </header>
  );
}
