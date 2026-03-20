'use client'

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import TopNav from '@/components/TopNav'

export default function LayoutWrapper({ 
  children, 
  user 
}: { 
  children: React.ReactNode,
  user: any
}) {
  const pathname = usePathname()
  
  const isPublic = pathname.startsWith('/orcamento/') || pathname.startsWith('/auth/')

  if (isPublic) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 pl-64 transition-all duration-300">
        <TopNav user={user} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
