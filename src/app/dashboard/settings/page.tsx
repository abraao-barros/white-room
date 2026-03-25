import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SettingsForm from '@/components/SettingsForm'


export default async function SettingsPage() {
    const session = await getSession()

    if (!session) {
        redirect('/auth/login')
    }

    return (
        <div className="p-10 max-w-[1600px] mx-auto animate-in fade-in duration-700">
            <SettingsForm />
        </div>
    )
}
