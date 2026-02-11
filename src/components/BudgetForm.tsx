'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Calculator, Calendar, Target } from 'lucide-react'

export default function BudgetForm({ initialData }: { initialData?: any }) {
    const [formData, setFormData] = useState({
        projectName: initialData?.projectName || '',
        description: initialData?.description || '',
        hourlyRate: initialData?.hourlyRate || '',
        estimatedHours: initialData?.estimatedHours || '',
        deadline: initialData?.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : '',
        deliverables: initialData?.deliverables || [''],
    })
    const [loading, setLoading] = useState(false)
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

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    deliverables: formData.deliverables.filter((d: string) => d.trim() !== ''),
                }),
            })

            if (!res.ok) throw new Error('Erro ao salvar orçamento')

            router.push('/dashboard')
            router.refresh()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const totalCalculated = (parseFloat(formData.hourlyRate) || 0) * (parseFloat(formData.estimatedHours) || 0)

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-muted ml-1">Nome do Projeto</label>
                    <input
                        type="text"
                        className="input-base"
                        required
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                        placeholder="Ex: Landing Page para Clínica"
                    />
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-muted ml-1">Descrição</label>
                    <textarea
                        className="input-base min-h-[120px] resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Descreva brevemente o escopo e objetivos do projeto..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted ml-1 flex items-center gap-2">
                        <Calculator size={14} className="text-primary" /> Valor por Hora (R$)
                    </label>
                    <input
                        type="number"
                        className="input-base"
                        required
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                        placeholder="0.00"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted ml-1">Horas Estimadas</label>
                    <input
                        type="number"
                        className="input-base"
                        required
                        value={formData.estimatedHours}
                        onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                        placeholder="0"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted ml-1 flex items-center gap-2">
                        <Calendar size={14} className="text-primary" /> Prazo de Entrega
                    </label>
                    <input
                        type="date"
                        className="input-base"
                        required
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    />
                </div>

                <div className="flex flex-col justify-end">
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="text-xs font-bold uppercase tracking-wider">Total</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCalculated)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-sm font-medium text-muted ml-1 flex items-center gap-2">
                    <Target size={14} className="text-primary" /> Entregáveis do Projeto
                </label>
                <div className="grid gap-3">
                    {formData.deliverables.map((deliverable: string, index: number) => (
                        <div key={index} className="flex gap-2 group">
                            <input
                                type="text"
                                className="input-base"
                                value={deliverable}
                                onChange={(e) => handleDeliverableChange(index, e.target.value)}
                                placeholder={`Entregável #${index + 1}`}
                            />
                            {formData.deliverables.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveDeliverable(index)}
                                    className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddDeliverable}
                        className="flex items-center gap-2 text-sm text-primary font-bold mt-2 hover:opacity-80 transition-opacity w-fit px-2"
                    >
                        <Plus size={16} /> Adicionar Item
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                    {error}
                </div>
            )}

            <button disabled={loading} className="btn-primary w-full h-14 text-lg shadow-lg shadow-primary/20" type="submit">
                {loading ? 'Salvando...' : initialData ? 'Atualizar Orçamento' : 'Gerar Proposta Profissional'}
            </button>
        </form>
    )
}
