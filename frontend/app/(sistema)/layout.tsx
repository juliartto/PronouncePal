import Cabecalho from "@/components/layout/Cabecalho";
import ProtegerRota from "@/components/layout/ProtegerRota";

export default function LayoutSistema({ children }: { children: React.ReactNode }) {
  return (
    <ProtegerRota>
      <Cabecalho />
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </ProtegerRota>
  );
}
