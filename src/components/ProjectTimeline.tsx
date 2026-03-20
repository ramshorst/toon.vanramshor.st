"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Link2, Check, ExternalLink } from "lucide-react";
import { SectorIcon } from "./SectorIcon";
import { TechBadge } from "./TechBadge";
import type { Project } from "@/lib/projects";

const MAX_VISIBLE_TAGS = 4;

function groupByYear(projects: Project[]): Map<number, Project[]> {
    const map = new Map<number, Project[]>();
    for (const project of projects) {
        if (!map.has(project.year)) map.set(project.year, []);
        map.get(project.year)!.push(project);
    }
    return map;
}

export function ProjectTimeline({ projects }: { projects: Project[] }) {
    const [openSlug, setOpenSlug] = useState<string | null>(null);
    const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
    const itemRefs = useRef<Record<string, HTMLElement | null>>({});

    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        if (hash && projects.some((p) => p.slug === hash)) {
            setOpenSlug(hash);
            setTimeout(() => {
                itemRefs.current[hash]?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 150);
        }
    }, [projects]);

    function toggle(slug: string) {
        const next = openSlug === slug ? null : slug;
        setOpenSlug(next);
        if (next) {
            window.history.replaceState(null, "", `#${next}`);
            setTimeout(() => {
                const el = itemRefs.current[next];
                if (!el) return;
                const rect = el.getBoundingClientRect();
                if (rect.top < 96) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 400);
        } else {
            window.history.replaceState(null, "", window.location.pathname);
        }
    }

    function copyLink(slug: string) {
        const url = `${window.location.origin}${window.location.pathname}#${slug}`;
        navigator.clipboard.writeText(url);
        setCopiedSlug(slug);
        setTimeout(() => setCopiedSlug(null), 2000);
    }

    const grouped = groupByYear(projects);
    const years = Array.from(grouped.keys()).sort((a, b) => b - a);

    return (
        <div className="space-y-12">
            {years.map((year) => {
                const yearProjects = grouped.get(year)!;
                return (
                    <div key={year} className="grid md:grid-cols-[64px_1fr] lg:grid-cols-[88px_1fr] md:gap-8 lg:gap-12 items-start">
                        {/* Year label — inline on mobile, sticky gutter on md+ */}
                        <motion.div
                            className="font-mono tabular-nums text-muted-foreground/60 select-none text-sm mb-3 md:mb-0 md:text-base md:sticky md:top-24 md:pt-0.5"
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                        >
                            {year}
                        </motion.div>

                        {/* Projects */}
                        <div className="space-y-3">
                            {yearProjects.map((project, i) => (
                                <motion.div
                                    key={project.slug}
                                    ref={(el) => {
                                        itemRefs.current[project.slug] = el;
                                    }}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ delay: i * 0.06, duration: 0.35, ease: "easeOut" }}
                                >
                                    <ProjectRow
                                        project={project}
                                        isOpen={openSlug === project.slug}
                                        copied={copiedSlug === project.slug}
                                        onToggle={() => toggle(project.slug)}
                                        onCopyLink={() => copyLink(project.slug)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function ProjectRow({
    project,
    isOpen,
    copied,
    onToggle,
    onCopyLink,
}: {
    project: Project;
    isOpen: boolean;
    copied: boolean;
    onToggle: () => void;
    onCopyLink: () => void;
}) {
    const visibleTags = isOpen ? project.tags : project.tags.slice(0, MAX_VISIBLE_TAGS);
    const overflow = isOpen ? 0 : project.tags.length - MAX_VISIBLE_TAGS;
    const yearRange =
        project.endYear && project.endYear !== project.year
            ? `${project.year} → ${project.endYear}`
            : null;

    return (
        <div
            id={project.slug}
            className="rounded-xl border border-border overflow-hidden scroll-mt-24"
        >
            {/* Collapsed header */}
            <button
                className="w-full text-left px-5 py-4 flex items-start gap-3 hover:bg-muted/40 transition-colors cursor-pointer group"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                {/* Sector icon */}
                <div className="mt-0.5 shrink-0 text-primary opacity-80">
                    <SectorIcon sector={project.sector} size={18} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-semibold text-base leading-tight">{project.company}</span>
                        <span className="text-muted-foreground text-sm">·</span>
                        <span className="text-muted-foreground text-sm">{project.role}</span>
                        {project.sector && (
                            <>
                                <span className="text-muted-foreground text-sm">·</span>
                                <span className="text-muted-foreground text-sm capitalize">{project.sector}</span>
                            </>
                        )}
                        {yearRange && (
                            <span className="text-xs text-muted-foreground ml-auto shrink-0">
                                {yearRange}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug line-clamp-2">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {visibleTags.map((tag) => (
                            <TechBadge key={tag} tag={tag} />
                        ))}
                        {overflow > 0 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs">
                                +{overflow}
                            </span>
                        )}
                    </div>
                </div>

                {/* Chevron */}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="shrink-0 mt-0.5 text-muted-foreground"
                >
                    <ChevronDown size={17} />
                </motion.div>
            </button>

            {/* Expanded case study */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-border">
                            {/* Copy link bar */}
                            <div className="flex items-center justify-end gap-4 px-5 pt-3 pb-1">
                                {project.url && (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <ExternalLink size={12} />
                                        {project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                                    </a>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onCopyLink();
                                    }}
                                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {copied ? (
                                        <>
                                            <Check size={12} className="text-primary" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Link2 size={12} />
                                            Copy link
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* MDX case study content */}
                            <div className="px-5 pb-8 prose prose-sm max-w-none [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:text-foreground [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-1 [&_h3]:text-foreground [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:text-muted-foreground [&_li]:leading-relaxed">
                                {project.content}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
