import { NextRequest, NextResponse } from "next/server";
import users from "@/data/users.json";

type UserRecord = {
  id: number | string;
  name: string;
  email: string;
};

export async function GET(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await new Promise((r) => setTimeout(r, 150));
  const user = (users as UserRecord[]).find((u) => String(u.id) === String(id));
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user });
}


