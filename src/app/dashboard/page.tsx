import { ActivityCard } from "@/components/dashboard/ActivityCard";
import { ConversionCard } from "@/components/dashboard/ConversionCard";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { PieCard } from "@/components/dashboard/PieCard";
import { TopUsersCard } from "@/components/dashboard/TopUsersCard";
import { TrendsCard } from "@/components/dashboard/TrendsCard";
import { UsersCtaCard } from "@/components/dashboard/UsersCtaCard";
import { 
  MdPersonAdd, 
  MdGroupAdd, 
  MdFileDownload, 
  MdHistory 
} from "react-icons/md";

export default function DashboardPage() {
  return (
    <div>
              <section className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <KpiCard label="Total Users" value={1248} accent="violet" />
        <KpiCard label="Active" value={1104} accent="emerald" />
        <KpiCard label="Invites" value={27} accent="amber" />
        <KpiCard label="Suspended" value={6} accent="rose" />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 ring-1 ring-black/5">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium text-slate-700">Quick Actions</div>
            <span className="text-[10px] uppercase tracking-widest text-violet-600">New</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="h-20 rounded-xl border border-slate-200 bg-white px-4 text-left text-sm font-medium text-slate-700 transition-all hover:bg-violet-50 hover:shadow-sm flex items-center gap-3">
              <MdPersonAdd className="h-5 w-5 text-violet-600" />
              Invite User
            </button>
            <button className="h-20 rounded-xl border border-slate-200 bg-white px-4 text-left text-sm font-medium text-slate-700 transition-all hover:bg-violet-50 hover:shadow-sm flex items-center gap-3">
              <MdGroupAdd className="h-5 w-5 text-violet-600" />
              Create Team
            </button>
            <button className="h-20 rounded-xl border border-slate-200 bg-white px-4 text-left text-sm font-medium text-slate-700 transition-all hover:bg-violet-50 hover:shadow-sm flex items-center gap-3">
              <MdFileDownload className="h-5 w-5 text-violet-600" />
              Export CSV
            </button>
            <button className="h-20 rounded-xl border border-slate-200 bg-white px-4 text-left text-sm font-medium text-slate-700 transition-all hover:bg-violet-50 hover:shadow-sm flex items-center gap-3">
              <MdHistory className="h-5 w-5 text-violet-600" />
              Audit Logs
            </button>

          </div>
        </div>
        <TrendsCard title="Users trend (last 12w)" />
        <PieCard />
        <ActivityCard />
        <TopUsersCard />
        <ConversionCard />
      </section>

      <div className="mt-4">
        <UsersCtaCard />
      </div>
    </div>
  );
}


