import React from 'react';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
}

function GalleryPhoto({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = React.useState<boolean | null>(null);

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-oat-border shadow-soft hover:shadow-card transition-shadow duration-200"
    >
      <img
        src={src}
        alt={alt}
        className="block w-full h-auto"
        style={{ display: loaded === true ? 'block' : 'none' }}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
      {loaded !== true && (
        <div
          className="w-full flex items-center justify-center px-6 py-16"
          style={{
            background: 'linear-gradient(135deg, var(--bg-surface), var(--border-subtle))',
          }}
        >
          <span className="font-serif italic text-sm text-soil-muted text-center leading-snug">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    /* CSS columns masonry — items flow naturally into 3 columns,
       heights vary per photo so the grid feels editorial rather than rigid */
    <div
      className="columns-1 md:columns-2 lg:columns-3 gap-4"
      style={{ columnGap: '1rem' }}
    >
      {items.map((item) => (
        <div key={item.id} className="mb-4 break-inside-avoid">
          <GalleryPhoto src={item.src} alt={item.alt} />
        </div>
      ))}
    </div>
  );
}
