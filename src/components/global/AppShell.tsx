"use client";

import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { MdMenu } from "react-icons/md";

type Props = {
  children: React.ReactNode;
};

export function AppShell({ children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className={`min-h-screen w-full bg-purple-400 bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(129,140,248,0.25)_0%,rgba(255,255,255,1)_60%)] overflow-x-hidden ${mobileOpen ? 'md:overflow-auto overflow-hidden' : ''}` }>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className="flex min-h-screen max-w-full overflow-x-hidden">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="flex-1 p-3 sm:p-5 max-w-full overflow-x-hidden">
          <div className="mb-3 flex items-center md:hidden">
            <button
              aria-label="Open menu"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm"
              onClick={() => setMobileOpen(true)}
            >
              <MdMenu className="h-5 w-5" />
              Menu
            </button>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}


