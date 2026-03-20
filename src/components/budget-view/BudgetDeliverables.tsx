import { Target } from 'lucide-react'

interface BudgetDeliverablesProps {
    deliverables: string[]
    getSetting: (id: string, defaultValue: string) => string
}

export function BudgetDeliverables({ deliverables, getSetting }: BudgetDeliverablesProps) {
    return (
        <div className="lg:col-span-12 xl:col-span-7">
            <h2 className="text-3xl font-black mb-10 flex items-center gap-4 tracking-tighter">
                <Target className="text-primary" /> {getSetting('deliverables_title', 'Escopo de Entrega')}
            </h2>
            <div className="grid grid-cols-1 gap-4">
                {deliverables.map((item, index) => (
                    <div key={index} className="flex items-center gap-6 p-6 rounded-[24px] card-premium hover:border-primary/30 transition-all duration-300">
                        <div className="text-primary/40 font-black text-lg">0{index + 1}</div>
                        <span className="text-base font-semibold text-white/90">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
