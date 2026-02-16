import { FileText, Zap, Shield } from 'lucide-react'

export default function Features() {
    return (
        <section id="features" className="py-40 bg-surface/10 border-y border-white/5 relative overflow-hidden">

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <h2 className="text-4xl lg:text-5xl font-black mb-20 tracking-tight leading-tight animate-in fade-in slide-in-from-left-4 duration-1000">
                        Construído para <span className="text-primary italic">profissionais</span> modernos.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-6 group">
                        <div className="w-16 h-16 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-primary/5">
                            <Zap size={28} />
                        </div>
                        <h3 className="text-2xl font-bold">Geração Instantânea</h3>
                        <p className="text-muted leading-relaxed">
                            Crie propostas PDF e páginas web interativas em menos de 2 minutos. Elimine o trabalho repetitivo.
                        </p>
                    </div>

                    <div className="space-y-6 group">
                        <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:bg-white group-hover:text-background transition-all duration-500">
                            <FileText size={28} />
                        </div>
                        <h3 className="text-2xl font-bold">Branding Profissional</h3>
                        <p className="text-muted leading-relaxed">
                            Seus clientes recebem um link único com visual premium. Transmita confiança e autoridade desde o início.
                        </p>
                    </div>

                    <div className="space-y-6 group">
                        <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:bg-white group-hover:text-background transition-all duration-500">
                            <Shield size={28} />
                        </div>
                        <h3 className="text-2xl font-bold">Gestão Centralizada</h3>
                        <p className="text-muted leading-relaxed">
                            Visualize todos os seus projetos, valores totais e status em um dashboard limpo e poderoso.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
