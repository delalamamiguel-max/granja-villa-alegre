export function ProductCard({
  name,
  description,
  usage,
  icon: _icon, // accepted but not rendered — placeholder slot used instead
}: {
  name: string;
  description: string;
  usage?: string;
  icon?: string;
}) {
  return (
    <div className="rounded-xl border border-oat-border bg-oat-surface shadow-soft hover:shadow-card transition-shadow duration-200 overflow-hidden">
      {/* Image placeholder — swaps cleanly for a real <img> later */}
      <div
        className="w-full flex items-center justify-center px-6 py-8"
        style={{
          background: 'linear-gradient(135deg, var(--bg-surface), var(--border-subtle))',
        }}
      >
        <span className="font-serif italic text-sm text-soil-muted text-center leading-snug">
          {name}
        </span>
      </div>

      <div className="p-6">
        <p className="text-sm text-soil-secondary leading-relaxed mb-3">
          {description}
        </p>
        {usage && (
          <div className="bg-oat-elevated rounded-lg p-3 border border-oat-border text-xs text-soil-muted">
            <span className="font-medium text-soil-secondary">Modo de uso:</span>{' '}
            {usage}
          </div>
        )}
      </div>
    </div>
  );
}
