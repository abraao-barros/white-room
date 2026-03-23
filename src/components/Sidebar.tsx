'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Users,
    Settings,
    LogOut,
    PlusCircle
} from 'lucide-react'

const MENU_ITEMS = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Novo orçamento', icon: FileText, href: '/dashboard/new' },
    { label: 'Status de Orçamentos', icon: Briefcase, href: '/dashboard/status' },
]

export default function Sidebar() {
    const pathname = usePathname()

    // Hide sidebar on public budget view
    if (pathname.startsWith('/orcamento/')) return null;
    if (pathname.startsWith('/auth/')) return null;

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#111115] border-r border-white/5 flex flex-col z-50 transition-all duration-300">
            {/* Logo */}
            <div className="p-8">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <PlusCircle size={24} className="text-white rotate-45" />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-white">Budget<span className="text-primary">Gen</span></span>
                </Link>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                    const Icon = item.icon
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive ? 'bg-primary/10 text-primary shadow-sm shadow-primary/5' : 'text-muted/60 hover:bg-white/5 hover:text-white'}`}
                        >
                            <Icon size={20} className={isActive ? 'text-primary' : 'group-hover:text-white transition-colors'} />
                            <span className="font-bold tracking-tight text-sm">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Footer Items */}
            <div className="p-4 border-t border-white/5 space-y-2">
                <Link
                    href="/dashboard/settings"
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${pathname.startsWith('/dashboard/settings') ? 'bg-primary/10 text-primary' : 'text-muted/60 hover:bg-white/5 hover:text-white'}`}
                >
                    <Settings size={20} className={pathname.startsWith('/dashboard/settings') ? 'text-primary' : 'group-hover:text-white transition-colors'} />
                    <span className="font-bold tracking-tight text-sm">Configurações</span>
                </Link>
                <button
                    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 text-red-400/60 hover:bg-red-500/10 hover:text-red-400 group"
                    onClick={async () => {
                        await fetch('/api/auth/logout', { method: 'POST' })
                        window.location.href = '/auth/login'
                    }}
                >
                    <LogOut size={20} className="group-hover:text-red-400 transition-colors" />
                    <span className="font-bold tracking-tight text-sm">Sair da conta</span>
                </button>
            </div>
        </aside>
    )
}
