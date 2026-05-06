export function GalleryGrid({
  items,
}: {
  items: Array<{
    id: string;
    src: string;
    alt: string;
  }>;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl overflow-hidden border border-oat-border shadow-soft hover:shadow-card transition-shadow duration-200"
        >
          {/* Placeholder — swap <img src={item.src} …> here when photos are ready */}
          <div
            className="w-full h-64 flex items-center justify-center px-6"
            style={{
              background: 'linear-gradient(135deg, var(--bg-surface), var(--border-subtle))',
            }}
          >
            <span className="font-serif italic text-sm text-soil-muted text-center leading-snug">
              {item.alt}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
