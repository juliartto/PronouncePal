import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prática de Oralidade em Inglês",
  description: "Leitura de histórias em inglês com feedback de pronúncia",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
