export function SectionHeading({
  title,
  subtitle,
  emoji: _emoji, // accepted but not rendered — no decorative iconography
}: {
  title: string;
  subtitle?: string;
  emoji?: string;
}) {
  return (
    <div className="mb-10 md:mb-16 text-center">
      <h2
        className="font-serif text-soil leading-[1.15]"
        style={{ fontSize: '2.25rem' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-soil-secondary max-w-[65ch] mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
