import { motion } from "framer-motion";

export const metadata = {
    title: "About | Toon van Ramshorst",
    description: "About Toon van Ramshorst - Technical Designer & AI Coder",
};

export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto py-12">
            <h1 className="text-4xl font-bold mb-8">About Me</h1>

            <div className="prose prose-lg dark:prose-invert">
                <p className="lead">
                    I design and develop web interfaces with a focus on B2B products and SaaS applications. My playground: transforming complex business needs into simple, efficient, and enjoyable experiences.
                </p>

                <p>
                    On the technical side, I work mainly with <strong>JavaScript (React.js, Vue.js, Svelte)</strong>, with a high standard for frontend quality: pixel-perfect UI, fluid UX, and clean, structured code.
                </p>

                <p>
                    I also integrate <strong>AI bricks</strong> (agents, automations, tools like Claude Code, etc.) to accelerate workflows, enrich products, or help teams gain productivity.
                </p>

                <h3>My Approach</h3>
                <p>
                    Pragmatic, result-oriented, with direct and transparent dialogue. Trilingual (French / Dutch / English), I can work with international teams. Based in Lyon, available remotely or on-site if needed.
                </p>

                <h2>Experience</h2>
                <div className="not-prose space-y-8">
                    <div className="border-l-2 border-border pl-6 relative">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary" />
                        <h3 className="text-xl font-bold">Full Stack Designer</h3>
                        <div className="text-muted-foreground mb-2">Trackstone • May 2020 - Oct 2022</div>
                        <p className="text-muted-foreground">
                            Product design and front-end development for a real estate investment monitoring web app.
                            Interface implementation in Vue.js. Design of user acquisition pages.
                        </p>
                    </div>
                    {/* Add more experience items if available */}
                </div>

                <h2>Skills</h2>
                <div className="not-prose flex flex-wrap gap-2">
                    {["Vibe Coding", "JavaScript", "React.js", "Vue.js", "Svelte", "B2B Software", "UI Design", "UX Design", "Front-end Development", "AI Agents"].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
