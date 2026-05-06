export function GalleryGrid({
  items
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
          className="rounded-xl overflow-hidden shadow-soft hover:shadow-md transition group"
        >
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
      ))}
    </div>
  );
}
