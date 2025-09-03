import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-items-center h-full pb-20 text-center text-slate-600">
      <div>
        <h1 className="text-7xl font-semibold text-slate-900">Welcome</h1>
        <p className="mt-2  text-2xl">Go to the dashboard to view metrics and manage users.</p>
        <Link href="/dashboard" className="mt-12 inline-flex rounded-xl bg-violet-600 px-20 py-4  font-medium text-white hover:bg-violet-500">
          Open Dashboard
        </Link>
      </div>
    </div>
  );
}
