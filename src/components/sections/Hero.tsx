"use client";

import { ArrowRight, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { company, customerStatement } from "@/config/company";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DashboardMock } from "@/components/ui/DashboardMock";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="inicio" className="relative scroll-mt-28 overflow-hidden pt-28 sm:pt-32 lg:min-h-[100svh] lg:pt-36">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="orb-drift pointer-events-none absolute -top-24 -left-24 size-[28rem] rounded-full bg-[#2563EB]/20 blur-3xl" />
      <div className="orb-drift-delayed pointer-events-none absolute top-24 right-[-6rem] size-[24rem] rounded-full bg-[#06B6D4]/15 blur-3xl" />

      <Container className="relative pb-16 sm:pb-20 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
            }}
          >
            <motion.p
              variants={{
                hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-[#E2E8F0]"
            >
              <Users className="size-4 shrink-0 text-[#7DD3FC]" aria-hidden="true" />
              <span>{customerStatement}</span>
            </motion.p>

            <motion.h1
              variants={{
                hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              className="mt-6 max-w-xl text-[clamp(2.35rem,5vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance"
            >
              Gestão <span className="text-gradient">inteligente</span> para quem faz o negócio{" "}
              <span className="text-gradient">acontecer.</span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              className="mt-5 max-w-xl text-base leading-relaxed text-[#94A3B8] sm:text-lg"
            >
              Da venda à emissão de notas fiscais, a InfoMídia oferece soluções de gestão empresarial
              para simplificar processos, organizar operações e ajudar sua empresa a crescer.
            </motion.p>

            <motion.div
              variants={{
                hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="#solucoes" className="w-full sm:w-auto">
                Conheça nossas soluções
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button href="#contato" variant="secondary" className="w-full sm:w-auto">
                Falar com um especialista
              </Button>
            </motion.div>

            <motion.p
              variants={{
                hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              className="mt-6 text-sm text-[#94A3B8]"
            >
              {company.city}, {company.stateName} · atendimento em diferentes regiões do Brasil
            </motion.p>
          </motion.div>

          <motion.div
            className="relative min-w-0"
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reduce ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="float-y">
              <DashboardMock view="overview" idPrefix="hero" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
