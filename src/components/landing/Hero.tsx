import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

interface HeroProps {
    session: any
}

export default function Hero({ session }: HeroProps) {
    return (
        <section className="relative overflow-hidden pt-20 pb-40 lg:pt-32">

            <div className="container mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-primary mb-10 animate-in fade-in slide-in-from-top-4 duration-1000 shadow-[0_0_20px_rgba(155,135,245,0.1)]">
                    <Sparkles size={14} className="animate-pulse" /> Design de Orçamentos Reimaginado
                </div>

                <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter leading-none mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    Propostas que <br />
                    <span className="text-primary italic">fecham contratos.</span>
                </h1>

                <p className="text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 opacity-90">
                    Transforme suas horas de trabalho em apresentações premium. <br className="hidden md:block" />
                    A plataforma definitiva para freelancers que valorizam seu tempo.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000">
                    <Link href={session ? '/dashboard' : '/auth/register'} className="btn-primary h-16 px-12 text-lg shadow-2xl shadow-primary/30 group">
                        Começar agora
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="#features" className="btn-secondary h-16 px-12 text-lg">
                        Ver Funcionalidades
                    </Link>
                </div>

                {/* Visual Mockup */}
                <div className="mt-32 relative group">
                    <div className="max-w-6xl mx-auto rounded-[32px] p-2 bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-1000">
                        <div className="aspect-[16/9] bg-surface/50 rounded-[24px] border border-white/5 flex flex-col">
                            {/* Browser-like header */}
                            <div className="h-12 border-b border-white/5 flex items-center px-6 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                                </div>
                            </div>
                            {/* Fake UI Content */}
                            <div className="flex-1 p-8 grid grid-cols-12 gap-6 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                                <div className="col-span-3 space-y-4">
                                    <div className="h-10 w-full bg-white/5 rounded-xl border border-white/5" />
                                    <div className="h-40 w-full bg-white/5 rounded-2xl border border-white/5" />
                                </div>
                                <div className="col-span-9 space-y-6">
                                    <div className="h-12 w-2/3 bg-primary/10 rounded-2xl border border-primary/20" />
                                    <div className="grid grid-cols-2 gap-6 h-64">
                                        <div className="bg-white/5 rounded-3xl border border-white/5" />
                                        <div className="bg-white/5 rounded-3xl border border-white/5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
