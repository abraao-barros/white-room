import { Briefcase, User, Mail } from 'lucide-react'

interface BudgetFooterProps {
    budget: any
    getSetting: (id: string, defaultValue: string) => string
}

export function BudgetFooter({ budget, getSetting }: BudgetFooterProps) {
    return (
        <footer className="pt-24 border-t border-white/5">
            <div className="flex flex-wrap md:flex-row justify-between gap-12">
                <div className="max-w-md w-full flex flex-col flex-wrap space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                            <Briefcase size={28} />
                        </div>
                        <div>
                            <p className="text-xl font-black tracking-tight leading-none mb-1">
                                {getSetting('company_name', 'BRS STUDIO')}
                            </p>
                            <p className="text-[10px] uppercase font-bold text-muted tracking-widest">
                                {getSetting('company_subtitle', 'Desenvolvimento de Software')}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-balance max-w-md w-full text-muted leading-relaxed">
                        {getSetting('footer_disclaimer', 'Este documento apresenta as premissas técnicas e comerciais para viabilização do projeto. Estou à disposição para ajustes de escopo.')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <span className="text-[10px] font-black text-muted uppercase tracking-widest block mb-4">
                            {getSetting('responsible_label', 'Membro Responsável')}
                        </span>
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
                        <div className="space-y-1">
                            <span className="text-[10px] font-black text-muted uppercase tracking-widest block mb-1">
                                {getSetting('reference_label', 'Referência')}
                            </span>
                            <p className="text-xs font-mono text-primary opacity-50">{budget.id.substring(0, 8).toUpperCase()}</p>
                        </div>
                        <div className="mt-8">
                            <p className="text-sm font-black text-white mb-1 tracking-tighter">
                                {getSetting('brand_name', 'BudgetGen® Solutions')}
                            </p>
                            <p className="text-[10px] font-medium text-muted">
                                {getSetting('copyright_text', '© 2026 Propostas Inovadoras')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
