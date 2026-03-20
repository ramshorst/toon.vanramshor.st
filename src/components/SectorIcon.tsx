import {
    Landmark,
    HeartPulse,
    Cloud,
    ShoppingCart,
    GraduationCap,
    Tv2,
    Car,
    Building2,
    Briefcase,
    Cpu,
    Globe,
    Gamepad2,
    Package,
    BarChart2,
    Leaf,
    Zap,
    Palette,
    Smartphone,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

const SECTOR_ICONS: Record<string, React.ComponentType<LucideProps>> = {
    fintech: Landmark,
    finance: Landmark,
    healthtech: HeartPulse,
    medtech: HeartPulse,
    health: HeartPulse,
    saas: Cloud,
    ecommerce: ShoppingCart,
    retail: ShoppingCart,
    edtech: GraduationCap,
    education: GraduationCap,
    media: Tv2,
    mobility: Car,
    automotive: Car,
    gov: Building2,
    government: Building2,
    enterprise: Briefcase,
    hardware: Cpu,
    web: Globe,
    gaming: Gamepad2,
    logistics: Package,
    analytics: BarChart2,
    sustainability: Leaf,
    energy: Zap,
    design: Palette,
    mobile: Smartphone,
};

export function SectorIcon({ sector, size = 18 }: { sector: string; size?: number }) {
    const Icon = SECTOR_ICONS[sector?.toLowerCase()] ?? Briefcase;
    return <Icon size={size} strokeWidth={1.75} />;
}
