"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  title: string;
  data?: { name: string; users: number }[];
};

const DEFAULT = Array.from({ length: 12 }).map((_, i) => ({
  name: `W${i + 1}`,
  users: Math.round(800 + Math.sin(i / 2) * 150 + Math.random() * 60),
}));

export function TrendsCard({ title, data = DEFAULT }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 ring-1 ring-black/5">
      <div className="mb-3 text-sm font-medium text-slate-700">{title}</div>
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="violetFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} width={28} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ stroke: "#c4b5fd" }} contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }} />
            <Area type="monotone" dataKey="users" stroke="#7c3aed" fill="url(#violetFill)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


