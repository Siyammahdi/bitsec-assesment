import Link from "next/link";
import { MotionFade } from "@/components/global/Motion";

export default function Home() {
  return (
    <MotionFade>
      <div className="grid place-items-center h-full pb-20 text-center text-slate-600">
        <div>
          <h1 className="text-7xl font-semibold text-slate-900">Welcome</h1>
          <p className="mt-2  text-2xl">
            Go to the dashboard to view metrics and manage users.
          </p>

          <div className="bg-purple-100 p-4 rounded-2xl w-11/12 sm:w-2/3 md:w-1/2 mx-auto mt-10">
            <p className="text-start text-sm">
              Hi there! First of all, thank you for taking the time to check my
              work. I really enjoyed working on this task. it gave me the chance
              to try new things, learn along the way, and also have some fun while
              building it. I’ve kept everything as clean and simple as possible,
              and I hope it feels good to go through. Looking forward to hearing
              your thoughts!
            </p>
            <p className="text-end text-sm mt-2">- Siyam Mahdi</p>
          </div>

          <Link
            href="/dashboard"
            className="mt-12 inline-flex rounded-xl bg-violet-600 px-20 py-4  font-medium text-white hover:bg-violet-500"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </MotionFade>
  );
}
