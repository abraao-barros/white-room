import { db } from '@/lib/db'
import { budgets, systemSettings } from '@/lib/db/schema'
import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'

// Components
import { BudgetHeader } from '@/components/budget-view/BudgetHeader'
import { BudgetPillars } from '@/components/budget-view/BudgetPillars'
import { BudgetDeliverables } from '@/components/budget-view/BudgetDeliverables'
import { BudgetInvestment } from '@/components/budget-view/BudgetInvestment'
import { BudgetFooter } from '@/components/budget-view/BudgetFooter'

export default async function PublicBudgetPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const budget = await db.query.budgets.findFirst({
        where: eq(budgets.slug, slug),
        with: {
            user: true,
        },
    })

    if (!budget) notFound()

    // Fetch system settings for the project owner
    const settingsRows = await db
        .select()
        .from(systemSettings)
        .where(eq(systemSettings.userId, budget.userId))
    const settings = settingsRows.reduce((acc, row) => {
        acc[row.id] = row.value
        return acc
    }, {} as Record<string, string>)

    const deliverables = (budget.deliverables as string[]) || []

    const getSetting = (id: string, defaultValue: string) => settings[id] || defaultValue

    // Theme Variables
    const themePrimary = getSetting('theme_primary', '#b185ff')
    const themeSecondary = getSetting('theme_secondary', '#a855f7')
    const themeBg = getSetting('theme_bg', '#09090b')
    const themeCardBg = getSetting('theme_card_bg', '#16161a')
    const themeText = getSetting('theme_text', '#ffffff')

    return (
        <div
            className="min-h-screen transition-colors duration-700 font-sans selection:bg-primary/30 antialiased"
            style={{
                backgroundColor: themeBg,
                color: themeText,
                ['--primary' as any]: themePrimary,
                ['--secondary' as any]: themeSecondary,
                ['--card-bg' as any]: themeCardBg,
                ['--text-color' as any]: themeText
            }}
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                .text-primary { color: var(--primary) !important; }
                .bg-primary { background-color: var(--primary) !important; }
                .border-primary { border-color: var(--primary) !important; }
                .shadow-primary { --tw-shadow-color: var(--primary) !important; }
                .text-muted { color: var(--text-color); opacity: 0.6; }
                .card-base { 
                    background-color: var(--card-bg) !important; 
                    border: 2px solid rgba(255,255,255,0.05);
                }
                .card-premium { 
                    background-color: var(--card-bg) !important; 
                    border: 2px solid rgba(255,255,255,0.05);
                    transition: all 0.3s ease;
                }
                .card-premium:hover {
                    border-color: var(--primary);
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
                }
            `}} />

            <main className="container mx-auto px-6 py-20 lg:py-32 max-w-6xl">
                <BudgetHeader 
                    getSetting={getSetting} 
                    projectName={budget.projectName || ''} 
                    description={budget.description || ''} 
                />

                <BudgetPillars 
                    strategicPillars={budget.strategicPillars} 
                    getSetting={getSetting} 
                />

                <section className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32 items-start">
                    <BudgetDeliverables 
                        deliverables={deliverables} 
                        getSetting={getSetting} 
                    />
                    
                    <BudgetInvestment 
                        budget={budget} 
                        getSetting={getSetting} 
                    />
                </section>

                <BudgetFooter 
                    budget={budget} 
                    getSetting={getSetting} 
                />
            </main>
        </div>
    )
}
