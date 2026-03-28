import { db } from '@/lib/db'
import { budgets } from '@/lib/db/schema'
import { getSession } from '@/lib/auth'
import { CheckCircle2, Clock, Briefcase, Calendar, User, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { eq, desc } from 'drizzle-orm'
import { PageHeader } from '@/components/dashboard/PageHeader'

export default async function StatusPage() {
    const session = await getSession()

    const userBudgets = await db.query.budgets.findMany({
        where: eq(budgets.userId, session.userId),
        orderBy: [desc(budgets.createdAt)],
    })

    return (
        <div className="p-10 max-w-[1600px] mx-auto animate-in fade-in duration-700">
            <header className="mb-12">
                <PageHeader
                    backLink={{
                        href: '/dashboard',
                        label: 'Voltar para o Dashboard'
                    }}
                    title="Status de Orçamentos"
                    description="Acompanhe o progresso das suas propostas comerciais."
                />
            </header>

            <div className="grid grid-cols-1 gap-6">
                {userBudgets.length === 0 ? (
                    <div className="card-base border-white/5 border-dashed border-2 text-center py-32 rounded-2xl flex flex-col items-center gap-8">
                        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-muted/30">
                            <Briefcase size={48} />
                        </div>
                        <p className="text-white text-2xl font-black tracking-tight mb-2">Nenhum orçamento encontrado</p>
                        <Link href="/dashboard/new" className="btn-primary h-14 px-10">
                            Criar primeiro orçamento
                        </Link>
                    </div>
                ) : (
                    userBudgets.map((budget) => (
                        <div key={budget.id} className={`card-base ${budget.approved ? '!bg-gradient-to-r from-[#0F172A00] to-green-500/5' : ''} border-white/5 hover:border-primary/20 transition-all p-8 rounded-2xl group relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full animate-pulse ${budget.approved ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]'}`} />
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${budget.approved ? 'text-green-500' : 'text-yellow-500'}`}>
                                            {budget.approved ? 'Aprovado' : 'Aguardando Aprovação'}
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors mb-1">
                                            {budget.projectName}
                                        </h2>
                                        <div className="flex items-center gap-4 text-sm font-bold text-muted/60">
                                            <span className="flex items-center gap-2">
                                                <User size={14} className="text-primary/40" /> {budget.clientName || 'Cliente não definido'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center shrink-0">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-muted/30 uppercase tracking-widest">Valor Final</p>
                                        <p className="text-xl font-black text-white tracking-tighter">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(budget.totalValue)}
                                        </p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-muted/30 uppercase tracking-widest">Criado em</p>
                                        <div className="flex items-center gap-2 text-sm font-bold text-muted">
                                            <Calendar size={14} className="text-primary/40" />
                                            {new Date(budget.createdAt).toLocaleDateString('pt-BR')}
                                        </div>
                                    </div>

                                    {budget.approved ? (
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-green-500/50 uppercase tracking-widest">Aprovado em</p>
                                            <div className="flex items-center gap-2 text-sm font-bold text-green-500/80">
                                                <CheckCircle2 size={14} />
                                                {new Date(budget.approvedAt!).toLocaleDateString('pt-BR')}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-yellow-500/50 uppercase tracking-widest">Expectativa de Início</p>
                                            <div className="flex items-center gap-2 text-sm font-bold text-yellow-500/80">
                                                <Clock size={14} />
                                                Imediato
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    <Link
                                        href={`/orcamento/${budget.slug}`}
                                        target="_blank"
                                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-muted hover:bg-white/10 hover:text-white transition-all shadow-lg"
                                        title="Ver Proposta Pública"
                                    >
                                        <ExternalLink size={20} />
                                    </Link>
                                    <Link
                                        href={`/dashboard/edit/${budget.id}`}
                                        className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/10"
                                        title="Editar Proposta"
                                    >
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
