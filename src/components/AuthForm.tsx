'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, ArrowRight } from 'lucide-react'

interface AuthFormProps {
    type: 'login' | 'register'
}

export default function AuthForm({ type }: AuthFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const url = type === 'login' ? '/api/auth/login' : '/api/auth/register'

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || 'Erro ao realizar operação')
            }

            if (type === 'login') {
                router.push('/dashboard')
                router.refresh()
            } else {
                router.push('/auth/login')
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            {type === 'register' && (
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted uppercase ml-1">Nome Completo</label>
                    <input
                        type="text"
                        className="input-base !py-4"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Como quer ser chamado?"
                    />
                </div>
            )}
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted uppercase ml-1">E-mail</label>
                <input
                    type="email"
                    className="input-base !py-4"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@exemplo.com"
                />
            </div>
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted uppercase ml-1">Senha</label>
                <input
                    type="password"
                    className="input-base !py-4"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                />
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium text-center">
                    {error}
                </div>
            )}

            <button
                disabled={loading}
                className="btn-primary h-14 mt-4 w-full shadow-lg shadow-primary/20 flex items-center justify-center gap-3 group"
                type="submit"
            >
                {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                ) : (
                    <>
                        {type === 'login' ? 'Acessar Conta' : 'Criar minha Conta'}
                        <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </form>
    )
}
