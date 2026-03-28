import { db } from '@/lib/db'
import { budgets } from '@/lib/db/schema'
import { getSession } from '@/lib/auth'
import { Plus, Briefcase, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { eq, desc } from 'drizzle-orm'
import { raleway } from '@/lib/fonts'

import BudgetList from '@/components/BudgetList'

import { PageHeader } from '@/components/dashboard/PageHeader'

export default async function DashboardPage() {
    const session = await getSession()

    const userBudgets = await db.query.budgets.findMany({
        where: eq(budgets.userId, session.userId),
        orderBy: [desc(budgets.createdAt)],
    })

    // Summary stats
    const totalInvoiced = userBudgets.reduce((acc, b) => acc + b.totalValue, 0)
    const projectsCount = userBudgets.length

    return (
        <div className="p-10 max-w-[1600px] mx-auto animate-in fade-in duration-700">
            {/* Welcome & Stats */}
            <PageHeader
                title="Dashboard"
                description={(
                    <>
                        Bem-vindo, <span className="font-bold text-primary">{session.name.split(' ')[0]}</span>. Aqui está o resumo dos seus orçamentos.
                    </>
                )}
                actions={(
                    <Link href="/dashboard/new" className="btn-primary h-14 px-8 shadow-xl shadow-primary/20 flex items-center gap-2">
                        <Plus size={20} /> Novo Orçamento
                    </Link>
                )}
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <div className="card-base bg-[#0f0f11] border-white/5 p-8 rounded-2xl flex items-center gap-6 group hover:border-primary/20 transition-all">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <Briefcase size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-1">Total Projetos</p>
                        <p className="text-3xl font-black tracking-tighter">{projectsCount}</p>
                    </div>
                </div>
                <div className="card-base bg-[#0f0f11] border-white/5 p-8 rounded-2xl flex items-center gap-6 group hover:border-green-500/20 transition-all">
                    <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all duration-500">
                        <DollarSign size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-1">Valor Total</p>
                        <p className="text-3xl font-black tracking-tighter">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalInvoiced)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Budgets List */}
            {userBudgets.length === 0 ? (
                <div className="card-base bg-[#0f0f11] border-white/5 border-dashed border-2 text-center py-32 rounded-2xl flex flex-col items-center gap-8">
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-muted/30">
                        <Briefcase size={48} />
                    </div>
                    <div>
                        <p className="text-white text-2xl font-black tracking-tight mb-2">Inicie seu primeiro orçamento</p>
                        <p className="text-muted/60 text-base font-medium">Gere propostas de impacto para seus clientes agora mesmo.</p>
                    </div>
                    <Link href="/dashboard/new" className="btn-primary h-14 px-10">
                        Criar agora
                    </Link>
                </div>
            ) : (
                <BudgetList budgets={userBudgets} />
            )}
        </div>
    )
}
