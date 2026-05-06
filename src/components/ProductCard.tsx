export function ProductCard({
  name,
  description,
  usage,
  icon
}: {
  name: string;
  description: string;
  usage?: string;
  icon?: string;
}) {
  return (
    <div className="rounded-2xl border border-app-border bg-white p-6 shadow-soft hover:shadow-md transition">
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <h3 className="font-title text-lg font-bold text-app-text mb-2">
        {name}
      </h3>
      <p className="text-sm text-slate-700 mb-3">
        {description}
      </p>
      {usage && (
        <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 italic border border-slate-200">
          <span className="font-semibold text-slate-700">Modo de uso:</span> {usage}
        </div>
      )}
    </div>
  );
}
