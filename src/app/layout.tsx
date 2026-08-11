import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";
import "./globals.css";

// Fonte do projeto conforme o guia de estilo do Figma (section 7:275).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1b449d",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteConfig.locale} className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="text-brand sr-only rounded-full bg-white px-4 py-2 font-bold focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
        >
          Pular para o conteúdo
        </a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
