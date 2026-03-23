import { Zap, ShieldCheck, Award } from 'lucide-react'

interface BudgetPillarsProps {
    strategicPillars: any
    settings: Record<string, string>
}

export function BudgetPillars({ strategicPillars, settings }: BudgetPillarsProps) {
    const getSetting = (id: string, defaultValue: string) => settings[id] || defaultValue

    return (
        <section className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[0, 1, 2].map((idx) => {
                const customPillar = strategicPillars?.[idx];
                const defaultIcons = [<Zap key="zap" size={28} />, <ShieldCheck key="shield" size={28} />, <Award key="award" size={28} />];
                const defaultTitles = ['Agilidade Estratégica', 'Arquitetura Segura', 'Qualidade Premium'];
                const defaultDescs = [
                    'Foco total em performance. Estruturação modular que permite o crescimento sustentável do projeto sem perdas de velocidade.',
                    'Utilização das melhores práticas de mercado para garantir a integridade dos dados e a proteção contra as vulnerabilidades mais comuns.',
                    'Interface refinada e código limpo. O resultado é um produto que não apenas funciona, mas encanta e gera autoridade imediata.'
                ];

                const title = customPillar?.title || getSetting(`pillar_${idx + 1}_title`, defaultTitles[idx]);
                const description = customPillar?.description || getSetting(`pillar_${idx + 1}_description`, defaultDescs[idx]);

                return (
                    <div key={idx} className="space-y-6 group card-base rounded-2xl p-8">
                        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500 ${idx === 0 ? 'bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-white' : 'bg-white/5 border border-white/10 text-white group-hover:bg-white group-hover:text-background'}`}>
                            {defaultIcons[idx]}
                        </div>
                        <h3 className="text-2xl font-bold">{title}</h3>
                        <p className="text-muted text-sm leading-relaxed">
                            {description}
                        </p>
                    </div>
                );
            })}
        </section>
    )
}
