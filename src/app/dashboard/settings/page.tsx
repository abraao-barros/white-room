import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SettingsForm from '@/components/SettingsForm'


export default async function SettingsPage() {
    const session = await getSession()

    if (!session) {
        redirect('/auth/login')
    }

    return (
        <div className="p-10 max-w-5xl mx-auto animate-in fade-in duration-700">
            <header className="mb-12">
                <h1 className="text-4xl font-black tracking-tight mb-2">Configurações do Sistema</h1>
                <p className="text-muted font-medium opacity-70 italic">Personalize textos globais e branding para todas as suas propostas de orçamento.</p>
            </header>
            <SettingsForm />
        </div>
    )
}
