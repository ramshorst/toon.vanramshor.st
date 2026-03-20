"use client";

import { motion } from "framer-motion";
import { Cpu, Atom, HardHat, Building2, Code2 } from "lucide-react";

const industries = [
    { label: "Semiconductors & Computer Hardware", icon: Cpu },
    { label: "Nanotechnologies", icon: Atom },
    { label: "Construction", icon: HardHat },
    { label: "Real Estate", icon: Building2 },
    { label: "Software Publishing", icon: Code2 },
];

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay },
    }),
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: (delay = 0) => ({
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut", delay },
    }),
};

export function AboutContent() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-6">
            <motion.h1
                className="text-5xl font-bold mb-6 tracking-tight"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
            >
                Designing the Future of Work.
            </motion.h1>

            <div className="prose prose-lg dark:prose-invert max-w-none">
                <motion.p
                    className="lead text-xl text-muted-foreground mb-12"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.1}
                >
                    I bridge the gap between complex technical requirements and intuitive user experiences.
                    As a Technical Designer & AI Coder, I specialize in crafting robust B2B products and SaaS applications that are as beautiful as they are functional.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-12 my-16">
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2}>
                        <h3 className="text-2xl font-semibold mb-4">The Philosophy</h3>
                        <p>
                            My approach is rooted in clarity. Whether it's a complex dashboard or an AI-driven workflow,
                            I believe in design that empowers users and code that scales effortlessly.
                            I don't just build interfaces; I architect solutions that solve real business problems.
                        </p>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3}>
                        <h3 className="text-2xl font-semibold mb-4">The Stack</h3>
                        <p>
                            I build with precision using modern tools like <strong>React, Vue, and Svelte</strong>.
                            Beyond traditional coding, I leverage <strong>AI agents</strong> to automate the mundane,
                            allowing teams to focus on what truly matters.
                        </p>
                    </motion.div>
                </div>

                <motion.hr
                    className="border-border my-12"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    custom={0.35}
                />

                <motion.h2
                    className="text-3xl font-bold mb-6"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.4}
                >
                    Industry Expertise
                </motion.h2>
                <motion.p
                    className="mb-6"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.45}
                >
                    I have applied this pragmatic, design-led approach across diverse and demanding sectors, translating specialized needs into seamless digital tools:
                </motion.p>

                <ul className="flex flex-wrap gap-2 list-none pl-0 not-prose">
                    {industries.map(({ label, icon: Icon }, index) => (
                        <motion.li
                            key={label}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.5 + index * 0.07}
                        >
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 border border-transparent hover:border-border transition-colors text-sm font-medium">
                                <Icon size={13} className="text-primary flex-shrink-0" />
                                {label}
                            </span>
                        </motion.li>
                    ))}
                </ul>

                <motion.hr
                    className="border-border my-12"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    custom={0.85}
                />

                <motion.div
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-muted/30 p-8 rounded-2xl"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.9}
                >
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
                </motion.div>
            </div>
        </div>
    );
}
