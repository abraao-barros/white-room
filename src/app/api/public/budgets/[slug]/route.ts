import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { budgets } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const budget = await db.query.budgets.findFirst({
      where: eq(budgets.slug, slug),
      with: {
        user: {
          columns: {
            name: true,
            email: true,
          },
        },
      },
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
