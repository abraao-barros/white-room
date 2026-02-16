import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { budgets } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";
import { slugify } from "@/lib/utils";

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
      type,
      hourlyRate,
      estimatedHours,
      totalValue,
      deadline,
      deliverables,
    } = data;

    if (!projectName) {
      return NextResponse.json(
        { message: "Nome do projeto é obrigatório" },
        { status: 400 },
      );
    }

    const slug = slugify(projectName);

    const budgetType = type === "fixed" ? "fixed" : "hourly";

    const [budget] = await db
      .insert(budgets)
      .values({
        projectName,
        description,
        type: budgetType,
        hourlyRate:
          budgetType === "hourly" ? parseFloat(hourlyRate) || null : null,
        estimatedHours:
          budgetType === "hourly" ? parseFloat(estimatedHours) || null : null,
        totalValue: parseFloat(totalValue) || 0,
        deadline: new Date(deadline),
        deliverables: deliverables || [],
        slug,
        userId: session.userId,
      })
      .returning();

    return NextResponse.json(budget, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
