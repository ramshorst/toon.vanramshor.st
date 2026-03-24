"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import type { BlogPost } from "@/lib/blog";
import { COMPONENTS } from "@/lib/components-registry";

type Tab = "writing" | "components";

export function Explorations({ posts }: { posts: BlogPost[] }) {
    const [tab, setTab] = useState<Tab>("writing");

    const writingEntries = posts.map((p) => ({
        title: p.title,
        date: p.publishedAt,
        href: p.category ? `/${p.category}/${p.slug}` : `/blog/${p.slug}`,
        type: "writing" as const,
    }));

    const componentEntries = COMPONENTS.map((c) => ({
        ...c,
        type: "components" as const,
    }));

    const visible = tab === "writing" ? writingEntries : componentEntries;

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Explorations</h2>
                <div className="flex items-center gap-0.5 bg-foreground/10 rounded-full p-1 text-sm">
                    {(["writing", "components"] as Tab[]).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className="relative px-3.5 py-1 rounded-full capitalize font-medium transition-colors duration-200"
                            style={{ color: tab === t ? "var(--foreground)" : "var(--muted-foreground)" }}
                        >
                            {tab === t && (
                                <motion.span
                                    layoutId="tab-pill"
                                    className="absolute inset-0 rounded-full bg-background shadow-sm"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{t}</span>
                        </button>
                    ))}
                </div>
            </div>

            {visible.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6">Nothing here yet — check back soon.</p>
            ) : (
                <div className="divide-y divide-border/60">
                    {visible.map((entry) => (
                        <Link
                            key={entry.href}
                            href={entry.href}
                            className="flex items-baseline gap-3 py-4 group"
                        >
                            <span className="shrink-0 text-xs text-muted-foreground/50 uppercase tracking-wider hidden sm:inline">
                                {entry.type === "writing" ? "essay" : "component"}
                            </span>
                            <span className="text-base font-medium group-hover:text-primary transition-colors leading-snug truncate">
                                {entry.title}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
