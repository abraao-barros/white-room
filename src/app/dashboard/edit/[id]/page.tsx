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
        <div className="p-10 max-w-[1600px] mx-auto animate-in fade-in duration-700">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-10 group">
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest">Voltar para o Dashboard</span>
            </Link>
            <BudgetForm initialData={JSON.parse(JSON.stringify(budget))} />
        </div>
    )
}
