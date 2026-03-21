import {
    siReact,
    siTypescript,
    siJavascript,
    siFigma,
    siNextdotjs,
    siTailwindcss,
    siFramer,
    siVuedotjs,
    siNuxt,
    siSvelte,
    siGraphql,
    siNodedotjs,
    siVercel,
    siGithub,
    siStorybook,
    siWebflow,
    siPython,
    siRust,
    siGo,
    siDocker,
    siPostgresql,
    siPrisma,
    siSupabase,
    siStripe,
    siPhp,
    siMysql,
    siShopify,
    siSketch,
} from "simple-icons";
import {
    Cloud,
    ShoppingCart,
    Landmark,
    Map,
    Compass,
    Search,
    BarChart2,
    Database,
    Globe,
    BedDouble,
    Mail,
    FolderTree,
    Palette,
    Fingerprint,
    Frame,
    Ticket,
    Type,
    Layout,
    Code2,
    Layers,
    Smartphone,
    Tablet,
    Utensils,
    Building2,
    Briefcase,
    MousePointer,
    Zap,
    type LucideIcon,
} from "lucide-react";

type SimpleIcon = { path: string; title: string; hex: string };

const SIMPLE_ICONS: Record<string, SimpleIcon> = {
    "React": siReact,
    "TypeScript": siTypescript,
    "JavaScript": siJavascript,
    "Figma": siFigma,
    "Next.js": siNextdotjs,
    "Tailwind CSS": siTailwindcss,
    "Tailwind": siTailwindcss,
    "TailwindCSS": siTailwindcss,
    "Framer": siFramer,
    "Vue": siVuedotjs,
    "Vue.js": siVuedotjs,
    "Nuxt.js": siNuxt,
    "Svelte": siSvelte,
    "GraphQL": siGraphql,
    "Node.js": siNodedotjs,
    "Vercel": siVercel,
    "GitHub": siGithub,
    "Storybook": siStorybook,
    "Webflow": siWebflow,
    "Python": siPython,
    "Rust": siRust,
    "Go": siGo,
    "Docker": siDocker,
    "PostgreSQL": siPostgresql,
    "Prisma": siPrisma,
    "Supabase": siSupabase,
    "Stripe": siStripe,
    "PHP": siPhp,
    "MySQL": siMysql,
    "Shopify": siShopify,
    "Sketch": siSketch,
};

const LUCIDE_ICONS: Record<string, LucideIcon> = {
    "AWS": Cloud,
    "E-commerce": ShoppingCart,
    "Architecture": Landmark,
    "Urban Planning": Map,
    "Spatial Reasoning": Compass,
    "SEO": Search,
    "Analytics": BarChart2,
    "CMS": Database,
    "CRUD": Database,
    "Multilingual": Globe,
    "Hospitality": BedDouble,
    "IMAP": Mail,
    "Content Architecture": FolderTree,
    "Graphic Design": Palette,
    "Visual Identity": Fingerprint,
    "Exhibition": Frame,
    "Cultural": Ticket,
    "Typography": Type,
    "UI Design": Layout,
    "Front-end": Code2,
    "Design Systems": Layers,
    "iOS": Smartphone,
    "iPad": Tablet,
    "Food Tech": Utensils,
    "Data": BarChart2,
    "Proptech": Building2,
    "B2B": Briefcase,
    "UX": MousePointer,
    "SaaS": Cloud,
    "Liquid": Code2,
    "Neon": Zap,
    "shadcn/ui": Layers,
};

export function TechBadge({ tag, href }: { tag: string; href?: string }) {
    const simpleIcon = SIMPLE_ICONS[tag];
    const LucideIconComponent = LUCIDE_ICONS[tag];

    const inner = (
        <>
            {simpleIcon && (
                <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                    className="shrink-0 opacity-70"
                >
                    <path d={simpleIcon.path} />
                </svg>
            )}
            {!simpleIcon && LucideIconComponent && (
                <LucideIconComponent size={11} className="shrink-0 opacity-70" />
            )}
            {tag}
        </>
    );

    const className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium";

    if (href) {
        return (
            <a href={href} className={`${className} hover:bg-secondary/70 transition-colors`}>
                {inner}
            </a>
        );
    }

    return <span className={className}>{inner}</span>;
}
