interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-muted text-lg">{description}</p>
      )}
    </div>
  );
}
