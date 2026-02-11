import { db } from '@/lib/db'
import { budgets } from '@/lib/db/schema'
import { getSession } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import BudgetForm from '@/components/BudgetForm'
import { ChevronLeft, Edit3 } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { and, eq } from 'drizzle-orm'

export default async function EditBudgetPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await getSession()
    const { id } = await params

    const budget = await db.query.budgets.findFirst({
        where: and(eq(budgets.id, id), eq(budgets.userId, session.userId)),
    })

    if (!budget) notFound()

    return (
        <div className="min-h-screen bg-background text-white">
            <Navbar user={session} />

            <main className="container mx-auto px-6 pb-20 max-w-4xl">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-10 group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Voltar ao Dashboard</span>
                </Link>

                <header className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-2 text-primary mb-4">
                        <Edit3 size={18} />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Editor de Proposta</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black mb-4 tracking-tighter text-white">Editar Orçamento</h1>
                    <p className="text-muted text-lg max-w-2xl leading-relaxed">
                        Atualizando as informações do projeto: <span className="text-primary font-bold">{budget.projectName}</span>
                    </p>
                </header>

                <div className="card-base !bg-surface/40 p-8 lg:p-12 shadow-2xl shadow-black/20">
                    <BudgetForm initialData={JSON.parse(JSON.stringify(budget))} />
                </div>
            </main>
        </div>
    )
}
