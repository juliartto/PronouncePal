// Pilha de livros com uma maçã em cima
export default function Livros({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 110" className={className} aria-hidden="true">
      <rect x="6" y="84" width="108" height="20" rx="3" fill="#d94b3d" />
      <rect x="10" y="88" width="100" height="4" fill="#fff4e0" />
      <rect x="20" y="84" width="6" height="20" fill="#b23a2e" />

      <rect x="16" y="64" width="92" height="20" rx="3" fill="#2563b8" />
      <rect x="20" y="68" width="84" height="4" fill="#fff4e0" />
      <rect x="92" y="64" width="6" height="20" fill="#1d4f94" />

      <rect x="10" y="44" width="96" height="20" rx="3" fill="#f6c344" />
      <rect x="14" y="48" width="88" height="4" fill="#fff4e0" />
      <rect x="30" y="44" width="6" height="20" fill="#d9a42a" />

      <path
        d="M60 22 C52 16 40 19 40 32 C40 41 47 44 52 44 C55 44 57 43 60 43 C63 43 65 44 68 44 C73 44 80 41 80 32 C80 19 68 16 60 22 Z"
        fill="#d94b3d"
      />
      <path d="M60 22 C60 16 62 12 64 9" stroke="#6f4a29" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M63 14 C67 7 75 8 77 10 C74 15 67 17 63 14 Z" fill="#5aa04a" />
      <ellipse cx="50" cy="29" rx="3" ry="5" fill="#fff" opacity="0.35" />
    </svg>
  );
}
