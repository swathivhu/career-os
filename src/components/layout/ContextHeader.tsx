interface ContextHeaderProps {
  title: string;
  subtitle: string;
}

export function ContextHeader({ title, subtitle }: ContextHeaderProps) {
  return (
    <div className="w-full bg-background pt-xl pb-lg px-xl border-b border-border/50">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-xl md:text-5xl font-headline mb-xs leading-tight">
          {title}
        </h1>
        <p className="text-muted-foreground text-lg max-w-[720px] font-medium opacity-80">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
