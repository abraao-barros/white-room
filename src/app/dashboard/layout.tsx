import { getSession } from '@/lib/auth'
import LayoutWrapper from '@/components/LayoutWrapper'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()

  return (
    <LayoutWrapper user={session}>
      {children}
    </LayoutWrapper>
  )
}
