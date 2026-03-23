import { Zap, ShieldCheck, Award } from 'lucide-react'

interface BudgetHeaderProps {
    settings: Record<string, string>
    projectName: string
    clientName?: string
    description: string
}

export function BudgetHeader({ settings, projectName, clientName, description }: BudgetHeaderProps) {
    const getSetting = (id: string, defaultValue: string) => settings[id] || defaultValue

    return (
        <header className="mb-24 space-y-6 animate-in fade-in slide-in-from-top-10 duration-1000">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-1 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                    <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">
                        {getSetting('presentation_title', 'Apresentação de Proposta Técnica')}
                    </span>
                </div>
                {clientName && (
                    <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-muted/60 flex items-center gap-2 self-start sm:self-auto">
                        <Zap size={10} className="text-primary" />
                        Para: <span className="text-white">{clientName}</span>
                    </div>
                )}
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight md:leading-[1.1] bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent max-w-5xl">
                {projectName}
            </h1>
            <p className="text-xl md:text-3xl text-muted max-w-4xl leading-relaxed font-light opacity-80">
                {description}
            </p>
        </header>
    )
}
