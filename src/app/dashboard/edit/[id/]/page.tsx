import { db } from '@/lib/db'
import { budgets } from '@/lib/db/schema'
import { getSession } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import BudgetForm from '@/components/BudgetForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { and, eq } from 'drizzle-orm'

export default async function EditBudgetPage({ params }: { params: { id: string } }) {
    const session = await getSession()
    const { id } = await params

    const budget = await db.query.budgets.findFirst({
        where: and(eq(budgets.id, id), eq(budgets.userId, session.userId)),
    })

    if (!budget) notFound()

    return (
        <div className="min-h-screen">
            <Navbar user={session} />

            <main className="container pb-20">
                <Link href="/dashboard" className="flex items-center gap-2 text-[var(--muted)] hover:text-white transition-colors mb-8">
                    <ChevronLeft size={20} /> Voltar ao Dashboard
                </Link>

                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-2">Editar Orçamento</h1>
                    <p className="text-[var(--secondary-foreground)]">Atualize as informações do projeto: {budget.projectName}</p>
                </header>

                <div className="card">
                    <BudgetForm initialData={JSON.parse(JSON.stringify(budget))} />
                </div>
            </main>
        </div>
    )
}
