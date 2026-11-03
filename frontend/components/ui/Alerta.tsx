interface AlertaProps {
  tipo: "sucesso" | "erro";
  children: React.ReactNode;
}

export default function Alerta({ tipo, children }: AlertaProps) {
  const estilo = tipo === "sucesso" ? "border-sucesso bg-sucesso/10 text-sucesso" : "border-maca bg-maca/10 text-maca";

  return (
    <div role={tipo === "erro" ? "alert" : "status"} className={`rounded-lg border-l-4 px-4 py-3 font-semibold ${estilo}`}>
      {children}
    </div>
  );
}
