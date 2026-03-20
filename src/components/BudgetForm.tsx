'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Target, Clock, PlusCircle, Briefcase, Check, ExternalLink, ArrowRight } from 'lucide-react'
import Tabs from '@/components/Tabs'
import Link from 'next/link'

export default function BudgetForm({ initialData }: { initialData?: any }) {
    const [formData, setFormData] = useState({
        projectName: initialData?.projectName || '',
        description: initialData?.description || '',
        type: initialData?.type || 'hourly',
        hourlyRate: initialData?.hourlyRate || '',
        estimatedHours: initialData?.estimatedHours || '',
        fixedTotal: initialData?.type === 'fixed' ? initialData.totalValue : '',
        deadline: initialData?.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : '',
        deliverables: initialData?.deliverables || [''],
        strategicPillars: initialData?.strategicPillars || [
            { title: '', description: '' },
            { title: '', description: '' },
            { title: '', description: '' },
        ],
    })
    const [loading, setLoading] = useState(false)
    const [savedBudget, setSavedBudget] = useState<any>(null)
    const [showSuccess, setShowSuccess] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleAddDeliverable = () => {
        setFormData({ ...formData, deliverables: [...formData.deliverables, ''] })
    }

    const handleRemoveDeliverable = (index: number) => {
        const newDeliverables = formData.deliverables.filter((_: any, i: number) => i !== index)
        setFormData({ ...formData, deliverables: newDeliverables })
    }

    const handleDeliverableChange = (index: number, value: string) => {
        const newDeliverables = [...formData.deliverables]
        newDeliverables[index] = value
        setFormData({ ...formData, deliverables: newDeliverables })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const url = initialData ? `/api/budgets/${initialData.id}` : '/api/budgets'
        const method = initialData ? 'PATCH' : 'POST'

        const totalValue = formData.type === 'hourly'
            ? (parseFloat(formData.hourlyRate) || 0) * (parseFloat(formData.estimatedHours) || 0)
            : parseFloat(formData.fixedTotal) || 0

        const payload = {
            projectName: formData.projectName,
            description: formData.description,
            type: formData.type, // 'hourly' or 'fixed'
            hourlyRate: formData.type === 'hourly' ? formData.hourlyRate : null,
            estimatedHours: formData.type === 'hourly' ? formData.estimatedHours : null,
            totalValue: totalValue,
            deadline: formData.deadline,
            deliverables: formData.deliverables.filter((d: string) => d.trim() !== ''),
            strategicPillars: formData.strategicPillars,
        }

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.message || 'Erro ao salvar orçamento')

            setSavedBudget(result)
            setShowSuccess(true)

            // Revalidate the dashboard
            router.refresh()

            // Optional: Hide success message after 5 seconds
            setTimeout(() => setShowSuccess(false), 5000)

        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const totalCalculated = formData.type === 'hourly'
        ? (parseFloat(formData.hourlyRate) || 0) * (parseFloat(formData.estimatedHours) || 0)
        : parseFloat(formData.fixedTotal) || 0

    const tabOptions = [
        { id: 'hourly', label: 'Orçamento por Hora', icon: <Clock size={16} /> },
        { id: 'fixed', label: 'Escopo Fechado', icon: <Target size={16} /> }
    ]
    return (
        <form onSubmit={handleSubmit} className="p-10 max-w-[1600px] mx-auto animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">
                        {initialData ? 'Editar Orçamento' : 'Criar Orçamento'}
                    </h1>
                    <p className="text-muted font-medium">Configure seu orçamento e entregáveis.</p>
                </div>
                <div className="flex items-center gap-4">
                    {savedBudget && (
                        <Link
                            href={`/orcamento/${savedBudget.slug}`}
                            target="_blank"
                            className="btn-secondary h-12 px-6 flex items-center gap-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-all animate-in slide-in-from-right-4"
                        >
                            <ExternalLink size={18} />
                            Visualizar Orçamento
                        </Link>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn-primary h-12 px-10 shadow-xl flex items-center gap-2 transition-all duration-500 ${showSuccess ? 'bg-green-600 shadow-green-500/20' : 'shadow-primary/20'}`}
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : showSuccess ? (
                            <Check size={18} className="animate-in zoom-in" />
                        ) : null}
                        {loading ? 'Salvando...' : showSuccess ? 'Salvo!' : (initialData ? 'Atualizar Orçamento' : 'Salvar Orçamento')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Side: Form Sections */}
                <div className="lg:col-span-8 space-y-8">

                    {/* General Information */}
                    <div className="card-base bg-[#0f0f11] border-white/5 p-8 rounded-[32px] space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <PlusCircle className="rotate-45" size={20} />
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">Informações gerais</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Nome do projeto</label>
                                <input
                                    type="text"
                                    className="input-base bg-[#16161a] border-white/5 focus:bg-[#1a1a20] h-14"
                                    required
                                    value={formData.projectName}
                                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                                    placeholder="e.g. Brand Identity Overhaul"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Descrição</label>
                                <textarea
                                    className="input-base bg-[#16161a] border-white/5 focus:bg-[#1a1a20] min-h-[160px] resize-none py-4"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Breve descrição do escopo do projeto..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Timeline & Rates */}
                    <div className="card-base bg-[#0f0f11] border-white/5 p-8 rounded-[32px] space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Clock size={20} />
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">Cronograma e valores</h2>
                        </div>

                        <div className="mb-6">
                            <Tabs
                                options={tabOptions}
                                activeTab={formData.type}
                                onChange={(id) => setFormData(prev => ({ ...prev, type: id }))}
                                className="!bg-[#16161a] !border-white/5"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {formData.type === 'hourly' ? (
                                <>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Valor da hora (R$)</label>
                                        <input
                                            type="number"
                                            className="input-base bg-[#16161a] border-white/5 h-14"
                                            required
                                            value={formData.hourlyRate}
                                            onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                            placeholder="120"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Horas estimadas</label>
                                        <input
                                            type="number"
                                            className="input-base bg-[#16161a] border-white/5 h-14"
                                            required
                                            value={formData.estimatedHours}
                                            onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                                            placeholder="40"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Valor total (R$)</label>
                                    <input
                                        type="number"
                                        className="input-base bg-[#16161a] border-white/5 h-14"
                                        required
                                        value={formData.fixedTotal}
                                        onChange={(e) => setFormData({ ...formData, fixedTotal: e.target.value })}
                                        placeholder="4800"
                                    />
                                </div>
                            )}

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Prazo da proposta</label>
                                <input
                                    type="date"
                                    className="input-base bg-[#16161a] border-white/5 h-14"
                                    required
                                    value={formData.deadline}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Strategic Pillars */}
                    <div className="card-base bg-[#0f0f11] border-white/5 p-8 rounded-[32px] space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Target size={20} />
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">Pilares estratégicos</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {formData.strategicPillars.map((pillar: any, index: number) => (
                                <div key={index} className="space-y-4 p-6 rounded-2xl bg-[#16161a] border border-white/5 hover:border-primary/20 transition-all duration-300">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-muted uppercase tracking-widest">Título</label>
                                        <input
                                            type="text"
                                            className="input-base bg-transparent border-white/5 focus:bg-white/5 h-10 text-sm"
                                            value={pillar.title}
                                            onChange={(e) => {
                                                const newPillars = [...formData.strategicPillars];
                                                newPillars[index].title = e.target.value;
                                                setFormData({ ...formData, strategicPillars: newPillars });
                                            }}
                                            placeholder="e.g. Premium Quality"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-muted uppercase tracking-widest">Descrição</label>
                                        <textarea
                                            className="input-base bg-transparent border-white/5 focus:bg-white/5 min-h-[80px] text-xs py-2 resize-none"
                                            value={pillar.description}
                                            onChange={(e) => {
                                                const newPillars = [...formData.strategicPillars];
                                                newPillars[index].description = e.target.value;
                                                setFormData({ ...formData, strategicPillars: newPillars });
                                            }}
                                            placeholder="Briefly describe..."
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Deliverables */}
                    <div className="card-base bg-[#0f0f11] border-white/5 p-8 rounded-[32px] space-y-8">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Briefcase size={20} />
                                </div>
                                <h2 className="text-xl font-bold tracking-tight">Entregáveis</h2>
                            </div>
                            <button
                                type="button"
                                onClick={handleAddDeliverable}
                                className="text-primary hover:text-white flex items-center gap-2 text-sm font-bold transition-colors"
                            >
                                <Plus size={16} /> Adicionar Tarefa
                            </button>
                        </div>

                        <div className="space-y-3">
                            {formData.deliverables.map((deliverable: string, index: number) => (
                                <div key={index} className="group relative">
                                    <input
                                        type="text"
                                        className="input-base bg-[#16161a] border-white/5 focus:border-primary/50 h-14 pl-12 pr-12"
                                        value={deliverable}
                                        onChange={(e) => handleDeliverableChange(index, e.target.value)}
                                        placeholder="Adicionar entregável..."
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/30 group-focus-within:text-primary transition-colors">
                                        <div className="grid grid-cols-2 gap-0.5">
                                            {[...Array(6)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-current" />)}
                                        </div>
                                    </div>
                                    {formData.deliverables.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveDeliverable(index)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-muted/30 bg-transparent hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Sticky Summary */}
                <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
                    <div className="card-base bg-[#0f0f11] border-white/5 p-8 rounded-[32px] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16" />

                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-8">Estimativa em tempo real</p>

                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-5xl font-black tracking-tight">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(totalCalculated)}
                            </span>
                        </div>
                        <p className="text-xs font-bold text-muted/60 mb-10">
                            {formData.type === 'hourly'
                                ? `Baseado em ${formData.estimatedHours || 0} horas a R$${formData.hourlyRate || 0}/hr`
                                : 'Custo fixo do escopo do projeto'}
                        </p>

                        <div className="space-y-4 pt-8 border-t border-white/5">
                            <div className="flex justify-between items-center pt-4 mt-4">
                                <span className="text-sm font-black">Total do Orçamento</span>
                                <span className="text-lg font-black text-primary">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCalculated)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Pro Tips */}
                    <div className="p-8 rounded-[32px] bg-primary/5 border border-primary/10">
                        <div className="flex items-center gap-3 mb-6">
                            <PlusCircle className="text-primary" size={18} />
                            <h3 className="text-sm font-black tracking-tight">Dicas Profissionais</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                <p className="text-xs font-medium text-muted/80 leading-relaxed">Divida os entregáveis em marcos específicos para maior clareza do cliente.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                <p className="text-xs font-medium text-muted/80 leading-relaxed">A página pública incluirá a marca da sua empresa e os termos de pagamento.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/10 text-red-400 text-sm font-bold animate-in slide-in-from-bottom-2">
                    {error}
                </div>
            )}
        </form>
    );
}
