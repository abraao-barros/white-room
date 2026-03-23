import { Briefcase } from 'lucide-react'

interface BudgetAboutProps {
    title: string
    description: string
    settings: Record<string, string>
}

export function BudgetAbout({ title, description, settings }: BudgetAboutProps) {
    const getSetting = (id: string, defaultValue: string) => settings[id] || defaultValue
    if (!title && !description) return null

    return (
        <section className="mb-32 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="card-base bg-[#0f0f11] border-white/5 p-10 md:p-14 rounded-[40px] relative overflow-hidden group hover:border-primary/20 transition-all duration-700">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] -mr-48 -mt-48 transition-all group-hover:bg-primary/10" />
                
                <div className="relative flex flex-col lg:flex-row gap-12 items-start">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Briefcase size={28} />
                    </div>
                    
                    <div className="space-y-6 flex-1">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white line-clamp-2">
                            {title || getSetting('company_name', 'Nossa Empresa')}
                        </h2>
                        <div className="w-20 h-1 bg-primary rounded-full" />
                        <p className="text-lg md:text-xl text-muted font-medium leading-relaxed max-w-4xl opacity-80 group-hover:opacity-100 transition-opacity whitespace-pre-line">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
