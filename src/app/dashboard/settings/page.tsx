import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import SettingsForm from '@/components/SettingsForm'


export default async function SettingsPage() {
    const session = await getSession()

    if (!session) {
        redirect('/auth/login')
    }

    return (
        <div className="min-h-screen bg-background text-white">
            <Navbar user={session} />

            <main className="container mx-auto px-6 pb-20 max-w-4xl">
                <SettingsForm />
            </main>
        </div>
    )
}
