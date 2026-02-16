import { db } from '@/lib/db'
import { budgets } from '@/lib/db/schema'
import { getSession } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import { Plus, ExternalLink, Edit, Briefcase, DollarSign, Clock, Target } from 'lucide-react'
import Link from 'next/link'
import { eq, desc } from 'drizzle-orm'

import BudgetList from '@/components/BudgetList'

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
        <div className="min-h-screen bg-background">
            <Navbar user={session} />

            <main className="container mx-auto px-6 pb-20">
                {/* Welcome & Stats */}
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-black mb-3 tracking-tight">Meus Projetos</h1>
                        <p className="text-muted text-lg italic tracking-tight">Bem-vindo, <span className="font-bold text-primary">{session.name.split(' ')[0]}</span>. Aqui está o resumo dos seus orçamentos.</p>
                    </div>
                    <Link href="/dashboard/new" className="btn-primary h-14 px-8 shadow-xl shadow-primary/20">
                        <Plus size={20} /> Novo Orçamento
                    </Link>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <div className="card-base !bg-surface/30 p-6 flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Briefcase size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-widest">Total Projetos</p>
                            <p className="text-2xl font-black mt-1">{projectsCount}</p>
                        </div>
                    </div>
                    <div className="card-base !bg-surface/30 p-6 flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-muted uppercase tracking-widest">Valor Total</p>
                            <p className="text-2xl font-black mt-1">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalInvoiced)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Budgets List with Tabs */}
                {userBudgets.length === 0 ? (
                    <div className="card-base text-center py-32 border-dashed border-2 flex flex-col items-center gap-6 bg-surface/10">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-muted">
                            <Briefcase size={40} />
                        </div>
                        <div>
                            <p className="text-muted text-lg font-medium mb-1">Inicie seu primeiro orçamento</p>
                            <p className="text-muted/50 text-sm">Gere propostas de impacto para seus clientes agora mesmo.</p>
                        </div>
                        <Link href="/dashboard/new" className="btn-secondary">
                            Criar agora
                        </Link>
                    </div>
                ) : (
                    <BudgetList budgets={userBudgets} />
                )}
            </main>
        </div>
    )
}
