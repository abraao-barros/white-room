'use client'

import React, { useState, useEffect } from 'react'

interface SettingField {
    id: string
    label: string
    placeholder?: string
    type?: string
    default?: string
}

interface SettingGroup {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    fields: SettingField[]
}

import { Save, ChevronLeft, Loader2, Check, Layout, Target, CreditCard, Briefcase, Palette } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'

const SETTING_GROUPS: SettingGroup[] = [
    {
        id: 'general',
        title: 'Apresentação e Textos',
        description: 'Títulos principais e textos de introdução da proposta.',
        icon: <Layout size={20} />,
        fields: [
            { id: 'presentation_title', label: 'Título de Apresentação', placeholder: 'Apresentação de Proposta Técnica' },
            { id: 'deliverables_title', label: 'Título do Escopo', placeholder: 'Escopo de Entrega' },
        ]
    },
    {
        id: 'pillars',
        title: 'Pilares Estratégicos',
        description: 'Configure os três pilares que aparecem no topo da proposta.',
        icon: <Target size={20} />,
        fields: [
            { id: 'pillar_1_title', label: 'Pilar 1: Título', placeholder: 'Agilidade Estratégica' },
            { id: 'pillar_1_description', label: 'Pilar 1: Descrição', placeholder: 'Foco total em performance...', type: 'textarea' },
            { id: 'pillar_2_title', label: 'Pilar 2: Título', placeholder: 'Arquitetura Segura' },
            { id: 'pillar_2_description', label: 'Pilar 2: Descrição', placeholder: 'Utilização das melhores práticas...', type: 'textarea' },
            { id: 'pillar_3_title', label: 'Pilar 3: Título', placeholder: 'Qualidade Premium' },
            { id: 'pillar_3_description', label: 'Pilar 3: Descrição', placeholder: 'Interface refinada...', type: 'textarea' },
        ]
    },
    {
        id: 'financial',
        title: 'Financeiro e Prazos',
        description: 'Nomes dos campos e textos informativos sobre valores.',
        icon: <CreditCard size={20} />,
        fields: [
            { id: 'financial_title', label: 'Título Detalhamento Financeiro', placeholder: 'Detalhamento Financeiro' },
            { id: 'hours_label', label: 'Label: Horas', placeholder: 'Horas Estimadas' },
            { id: 'deadline_label', label: 'Label: Prazo', placeholder: 'Data Limite Proposta' },
            { id: 'investment_label', label: 'Label: Investimento', placeholder: 'Investimento Total' },
            { id: 'validity_text', label: 'Texto de Validade', placeholder: 'Proposta técnica válida por 15 dias corridos', type: 'textarea' },
        ]
    },
    {
        id: 'footer',
        title: 'Empresa e Rodapé',
        description: 'Informações de contato e rodapé da página pública.',
        icon: <Briefcase size={20} />,
        fields: [
            { id: 'company_name', label: 'Nome da Empresa', placeholder: 'BRS STUDIO' },
            { id: 'company_subtitle', label: 'Subtítulo da Empresa', placeholder: 'Desenvolvimento de Software' },
            { id: 'footer_disclaimer', label: 'Disclaimer do Rodapé', placeholder: 'Este documento apresenta as premissas...', type: 'textarea' },
            { id: 'responsible_label', label: 'Label: Responsável', placeholder: 'Membro Responsável' },
            { id: 'brand_name', label: 'Nome da Marca (Rodapé)', placeholder: 'BudgetGen® Solutions' },
            { id: 'copyright_text', label: 'Texto de Copyright', placeholder: '© 2026 Propostas Inovadoras' },
            { id: 'reference_label', label: 'Label: Referência', placeholder: 'Referência' },
        ]
    },
    {
        id: 'theme',
        title: 'Personalização de Tema',
        description: 'Escolha as cores da identidade visual para a página pública.',
        icon: <Palette size={20} />,
        fields: [
            { id: 'theme_primary', label: 'Cor Primária', type: 'color', default: '#b185ff' },
            { id: 'theme_secondary', label: 'Cor Secundária', type: 'color', default: '#a855f7' },
            { id: 'theme_bg', label: 'Cor de Fundo', type: 'color', default: '#09090b' },
            { id: 'theme_card_bg', label: 'Cor dos Cards', type: 'color', default: '#16161a' },
            { id: 'theme_text', label: 'Cor do Texto', type: 'color', default: '#ffffff' },
        ]
    }
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
        <form onSubmit={handleSave} className="max-w-[1600px] mx-auto animate-in fade-in duration-700">
            {/* Page Header */}
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
                <div className="space-y-1">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-10 group">
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest">Voltar para o Dashboard</span>
                    </Link>
                    <h1 className="text-4xl font-black tracking-tight">Configurações Gerais</h1>
                    <p className="text-muted font-medium">Personalize os textos e o tema visual das suas propostas públicas.</p>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className={`btn-primary h-12 px-10 shadow-xl flex items-center gap-2 transition-all duration-500 ${saveSuccess ? 'bg-green-600 shadow-green-500/20' : 'shadow-primary/20'}`}
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={18} /> : saveSuccess ? <Check size={18} /> : <Save size={18} />}
                        {isSaving ? 'Salvando...' : saveSuccess ? 'Salvo!' : 'Salvar Alterações'}
                    </button>
                </div>
            </header>

            <div className="space-y-12">
                {SETTING_GROUPS.map((group) => (
                    <div key={group.id} className="card-base bg-[#0f0f11] border-white/5 p-8 rounded-[32px] space-y-8">
                        <div className="flex items-start gap-4 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                {group.icon}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold tracking-tight">{group.title}</h2>
                                <p className="text-sm text-muted font-medium">{group.description}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {group.fields.map((field) => (
                                <div key={field.id} className={`space-y-3 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
                                    <Label>
                                        {field.label}
                                    </Label>

                                    {field.type === 'textarea' ? (
                                        <Textarea
                                            value={settings[field.id] || ''}
                                            placeholder={field.placeholder}
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                            className="min-h-[120px]"
                                        />
                                    ) : field.type === 'color' ? (
                                        <div className="flex items-center gap-4 bg-[#16161a] rounded-2xl border border-white/5 p-3 pr-6">
                                            <input
                                                type="color"
                                                value={settings[field.id] || field.default || '#000000'}
                                                onChange={(e) => handleChange(field.id, e.target.value)}
                                                className="w-12 h-12 rounded-xl border-2 border-white/5 cursor-pointer bg-white/5 p-1 shrink-0"
                                            />
                                            <input
                                                type="text"
                                                value={settings[field.id] || field.default || '#000000'}
                                                onChange={(e) => handleChange(field.id, e.target.value)}
                                                className="bg-transparent border-none focus:ring-0 font-mono uppercase text-sm w-full p-0"
                                            />
                                        </div>
                                    ) : (
                                        <Input
                                            type="text"
                                            value={settings[field.id] || ''}
                                            placeholder={field.placeholder}
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex justify-end">
                <button
                    type="submit"
                    disabled={isSaving}
                    className={`btn-primary h-14 px-12 shadow-xl flex items-center gap-3 transition-all duration-500 rounded-2xl ${saveSuccess ? 'bg-green-600 shadow-green-500/20' : 'shadow-primary/20'}`}
                >
                    {isSaving ? <Loader2 className="animate-spin" size={20} /> : saveSuccess ? <Check size={20} /> : <Save size={20} />}
                    {isSaving ? 'Salvando alterações...' : saveSuccess ? 'Tudo Salvo!' : 'Salvar Todas as Alterações'}
                </button>
            </div>
        </form>
    )
}
