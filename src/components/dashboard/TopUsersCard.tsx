"use client";

import { MdStar, MdPerson } from "react-icons/md";

type TopUser = { id: string; name: string; score: number };

const DEFAULT: TopUser[] = [
  { id: "1", name: "Ava Fisher", score: 98 },
  { id: "2", name: "Liam Carter", score: 92 },
  { id: "3", name: "Emma Chen", score: 88 },
];

export function TopUsersCard({ users = DEFAULT }: { users?: TopUser[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 ring-1 ring-black/5">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
        <MdStar className="h-4 w-4 text-amber-500" />
        Top Users
      </div>
      <ul className="space-y-2 text-sm">
        {users.map((u, index) => (
          <li key={u.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <div className="flex items-center gap-2">
              <MdPerson className="h-4 w-4 text-slate-500" />
              <span className="text-slate-700">{u.name}</span>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700">
              <MdStar className="h-3 w-3" />
              {u.score}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}


