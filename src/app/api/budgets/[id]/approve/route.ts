import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { budgets } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    // Check if budget exists and is not already approved
    const existingBudget = await db.query.budgets.findFirst({
      where: eq(budgets.id, id),
    });

    if (!existingBudget) {
      return NextResponse.json(
        { message: "Orçamento não encontrado" },
        { status: 404 },
      );
    }

    if (existingBudget.approved) {
      return NextResponse.json(
        { message: "Esta proposta já foi aprovada anteriormente." },
        { status: 400 },
      );
    }

    // Approve the budget
    const [updatedBudget] = await db
      .update(budgets)
      .set({
        approved: true,
        approvedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(budgets.id, id))
      .returning();

    return NextResponse.json({
      message: "Proposta aprovada com sucesso!",
      budget: updatedBudget,
    });
  } catch (error: any) {
    console.error("Approval error:", error);
    return NextResponse.json(
      { message: "Erro ao aprovar proposta", error: error.message },
      { status: 500 },
    );
  }
}
