"use client";

type Row = { label: string; value: string };

const DEFAULT: Row[] = [
  { label: "Conversion", value: "64%" },
  { label: "Avg. Session", value: "7m 12s" },
  { label: "Churn", value: "3.1%" },
];

export function ConversionCard({ rows = DEFAULT }: { rows?: Row[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 ring-1 ring-black/5">
      <div className="mb-6 text-sm font-medium text-slate-700">Key Metrics</div>
      <div className="grid grid-cols-3 gap-3 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="rounded-xl bg-slate-50 p-3 text-center">
            <div className="text-xs uppercase tracking-wide text-slate-500">{r.label}</div>
            <div className="mt-4 text-3xl font-semibold text-slate-900">{r.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


