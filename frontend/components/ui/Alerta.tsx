interface AlertaProps {
  tipo: "sucesso" | "erro";
  children: React.ReactNode;
}

export default function Alerta({ tipo, children }: AlertaProps) {
  const estilo = tipo === "sucesso" ? "border-green-600 bg-green-50 text-green-800" : "border-maca bg-red-50 text-red-800";

  return (
    <div role={tipo === "erro" ? "alert" : "status"} className={`rounded-lg border-l-4 px-4 py-3 font-semibold ${estilo}`}>
      {children}
    </div>
  );
}
