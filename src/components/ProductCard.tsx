import React from 'react';

export function ProductCard({
  name,
  description,
  usage: _usage,  // kept in props; not shown on site
  icon: _icon,    // kept in props; not shown on site
  photo,
}: {
  name: string;
  description: string;
  usage?: string;
  icon?: string;
  photo?: string;
}) {
  const [imgLoaded, setImgLoaded] = React.useState<boolean | null>(null);

  return (
    <div className="rounded-xl border border-oat-border bg-oat-surface shadow-soft hover:shadow-card transition-shadow duration-200 overflow-hidden">
      {/* Image slot — shows real photo if available, placeholder otherwise */}
      <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
        {photo && (
          <img
            src={photo}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ display: imgLoaded === true ? 'block' : 'none' }}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(false)}
          />
        )}
        {(!photo || imgLoaded !== true) && (
          <div
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{
              background: 'linear-gradient(135deg, var(--bg-surface), var(--border-subtle))',
            }}
          >
            <span className="font-serif italic text-sm text-soil-muted text-center leading-snug">
              {name}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-serif text-base text-soil mb-1">{name}</h3>
        <p className="text-sm text-soil-secondary leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
