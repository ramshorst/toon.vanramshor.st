"use client";

import Link from "next/link";
import { useState } from "react";
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
                <div className="flex items-center gap-1 text-sm">
                    {(["writing", "components"] as Tab[]).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-3 py-1 rounded-full transition-colors capitalize ${
                                tab === t
                                    ? "bg-foreground text-background"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {t}
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
                            className="flex items-baseline justify-between gap-6 py-4 group"
                        >
                            <div className="flex items-baseline gap-3 min-w-0">
                                <span className="shrink-0 text-xs text-muted-foreground/50 uppercase tracking-wider hidden sm:inline">
                                    {entry.type === "writing" ? "essay" : "component"}
                                </span>
                                <span className="text-base font-medium group-hover:text-primary transition-colors leading-snug truncate">
                                    {entry.title}
                                </span>
                            </div>
                            <time className="shrink-0 text-sm text-muted-foreground tabular-nums">
                                {new Date(entry.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                })}
                            </time>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
