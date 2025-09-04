"use client";

import { useEffect, useState } from "react";
import { MdFileDownload, MdGroupAdd, MdHistory, MdPersonAdd } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

export function QuickActionsCard() {
  const [toast, setToast] = useState<string | null>(null);
  const handleClick = (label?: string) => {
    setToast(label ? `${label} — coming soon` : "Feature coming soon");
  };
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-5 ring-1 ring-black/5">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-medium text-slate-700">Quick Actions</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => handleClick("Invite User")} className="h-20 rounded-xl border border-slate-200 bg-white px-4 text-left text-sm font-medium text-slate-700 transition-all hover:bg-violet-50 hover:shadow-sm flex items-center gap-3">
          <MdPersonAdd className="h-5 w-5 text-violet-600" />
          Invite User
        </button>
        <button onClick={() => handleClick("Create Team")} className="h-20 rounded-xl border border-slate-200 bg-white px-4 text-left text-sm font-medium text-slate-700 transition-all hover:bg-violet-50 hover:shadow-sm flex items-center gap-3">
          <MdGroupAdd className="h-5 w-5 text-violet-600" />
          Create Team
        </button>
        <button onClick={() => handleClick("Export CSV")} className="h-20 rounded-xl border border-slate-200 bg-white px-4 text-left text-sm font-medium text-slate-700 transition-all hover:bg-violet-50 hover:shadow-sm flex items-center gap-3">
          <MdFileDownload className="h-5 w-5 text-violet-600" />
          Export CSV
        </button>
        <button onClick={() => handleClick("Audit Logs")} className="h-20 rounded-xl border border-slate-200 bg-white px-4 text-left text-sm font-medium text-slate-700 transition-all hover:bg-violet-50 hover:shadow-sm flex items-center gap-3">
          <MdHistory className="h-5 w-5 text-violet-600" />
          Audit Logs
        </button>

      </div>
      {/* Corner badge at bottom of card */}
      <div className="pointer-events-none absolute bottom-4 right-4">
        <span className="rounded-full bg-violet-100 px-2 py-1 text-[10px] font-semibold tracking-widest text-violet-700">NEW</span>
      </div>
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-4 right-4 z-50 max-w-xs rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-800 shadow-xl backdrop-blur ring-1 ring-black/5"
          >
            <div className="text-slate-900 font-medium">Action queued</div>
            <div className="text-slate-600 mt-0.5">{toast}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


