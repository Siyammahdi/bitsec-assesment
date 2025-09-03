"use client";

import { 
  MdUpgrade, 
  MdPersonAdd, 
  MdLock, 
  MdPersonRemove 
} from "react-icons/md";

type Activity = { id: string; text: string; when: string };

const DEFAULT: Activity[] = [
  { id: "1", text: "Emma upgraded to Editor", when: "2h" },
  { id: "2", text: "Ava invited a new member", when: "5h" },
  { id: "3", text: "Noah changed password", when: "1d" },
  { id: "4", text: "Liam removed inactive user", when: "2d" },
];

export function ActivityCard({ items = DEFAULT }: { items?: Activity[] }) {
  const getActivityIcon = (text: string) => {
    if (text.toLowerCase().includes("upgraded")) {
      return <MdUpgrade className="h-4 w-4 text-emerald-500" />;
    } else if (text.toLowerCase().includes("invited")) {
      return <MdPersonAdd className="h-4 w-4 text-blue-500" />;
    } else if (text.toLowerCase().includes("password")) {
      return <MdLock className="h-4 w-4 text-amber-500" />;
    } else if (text.toLowerCase().includes("removed")) {
      return <MdPersonRemove className="h-4 w-4 text-rose-500" />;
    }
    return <MdUpgrade className="h-4 w-4 text-slate-500" />;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 ring-1 ring-black/5">
      <div className="mb-3 text-sm font-medium text-slate-700">Recent Activity</div>
      <ul className="space-y-2 text-sm text-slate-600">
        {items.map((a) => (
          <li key={a.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getActivityIcon(a.text)}
              <span>{a.text}</span>
            </div>
            <span className="text-xs text-slate-400">{a.when}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


