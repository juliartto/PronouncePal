type Variante = "primario" | "secundario" | "destaque" | "perigo";

const estilos: Record<Variante, string> = {
  primario: "bg-lousa text-giz hover:bg-lousa/80",
  secundario: "bg-papel text-lousa border-2 border-lousa hover:bg-giz",
  destaque: "bg-lapis text-tinta hover:brightness-105",
  perigo: "bg-maca text-white hover:brightness-110",
};

// Também usado em <Link>
export function classesBotao(variante: Variante = "primario") {
  return `inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-bold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${estilos[variante]}`;
}

interface BotaoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  carregando?: boolean;
}

export default function Botao({ variante = "primario", carregando = false, className = "", children, disabled, ...props }: BotaoProps) {
  return (
    <button className={`${classesBotao(variante)} ${className}`} disabled={disabled || carregando} {...props}>
      {carregando && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  );
}
