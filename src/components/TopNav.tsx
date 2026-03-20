'use client'

import { Search, Bell, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function TopNav({ user }: { user?: any }) {
    const pathname = usePathname()

    // Skip nav on public budget view or auth
    if (pathname.startsWith('/orcamento/') || pathname.startsWith('/auth/')) return null;

    const getBreadcrumbs = () => {
        const parts = pathname.split('/').filter(Boolean)
        return parts.map((part, index) => {
            const href = '/' + parts.slice(0, index + 1).join('/')
            const label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ')
            return { label, href, isLast: index === parts.length - 1 }
        })
    }

    const breadcrumbs = getBreadcrumbs()

    return (
        <header className="h-20 flex items-center justify-between px-10 border-b border-white/5 bg-[#0f0f11]/80 backdrop-blur-md sticky top-0 z-40">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-3 text-sm font-bold text-muted transition-colors">
                <Link href="/dashboard" className="hover:text-white transition-colors">Home</Link>
                {breadcrumbs.map((crumb, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <ChevronRight size={14} className="text-white/10" />
                        <Link 
                            href={crumb.href} 
                            className={`${crumb.isLast ? 'text-white' : 'hover:text-white transition-colors'}`}
                            style={{ opacity: crumb.isLast ? 1 : 0.6 }}
                        >
                            {crumb.label}
                        </Link>
                    </div>
                ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-8">
                {/* Search */}
                <div className="relative group hidden lg:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/40 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                        type="search" 
                        placeholder="Search..." 
                        className="bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-2.5 w-64 text-sm focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all outline-none" 
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2.5 rounded-xl bg-white/5 border border-white/5 text-muted hover:text-white hover:border-white/10 transition-all group">
                    <Bell size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                </button>

                {/* Avatar */}
                <button className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-md group-hover:scale-110 transition-transform">
                        {user?.name?.charAt(0) || 'A'}
                    </div>
                    <div className="text-left leading-none space-y-1">
                        <p className="text-xs font-black tracking-tighter text-white">{user?.name || 'User'}</p>
                        <p className="text-[10px] font-bold text-muted tracking-widest uppercase opacity-60">Admin</p>
                    </div>
                </button>
            </div>
        </header>
    )
}
