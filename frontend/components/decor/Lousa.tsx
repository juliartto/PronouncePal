interface LousaProps {
  children: React.ReactNode;
  className?: string;
}

export default function Lousa({ children, className = "" }: LousaProps) {
  return (
    <div className={`relative rounded-lg border-[10px] border-madeira bg-lousa textura-lousa shadow-lg ${className}`}>
      <div className="px-6 py-5 font-giz text-giz">{children}</div>
      <div className="absolute -bottom-[14px] right-10 flex items-end gap-2" aria-hidden="true">
        <span className="h-2 w-8 rounded-sm bg-giz" />
        <span className="h-2 w-5 rounded-sm bg-lapis" />
        <span className="h-3 w-12 rounded-sm bg-madeira-escura" />
      </div>
    </div>
  );
}
