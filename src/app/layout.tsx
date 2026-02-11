import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BudgetGen | Orçamentos Profissionais em Segundos',
  description: 'A plataforma definitiva para freelancers e agências gerarem propostas profissionais que convertem.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}
