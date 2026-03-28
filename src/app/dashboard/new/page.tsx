import { getSession } from '@/lib/auth'
import BudgetForm from '@/components/BudgetForm'

export default async function NewBudgetPage() {
    await getSession()

    return (
        <div className="p-10 max-w-[1600px] mx-auto animate-in fade-in duration-700">
            <BudgetForm />
        </div>
    )
}
