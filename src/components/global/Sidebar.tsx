"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { 
  MdSecurity,
  MdCheckCircle
} from "react-icons/md";
import { RiSettings4Fill } from "react-icons/ri";
import { TbLayoutDashboardFilled } from "react-icons/tb";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function Sidebar() {
  const pathname = usePathname();

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard", icon: TbLayoutDashboardFilled },
      { label: "Users", href: "/users", icon: BsPeopleFill },
    ],
    []
  );

  return (
    <aside className="hidden md:flex h-full w-72 flex-col border-r border-slate-200 bg-white/70 backdrop-blur">
      <div className="px-6 py-6 flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-900">
        <MdSecurity className="h-8 w-8 text-violet-600" />
        BitSec
      </div>
      <nav className="px-4 py-2 space-y-1 font-medium">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href === "/" && pathname === "/");
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors " +
                (active
                  ? "bg-gradient-to-r from-violet-200 to-purple-200  text-violet-700 ring-1 ring-violet-100"
                  : "text-slate-600 hover:text-violet-900 hover:bg-slate-100")
              }
            >
              <IconComponent className={`h-5 w-5 ${active ? "text-violet-600" : "text-slate-500 group-hover:text-violet-700"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4">
        <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600 ring-1 ring-black/5">
          <div className="mb-1 flex items-center gap-2 font-medium text-slate-800">
            <MdCheckCircle className="h-4 w-4 text-emerald-500" />
            Status
          </div>
          Bitsec Assesment Task
        </div>
      </div>
    </aside>
  );
}



