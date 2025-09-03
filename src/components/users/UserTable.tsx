"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  MdSearch, 
  MdPersonAdd, 
  MdEdit, 
  MdDelete,
  MdAdminPanelSettings,
  MdEditNote,
  MdVisibility,
  MdCheckCircle,
  MdPending,
  MdBlock
} from "react-icons/md";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "Active" | "Invited" | "Suspended";
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
        const data = await res.json();
        if (!cancelled) {
          setUsers(data.users as User[]);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load users");
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
  const [sortKey, setSortKey] = useState<keyof User>("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.status.toLowerCase().includes(q)
    );
    return result.sort((a, b) => {
      const aVal = String(a[sortKey]).toLowerCase();
      const bVal = String(b[sortKey]).toLowerCase();
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [users, query, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  function toggleSort(key: keyof User) {
    if (key === sortKey) setSortAsc((s) => !s);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  function removeUser(id: string) {
    setUsers((list) => list.filter((u) => u.id !== id));
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <MdAdminPanelSettings className="h-4 w-4" />;
      case "Editor":
        return <MdEditNote className="h-4 w-4" />;
      case "Viewer":
        return <MdVisibility className="h-4 w-4" />;
      default:
        return <MdVisibility className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <MdCheckCircle className="h-4 w-4 text-emerald-500" />;
      case "Invited":
        return <MdPending className="h-4 w-4 text-amber-500" />;
      case "Suspended":
        return <MdBlock className="h-4 w-4 text-rose-500" />;
      default:
        return <MdCheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-black/5">

        <div className="mb-10 flex items-center justify-between gap-2">
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => {
                setPage(1);
                setQuery(e.target.value);
              }}
              placeholder="Search users"
              className="w-96 rounded-lg border border-slate-200 bg-white pl-10 pr-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-500">
            <MdPersonAdd className="h-4 w-4" />
            Add user
          </button>
        </div>
 

      {error && (
        <div className="mb-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] table-auto border-collapse">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.12em] text-slate-500">
              <th className="cursor-pointer px-3 py-2" onClick={() => toggleSort("name")}>
                Name {sortKey === "name" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="cursor-pointer px-3 py-2" onClick={() => toggleSort("email")}>
                Email {sortKey === "email" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="cursor-pointer px-3 py-2" onClick={() => toggleSort("role")}>
                Role {sortKey === "role" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="cursor-pointer px-3 py-2" onClick={() => toggleSort("status")}>
                Status {sortKey === "status" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="px-3 py-2 text-right">Actions</th>
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
                <td className="px-3 py-3 text-slate-600">{u.email}</td>
                <td className="px-3 py-3">
                  <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-700">
                    {getRoleIcon(u.role)}
                    {u.role}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span
                    className={
                      "flex items-center gap-2 rounded-full px-3 py-1 text-[11px] " +
                      (u.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : u.status === "Invited"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-rose-100 text-rose-700")
                    }
                  >
                    {getStatusIcon(u.status)}
                    {u.status}
                  </span>
                </td>
                <td className="px-3 py-3 text-right flex justify-end" onClick={(e) => e.stopPropagation()}>
                  <button className="mr-2 flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm hover:bg-slate-100">
                    <MdEdit className="h-3 w-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => removeUser(u.id)}
                    className="flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1 text-xs text-rose-700 shadow-sm hover:bg-rose-100"
                  >
                    <MdDelete className="h-3 w-3" />
                    Delete
                  </button>
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
    </div>
  );
}


