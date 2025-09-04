"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MdSearch,
  MdPersonAdd,
} from "react-icons/md";
import { MotionFade } from "@/components/global/Motion";
import { CgDetailsMore } from "react-icons/cg";
import { AnimatePresence, motion } from "framer-motion";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type Props = {
  initialUsers?: User[];
};

const DEFAULT_USERS: User[] = [];

export function UserTable({ initialUsers = DEFAULT_USERS }: Props) {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/api/users", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load users: ${res.status}`);
        const data: { users: User[] } = await res.json();
        if (!cancelled) {
          setUsers(data.users);
        }
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to load users";
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"name" | "username" | "email" | "phone" | "company">("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = users.filter((u) => {
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    });
    return result.sort((a, b) => {
      const aVal =
        sortKey === "company" ? a.company?.name?.toLowerCase() ?? "" : String(a[sortKey]).toLowerCase();
      const bVal =
        sortKey === "company" ? b.company?.name?.toLowerCase() ?? "" : String(b[sortKey]).toLowerCase();
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [users, query, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  function toggleSort(key: "name" | "username" | "email" | "phone" | "company") {
    if (key === sortKey) setSortAsc((s) => !s);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  // removed delete/edit; details button provided per row

  // role/status removed in new data model

  return (
    <MotionFade>
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-black/5">

        <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative w-full sm:max-w-md">
            <MdSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => {
                setPage(1);
                setQuery(e.target.value);
              }}
              placeholder="Search by name or email"
              className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>
          <button onClick={() => setToast("Add user — coming soon") } className="flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-500 w-full sm:w-auto">
            <MdPersonAdd className="h-4 w-4" />
            Add user
          </button>
        </div>
 

      {error && (
        <div className="mb-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}

      <MotionFade delay={0.05}>
      {/* Mobile card list */}
      <div className="md:hidden space-y-3">
        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center text-slate-500">Loading users…</div>
        )}
        {!loading && current.map((u) => (
          <div
            key={u.id}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
            onClick={() => router.push(`/users/${u.id}`)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-base font-semibold text-slate-900 truncate">{u.name}</div>
                <div className="text-sm text-slate-600 break-all">{u.email}</div>
                {u.company?.name && (
                  <div className="mt-1 text-xs text-slate-500">{u.company.name}</div>
                )}
              </div>
              <Link
                href={`/users/${u.id}`}
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm hover:bg-slate-100"
              >
                <CgDetailsMore className="h-3 w-3" />
                View
              </Link>
            </div>
          </div>
        ))}
        {!loading && current.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center text-slate-500">No users found.</div>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto -mx-5 md:mx-0">
        <table className="w-full min-w-[640px] table-auto border-collapse">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.12em] text-slate-500">
              <th className="cursor-pointer px-3 py-2" onClick={() => toggleSort("name")}>
                Name {sortKey === "name" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="cursor-pointer px-3 py-2 hidden sm:table-cell" onClick={() => toggleSort("username")}>
                Username {sortKey === "username" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="cursor-pointer px-3 py-2" onClick={() => toggleSort("email")}>
                Email {sortKey === "email" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="cursor-pointer px-3 py-2 hidden sm:table-cell" onClick={() => toggleSort("phone")}>
                Phone {sortKey === "phone" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="cursor-pointer px-3 py-2 hidden md:table-cell" onClick={() => toggleSort("company")}>
                Company {sortKey === "company" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="px-3 py-2 text-right w-0">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {loading && (
              <tr>
                <td colSpan={5} className="px-3 py-12 text-center text-slate-500">Loading users…</td>
              </tr>
            )}
            {!loading && current.map((u) => (
              <tr
                key={u.id}
                className="cursor-pointer hover:bg-gradient-to-r hover:from-violet-50"
                onClick={() => router.push(`/users/${u.id}`)}
              >
                <td className="px-3 py-3 font-medium text-slate-800">
                  <Link href={`/users/${u.id}`} className="text-violet-700 hover:underline" onClick={(e) => e.stopPropagation()}>
                    {u.name}
                  </Link>
                </td>
                <td className="px-3 py-3 text-slate-600 hidden sm:table-cell">{u.username}</td>
                <td className="px-3 py-3 text-slate-600 break-words">{u.email}</td>
                <td className="px-3 py-3 text-slate-600 hidden sm:table-cell">{u.phone}</td>
                <td className="px-3 py-3 text-slate-700 hidden md:table-cell">{u.company?.name}</td>
                <td className="px-3 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <Link
                    href={`/users/${u.id}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm hover:bg-slate-100"
                  >
                    <CgDetailsMore className="h-3 w-3" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {!loading && current.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-12 text-center text-slate-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </MotionFade>

      <MotionFade delay={0.1}>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <div>
          Page {page} of {totalPages}
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-md border border-slate-200 bg-white px-3 py-1 hover:bg-slate-100 disabled:opacity-40"
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-md border border-slate-200 bg-white px-3 py-1 hover:bg-slate-100 disabled:opacity-40"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      </MotionFade>
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
    </MotionFade>
  );
}


