import { getSession } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import BudgetForm from '@/components/BudgetForm'
import { ChevronLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default async function NewBudgetPage() {
    const session = await getSession()

    return (
        <div className="min-h-screen bg-background">
            <Navbar user={session} />

            <main className="container mx-auto px-6 pb-20 max-w-4xl">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-10 group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Voltar ao Dashboard</span>
                </Link>

                <header className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-2 text-primary mb-4">
                        <Sparkles size={18} />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Criador de Propostas</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black mb-4 tracking-tighter">Novo Orçamento</h1>
                    <p className="text-muted text-lg max-w-2xl leading-relaxed">
                        Preencha os detalhes técnicos e financeiros do projeto para gerar uma proposta comercial premium instantaneamente.
                    </p>
                </header>

                <div className="card-base !bg-surface/40 p-8 lg:p-12 shadow-2xl shadow-black/20">
                    <BudgetForm />
                </div>
            </main>
        </div>
    )
}
