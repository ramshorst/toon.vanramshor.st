import { motion } from "framer-motion";

export const metadata = {
    title: "About | Toon van Ramshorst",
    description: "About Toon van Ramshorst - Technical Designer & AI Coder",
};

export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-6">
            <h1 className="text-5xl font-bold mb-6 tracking-tight">Designing the Future of Work.</h1>

            <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="lead text-xl text-muted-foreground mb-12">
                    I bridge the gap between complex technical requirements and intuitive user experiences.
                    As a Technical Designer & AI Coder, I specialize in crafting robust B2B products and SaaS applications that are as beautiful as they are functional.
                </p>

                <div className="grid md:grid-cols-2 gap-12 my-16">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">The Philosophy</h3>
                        <p>
                            My approach is rooted in clarity. Whether it's a complex dashboard or an AI-driven workflow,
                            I believe in design that empowers users and code that scales effortlessly.
                            I don't just build interfaces; I architect solutions that solve real business problems.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">The Stack</h3>
                        <p>
                            I build with precision using modern tools like <strong>React, Vue, and Svelte</strong>.
                            Beyond traditional coding, I leverage <strong>AI agents</strong> to automate the mundane,
                            allowing teams to focus on what truly matters.
                        </p>
                    </div>
                </div>

                <hr className="border-border my-12" />

                <h2 className="text-3xl font-bold mb-8">Industry Expertise</h2>
                <p className="mb-6">
                    I have applied this pragmatic, design-led approach across diverse and demanding sectors, translating specialized needs into seamless digital tools:
                </p>
                <ul className="grid sm:grid-cols-2 gap-4 list-none pl-0">
                    {[
                        "Semiconductors & Computer Hardware",
                        "Nanotechnologies",
                        "Construction",
                        "Real Estate",
                        "Software Publishing"
                    ].map((industry) => (
                        <li key={industry} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-transparent hover:border-border transition-colors">
                            <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                            <span className="font-medium">{industry}</span>
                        </li>
                    ))}
                </ul>

                <hr className="border-border my-12" />

                <h2 className="text-3xl font-bold mb-8">Working Model</h2>
                <p className="mb-8">
                    I operate on a fractional basis, selling my time in dedicated full-day slots to select companies.
                    This allows me to integrate deeply with your team as a long-term partner, working consistently throughout the year
                    to drive projects forward.
                </p>

                <div className="bg-card border border-border rounded-xl p-6 mb-12">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                        2026 Availability
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                        {[
                            { day: "Monday", status: "Booked" },
                            { day: "Tuesday", status: "Available" },
                            { day: "Wednesday", status: "Booked" },
                            { day: "Thursday", status: "Available" },
                            { day: "Friday", status: "Booked" },
                        ].map((slot) => (
                            <div
                                key={slot.day}
                                className={`
                                    flex flex-col items-center justify-center p-4 rounded-lg border text-center transition-all
                                    ${slot.status === "Available"
                                        ? "bg-primary/10 border-primary text-primary font-medium scale-105 shadow-sm"
                                        : "bg-muted/30 border-transparent text-muted-foreground opacity-70"
                                    }
                                `}
                            >
                                <span className="text-sm uppercase tracking-wider mb-1">{slot.day}</span>
                                <span className="font-bold">{slot.status}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-6 text-center">
                        Currently accepting discussions for the Tuesday slot.
                    </p>
                </div>

                <hr className="border-border my-12" />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-muted/30 p-8 rounded-2xl">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Based in Lyon, Thinking Globally.</h3>
                        <p className="text-muted-foreground m-0">
                            Available for remote collaboration. <br />I speak French, English and Dutch.
                        </p>
                    </div>
                    <a
                        href="https://calendly.com/ramshorst/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity whitespace-nowrap no-underline"
                    >
                        Let's Work Together
                    </a>
                </div>
            </div>
        </div>
    );
}
