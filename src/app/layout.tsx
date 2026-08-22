import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getDict, getLocale } from "@/lib/i18n";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDict();
  const locale = await getLocale();
  return {
    metadataBase: new URL("https://kidleido.com"),
    title: d.metaTitle,
    description: d.metaDescription,
    openGraph: {
      title: d.metaTitle,
      description: d.metaDescription,
      url: "https://kidleido.com",
      siteName: "Kidleido",
      type: "website",
      locale: locale === "en" ? "en_US" : "el_GR",
    },
    twitter: {
      card: "summary_large_image",
      title: d.metaTitle,
      description: d.metaDescription,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${fredoka.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
