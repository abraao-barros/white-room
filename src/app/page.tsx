import { getSession } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import CTA from '@/components/landing/CTA'
import Footer from '@/components/landing/Footer'

export default async function Home() {
  const session = await getSession()

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated Light Spots - Centralized */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:3s]" />
        <div className="absolute top-[50%] left-[-5%] w-[35%] h-[35%] bg-primary/5 blur-[100px] rounded-full animate-pulse [animation-delay:1.5s]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[45%] h-[45%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />

        {/* Modern Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Subtle Horizontal Lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pb-20">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent absolute top-[20%]" />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent absolute top-[45%]" />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent absolute top-[70%]" />
        </div>
      </div>

      <div className="relative z-10 antialiased">
        <Navbar user={session} />

        <main>
          <Hero session={session} />
          <Features />
          <CTA />
        </main>

        <Footer />
      </div>
    </div>
  )
}
