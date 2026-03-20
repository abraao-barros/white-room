import { Zap, ShieldCheck, Award } from 'lucide-react'

interface BudgetHeaderProps {
    getSetting: (id: string, defaultValue: string) => string
    projectName: string
    description: string
}

export function BudgetHeader({ getSetting, projectName, description }: BudgetHeaderProps) {
    return (
        <header className="mb-24 space-y-3 animate-in fade-in slide-in-from-top-10 duration-1000">
            <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">
                    {getSetting('presentation_title', 'Apresentação de Proposta Técnica')}
                </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight md:leading-normal bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                {projectName}
            </h1>
            <p className="text-xl md:text-2xl text-muted max-w-3xl leading-relaxed font-normal">
                {description}
            </p>
        </header>
    )
}
