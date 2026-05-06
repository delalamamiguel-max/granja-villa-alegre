export function AnimalCard({
  name,
  type,
  description,
  emoji: _emoji, // accepted but not rendered
}: {
  name: string;
  type: string;
  description: string;
  emoji?: string;
}) {
  return (
    <div className="rounded-xl border border-oat-border bg-oat-surface shadow-soft hover:shadow-card transition-shadow duration-200 overflow-hidden text-center">
      {/* Image placeholder */}
      <div
        className="w-full flex items-center justify-center px-4 py-10"
        style={{
          background: 'linear-gradient(135deg, var(--bg-surface), var(--border-subtle))',
        }}
      >
        <span className="font-serif italic text-sm text-soil-muted">
          {name}
        </span>
      </div>

      <div className="p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-soil-muted mb-2">
          {type}
        </p>
        <h3 className="font-serif text-xl text-soil mb-3">
          {name}
        </h3>
        <p className="text-sm text-soil-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
