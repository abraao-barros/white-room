'use client'

import { useState } from 'react'
import { Check, Loader2, Info } from 'lucide-react'

interface BudgetInvestmentProps {
    budget: any
    settings: Record<string, string>
}

export function BudgetInvestment({ budget, settings }: BudgetInvestmentProps) {
    const getSetting = (id: string, defaultValue: string) => settings[id] || defaultValue
    const [isApproving, setIsApproving] = useState(false)
    const [isApproved, setIsApproved] = useState(budget.approved)
    const [error, setError] = useState('')

    const deliverables = (budget.deliverables as string[]) || []

    const handleApprove = async () => {
        setIsApproving(true)
        setError('')
        try {
            const res = await fetch(`/api/budgets/${budget.id}/approve`, {
                method: 'POST',
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || 'Erro ao aprovar proposta')

            setIsApproved(true)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsApproving(false)
        }
    }

    // Format currency with decimals for the breakdown
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        }).format(value)
    }

    // Format currency without decimals for the giant hero text
    const formatBigCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    return (
        <div className="lg:col-span-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 mt-20">
            <div className="flex flex-col xl:flex-row rounded-[24px] overflow-hidden border border-white/5 shadow-2xl">

                {/* Left Panel: Financial Summary */}
                <div className="flex-1 bg-[#1A1825] p-10 md:p-14 flex flex-col justify-between">
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-3">Resumo Financeiro</h3>
                        <p className="text-white/50 text-base mb-12 font-medium">Detalhamento das fases de investimento do projeto.</p>


                    </div>

                    {/* Payment Terms Box */}
                    <div className="mt-14 p-6 rounded-[16px] bg-primary/10 border border-primary/20 flex flex-col justify-center items-start gap-4">
                        <div className="flex gap-2 items-center">
                            <Info className="text-primary shrink-0" size={18} />
                            <span>Condições de Pagamento</span>
                        </div>
                        <p className="text-sm font-medium text-primary leading-relaxed">
                            {budget.paymentTerms || '50% de entrada para iniciar o projeto. Saldo restante após a entrega.'}
                        </p>
                    </div>
                </div>

                {/* Right Panel: Total Hero Space */}
                <div className="flex-1 p-10 md:p-14 flex flex-col justify-center items-center text-center bg-primary">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-[#111111] opacity-60 mb-6">
                        {getSetting('investment_label', 'Investimento Total')}
                    </span>

                    <div className="text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] leading-none font-black text-[#111111] mb-8 tracking-tighter">
                        {formatBigCurrency(budget.totalValue)}
                    </div>

                    <p className="text-[#111111] opacity-70 max-w-sm mb-12 font-medium leading-relaxed">
                        {budget.type === 'fixed'
                            ? 'Preço fixo com prazos realistas e qualidade garantida.'
                            : 'Taxa horária estimada baseada no escopo desenhado.'}
                    </p>

                    <button
                        onClick={handleApprove}
                        disabled={isApproving || isApproved}
                        className={`w-full max-w-md md:w-3/4 h-16 rounded-[12px] font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl ${isApproved
                            ? 'bg-[#111111] text-green-400 cursor-default shadow-green-900/20'
                            : 'bg-[#111111] text-white hover:scale-[1.02] active:scale-[0.98] shadow-black/50'
                            }`}
                    >
                        {isApproving ? (
                            <Loader2 className="animate-spin" size={24} />
                        ) : isApproved ? (
                            <Check size={24} />
                        ) : null}
                        {isApproving ? 'Processando...' : isApproved ? 'Proposta Aprovada' : 'Aceitar Proposta'}
                    </button>

                    {error && (
                        <p className="text-red-900 mt-4 text-sm font-bold animate-in shake-1">{error}</p>
                    )}
                </div>

            </div>
        </div>
    )
}

