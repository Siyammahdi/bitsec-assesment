import Link from "next/link";
import users from "@/data/users.json";
import { notFound } from "next/navigation";
import { MotionFade } from "@/components/global/Motion";
import { MdPhone, MdBusiness, MdLocationOn, MdTag } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import { PiMonitorFill } from "react-icons/pi";

type UserRecord = {
  id: number | string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company?: { name?: string; catchPhrase?: string; bs?: string };
  address?: { street?: string; suite?: string; city?: string; zipcode?: string; geo?: { lat?: string; lng?: string } };
};

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const user = (users as UserRecord[]).find((u) => String(u.id) === String(params.id));
  if (!user) {
    notFound();
  }
  const initials = String(user.name || "?")
    .split(" ")
    .map((p: string) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <MotionFade>
    <div className="mx-auto w-full max-w-5xl px-2 sm:px-0">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">User Profile</h1>
          <p className="text-sm text-slate-600 break-words">Detailed information for <span className="text-purple-600">{user.name}</span></p>
        </div>
        <Link href="/users" className="text-sm text-white hover:text-violet-700 bg-violet-500 hover:bg-white hover:border-2 rounded-xl px-4 sm:px-6 py-2 duration-75 w-full sm:w-auto text-center">Back to Users</Link>
      </div>

      {/* Profile header */}
      <MotionFade delay={0.05}>
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white ring-1 ring-black/5">
        <div className="h-28 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />
        <div className="p-5 pt-0">
          <div className="-mt-14 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border-4 border-white bg-gray-500 text-xl font-bold text-white shadow-md">
                {initials}
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-3xl sm:text-5xl font-semibold text-black md:text-white break-words">{user.name}</h2>
                  <span className="rounded-full bg-violet-50 px-2 py-1 text-[11px] font-medium text-violet-700">@{user.username}</span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-700">
                  <span className="inline-flex items-center gap-1"><MdTag className="h-4 w-4 text-slate-400" />ID {user.id}</span>
                  <span className="inline-flex items-center gap-1"><MdBusiness className="h-4 w-4 text-slate-400" />{user.company?.name}</span>
                  <span className="inline-flex items-center gap-1"><MdLocationOn className="h-4 w-4 text-slate-400" />{user.address?.city}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mb-3 flex-wrap w-full sm:w-auto">
              <a href={`mailto:${user.email}`} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50 flex-1 sm:flex-none justify-center">
                <HiMail className="h-4 w-4" /> Email
              </a>
              <a href={`tel:${user.phone}`} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50 flex-1 sm:flex-none justify-center">
                <MdPhone className="h-4 w-4" /> Call
              </a>
              <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-500 flex-1 sm:flex-none justify-center">
                <PiMonitorFill className="h-4 w-4" /> Website
              </a>
            </div>
          </div>
        </div>
      </div>
      </MotionFade>

      {/* Info grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Contact */}
        <MotionFade delay={0.05}>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 ring-1 ring-black/5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Contact</h3>
          <div className="space-y-3 text-slate-800">
            <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 gap-3 flex-wrap break-words">
              <div className="flex items-center gap-2 text-slate-700 break-all"><HiMail className="h-4 w-4 text-slate-400" /> {user.email}</div>
              <a href={`mailto:${user.email}`} className="text-sm text-violet-700 hover:underline whitespace-nowrap">Send</a>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-slate-700 break-all"><MdPhone className="h-4 w-4 text-slate-400" /> {user.phone}</div>
              <a href={`tel:${user.phone}`} className="text-sm text-violet-700 hover:underline whitespace-nowrap">Call</a>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-slate-700 break-all"><PiMonitorFill className="h-4 w-4 text-slate-400" /> {user.website}</div>
              <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="text-sm text-violet-700 hover:underline whitespace-nowrap">Open</a>
            </div>
          </div>
        </div>
        </MotionFade>

        {/* Company */}
        <MotionFade delay={0.1}>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 ring-1 ring-black/5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Company</h3>
          <div className="space-y-2">
            <div className="text-slate-900 font-medium">{user.company?.name}</div>
            <div className="text-slate-600 text-sm">{user.company?.catchPhrase}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {String(user.company?.bs || "")
                .split(" ")
                .filter(Boolean)
                .slice(0, 6)
                .map((tag: string, i: number) => (
                  <span key={i} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-700">{tag}</span>
                ))}
            </div>
          </div>
        </div>
        </MotionFade>

        {/* Address */}
        <MotionFade delay={0.15}>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 ring-1 ring-black/5 md:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Address</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">Street</div>
              <div className="mt-1 text-slate-800">{user.address?.street}</div>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">Suite</div>
              <div className="mt-1 text-slate-800">{user.address?.suite}</div>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">City</div>
              <div className="mt-1 text-slate-800">{user.address?.city}</div>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">Zip</div>
              <div className="mt-1 text-slate-800">{user.address?.zipcode}</div>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">Latitude</div>
              <div className="mt-1 text-slate-800">{user.address?.geo?.lat}</div>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">Longitude</div>
              <div className="mt-1 text-slate-800">{user.address?.geo?.lng}</div>
            </div>
          </div>
        </div>
        </MotionFade>
      </div>
    </div>
    </MotionFade>
  );
}


