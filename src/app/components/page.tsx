"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COMPONENTS } from "@/lib/components-registry";
import { SatisfyingButton } from "@/components/explorations/SatisfyingButton";
import { BreathingLoader } from "@/components/explorations/BreathingLoader";

const PREVIEWS: Record<string, React.ReactNode> = {
    "/explorations/satisfying-button": <SatisfyingButton />,
    "/explorations/breathing-loader": <BreathingLoader />,
};

export default function ComponentsPage() {
    return (
        <main className="pt-16 pb-24 overflow-hidden">
            <div className="container mx-auto px-4 mb-12">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Explorations</p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Components</h1>
            </div>

            {/* Carousel — breaks out of container to align with page title */}
            <div
                className="flex gap-5 overflow-x-auto pb-8 scroll-smooth"
                style={{
                    width: "100vw",
                    position: "relative",
                    left: "50%",
                    marginLeft: "-50vw",
                    paddingLeft: "max(1rem, calc((100vw - 80rem) / 2 + 1rem))",
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                    maskImage: "linear-gradient(to right, black 0%, black 88%, transparent 100%)",
                    scrollbarWidth: "none",
                }}
            >
                {COMPONENTS.map((component, i) => (
                    <motion.div
                        key={component.href}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
                        style={{ scrollSnapAlign: "start" }}
                        className="flex-none w-[320px] md:w-[360px]"
                    >
                        <Link href={component.href} className="group block h-full">
                            <div className="rounded-2xl border border-border bg-card overflow-hidden h-full flex flex-col transition-shadow duration-300 hover:shadow-lg">
                                {/* Preview area */}
                                <div className="flex-1 flex items-center justify-center py-16 px-8 bg-muted/20">
                                    <div className="pointer-events-none select-none">
                                        {PREVIEWS[component.href]}
                                    </div>
                                </div>

                                {/* Card footer */}
                                <div className="p-5 border-t border-border/50 flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-sm">{component.title}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{component.description}</p>
                                    </div>
                                    <span className="text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all duration-200 text-sm ml-4 shrink-0 leading-none flex items-center">→</span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}

                {/* Trailing spacer so last card isn't flush against mask */}
                <div className="flex-none w-4" aria-hidden />
            </div>
        </main>
    );
}
