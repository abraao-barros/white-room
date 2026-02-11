import Link from 'next/link'
import AuthForm from '@/components/AuthForm'
import { PlusCircle } from 'lucide-react'

export default function RegisterPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
            <div className="w-full max-w-md flex flex-col items-center gap-10">
                <Link href="/" className="text-3xl font-black tracking-tight mb-4">
                    Budget<span className="text-primary">Gen</span>
                </Link>

                <div className="card-base w-full !bg-surface/50 p-8 shadow-2xl">
                    <div className="text-center mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                            <PlusCircle size={24} />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Novo por aqui?</h1>
                        <p className="text-muted text-sm">Junte-se a milhares de profissionais hoje</p>
                    </div>

                    <AuthForm type="register" />

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-sm text-muted">
                            Já possui uma conta?{' '}
                            <Link href="/auth/login" className="text-primary font-bold hover:underline transition-all">
                                Fazer Log-in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
