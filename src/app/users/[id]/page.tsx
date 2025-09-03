import Link from "next/link";
import users from "@/data/users.json";
import { notFound } from "next/navigation";

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const user = (users as any[]).find((u) => String(u.id) === String(params.id));
  if (!user) {
    notFound();
  }
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{user.name}</h1>
          <p className="text-sm text-slate-600">User ID: {user.id}</p>
        </div>
        <Link href="/users" className="text-sm text-violet-700 hover:underline">Back to Users</Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 ring-1 ring-black/5">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Email</dt>
            <dd className="mt-1 text-slate-800">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Role</dt>
            <dd className="mt-1 text-slate-800">{user.role}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Status</dt>
            <dd className="mt-1 text-slate-800">{user.status}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}


