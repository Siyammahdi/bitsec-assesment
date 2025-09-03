"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type NavItem = {
  label: string;
  href: string;
};

export function Sidebar() {
  const pathname = usePathname();

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Users", href: "/users" },
      { label: "Settings", href: "/#settings" },
    ],
    []
  );

  return (
    <aside className="hidden md:flex h-full w-72 flex-col border-r border-slate-200 bg-white/70 backdrop-blur">
      <div className="px-6 py-6 text-2xl font-semibold tracking-tight text-slate-900">BitSec</div>
      <nav className="px-4 py-2 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href === "/" && pathname === "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors " +
                (active
                  ? "bg-gradient-to-r from-violet-50 to-white text-violet-700 ring-1 ring-violet-100"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100")
              }
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-violet-500" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4">
        <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600 ring-1 ring-black/5">
          <div className="mb-1 font-medium text-slate-800">Status</div>
          Bitsec Assesment Task
        </div>
      </div>
    </aside>
  );
}



