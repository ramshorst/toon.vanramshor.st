import { getProjects } from "@/lib/projects";
import { ProjectTimeline } from "@/components/ProjectTimeline";

export const metadata = {
    title: "Projects",
    description: "Design engineering work — case studies spanning product design, frontend architecture, and the overlap between.",
};

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16">
            <div className="mb-16 max-w-2xl">
                <h1 className="text-4xl font-bold mb-4">Projects</h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    Design engineering work — the kind that lives between Figma and production.
                    Each project here involved shaping how something looks, feels, and works in code.
                </p>
            </div>
            <ProjectTimeline projects={projects} />
        </div>
    );
}
