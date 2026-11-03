function Icone({ children, className = "h-5 w-5" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

type IconeProps = { className?: string };

export const IconeAltoFalante = (p: IconeProps) => (
  <Icone {...p}>
    <path d="M11 5 6 9H2v6h4l5 4V5z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
  </Icone>
);

export const IconeMicrofone = (p: IconeProps) => (
  <Icone {...p}>
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8" />
  </Icone>
);

export const IconeVoltar = (p: IconeProps) => (
  <Icone {...p}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </Icone>
);
