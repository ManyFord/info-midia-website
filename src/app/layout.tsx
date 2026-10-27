import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { company, seo } from "@/config/company";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: {
    default: seo.title,
    template: `%s | ${company.shortName}`,
  },
  description: seo.description,
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.name,
  keywords: [
    "InfoMídia Sistemas",
    "software de gestão empresarial",
    "emissão de notas fiscais",
    "controle de vendas",
    "sistema para supermercado",
    "sistema para restaurante",
    "Cafelândia",
  ],
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    title: seo.title,
    description: seo.description,
    locale: "pt_BR",
    type: "website",
    siteName: company.name,
    ...(siteUrl ? { url: siteUrl.toString() } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  ...(siteUrl
    ? {
        metadataBase: siteUrl,
        alternates: { canonical: "/" },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#070B14",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#070B14] text-[#F8FAFC]">
        <a href="#conteudo" className="skip-link">
          Ir para o conteúdo
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
