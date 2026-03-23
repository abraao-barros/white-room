import * as Icons from 'lucide-react'
import { PenTool } from 'lucide-react'

interface ProcessStep {
    icon: string
    title: string
    description: string
}

interface BudgetProcessStepsProps {
    steps: ProcessStep[]
    settings: Record<string, string>
}

export function BudgetProcessSteps({ steps, settings }: BudgetProcessStepsProps) {
    const getSetting = (id: string, defaultValue: string) => settings[id] || defaultValue
    if (!steps || steps.length === 0) return null

    // Mix-font logic for the section title
    const sectionTitle = getSetting('process_title', 'Nosso Processo de Criação').toUpperCase()
    const words = sectionTitle.split(' ')
    const firstWord = words[0] || 'NOSSO'
    const secondWord = words.length > 1 ? words[1] : 'PROCESSO'
    const restWords = words.length > 2 ? words.slice(2).join(' ') : 'DE CRIAÇÃO'

    return (
        <section className="my-32 relative flex flex-col gap-12 md:gap-20 items-start md:items-center">

            {/* Left Sticky Panel */}
            <div className="w-full flex flex-col items-center flex-shrink-0 lg:sticky lg:top-32 z-10">
                <div className="w-16 h-8 rounded-full bg-primary/10 border border-primary/20 mb-8 flex items-center justify-center text-primary">
                    <PenTool size={16} />
                </div>

                <h2 className="w-full text-4xl md:text-5xl lg:text-[3.5rem] text-left md:text-center text-white leading-[1.1]">
                    <span className="block font-black tracking-tight">{firstWord}</span>
                    <span className="block font-bold text-primary tracking-wide">{secondWord}</span>
                    <span className="block font-black tracking-tighter">{restWords}</span>
                </h2>
            </div>

            {/* Right Cards List */}
            <div className="flex flex-col w-full relative z-20 pb-16">
                {steps.map((step, index) => {
                    const IconName = (step.icon as keyof typeof Icons) || 'Target'
                    const Icon = (Icons[IconName] as any) || Icons.Target

                    return (
                        <div
                            key={index}
                            className="sticky w-full flex overflow-hidden rounded-[24px] card-base !bg-[#0f0f11] border border-white/5 shadow-2xl transition-all duration-500 hover:border-primary/30 mb-8 last:mb-0 group"
                            style={{
                                top: `calc(100px + ${index * 24}px)`,
                                zIndex: 10 + index
                            }}
                        >
                            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                                {/* Number Indicator Background */}
                                <div className="absolute top-8 left-8 text-6xl font-black text-white/[0.03] select-none group-hover:text-primary/[0.05] transition-colors leading-none pointer-events-none">
                                    0{index + 1}
                                </div>

                                <Icon size={28} className="text-primary mb-8 relative z-10" strokeWidth={1.5} />

                                <h3 className="text-2xl font-black uppercase text-white tracking-wider mb-4 leading-tight group-hover:text-primary transition-colors relative z-10">
                                    {step.title}
                                </h3>

                                <p className="text-muted text-sm md:text-base leading-relaxed font-medium relative z-10">
                                    {step.description}
                                </p>
                            </div>

                            {/* Image Placeholder Frame */}
                            <div className="hidden md:flex w-1/2 p-4 md:p-6 pl-0">
                                <div className="w-full h-full min-h-[250px] rounded-[16px] bg-black/40 border border-white/5 relative overflow-hidden flex items-center justify-center shadow-inner group-hover:border-primary/20 transition-colors duration-500">
                                    <Icon size={140} className="text-primary opacity-5 absolute group-hover:scale-110 group-hover:opacity-10 transition-all duration-700" strokeWidth={0.5} />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0f0f11]/80 to-transparent pointer-events-none"></div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </section>
    )
}
