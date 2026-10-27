import { JsonLd } from "@/components/seo/JsonLd";
import { About } from "@/components/sections/About";
import { Benefits } from "@/components/sections/Benefits";
import { BusinessProblems } from "@/components/sections/BusinessProblems";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { NationalPresence } from "@/components/sections/NationalPresence";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Segments } from "@/components/sections/Segments";
import { SocialProof } from "@/components/sections/SocialProof";
import { Solutions } from "@/components/sections/Solutions";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <main id="conteudo">
        <Hero />
        <SocialProof />
        <BusinessProblems />
        <Solutions />
        <Segments />
        <ProductShowcase />
        <Benefits />
        <NationalPresence />
        <About />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
    </>
  );
}
