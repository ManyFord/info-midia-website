import { FileText, LayoutDashboard, Package, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/cn";

export type DashboardView = "overview" | "sales" | "products" | "invoices";

const navigation = [
  { id: "overview" as const, label: "Visão geral", icon: LayoutDashboard },
  { id: "sales" as const, label: "Vendas", icon: ShoppingCart },
  { id: "products" as const, label: "Produtos", icon: Package },
  { id: "invoices" as const, label: "Notas fiscais", icon: FileText },
];

function Bars({ idPrefix, heights }: { idPrefix: string; heights: number[] }) {
  return (
    <svg viewBox="0 0 160 72" className="h-16 w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${idPrefix}-bars`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      {heights.map((height, index) => (
        <rect
          key={`${height}-${index}`}
          x={index * 22 + 4}
          y={72 - height}
          width="12"
          height={height}
          rx="3"
          fill={`url(#${idPrefix}-bars)`}
          opacity={0.35 + (index % 3) * 0.2}
        />
      ))}
    </svg>
  );
}

function Area({ idPrefix }: { idPrefix: string }) {
  return (
    <svg viewBox="0 0 360 120" className="h-28 w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${idPrefix}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 86C28 84 42 48 78 52C118 56 132 22 176 30C220 38 236 74 278 62C314 52 338 28 360 22V120H0Z"
        fill={`url(#${idPrefix}-area)`}
      />
      <path
        d="M0 86C28 84 42 48 78 52C118 56 132 22 176 30C220 38 236 74 278 62C314 52 338 28 360 22"
        fill="none"
        stroke="#7DD3FC"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function SkeletonRows({
  labels,
  widths,
}: {
  labels: string[];
  widths: string[];
}) {
  return (
    <ul className="space-y-2">
      {labels.map((label, index) => (
        <li
          key={`${label}-${index}`}
          className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5"
        >
          <span className="size-8 shrink-0 rounded-lg bg-[#2563EB]/20" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs text-[#E2E8F0] sm:text-sm">{label}</span>
            <span className="mt-1.5 block h-1.5 rounded-full bg-white/10" style={{ width: widths[index] }} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function Panel({ view, idPrefix }: { view: DashboardView; idPrefix: string }) {
  if (view === "sales") {
    return (
      <div className="space-y-3">
        <div>
          <p className="text-xs text-[#94A3B8]">Controle de vendas</p>
          <p className="text-sm font-medium text-white sm:text-base">Organização comercial</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <Area idPrefix={`${idPrefix}-sales`} />
        </div>
        <SkeletonRows
          labels={["Venda", "Venda", "Venda", "Venda"]}
          widths={["72%", "54%", "81%", "46%"]}
        />
      </div>
    );
  }

  if (view === "products") {
    return (
      <div className="space-y-3">
        <div>
          <p className="text-xs text-[#94A3B8]">Gestão de produtos</p>
          <p className="text-sm font-medium text-white sm:text-base">Informações organizadas</p>
        </div>
        <SkeletonRows
          labels={["Produto", "Produto", "Produto", "Produto", "Produto"]}
          widths={["64%", "48%", "76%", "40%", "58%"]}
        />
      </div>
    );
  }

  if (view === "invoices") {
    return (
      <div className="space-y-3">
        <div>
          <p className="text-xs text-[#94A3B8]">Notas fiscais</p>
          <p className="text-sm font-medium text-white sm:text-base">Documentos do dia a dia</p>
        </div>
        <ul className="space-y-2">
          {["Documento fiscal", "Documento fiscal", "Documento fiscal", "Documento fiscal"].map(
            (label, index) => (
              <li
                key={`${label}-${index}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <FileText className="size-4 shrink-0 text-[#7DD3FC]" />
                  <span className="truncate text-sm text-[#E2E8F0]">{label}</span>
                </span>
                <span className="shrink-0 rounded-full bg-[#2563EB]/15 px-2 py-1 text-[10px] text-[#BFDBFE]">
                  Exemplo
                </span>
              </li>
            ),
          )}
        </ul>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-[#94A3B8]">Visão do negócio</p>
          <p className="text-sm font-medium text-white sm:text-base">Rotinas em um só painel</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          ["Vendas", [28, 42, 36, 54, 40, 62]],
          ["Produtos", [22, 30, 48, 34, 50, 38]],
          ["Notas", [18, 36, 28, 44, 32, 48]],
        ].map(([label, heights]) => (
          <div key={label as string} className="rounded-xl border border-white/10 bg-white/[0.03] p-2 sm:p-3">
            <p className="truncate text-[10px] text-[#94A3B8] sm:text-xs">{label as string}</p>
            <Bars idPrefix={`${idPrefix}-${label}`} heights={heights as number[]} />
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-1 text-[10px] tracking-[0.14em] text-[#94A3B8] uppercase">Movimento ilustrativo</p>
        <Area idPrefix={`${idPrefix}-overview`} />
      </div>
    </div>
  );
}

export function DashboardMock({
  view,
  idPrefix,
}: {
  view: DashboardView;
  idPrefix: string;
}) {
  return (
    <figure className="min-w-0">
      <div
        aria-hidden="true"
        className="rounded-[1.35rem] bg-gradient-to-br from-[#2563EB]/50 via-white/10 to-[#06B6D4]/40 p-px shadow-[0_40px_80px_-48px_rgba(37,99,235,0.85)]"
      >
        <div className="overflow-hidden rounded-[1.3rem] bg-[#0B1220]">
          <div className="flex h-11 items-center gap-3 border-b border-white/8 px-3 sm:px-4">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
            </span>
            <span className="truncate text-xs text-[#94A3B8]">Painel ilustrativo · InfoMídia</span>
          </div>
          <div className="grid grid-cols-[46px_minmax(0,1fr)] sm:grid-cols-[58px_minmax(0,1fr)]">
            <div className="flex flex-col items-center gap-2 border-r border-white/8 py-3">
              <span className="mb-1 grid size-7 grid-cols-2 gap-0.5">
                <span className="rounded-[3px] bg-[#38BDF8]" />
                <span className="rounded-[3px] bg-[#2563EB]" />
                <span className="rounded-[3px] bg-[#1D4ED8]" />
                <span className="rounded-[3px] bg-[#E11D2E]" />
              </span>
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = item.id === view;
                return (
                  <span
                    key={item.id}
                    className={cn(
                      "flex size-8 items-center justify-center rounded-xl",
                      active ? "bg-[#2563EB] text-white" : "text-[#94A3B8]",
                    )}
                    title={item.label}
                  >
                    <Icon className="size-4" />
                  </span>
                );
              })}
            </div>
            <div key={view} className="animate-fade min-h-[300px] p-3 sm:min-h-[340px] sm:p-4">
              <Panel view={view} idPrefix={idPrefix} />
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-[#94A3B8]">
        Ilustração conceitual. Não representa a interface real do sistema.
      </figcaption>
    </figure>
  );
}
