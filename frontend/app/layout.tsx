import type { Metadata } from "next";
import { Nunito, Patrick_Hand } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const patrick = Patrick_Hand({ subsets: ["latin"], weight: "400", variable: "--font-patrick" });

export const metadata: Metadata = {
  title: "PronouncePal",
  description: "Leitura de histórias em inglês com feedback de pronúncia",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${nunito.variable} ${patrick.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
