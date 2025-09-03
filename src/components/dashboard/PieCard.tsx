"use client";

import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

type Slice = { name: string; value: number; color: string };

const DEFAULT: Slice[] = [
  { name: "Admin", value: 12, color: "#7c3aed" },
  { name: "Editor", value: 46, color: "#6366f1" },
  { name: "Viewer", value: 42, color: "#a78bfa" },
];

export function PieCard({ title = "Roles Breakdown", data = DEFAULT }: { title?: string; data?: Slice[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 ring-1 ring-black/5">
      <div className="mb-3 text-sm font-medium text-slate-700">{title}</div>
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }} />
            <Legend verticalAlign="bottom" height={24} iconType="circle" wrapperStyle={{ color: "#475569" }} />
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="45%" innerRadius={35} outerRadius={60} paddingAngle={4}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


