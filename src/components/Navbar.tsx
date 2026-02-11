'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, PlusCircle, LayoutDashboard } from 'lucide-react'

export default function Navbar({ user }: { user?: any }) {
    const router = useRouter()

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/auth/login')
        router.refresh()
    }

    return (
        <nav className="glass-effect sticky top-0 z-50 py-4 mb-8">
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tight">
                    Budget<span className="text-primary">Gen</span>
                </Link>

                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <Link href="/dashboard" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>
                            <Link href="/dashboard/new" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                                <PlusCircle size={18} />
                                <span className="hidden sm:inline">Novo Orçamento</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                            >
                                <LogOut size={18} />
                                <span className="hidden sm:inline">Sair</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="text-sm font-medium hover:text-primary transition-colors">
                                Login
                            </Link>
                            <Link href="/auth/register" className="btn-primary py-2 px-4 text-sm">
                                Criar Conta
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
