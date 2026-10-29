interface LogoProps {
  claro?: boolean;
}

// Livro aberto com um balão de fala
export default function Logo({ claro = false }: LogoProps) {
  return (
    <span className={`flex items-center gap-2 font-giz text-2xl ${claro ? "text-giz" : "text-lousa"}`}>
      <svg viewBox="0 0 48 40" className="h-9 w-10" aria-hidden="true">
        <path d="M4 14 L24 18 L24 38 L4 34 Z" fill="#f6c344" stroke="#6f4a29" strokeWidth="2" strokeLinejoin="round" />
        <path d="M44 14 L24 18 L24 38 L44 34 Z" fill="#fffdf6" stroke="#6f4a29" strokeWidth="2" strokeLinejoin="round" />
        <path d="M28 2 H44 A3 3 0 0 1 47 5 V11 A3 3 0 0 1 44 14 H34 L30 17 V14 H28 A3 3 0 0 1 25 11 V5 A3 3 0 0 1 28 2 Z" fill="#d94b3d" />
        <text x="36" y="11" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold">
          Hi
        </text>
      </svg>
      PronouncePal
    </span>
  );
}
