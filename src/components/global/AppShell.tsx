"use client";

import { Sidebar } from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(129,140,248,0.25)_0%,rgba(255,255,255,1)_60%)]">
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 p-5">{children}</main>
      </div>
    </div>
  );
}


