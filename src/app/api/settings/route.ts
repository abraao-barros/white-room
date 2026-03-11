import { db } from "@/lib/db";
import { systemSettings } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settingsRows = await db
    .select()
    .from(systemSettings)
    .where(eq(systemSettings.userId, session.userId));
  
  const settings = settingsRows.reduce((acc, row) => {
    acc[row.id] = row.value;
    return acc;
  }, {} as Record<string, string>);

  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { settings } = await req.json();

  if (!settings || typeof settings !== "object") {
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 },
    );
  }

  for (const [id, value] of Object.entries(settings)) {
    if (typeof value === "string") {
      await db
        .insert(systemSettings)
        .values({ 
          userId: session.userId, 
          id, 
          value, 
          updatedAt: new Date() 
        })
        .onConflictDoUpdate({
          target: [systemSettings.userId, systemSettings.id],
          set: { value, updatedAt: new Date() },
        });
    }
  }

  return NextResponse.json({ success: true });
}
