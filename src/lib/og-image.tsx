import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { company } from "@/config/company";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = "InfoMídia Sistemas — Software de Gestão Empresarial";

export async function createOgImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#070B14",
          padding: "64px",
          color: "#F8FAFC",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "8px 12px",
            }}
          >
            {/* next/og renders this img through Satori, which does not use next/image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} width={210} height={84} alt="" />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "920px" }}>
          <div style={{ fontSize: 56, fontWeight: 600, letterSpacing: -1.2, lineHeight: 1.08 }}>
            Gestão empresarial para quem faz o negócio acontecer.
          </div>
          <div style={{ marginTop: 22, fontSize: 28, color: "#94A3B8" }}>
            Mais de {company.customers} clientes atendidos no Brasil
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
