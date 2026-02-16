import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="container mx-auto px-6 py-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 text-muted uppercase text-[10px] font-bold tracking-[0.2em]">
            <div className="flex items-center gap-12">
                <Link href="/" className="text-white/40 hover:text-white transition-colors">Twitter</Link>
                <Link href="/" className="text-white/40 hover:text-white transition-colors">LinkedIn</Link>
                <Link href="/" className="text-white/40 hover:text-white transition-colors">YouTube</Link>
            </div>
            <p>© {currentYear} BudgetGen — O futuro dos orçamentos digitais.</p>
        </footer>
    )
}
