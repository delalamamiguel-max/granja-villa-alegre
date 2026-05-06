export function SectionHeading({
  title,
  subtitle,
  emoji
}: {
  title: string;
  subtitle?: string;
  emoji?: string;
}) {
  return (
    <div className="mb-8 text-center md:mb-12">
      {emoji && <span className="text-3xl md:text-4xl block mb-2">{emoji}</span>}
      <h2 className="font-title text-3xl md:text-4xl font-bold text-app-text mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
