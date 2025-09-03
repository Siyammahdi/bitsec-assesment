import Link from "next/link";
import { MdPeople, MdArrowForward } from "react-icons/md";

export function UsersCtaCard() {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 ring-1 ring-black/5">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
        <MdPeople className="h-4 w-4 text-violet-600" />
        Users
      </div>
      <p className="mb-6 text-sm text-slate-600">Manage members, roles, invitations.</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link
          href="/users"
          className="flex h-14 items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-medium text-white shadow-sm transition-colors hover:bg-violet-500"
        >
          <MdPeople className="h-4 w-4" />
          View Users
          <MdArrowForward className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}


