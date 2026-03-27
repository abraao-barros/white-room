'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Target, Clock, PlusCircle, Briefcase, Check, ExternalLink, ArrowRight, Loader2, Image as ImageIcon } from 'lucide-react'
import Tabs from '@/components/Tabs'
import Link from 'next/link'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { Select } from '@/components/ui/Select'

import { AVAILABLE_ICONS } from '@/components/_constants/available_icons'
import { uploadToR2 } from '@/lib/upload'

export default function BudgetForm({ initialData }: { initialData?: any }) {
    const [formData, setFormData] = useState({
        projectName: initialData?.projectName || '',
        clientName: initialData?.clientName || '',
        description: initialData?.description || '',
        aboutTitle: initialData?.aboutTitle || '',
        aboutDescription: initialData?.aboutDescription || '',
        type: initialData?.type || 'hourly',
        hourlyRate: initialData?.hourlyRate || '',
        estimatedHours: initialData?.estimatedHours || '',
        fixedTotal: initialData?.type === 'fixed' ? initialData.totalValue : '',
        deadline: initialData?.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : '',
        deliverables: initialData?.deliverables || [''],
        processSteps: initialData?.processSteps || [
            { icon: 'Target', title: '', description: '' }
        ],
        strategicPillars: initialData?.strategicPillars || [
            { title: '', description: '' },
            { title: '', description: '' },
            { title: '', description: '' },
        ],
        paymentTerms: initialData?.paymentTerms || '',
    })
    const [loading, setLoading] = useState(false)
    const [savedBudget, setSavedBudget] = useState<any>(null)
    const [showSuccess, setShowSuccess] = useState(false)
    const [error, setError] = useState('')
    const [scrolled, setScrolled] = useState(false)
    const [uploadingStep, setUploadingStep] = useState<number | null>(null)
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 300)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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

    const handleAddProcessStep = () => {
        setFormData({ ...formData, processSteps: [...formData.processSteps, { icon: 'Target', title: '', description: '' }] })
    }

    const handleRemoveProcessStep = (index: number) => {
        const newSteps = formData.processSteps.filter((_: any, i: number) => i !== index)
        setFormData({ ...formData, processSteps: newSteps })
    }

    const handleProcessStepChange = (index: number, field: string, value: string) => {
        const newSteps = [...formData.processSteps]
        newSteps[index] = { ...newSteps[index], [field]: value }
        setFormData({ ...formData, processSteps: newSteps })
    }

    const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setUploadingStep(index)
            const publicUrl = await uploadToR2(file)
            handleProcessStepChange(index, 'imageUrl', publicUrl)
        } catch (err) {
            console.error('Upload failed:', err)
            alert('Falha ao fazer upload da imagem.')
        } finally {
            setUploadingStep(null)
        }
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
            clientName: formData.clientName,
            description: formData.description,
            aboutTitle: formData.aboutTitle,
            aboutDescription: formData.aboutDescription,
            type: formData.type, // 'hourly' or 'fixed'
            hourlyRate: formData.type === 'hourly' ? formData.hourlyRate : null,
            estimatedHours: formData.type === 'hourly' ? formData.estimatedHours : null,
            totalValue: totalValue,
            deadline: formData.deadline,
            deliverables: formData.deliverables.filter((d: string) => d.trim() !== ''),
            processSteps: formData.processSteps.filter((p: any) => p.title.trim() !== ''),
            strategicPillars: formData.strategicPillars,
            paymentTerms: formData.paymentTerms,
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
        <form onSubmit={handleSubmit} className="max-w-[1600px] mx-auto animate-in fade-in duration-700">
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
                    <div className="card-base border-white/5 p-8 rounded-[32px] space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <PlusCircle className="rotate-45" size={20} />
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">Informações gerais</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label>Nome do projeto</Label>
                                <Input
                                    type="text"
                                    required
                                    value={formData.projectName}
                                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                                    placeholder="e.g. Brand Identity Overhaul"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label>Nome do cliente</Label>
                                <Input
                                    type="text"
                                    value={formData.clientName}
                                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                    placeholder="e.g. Acme Corp"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label>Descrição</Label>
                                <Textarea
                                    className="min-h-[160px] resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Breve descrição do escopo do projeto..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="card-base bg-[#0f0f11] border-white/5 p-8 rounded-[32px] space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <PlusCircle className="" size={20} />
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">Sobre a empresa</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label>Título da Seção</Label>
                                <Input
                                    type="text"
                                    value={formData.aboutTitle}
                                    onChange={(e) => setFormData({ ...formData, aboutTitle: e.target.value })}
                                    placeholder="e.g. Sobre a Studio X"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label>Descrição</Label>
                                <Textarea
                                    className="min-h-[140px] resize-none"
                                    value={formData.aboutDescription}
                                    onChange={(e) => setFormData({ ...formData, aboutDescription: e.target.value })}
                                    placeholder="Conte um pouco sobre sua trajetória, expertise e valores..."
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
                                        <Label>Valor da hora (R$)</Label>
                                        <Input
                                            type="number"
                                            required
                                            value={formData.hourlyRate}
                                            onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                            placeholder="120"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label>Horas estimadas</Label>
                                        <Input
                                            type="number"
                                            required
                                            value={formData.estimatedHours}
                                            onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                                            placeholder="40"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-3">
                                    <Label>Valor total (R$)</Label>
                                    <Input
                                        type="number"
                                        required
                                        value={formData.fixedTotal}
                                        onChange={(e) => setFormData({ ...formData, fixedTotal: e.target.value })}
                                        placeholder="4800"
                                    />
                                </div>
                            )}

                            <div className="space-y-3">
                                <Label>Prazo da proposta</Label>
                                <Input
                                    type="date"
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
                                        <Label className="text-[10px] ml-0">Título</Label>
                                        <Input
                                            type="text"
                                            className="input-base h-10 text-sm"
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
                                        <Label className="text-[10px] ml-0">Descrição</Label>
                                        <Textarea
                                            className="input-base min-h-[80px] text-xs py-2 resize-none"
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

                    {/* Work Process Repeater */}
                    <div className="card-base bg-[#0f0f11] border-white/5 p-8 rounded-[32px] space-y-8">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <PlusCircle size={20} />
                                </div>
                                <h2 className="text-xl font-bold tracking-tight">Processo de trabalho</h2>
                            </div>
                            <button
                                type="button"
                                onClick={handleAddProcessStep}
                                className="text-primary hover:text-white flex items-center gap-2 text-sm font-bold transition-colors"
                            >
                                <PlusCircle size={16} /> Adicionar Etapa
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {formData.processSteps.map((step: any, index: number) => (
                                <div key={index} className="relative group p-6 rounded-2xl bg-[#16161a] border border-white/5 hover:border-primary/20 transition-all duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                        <div className="md:col-span-4 space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] ml-0">Título da Etapa</Label>
                                                <Input
                                                    type="text"
                                                    className="input-base h-10 text-sm"
                                                    value={step.title}
                                                    onChange={(e) => handleProcessStepChange(index, 'title', e.target.value)}
                                                    placeholder="Design & Prototipagem"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] ml-0">Ícone Visual</Label>
                                                <Select
                                                    className="h-10 text-sm"
                                                    value={step.icon}
                                                    onChange={(e) => handleProcessStepChange(index, 'icon', e.target.value)}
                                                >
                                                    <option value="" disabled className="bg-background text-muted">Selecione um ícone...</option>
                                                    {AVAILABLE_ICONS.map(icon => (
                                                        <option key={icon.value} value={icon.value} className="bg-[#16161a] text-white">
                                                            {icon.label}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] ml-0">Capa do Processo (Opcional)</Label>
                                                <div className="relative">
                                                     <input 
                                                          type="file" 
                                                          accept="image/*"
                                                          className="hidden" 
                                                          id={`process-image-${index}`}
                                                          onChange={(e) => handleImageUpload(index, e)}
                                                          disabled={uploadingStep === index}
                                                     />
                                                     <label 
                                                         htmlFor={`process-image-${index}`}
                                                         className="flex items-center justify-center gap-2 h-10 px-4 rounded-xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10 text-xs font-bold cursor-pointer transition-colors w-full overflow-hidden"
                                                     >
                                                         {uploadingStep === index ? (
                                                             <Loader2 size={14} className="animate-spin text-primary" />
                                                         ) : step.imageUrl ? (
                                                             <>
                                                                <Check size={14} className="text-green-500" />
                                                                <span className="truncate">{step.imageUrl.split('/').pop()}</span>
                                                             </>
                                                         ) : (
                                                             <>
                                                                <ImageIcon size={14} className="text-muted" />
                                                                <span className="text-muted group-hover:text-white transition-colors">Anexar imagem...</span>
                                                             </>
                                                         )}
                                                     </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-8 space-y-2">
                                            <Label className="text-[10px] ml-0">Descrição detalhada</Label>
                                            <Textarea
                                                className="input-base min-h-[100px] text-xs py-2 resize-none"
                                                value={step.description}
                                                onChange={(e) => handleProcessStepChange(index, 'description', e.target.value)}
                                                placeholder="Descreva o que acontece nesta fase..."
                                            />
                                        </div>
                                    </div>
                                    {formData.processSteps.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveProcessStep(index)}
                                            className="absolute -top-3 -right-3 p-2 bg-[#16161a] border border-white/5 text-muted/30 hover:text-red-500 rounded-xl transition-all shadow-xl opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
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
                                    <Input
                                        type="text"
                                        className="focus:border-primary/50 pl-12 pr-12"
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

                    {/* Payment Terms Section */}
                    <div className="card-base bg-[#0f0f11] border-white/5 p-8 rounded-[32px] space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Check size={20} />
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">Termos de pagamento</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label>Descrição do Pagamento</Label>
                                <Textarea
                                    className="min-h-[120px] resize-none"
                                    value={formData.paymentTerms}
                                    onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                                    placeholder="Ex: 50% antecipado + 50% na entrega final..."
                                />
                            </div>

                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                                    <span className="text-[10px] font-bold">!</span>
                                </div>
                                <p className="text-xs font-medium text-muted/80">
                                    <span className="text-primary font-bold">Nota:</span> Um selo visual de "50% de entrada obrigatório" será exibido automaticamente na proposta para reforçar os termos padrão.
                                </p>
                            </div>
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
                    
                    {/* Action Sticky Button */}
                    <div className={`transition-all duration-500 ease-out ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full btn-primary h-14 px-10 shadow-2xl flex items-center justify-center gap-3 transition-all duration-500 rounded-2xl ${showSuccess ? 'bg-green-600 shadow-green-500/20' : 'shadow-primary/20 hover:-translate-y-1'}`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : showSuccess ? (
                                <Check size={20} className="animate-in zoom-in" />
                            ) : null}
                            <span className="font-bold text-sm tracking-wide">{loading ? 'Salvando...' : showSuccess ? 'Orçamento Salvo!' : (initialData ? 'Atualizar Orçamento' : 'Salvar Orçamento')}</span>
                        </button>
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
