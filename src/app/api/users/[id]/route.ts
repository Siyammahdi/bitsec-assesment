import { NextResponse } from "next/server";
import users from "@/data/users.json";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const { id } = params;
  await new Promise((r) => setTimeout(r, 150));
  const user = (users as any[]).find((u) => String(u.id) === String(id));
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user });
}


