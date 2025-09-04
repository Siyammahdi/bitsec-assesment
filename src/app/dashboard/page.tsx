import { ActivityCard } from "@/components/dashboard/ActivityCard";
import { ConversionCard } from "@/components/dashboard/ConversionCard";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { PieCard } from "@/components/dashboard/PieCard";
import { TopUsersCard } from "@/components/dashboard/TopUsersCard";
import { TrendsCard } from "@/components/dashboard/TrendsCard";
import { UsersCtaCard } from "@/components/dashboard/UsersCtaCard";
import { QuickActionsCard } from "@/components/dashboard/QuickActionsCard";
import { MotionFade } from "@/components/global/Motion";
import users from "@/data/users.json";
//

type UserRecord = {
  id: number | string;
  name: string;
  email: string;
  company?: { name?: string; catchPhrase?: string };
  address?: { city?: string };
};

export default function DashboardPage() {
  const list = users as UserRecord[];
  const totalUsers = list.length;
  const uniqueCompanies = new Set(list.map((u) => u.company?.name).filter(Boolean)).size;
  const uniqueCities = new Set(list.map((u) => u.address?.city).filter(Boolean)).size;
  const gmailUsers = list.filter((u) => String(u.email).toLowerCase().includes("@gmail.")).length;

  // Trend: deterministic distribution of users across 12 weeks
  const trendBuckets = Array.from({ length: 12 }, () => 0);
  for (const u of list) {
    const idx = Number(u.id) % 12;
    trendBuckets[idx] += 1;
  }
  const trendData = trendBuckets.map((count, i) => ({ name: `W${i + 1}`, users: count }));

  // Pie: top 3 email domains
  const domainCounts = new Map<string, number>();
  for (const u of list) {
    const domain = String(u.email).split("@")[1]?.toLowerCase() || "unknown";
    domainCounts.set(domain, (domainCounts.get(domain) || 0) + 1);
  }
  const sortedDomains = Array.from(domainCounts.entries()).sort((a, b) => b[1] - a[1]);
  const palette = ["#7c3aed", "#6366f1", "#a78bfa", "#c4b5fd", "#ddd6fe"];
  const pieData = sortedDomains.slice(0, 3).map(([name, value], i) => ({ name, value, color: palette[i % palette.length] }));

  // Activity: latest 4 users by id
  const recent = [...list]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 4)
    .map((u, i) => ({ id: String(u.id), text: `Added user ${u.name}`, when: `${(i + 1) * 2}h` }));

  // Top users: pseudo score by length of catchPhrase words
  const scored = list
    .map((u) => ({ id: String(u.id), name: u.name as string, score: Math.min(100, (String(u.company?.catchPhrase || "").split(" ").length || 1) * 10 + (Number(u.id) % 9)) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Conversion metrics
  const uniqueDomains = domainCounts.size;
  const avgPerCompany = uniqueCompanies ? (totalUsers / uniqueCompanies) : 0;
  const medianNameLen = (() => {
    const lens = list.map((u) => String(u.name).length).sort((a, b) => a - b);
    const m = Math.floor(lens.length / 2);
    return lens.length % 2 ? lens[m] : Math.round((lens[m - 1] + lens[m]) / 2);
  })();
  const convRows = [
    { label: "Unique Domains", value: String(uniqueDomains) },
    { label: "Avg / Company", value: (avgPerCompany).toFixed(2) },
    { label: "Median Name", value: String(medianNameLen) },
  ];

  return (
    <div className="max-w-full overflow-x-hidden">
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <MotionFade delay={0.00}><KpiCard label="Total Users" value={totalUsers} accent="violet" /></MotionFade>
        <MotionFade delay={0.05}><KpiCard label="Companies" value={uniqueCompanies} accent="emerald" /></MotionFade>
        <MotionFade delay={0.10}><KpiCard label="Cities" value={uniqueCities} accent="amber" /></MotionFade>
        <MotionFade delay={0.15}><KpiCard label="Gmail Users" value={gmailUsers} accent="rose" /></MotionFade>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <MotionFade delay={0.00}><QuickActionsCard /></MotionFade>
        <MotionFade delay={0.05}><TrendsCard title="Users trend (last 12w)" data={trendData} /></MotionFade>
        <MotionFade delay={0.10}><PieCard title="Top email domains" data={pieData} /></MotionFade>
        <MotionFade delay={0.15}><ActivityCard items={recent} /></MotionFade>
        <MotionFade delay={0.20}><TopUsersCard users={scored} /></MotionFade>
        <MotionFade delay={0.25}><ConversionCard rows={convRows} /></MotionFade>
      </section>

      <div className="mt-4">
        <MotionFade delay={0.05}><UsersCtaCard /></MotionFade>
      </div>
    </div>
  );
}


