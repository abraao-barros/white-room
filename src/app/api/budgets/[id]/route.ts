import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { budgets } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { eq, and } from "drizzle-orm";
import { slugify } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const budget = await db.query.budgets.findFirst({
      where: and(eq(budgets.id, id), eq(budgets.userId, session.userId)),
    });

    if (!budget) {
      return NextResponse.json(
        { message: "Orçamento não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(budget);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;

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

    // First, check if the budget exists and has a slug
    const existingBudget = await db.query.budgets.findFirst({
      where: and(eq(budgets.id, id), eq(budgets.userId, session.userId)),
    });

    if (!existingBudget) {
      return NextResponse.json(
        { message: "Orçamento não encontrado" },
        { status: 404 },
      );
    }

    const budgetType =
      type === "fixed" || type === "hourly" ? type : existingBudget.type;

    const updateData: any = {
      projectName,
      description,
      type: budgetType,
      slug: existingBudget.slug || slugify(projectName),
      hourlyRate: hourlyRate
        ? parseFloat(hourlyRate)
        : budgetType === "fixed"
          ? null
          : undefined,
      estimatedHours: estimatedHours
        ? parseFloat(estimatedHours)
        : budgetType === "fixed"
          ? null
          : undefined,
      totalValue: totalValue ? parseFloat(totalValue) : undefined,
      deadline: deadline ? new Date(deadline) : undefined,
      deliverables,
      updatedAt: new Date(),
    };

    const result = await db
      .update(budgets)
      .set(updateData)
      .where(and(eq(budgets.id, id), eq(budgets.userId, session.userId)))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { message: "Orçamento não encontrado ou não autorizado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Orçamento atualizado com sucesso" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const result = await db
      .delete(budgets)
      .where(and(eq(budgets.id, id), eq(budgets.userId, session.userId)))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { message: "Orçamento não encontrado ou não autorizado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Orçamento deletado com sucesso" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
