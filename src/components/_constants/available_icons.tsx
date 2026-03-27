import { BarChart, Briefcase, CheckCircle, Code, Cpu, Globe, Layout, Lightbulb, MessageSquare, Monitor, Palette, PenTool, Rocket, Search, Settings, Smartphone, Target, Users, Zap } from "lucide-react"

export type IconOption = {
    value: string
    label: string
}

export const AVAILABLE_ICONS: IconOption[] = [
    { value: 'Target', label: 'Alvo / Objetivo (Target)' },
    { value: 'Search', label: 'Pesquisa / Diagnóstico (Search)' },
    { value: 'PenTool', label: 'Design / Criação (PenTool)' },
    { value: 'Lightbulb', label: 'Ideia / Referências (Lightbulb)' },
    { value: 'Monitor', label: 'Telas / Protótipo (Monitor)' },
    { value: 'Layout', label: 'Interface / Layout (Layout)' },
    { value: 'Code', label: 'Desenvolvimento (Code)' },
    { value: 'Cpu', label: 'Engenharia / Sistema (Cpu)' },
    { value: 'Smartphone', label: 'Mobile / App (Smartphone)' },
    { value: 'MessageSquare', label: 'Briefing / Reunião (MessageSquare)' },
    { value: 'Users', label: 'Público / Testes (Users)' },
    { value: 'Settings', label: 'Configuração / Ajustes (Settings)' },
    { value: 'Zap', label: 'Performance / Otimização (Zap)' },
    { value: 'Rocket', label: 'Lançamento / Entrega (Rocket)' },
    { value: 'CheckCircle', label: 'Aprovação / Qualidade (CheckCircle)' },
    { value: 'BarChart', label: 'Métricas / Resultados (BarChart)' },
    { value: 'Briefcase', label: 'Comercial / Contrato (Briefcase)' },
    { value: 'Palette', label: 'Marcas / Cores (Palette)' },
    { value: 'Globe', label: 'Web / Internacional (Globe)' },
]

export const AVAILABLE_ICONS_MAP: Record<string, any> = {
    Target: Target,
    Search: Search,
    PenTool: PenTool,
    Lightbulb: Lightbulb,
    Monitor: Monitor,
    Layout: Layout,
    Code: Code,
    Cpu: Cpu,
    Smartphone: Smartphone,
    MessageSquare: MessageSquare,
    Users: Users,
    Settings: Settings,
    Zap: Zap,
    Rocket: Rocket,
    CheckCircle: CheckCircle,
    BarChart: BarChart,
    Briefcase: Briefcase,
    Palette: Palette,
    Globe: Globe,
}

export const AVAILABLE_ICONS_WITH_COMPONENTS = AVAILABLE_ICONS.map((icon: IconOption) => {
    return {
        value: icon.value,
        label: icon.label,
    }
})
