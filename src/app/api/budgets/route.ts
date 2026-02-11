import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { budgets } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const userBudgets = await db.query.budgets.findMany({
      where: eq(budgets.userId, session.userId),
      orderBy: [desc(budgets.createdAt)],
    });

    return NextResponse.json(userBudgets);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const {
      projectName,
      description,
      hourlyRate,
      estimatedHours,
      deadline,
      deliverables,
    } = data;

    const totalValue = parseFloat(hourlyRate) * parseFloat(estimatedHours);
    const slug = `${projectName.toLowerCase().replace(/ /g, "-")}-${Math.random().toString(36).substring(2, 7)}`;

    const [budget] = await db
      .insert(budgets)
      .values({
        projectName,
        description,
        hourlyRate: parseFloat(hourlyRate),
        estimatedHours: parseFloat(estimatedHours),
        totalValue,
        deadline: new Date(deadline),
        deliverables,
        slug,
        userId: session.userId,
      })
      .returning();

    return NextResponse.json(budget, { status: 201 });
  } catch (error: any) {
    console.error("Create budget error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
