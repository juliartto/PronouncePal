interface LogoProps {
  claro?: boolean;
}

export default function Logo({ claro = false }: LogoProps) {
  return (
    <span className={`flex items-center gap-2 font-giz text-2xl ${claro ? "text-giz" : "text-lousa"}`}>
      <svg viewBox="0 0 48 32" className="h-8 w-10" aria-hidden="true">
        <path d="M4 6 L24 10 L24 30 L4 26 Z" className="fill-lapis stroke-madeira" strokeWidth="2" strokeLinejoin="round" />
        <path d="M44 6 L24 10 L24 30 L44 26 Z" className="fill-papel stroke-madeira" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      PronouncePal
    </span>
  );
}
