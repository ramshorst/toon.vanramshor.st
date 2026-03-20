"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Cpu, BedDouble, Utensils, Building2, Cloud, ShoppingCart } from "lucide-react";

const industries = [
    { label: "Semiconductor", icon: Cpu },
    { label: "SaaS", icon: Cloud },
    { label: "Proptech", icon: Building2 },
    { label: "E-commerce", icon: ShoppingCart },
    { label: "Hospitality", icon: BedDouble },
    { label: "Food Delivery", icon: Utensils },
];

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay },
    }),
};

const fadeIn: Variants = {
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
                Hi, I'm Toon.
            </motion.h1>

            <div className="prose prose-lg dark:prose-invert max-w-none">
                <motion.p
                    className="lead text-xl text-muted-foreground mb-12"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.1}
                >
                    I'm a design engineer based in Lyon. I care about making software that feels good to use —
                    the kind where the design and the code are hard to tell apart.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-12 my-16">
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2}>
                        <h3 className="text-2xl font-semibold mb-4">How I work</h3>
                        <p>
                            I tend to work across design and engineering rather than staying on one side of the fence.
                            That usually means fewer handoff problems and products that actually match what was intended.
                        </p>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3}>
                        <h3 className="text-2xl font-semibold mb-4">What I build with</h3>
                        <p>
                            Mostly <strong>React, Vue, and Svelte</strong> on the frontend.
                            I reach for whatever fits the job — and I'm comfortable going full-stack when needed.
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
                    Industries I've worked in
                </motion.h2>
                <motion.p
                    className="mb-6"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.45}
                >
                    A mix of sectors — each with their own quirks and constraints:
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

                <motion.h2
                    className="text-3xl font-bold mb-6"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.88}
                >
                    Technologies
                </motion.h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 not-prose mb-12">
                    {[
                        { name: "Svelte & SvelteKit", note: "go-to for new projects" },
                        { name: "React & Next.js", note: "most client work" },
                        { name: "TypeScript", note: "always" },
                        { name: "Tailwind CSS", note: "for styling" },
                        { name: "Supabase", note: "auth & db" },
                        { name: "PocketBase", note: "lightweight backend" },
                        { name: "shadcn/ui", note: "component library" },
                    ].map(({ name, note }, index) => (
                        <motion.div
                            key={name}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.9 + index * 0.05}
                            className="flex flex-col gap-0.5 px-4 py-3 rounded-xl bg-muted/60 border border-transparent hover:border-border transition-colors"
                        >
                            <span className="text-sm font-medium">{name}</span>
                            <span className="text-xs text-muted-foreground">{note}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1.2}
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline no-underline"
                    >
                        See what I've built →
                    </Link>
                </motion.div>

                <motion.hr
                    className="border-border my-12"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    custom={1.25}
                />

                <motion.div
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-muted/30 p-8 rounded-2xl"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.9}
                >
                    <div>
                        <h3 className="text-xl font-bold mb-2">Based in Lyon, open to remote.</h3>
                        <p className="text-muted-foreground m-0">
                            I speak French, English and Dutch.
                        </p>
                    </div>
                    <a
                        href="https://calendly.com/ramshorst/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity whitespace-nowrap no-underline"
                    >
                        Let's talk
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
