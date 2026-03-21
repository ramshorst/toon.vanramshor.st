"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TechBadge } from "./TechBadge";

const DEFAULT_VISIBLE = 10;

export function TechStack({ tags, tagLinks }: { tags: string[]; tagLinks: Record<string, string> }) {
    const [expanded, setExpanded] = useState(false);

    const visible = expanded ? tags : tags.slice(0, DEFAULT_VISIBLE);
    const hidden = tags.length - DEFAULT_VISIBLE;

    return (
        <div>
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Tech stack</h2>
                <Link href="/projects" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    All projects
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>

            <div className="flex flex-wrap gap-2">
                {visible.map((tag) => (
                    <TechBadge key={tag} tag={tag} href={tagLinks[tag]} />
                ))}
                {!expanded && hidden > 0 && (
                    <button
                        onClick={() => setExpanded(true)}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/70 transition-colors cursor-pointer"
                    >
                        +{hidden} more
                    </button>
                )}
            </div>
        </div>
    );
}
