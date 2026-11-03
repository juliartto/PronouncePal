interface LousaProps {
  children: React.ReactNode;
  className?: string;
}

export default function Lousa({ children, className = "" }: LousaProps) {
  return (
    <div className={`rounded-lg border-[10px] border-madeira bg-lousa px-6 py-5 font-giz text-giz shadow-lg ${className}`}>
      {children}
    </div>
  );
}
