export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#070708] text-white selection:bg-primary/30 antialiased">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-white/5 blur-[100px] rounded-full" />
            </div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}
