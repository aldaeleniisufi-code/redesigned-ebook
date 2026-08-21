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
  return {
    title: d.metaTitle,
    description: d.metaDescription,
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
