"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { company } from "@/config/company";
import {
  cityMarkers,
  coverageCityCount,
  coverageStateCount,
  customerLocations,
} from "@/config/locations";
import { brazilStates, brazilViewBox } from "@/components/map/brazil-paths";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const coverageCodes = new Set(customerLocations.map((location) => location.stateCode));

export function NationalPresence() {
  const [selected, setSelected] = useState<string>(company.state);
  const [hovered, setHovered] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const activeCode = hovered ?? selected;
  const activeState = brazilStates.find((state) => state.code === activeCode);
  const selectedLocation = customerLocations.find((location) => location.stateCode === selected);

  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];
    return customerLocations
      .map((location) => ({
        ...location,
        cities: location.cities.filter((city) =>
          city.toLocaleLowerCase("pt-BR").includes(normalizedQuery),
        ),
      }))
      .filter((location) => location.cities.length > 0);
  }, [normalizedQuery]);

  const visibleGroups = normalizedQuery
    ? searchResults
    : selectedLocation
      ? [selectedLocation]
      : [];

  return (
    <section id="presenca" className="scroll-mt-28 bg-[#0D1424] py-20 sm:py-24 lg:py-28" aria-labelledby="presenca-titulo">
      <Container>
        <SectionHeading
          id="presenca-titulo"
          eyebrow="Presença"
          title="De Cafelândia para negócios em todo o Brasil."
          description={`Com origem em ${company.city}, no ${company.stateName}, a InfoMídia atende mais de ${company.customers} clientes no Brasil, levando soluções de gestão empresarial para diferentes segmentos.`}
        />

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="rounded-3xl border border-white/10 bg-[#070B14] p-4 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#94A3B8]">
                <span className="font-medium text-white">{coverageStateCount} estados</span>
                {" · "}
                <span className="font-medium text-white">{coverageCityCount} cidades</span>
              </p>
              <p className="text-sm text-[#CBD5E1]" aria-live="polite">
                {activeState ? activeState.name : "Brasil"}
                {activeState && coverageCodes.has(activeState.code) ? " · área de atuação" : ""}
              </p>
            </div>
            <svg
              viewBox={brazilViewBox}
              role="img"
              aria-label="Mapa do Brasil com destaque para os estados em que a InfoMídia atua"
              className="h-auto w-full"
            >
              <defs>
                <linearGradient id="coverage-fill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              {brazilStates.map((state) => {
                const covered = coverageCodes.has(state.code);
                const isActive = state.code === activeCode;
                return (
                  <path
                    key={state.code}
                    d={state.d}
                    fill={covered ? "url(#coverage-fill)" : isActive ? "#1E293B" : "#121A2E"}
                    fillOpacity={covered ? (isActive ? 1 : 0.82) : 1}
                    stroke={isActive ? "#A5F3FC" : "rgba(148,163,184,0.28)"}
                    strokeWidth={isActive ? 2.2 : 1}
                    className="cursor-pointer"
                    onMouseEnter={() => setHovered(state.code)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => {
                      setSelected(state.code);
                      setQuery("");
                    }}
                  >
                    <title>{state.name}</title>
                  </path>
                );
              })}
              {cityMarkers.map((marker) => (
                <circle
                  key={`${marker.stateCode}-${marker.city}`}
                  cx={marker.x}
                  cy={marker.y}
                  r={6}
                  fill="#F8FAFC"
                  stroke="#2563EB"
                  strokeWidth={2}
                >
                  <title>
                    {marker.city} · {marker.stateCode}
                  </title>
                </circle>
              ))}
            </svg>
            <p className="mt-3 text-xs leading-relaxed text-[#94A3B8]">
              Áreas de atuação cadastradas. Estados e cidades podem ser atualizados na configuração do site.
            </p>
          </div>

          <div className="min-w-0">
            <div role="tablist" aria-label="Estados de atuação" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {customerLocations.map((location) => {
                const isSelected = !normalizedQuery && location.stateCode === selected;
                return (
                  <button
                    key={location.stateCode}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSelected(location.stateCode);
                      setQuery("");
                    }}
                    className={cn(
                      "rounded-2xl border px-3 py-3 text-left transition-colors",
                      isSelected
                        ? "border-[#2563EB]/50 bg-[#2563EB]/12"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20",
                    )}
                  >
                    <span className="block text-xs tracking-[0.14em] text-[#7DD3FC] uppercase">
                      {location.stateCode}
                    </span>
                    <span className="mt-1 block text-sm font-medium">{location.state}</span>
                    <span className="mt-1 block text-xs text-[#94A3B8]">
                      {location.cities.length} {location.cities.length === 1 ? "cidade" : "cidades"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              <label htmlFor="busca-cidade" className="text-sm text-[#CBD5E1]">
                Buscar cidade
              </label>
              <div className="relative mt-2">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  id="busca-cidade"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Digite o nome da cidade"
                  className="w-full rounded-2xl border border-white/10 bg-[#070B14] py-3 pr-4 pl-10 text-base text-white placeholder:text-[#64748B]"
                />
              </div>
            </div>

            <div className="mt-5" role="tabpanel">
              {visibleGroups.length === 0 ? (
                <p className="rounded-2xl border border-white/10 bg-[#070B14] px-4 py-5 text-sm leading-relaxed text-[#94A3B8]">
                  {normalizedQuery
                    ? "Nenhuma cidade encontrada para essa busca."
                    : "Não há cidades informadas para este estado na área de atuação atual."}
                </p>
              ) : (
                <div className="space-y-5">
                  {visibleGroups.map((location) => (
                    <div key={location.stateCode}>
                      <h3 className="text-sm font-medium text-white">
                        {location.state}{" "}
                        <span className="text-[#94A3B8]">({location.stateCode})</span>
                      </h3>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {location.cities.map((city) => {
                          const isHome = city === company.city && location.stateCode === company.state;
                          return (
                            <li key={`${location.stateCode}-${city}`}>
                              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-[#E2E8F0]">
                                {city}
                                {isHome ? (
                                  <span className="text-[10px] tracking-[0.14em] text-[#7DD3FC] uppercase">
                                    Sede
                                  </span>
                                ) : null}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
