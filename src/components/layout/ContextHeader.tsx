interface ContextHeaderProps {
  title: string;
  subtitle: string;
}

export function ContextHeader({ title, subtitle }: ContextHeaderProps) {
  return (
    <header className="w-full bg-background pt-xl pb-lg px-xl border-b border-border/10">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-5xl font-headline text-foreground leading-tight mb-xs">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-[720px] font-medium opacity-80">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
