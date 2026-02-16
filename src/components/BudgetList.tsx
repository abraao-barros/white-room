'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Briefcase, Clock, Edit, ExternalLink, Target, LayoutGrid, Trash2 } from 'lucide-react'
import Tabs from '@/components/Tabs'
import { useRouter } from 'next/navigation'

interface Budget {
    id: string
    projectName: string
    description: string | null
    type: string
    totalValue: number
    estimatedHours: number | null
    slug: string
    createdAt: Date | string
}

interface BudgetListProps {
    budgets: Budget[]
}

export default function BudgetList({ budgets: initialBudgets }: BudgetListProps) {
    const [activeTab, setActiveTab] = useState('all')
    const [budgets, setBudgets] = useState(initialBudgets)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const router = useRouter()

    const tabOptions = [
        { id: 'all', label: 'Todos', icon: <LayoutGrid size={16} /> },
        { id: 'hourly', label: 'Por Hora', icon: <Clock size={16} /> },
        { id: 'fixed', label: 'Escopo Fechado', icon: <Target size={16} /> }
    ]

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este orçamento?')) return

        setDeletingId(id)
        try {
            const res = await fetch(`/api/budgets/${id}`, {
                method: 'DELETE',
            })

            if (!res.ok) throw new Error('Erro ao deletar orçamento')

            setBudgets(prev => prev.filter(b => b.id !== id))
            router.refresh()
        } catch (error) {
            alert('Não foi possível excluir o orçamento.')
        } finally {
            setDeletingId(null)
        }
    }

    const filteredBudgets = budgets.filter(budget => {
        if (activeTab === 'all') return true
        return budget.type === activeTab
    })

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <Tabs
                    options={tabOptions}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />
                <p className="text-sm font-medium text-muted italic">
                    Mostrando {filteredBudgets.length} {filteredBudgets.length === 1 ? 'projeto' : 'projetos'}
                </p>
            </div>

            {filteredBudgets.length === 0 ? (
                <div className="card-base text-center py-32 border-dashed border-2 flex flex-col items-center gap-6 bg-surface/10">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-muted">
                        <Briefcase size={40} />
                    </div>
                    <div>
                        <p className="text-muted text-lg font-medium mb-1">Nenhum projeto encontrado</p>
                        <p className="text-muted/50 text-sm">Não há orçamentos nesta categoria ainda.</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredBudgets.map((budget) => (
                        <div key={budget.id} className="card-base group flex flex-col justify-between !bg-surface/40 hover:!bg-surface/60 border-white/5 hover:border-primary/40 animate-in fade-in zoom-in duration-500">
                            <div className="space-y-6">
                                <div className="flex items-start justify-between gap-4">
                                    <h2 className="text-xl font-bold tracking-tight line-clamp-1">{budget.projectName}</h2>
                                    <span className="shrink-0 inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg border border-primary/20">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(budget.totalValue)}
                                    </span>
                                </div>
                                <p className="text-sm text-muted line-clamp-2 leading-relaxed h-[40px]">
                                    {budget.description || 'Sem descrição adicional para este projeto.'}
                                </p>

                                <div className="flex gap-6 py-2">
                                    <div className="flex items-center gap-1.5 text-xs text-muted/60">
                                        {budget.type === 'fixed' ? (
                                            <>
                                                <Target size={12} className="text-primary/60" />
                                                <span>Escopo Fechado</span>
                                            </>
                                        ) : (
                                            <>
                                                <Clock size={12} />
                                                <span>{budget.estimatedHours}h esforço</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                                <div className="flex gap-3">
                                    <Link
                                        href={`/dashboard/edit/${budget.id}`}
                                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all text-muted hover:text-white"
                                        title="Editar"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <Link
                                        href={budget.slug ? `/orcamento/${budget.slug}` : '#'}
                                        target={budget.slug ? "_blank" : undefined}
                                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${budget.slug
                                            ? 'bg-primary/10 hover:bg-primary/20 text-primary'
                                            : 'bg-white/5 text-muted/30 cursor-not-allowed'
                                            }`}
                                        title={budget.slug ? "Página Pública" : "Slug não gerado"}
                                    >
                                        <ExternalLink size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(budget.id)}
                                        disabled={deletingId === budget.id}
                                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-all text-red-500 disabled:opacity-50"
                                        title="Excluir Orçamento"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <span className="text-[10px] uppercase font-bold text-muted/40 tracking-wider">
                                    {new Date(budget.createdAt).toLocaleDateString('pt-BR')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
