import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function CTA() {
    const planFeatures = [
        'Propostas Ilimitadas',
        'URL pública customizada',
        'Cálculo automático de ROI',
        'Suporte Prioritário'
    ]

    return (
        <section className="py-40">
            <div className="container mx-auto px-6">
                <div className="card-base !bg-primary p-12 lg:p-24 rounded-[48px] overflow-hidden relative group border-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white">
                        <div className="space-y-8">
                            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
                                Pronto para elevar <br /> seu nível?
                            </h2>
                            <ul className="space-y-4">
                                {planFeatures.map((item) => (
                                    <li key={item} className="flex items-center gap-3 font-bold">
                                        <CheckCircle size={20} className="text-white/60" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-6 items-start lg:items-end">
                            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 w-full max-w-sm">
                                <p className="text-sm font-bold uppercase tracking-widest opacity-60 mb-8">Plano Único</p>
                                <p className="text-6xl font-black mb-2">R$ 0</p>
                                <p className="text-sm font-medium opacity-80 mb-10">Gratuito para sempre para freelancers individuais.</p>
                                <Link href="/auth/register" className="btn-secondary !bg-white !text-primary !border-none w-full h-14 font-black">
                                    CRIAR CONTA AGORA
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
