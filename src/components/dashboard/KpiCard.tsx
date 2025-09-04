"use client";

import { useEffect, useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaCity } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";
import {
  MdPeople,
  MdCheckCircle,
  MdPersonAdd,
  MdBlock,
  MdTrendingUp,
} from "react-icons/md";

type Props = {
  label: string;
  value: number;
  accent?: "violet" | "emerald" | "amber" | "rose";
};

export function KpiCard({ label, value, accent = "violet" }: Props) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const durationMs = 900;
    const stepMs = 16;
    const steps = Math.ceil(durationMs / stepMs);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      const t = Math.min(1, i / steps);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t >= 1) clearInterval(id);
    }, stepMs);
    return () => clearInterval(id);
  }, [value]);

  const barClass =
    accent === "violet"
      ? "from-violet-200 to-indigo-200"
      : accent === "emerald"
      ? "from-emerald-200 to-teal-200"
      : accent === "amber"
      ? "from-amber-200 to-yellow-200"
      : "from-rose-200 to-pink-200";

  const getIcon = () => {
    switch (label.toLowerCase()) {
      case "total users":
        return <MdPeople className="h-6 w-6" />;
      case "companies":
        return <HiOfficeBuilding className="h-6 w-6" />;
      case "cities":
        return <FaCity className="h-6 w-6" />;
      case "gmail users":
        return <BiLogoGmail className="h-6 w-6" />;
      case "active":
        return <MdCheckCircle className="h-6 w-6" />;
      case "invites":
        return <MdPersonAdd className="h-6 w-6" />;
      case "suspended":
        return <MdBlock className="h-6 w-6" />;
      default:
        return <MdTrendingUp className="h-6 w-6" />;
    }
  };

  const iconColorClass = 
    accent === "violet"
      ? "text-violet-600"
      : accent === "emerald"
      ? "text-emerald-600"
      : accent === "amber"
      ? "text-amber-600"
      : "text-rose-600";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</div>
        <div className={iconColorClass}>
          {getIcon()}
        </div>
      </div>
      <div className="mt-2 text-3xl font-semibold text-slate-900">{display.toLocaleString()}</div>
      <div className={`mt-2 h-8 w-full rounded bg-gradient-to-r ${barClass}`} />
    </div>
  );
}


