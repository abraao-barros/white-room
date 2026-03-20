import { Clock, Calendar } from 'lucide-react'

interface BudgetInvestmentProps {
    budget: any
    getSetting: (id: string, defaultValue: string) => string
}

export function BudgetInvestment({ budget, getSetting }: BudgetInvestmentProps) {
    return (
        <div className="lg:col-span-12 xl:col-span-5 sticky top-32">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-[44px] opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative card-base !bg-[#0f0f11] p-12 rounded-[40px] border-white/10 overflow-hidden">
                    {/* Accent Circle */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-12 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {getSetting('financial_title', 'Detalhamento Financeiro')}
                    </h3>

                    <div className="space-y-10">
                        {budget.type !== 'fixed' && (
                            <div className="flex justify-between items-baseline">
                                <span className="text-sm font-bold text-muted flex items-center gap-2">
                                    <Clock size={16} /> {getSetting('hours_label', 'Horas Estimadas')}
                                </span>
                                <span className="text-3xl font-black tracking-tighter">{budget.estimatedHours}h</span>
                            </div>
                        )}

                        <div className="flex justify-between items-baseline underline-offset-8">
                            <span className="text-sm font-bold text-muted flex items-center gap-2">
                                <Calendar size={16} /> {getSetting('deadline_label', 'Prazo de Entrega')}
                            </span>
                            <span className="text-lg font-black tracking-widest text-primary">
                                {new Date(budget.deadline).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </span>
                        </div>

                        <div className="pt-10 mt-10 border-t border-white/5">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 block">
                                {getSetting('investment_label', 'Investimento Total')}
                            </span>
                            <div className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(budget.totalValue)}
                            </div>
                            <div className="mt-10 p-4 rounded-2xl bg-white/5 border border-white/5 text-[9px] leading-relaxed text-muted uppercase tracking-widest font-bold text-center">
                                {getSetting('validity_text', 'Proposta técnica válida por 15 dias corridos')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
