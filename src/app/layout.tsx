import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Παιδικά Βιβλία",
  description: "Ψηφιακά παραμύθια και ιστορίες για παιδιά",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className={`${fredoka.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
