export function AnimalCard({
  name,
  type,
  description,
  emoji
}: {
  name: string;
  type: string;
  description: string;
  emoji: string;
}) {
  return (
    <div className="rounded-2xl border border-app-border bg-white p-6 shadow-soft hover:shadow-md transition text-center">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="font-title text-xl font-bold text-app-text mb-1">
        {name}
      </h3>
      <p className="text-sm font-medium text-slate-600 mb-3">
        {type}
      </p>
      <p className="text-sm text-slate-700 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
