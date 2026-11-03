"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { HistoriasProvider } from "@/contexts/HistoriasContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <HistoriasProvider>{children}</HistoriasProvider>
    </AuthProvider>
  );
}
