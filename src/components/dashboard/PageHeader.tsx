'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { raleway } from '@/lib/fonts'

interface PageHeaderProps {
    title: string | React.ReactNode
    description?: string | React.ReactNode
    backLink?: {
        href: string
        label: string
    }
    actions?: React.ReactNode
}

export function PageHeader({ title, description, backLink, actions }: PageHeaderProps) {
    return (
        <header className={`${raleway.className} flex flex-col gap-8 mb-12 w-full`}>
            {backLink && (
                <Link
                    href={backLink.href}
                    className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors group w-fit"
                >
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest">{backLink.label}</span>
                </Link>
            )}

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 w-full">
                <div className="flex-1 text-left flex flex-col items-start">
                    <h1 className="text-4xl font-black mb-3 tracking-tight">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-muted text-lg tracking-tight font-medium opacity-70">
                            {description}
                        </p>
                    )}
                </div>

                {actions && (
                    <div className="flex items-center gap-4 shrink-0">
                        {actions}
                    </div>
                )}
            </div>
        </header>
    )
}
