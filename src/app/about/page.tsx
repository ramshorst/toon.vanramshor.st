import { AboutContent } from "@/components/AboutContent";
import { getProjects } from "@/lib/projects";

export const metadata = {
    title: "About | Toon van Ramshorst",
    description: "About Toon van Ramshorst - Technical Designer & AI Coder",
};

const INDUSTRY_SECTORS: Record<string, string> = {
    "Semiconductor": "semiconductor",
    "SaaS": "SaaS",
    "Proptech": "proptech",
    "E-commerce": "e-commerce",
    "Hospitality": "hospitality",
    "Food Delivery": "food delivery",
};

// Maps each tech display name to the project tags to search for
const TECH_TAG_MATCHES: Record<string, string[]> = {
    "Svelte & SvelteKit": ["Svelte", "SvelteKit"],
    "React & Next.js": ["React", "Next.js"],
    "TypeScript": ["TypeScript"],
    "Tailwind CSS": ["Tailwind", "Tailwind CSS", "TailwindCSS"],
    "Supabase": ["Supabase"],
    "PocketBase": ["PocketBase"],
    "shadcn/ui": ["shadcn/ui"],
};

function mostRecentProject(projects: Awaited<ReturnType<typeof getProjects>>, tags: string[]) {
    return projects
        .filter((p) => p.tags.some((t) => tags.includes(t)))
        .sort((a, b) => (b.endYear ?? b.year) - (a.endYear ?? a.year))[0];
}

export default async function AboutPage() {
    const projects = await getProjects();

    const industryLinks: Record<string, string> = {};
    for (const [label, sector] of Object.entries(INDUSTRY_SECTORS)) {
        const match = projects
            .filter((p) => p.sector === sector)
            .sort((a, b) => (b.endYear ?? b.year) - (a.endYear ?? a.year))[0];
        if (match) industryLinks[label] = `/projects#${match.slug}`;
    }

    const techLinks: Record<string, string> = {};
    for (const [label, tags] of Object.entries(TECH_TAG_MATCHES)) {
        const match = mostRecentProject(projects, tags);
        if (match) techLinks[label] = `/projects#${match.slug}`;
    }

    return <AboutContent industryLinks={industryLinks} techLinks={techLinks} />;
}
