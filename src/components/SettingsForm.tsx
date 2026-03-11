'use client'

import { useState, useEffect } from 'react'
import { Save, ChevronLeft, Loader2, Check } from 'lucide-react'
import Link from 'next/link'

const SETTING_FIELDS = [
    { id: 'presentation_title', label: 'Título de Apresentação', placeholder: 'Apresentação de Proposta Técnica' },
    { id: 'pillar_1_title', label: 'Pilar 1: Título', placeholder: 'Agilidade Estratégica' },
    { id: 'pillar_1_description', label: 'Pilar 1: Descrição', placeholder: 'Foco total em performance...', type: 'textarea' },
    { id: 'pillar_2_title', label: 'Pilar 2: Título', placeholder: 'Arquitetura Segura' },
    { id: 'pillar_2_description', label: 'Pilar 2: Descrição', placeholder: 'Utilização das melhores práticas...', type: 'textarea' },
    { id: 'pillar_3_title', label: 'Pilar 3: Título', placeholder: 'Qualidade Premium' },
    { id: 'pillar_3_description', label: 'Pilar 3: Descrição', placeholder: 'Interface refinada...', type: 'textarea' },
    { id: 'deliverables_title', label: 'Título do Escopo', placeholder: 'Escopo de Entrega' },
    { id: 'financial_title', label: 'Título Financeiro', placeholder: 'Detalhamento Financeiro' },
    { id: 'hours_label', label: 'Label: Horas', placeholder: 'Horas Estimadas' },
    { id: 'deadline_label', label: 'Label: Prazo', placeholder: 'Data Limite Proposta' },
    { id: 'investment_label', label: 'Label: Investimento', placeholder: 'Investimento Total' },
    { id: 'validity_text', label: 'Texto de Validade', placeholder: 'Proposta técnica válida por 15 dias corridos' },
    { id: 'company_name', label: 'Nome da Empresa', placeholder: 'BRS STUDIO' },
    { id: 'company_subtitle', label: 'Subtítulo da Empresa', placeholder: 'Desenvolvimento de Software' },
    { id: 'footer_disclaimer', label: 'Disclaimer do Rodapé', placeholder: 'Este documento apresenta as premissas...', type: 'textarea' },
    { id: 'responsible_label', label: 'Label: Responsável', placeholder: 'Membro Responsável' },
    { id: 'reference_label', label: 'Label: Referência', placeholder: 'Referência' },
    { id: 'brand_name', label: 'Nome da Marca (Rodapé)', placeholder: 'BudgetGen® Solutions' },
    { id: 'copyright_text', label: 'Texto de Copyright', placeholder: '© 2026 Propostas Inovadoras' },
]

export default function SettingsForm() {
    const [settings, setSettings] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings')
                if (res.ok) {
                    const data = await res.json()
                    setSettings(data)
                }
            } catch (error) {
                console.error('Failed to fetch settings', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchSettings()
    }, [])

    const handleSave = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        setIsSaving(true)
        setSaveSuccess(false)

        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ settings }),
            })

            if (res.ok) {
                setSaveSuccess(true)
                setTimeout(() => setSaveSuccess(false), 3000)
            }
        } catch (error) {
            console.error('Failed to save settings', error)
        } finally {
            setIsSaving(false)
        }
    }

    const handleChange = (id: string, value: string) => {
        setSettings(prev => ({ ...prev, [id]: value }))
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-32">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        )
    }

    return (
        <>
            <header className="mb-12 flex items-center justify-between">
                <div className="space-y-2">
                    <Link href="/dashboard" className="text-muted text-sm flex items-center gap-1 hover:text-white transition-colors">
                        <ChevronLeft size={16} /> Voltar ao Dashboard
                    </Link>
                    <h1 className="text-4xl font-black tracking-tight">Administração</h1>
                    <p className="text-muted">Personalize os textos globais do sistema de orçamentos.</p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => handleSave()}
                        disabled={isSaving}
                        className="btn-primary h-12 px-8 flex items-center gap-2"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={18} /> : saveSuccess ? <Check size={18} /> : <Save size={18} />}
                        {isSaving ? 'Salvando...' : saveSuccess ? 'Salvo!' : 'Salvar Alterações'}
                    </button>
                </div>
            </header>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SETTING_FIELDS.map((field) => (
                    <div key={field.id} className={`space-y-2 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
                        <label className="text-xs font-bold text-muted uppercase tracking-widest px-1">
                            {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                            <textarea
                                value={settings[field.id] || ''}
                                placeholder={field.placeholder}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                                className="input-base min-h-[100px] resize-y py-4"
                            />
                        ) : (
                            <input
                                type="text"
                                value={settings[field.id] || ''}
                                placeholder={field.placeholder}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                                className="input-base"
                            />
                        )}
                    </div>
                ))}
            </form>

            <div className="mt-12 pt-8 border-t border-white/5 flex justify-end">
                <button
                    onClick={() => handleSave()}
                    disabled={isSaving}
                    className="btn-primary h-12 px-8 flex items-center gap-2 shadow-xl shadow-primary/20"
                >
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : saveSuccess ? <Check size={18} /> : <Save size={18} />}
                    {isSaving ? 'Salvando...' : saveSuccess ? 'Salvo!' : 'Salvar Alterações'}
                </button>
            </div>
        </>
    )
}
