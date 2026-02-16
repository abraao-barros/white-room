'use client'

import React from 'react'

interface TabOption {
    id: string
    label: string
    icon?: React.ReactNode
}

interface TabsProps {
    options: TabOption[]
    activeTab: string
    onChange: (id: string) => void
    className?: string
}

export default function Tabs({ options, activeTab, onChange, className = '' }: TabsProps) {
    return (
        <div className={`flex p-1 bg-surface/50 border border-white/5 rounded-2xl w-fit ${className}`}>
            {options.map((option) => (
                <button
                    key={option.id}
                    type="button"
                    onClick={() => onChange(option.id)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === option.id
                            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]'
                            : 'text-muted hover:text-white hover:bg-white/5'
                        }`}
                >
                    {option.icon}
                    <span>{option.label}</span>
                </button>
            ))}
        </div>
    )
}
