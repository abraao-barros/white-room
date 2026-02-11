import { db } from '@/lib/db'
import { budgets } from '@/lib/db/schema'
import { notFound } from 'next/navigation'
import {
    Calendar,
    Clock,
    Mail,
    User,
    Zap,
    Award,
    ShieldCheck,
    Briefcase,
    Target
} from 'lucide-react'
import { eq } from 'drizzle-orm'

export default async function PublicBudgetPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const budget = await db.query.budgets.findFirst({
        where: eq(budgets.slug, slug),
        with: {
            user: true,
        },
    })

    if (!budget) notFound()

    const deliverables = (budget.deliverables as string[]) || []

    return (
        <main className="container mx-auto px-6 py-20 lg:py-32 max-w-6xl">
            {/* Header Area */}
            <header className="mb-24 space-y-3 animate-in fade-in slide-in-from-top-10 duration-1000">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-1 bg-primary rounded-full shadow-[0_0_15px_rgba(155,135,245,0.5)]" />
                    <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Apresentação de Proposta Técnica</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight md:leading-normal bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                    {budget.projectName}
                </h1>
                <p className="text-xl md:text-2xl text-muted max-w-3xl leading-relaxed font-medium">
                    {budget.description}
                </p>
            </header>

            {/* Strategic Pillars */}
            <section className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-6 group">
                    <div className="w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <Zap size={28} />
                    </div>
                    <h3 className="text-2xl font-bold">Agilidade Estratégica</h3>
                    <p className="text-muted/70 text-sm leading-relaxed">
                        Foco total em performance. Estruturação modular que permite o crescimento sustentável do projeto sem perdas de velocidade.
                    </p>
                </div>

                <div className="space-y-6 group">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-background transition-all duration-500">
                        <ShieldCheck size={28} />
                    </div>
                    <h3 className="text-2xl font-bold">Arquitetura Segura</h3>
                    <p className="text-muted/70 text-sm leading-relaxed">
                        Utilização das melhores práticas de mercado para garantir a integridade dos dados e a proteção contra as vulnerabilidades mais comuns.
                    </p>
                </div>

                <div className="space-y-6 group">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-background transition-all duration-500">
                        <Award size={28} />
                    </div>
                    <h3 className="text-2xl font-bold">Qualidade Premium</h3>
                    <p className="text-muted/70 text-sm leading-relaxed">
                        Interface refinada e código limpo. O resultado é um produto que não apenas funciona, mas encanta e gera autoridade imediata.
                    </p>
                </div>
            </section>

            {/* Core Proposal Details */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32 items-start">
                {/* Deliverables List */}
                <div className="lg:col-span-7">
                    <h2 className="text-3xl font-black mb-10 flex items-center gap-4 tracking-tighter">
                        <Target className="text-primary" /> Escopo de Entrega
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        {deliverables.map((item, index) => (
                            <div key={index} className="flex items-center gap-6 p-6 rounded-[24px] bg-surface/30 border border-white/5 hover:border-primary/30 transition-all duration-300">
                                <div className="text-primary/40 font-black text-lg">0{index + 1}</div>
                                <span className="text-base font-semibold text-white/90">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Investment Highlight Card */}
                <div className="lg:col-span-5 sticky top-32">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-br from-primary to-purple-600 rounded-[44px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative card-base !bg-[#0f0f11] p-12 rounded-[40px] border-white/10 shadow-2xl overflow-hidden">
                            {/* Accent Circle */}
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />

                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-12 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                Detalhamento Financeiro
                            </h3>

                            <div className="space-y-10">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm font-bold text-muted flex items-center gap-2">
                                        <Clock size={16} /> Horas Estimadas
                                    </span>
                                    <span className="text-3xl font-black tracking-tighter">{budget.estimatedHours}h</span>
                                </div>

                                <div className="flex justify-between items-baseline underline-offset-8">
                                    <span className="text-sm font-bold text-muted flex items-center gap-2">
                                        <Calendar size={16} /> Data Limite Proposta
                                    </span>
                                    <span className="text-lg font-black tracking-widest text-primary">
                                        {new Date(budget.deadline).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                    </span>
                                </div>

                                <div className="pt-10 mt-10 border-t border-white/5">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 block">Investimento Total</span>
                                    <div className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(budget.totalValue)}
                                    </div>
                                    <div className="mt-10 p-4 rounded-2xl bg-white/5 border border-white/5 text-[9px] leading-relaxed text-muted uppercase tracking-widest font-bold text-center">
                                        Proposta técnica válida por 15 dias corridos
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer / Responsibility */}
            <footer className="pt-24 border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between gap-12">
                    <div className="max-w-md space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                <Briefcase size={28} />
                            </div>
                            <div>
                                <p className="text-xl font-black tracking-tight leading-none mb-1">BRS STUDIO</p>
                                <p className="text-[10px] uppercase font-bold text-muted tracking-widest">Desenvolvimento de Software</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted/60 leading-relaxed">
                            Este documento apresenta as premissas técnicas e comerciais para viabilização do projeto. Estou à disposição para ajustes de escopo e definições tecnológicas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black text-muted uppercase tracking-widest block mb-4">Membro Responsável</span>
                            <div className="flex items-center gap-3">
                                <User size={16} className="text-primary" />
                                <span className="text-sm font-black whitespace-nowrap">{budget.user?.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-primary" />
                                <span className="text-sm font-semibold text-muted hover:text-white transition-colors underline underline-offset-4">{budget.user?.email}</span>
                            </div>
                        </div>

                        <div className="md:text-right flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] font-black text-muted uppercase tracking-widest block mb-1">Referência</span>
                                <p className="text-xs font-mono text-primary/50">{budget.id.substring(0, 8).toUpperCase()}</p>
                            </div>
                            <div className="mt-8">
                                <p className="text-xs font-bold text-white mb-1 tracking-tighter">BudgetGen® Solutions</p>
                                <p className="text-[10px] font-medium text-muted">© 2026 Propostas Inovadoras</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}
