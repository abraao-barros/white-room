import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import TopNav from '@/components/TopNav'
import LayoutWrapper from '@/components/LayoutWrapper'
import { getSession } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'BudgetGen | Orçamentos Profissionais em Segundos',
  description: 'A plataforma definitiva para freelancers e agências gerarem propostas profissionais que convertem.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()

  return (
    <html lang="pt-BR">
      <body className="antialiased selection:bg-primary/30 min-h-screen bg-[#070708] text-white">
        <LayoutWrapper user={session}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}
