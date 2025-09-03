"use client";

import { useMemo, useState } from "react";

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

const DEFAULT_USERS: User[] = [
  { id: "1", name: "Ava Fisher", email: "ava@bitsec.io", role: "Admin", status: "Active" },
  { id: "2", name: "Liam Carter", email: "liam@bitsec.io", role: "Editor", status: "Active" },
  { id: "3", name: "Noah Singh", email: "noah@bitsec.io", role: "Viewer", status: "Invited" },
  { id: "4", name: "Emma Chen", email: "emma@bitsec.io", role: "Editor", status: "Active" },
  { id: "5", name: "Mia Rossi", email: "mia@bitsec.io", role: "Viewer", status: "Suspended" },
];

export function UserTable({ initialUsers = DEFAULT_USERS }: Props) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof User>("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

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

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-lg font-semibold text-slate-900">Users</div>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => {
              setPage(1);
              setQuery(e.target.value);
            }}
            placeholder="Search users"
            className="w-56 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-violet-400"
          />
          <button className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-500">Add user</button>
        </div>
      </div>

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
            {current.map((u) => (
              <tr key={u.id} className="hover:bg-gradient-to-r hover:from-violet-50">
                <td className="px-3 py-3 font-medium text-slate-800">{u.name}</td>
                <td className="px-3 py-3 text-slate-600">{u.email}</td>
                <td className="px-3 py-3">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-700">
                    {u.role}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span
                    className={
                      "rounded-full px-3 py-1 text-[11px] " +
                      (u.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : u.status === "Invited"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-rose-100 text-rose-700")
                    }
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-3 py-3 text-right">
                  <button className="mr-2 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm hover:bg-slate-100">
                    Edit
                  </button>
                  <button
                    onClick={() => removeUser(u.id)}
                    className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1 text-xs text-rose-700 shadow-sm hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {current.length === 0 && (
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


