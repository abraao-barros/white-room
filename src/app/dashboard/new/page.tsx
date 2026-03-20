import { getSession } from '@/lib/auth'
import BudgetForm from '@/components/BudgetForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default async function NewBudgetPage() {
    await getSession()

    return (
        <div className="p-10 max-w-[1600px] mx-auto animate-in fade-in duration-700">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-10 group ml-10">
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest">Voltar para o Dashboard</span>
            </Link>
            <BudgetForm />
        </div>
    )
}
