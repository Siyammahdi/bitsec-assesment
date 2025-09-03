import { NextResponse } from "next/server";
import users from "@/data/users.json";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return NextResponse.json({ users });
}


