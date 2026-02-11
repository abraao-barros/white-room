import Link from 'next/link'
import { getSession } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import { ArrowRight, FileText, Zap, Shield, Sparkles, CheckCircle } from 'lucide-react'

export default async function Home() {
  const session = await getSession()

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Navbar user={session} />

      <main>
        {/* Modern Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-40 lg:pt-32">
          {/* Animated Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10 opacity-30 animate-pulse" />

          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-primary mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Sparkles size={14} /> Design de Orçamentos Reimaginado
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter leading-none mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
              Propostas que <br />
              <span className="text-primary italic">fecham contratos.</span>
            </h1>

            <p className="text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
              Transforme suas horas de trabalho em apresentações premium. <br className="hidden md:block" />
              A plataforma definitiva para freelancers que valorizam seu tempo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000">
              <Link href={session ? '/dashboard' : '/auth/register'} className="btn-primary h-16 px-12 text-lg shadow-2xl shadow-primary/30 group">
                Começar agora
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#features" className="btn-secondary h-16 px-12 text-lg">
                Ver Funcionalidades
              </Link>
            </div>

            {/* Visual Mockup */}
            <div className="mt-32 relative group">
              <div className="absolute inset-0 bg-primary/10 blur-[80px] -z-10 opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
              <div className="max-w-6xl mx-auto rounded-[32px] p-2 bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-1000">
                <div className="aspect-[16/9] bg-surface/50 rounded-[24px] border border-white/5 flex flex-col">
                  {/* Browser-like header */}
                  <div className="h-12 border-b border-white/5 flex items-center px-6 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                    </div>
                  </div>
                  {/* Fake UI Content */}
                  <div className="flex-1 p-8 grid grid-cols-12 gap-6 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                    <div className="col-span-3 space-y-4">
                      <div className="h-10 w-full bg-white/5 rounded-xl border border-white/5" />
                      <div className="h-40 w-full bg-white/5 rounded-2xl border border-white/5" />
                    </div>
                    <div className="col-span-9 space-y-6">
                      <div className="h-12 w-2/3 bg-primary/10 rounded-2xl border border-primary/20" />
                      <div className="grid grid-cols-2 gap-6 h-64">
                        <div className="bg-white/5 rounded-3xl border border-white/5" />
                        <div className="bg-white/5 rounded-3xl border border-white/5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Minimalist Section */}
        <section id="features" className="py-40 bg-surface/20 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <h2 className="text-4xl lg:text-5xl font-black mb-20 tracking-tight leading-tight">
                Construído para <span className="text-primary italic">profissionais</span> modernos.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-6 group">
                <div className="w-16 h-16 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-primary/5">
                  <Zap size={28} />
                </div>
                <h3 className="text-2xl font-bold">Geração Instantânea</h3>
                <p className="text-muted leading-relaxed">
                  Crie propostas PDF e páginas web interativas em menos de 2 minutos. Elimine o trabalho repetitivo.
                </p>
              </div>

              <div className="space-y-6 group">
                <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:bg-white group-hover:text-background transition-all duration-500">
                  <FileText size={28} />
                </div>
                <h3 className="text-2xl font-bold">Branding Profissional</h3>
                <p className="text-muted leading-relaxed">
                  Seus clientes recebem um link único com visual premium. Transmita confiança e autoridade desde o início.
                </p>
              </div>

              <div className="space-y-6 group">
                <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:bg-white group-hover:text-background transition-all duration-500">
                  <Shield size={28} />
                </div>
                <h3 className="text-2xl font-bold">Gestão Centralizada</h3>
                <p className="text-muted leading-relaxed">
                  Visualize todos os seus projetos, valores totais e status em um dashboard limpo e poderoso.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust/CTA Section */}
        <section className="py-40">
          <div className="container mx-auto px-6">
            <div className="card-base !bg-primary p-12 lg:p-24 rounded-[48px] overflow-hidden relative group border-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white">
                <div className="space-y-8">
                  <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
                    Pronto para elevar <br /> seu nível?
                  </h2>
                  <ul className="space-y-4">
                    {['Propostas Ilimitadas', 'URL pública customizada', 'Cálculo automático de ROI', 'Suporte Prioritário'].map((item) => (
                      <li key={item} className="flex items-center gap-3 font-bold">
                        <CheckCircle size={20} className="text-white/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-6 items-start lg:items-end">
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 w-full max-w-sm">
                    <p className="text-sm font-bold uppercase tracking-widest opacity-60 mb-8">Plano Único</p>
                    <p className="text-6xl font-black mb-2">R$ 0</p>
                    <p className="text-sm font-medium opacity-80 mb-10">Gratuito para sempre para freelancers individuais.</p>
                    <Link href="/auth/register" className="btn-secondary !bg-white !text-primary !border-none w-full h-14 font-black">
                      CRIAR CONTA AGORA
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 text-muted uppercase text-[10px] font-bold tracking-[0.2em]">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-white/40 hover:text-white transition-colors">Twitter</Link>
          <Link href="/" className="text-white/40 hover:text-white transition-colors">LinkedIn</Link>
          <Link href="/" className="text-white/40 hover:text-white transition-colors">YouTube</Link>
        </div>
        <p>© 2026 BudgetGen — O futuro dos orçamentos digitais.</p>
      </footer>
    </div>
  )
}
