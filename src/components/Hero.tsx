"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const SPRING = { type: "spring", stiffness: 500, damping: 32 } as const;
const SLIDE = { duration: 0.07, ease: "easeInOut" } as const;
const START_YEAR = new Date().getFullYear();
const END_YEAR = 2003;
const TOTAL_YEARS = START_YEAR - END_YEAR;

export function Hero({ projectYears = [] }: { projectYears?: number[] }) {
    const [hovered, setHovered] = useState(false);
    const [aboutHovered, setAboutHovered] = useState(false);
    const [displayYear, setDisplayYear] = useState(START_YEAR);
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        if (!hovered) {
            setDisplayYear(START_YEAR);
            return;
        }

        const tick = (year: number, delay: number) => {
            timerRef.current = setTimeout(() => {
                const next = year - 1;
                if (next < END_YEAR) return;
                setDisplayYear(next);
                const progress = (START_YEAR - next) / TOTAL_YEARS;
                const nextDelay = Math.round(300 * (1 - Math.sqrt(progress)) + 55);
                tick(next, nextDelay);
            }, delay);
        };

        tick(START_YEAR, 600);

        return () => clearTimeout(timerRef.current);
    }, [hovered]);

    return (
        <section className="py-20 md:py-32 flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left">
            <div className="flex-1 max-w-xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-3xl opacity-20 rounded-full" />
                    <h1 className="relative text-5xl md:text-7xl font-bold tracking-tight mb-4">
                        Hi, I'm <span className="text-foreground">Toon</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl md:text-2xl text-muted-foreground mb-10"
                >
                    Design engineer who loves turning ideas into things people actually use. I write about building, shipping, and the craft in between.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex gap-4 justify-center md:justify-start"
                >
                    {/* Projects button — fixed width, swaps label for year */}
                    <Link
                        href="/projects"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className="relative inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium overflow-hidden"
                    >
                        {/* Ghost keeps the button width stable */}
                        <span className="invisible select-none">Projects</span>
                        <span
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)" }}
                        >
                            <AnimatePresence mode="popLayout" initial={false}>
                                {!hovered ? (
                                    <motion.span
                                        key="label"
                                        initial={{ y: "100%" }}
                                        animate={{ y: "0%" }}
                                        exit={{ y: "-130%" }}
                                        transition={SLIDE}
                                    >
                                        Projects
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key={displayYear}
                                        initial={{ y: "100%" }}
                                        animate={{ y: "0%" }}
                                        exit={{ y: "-130%" }}
                                        transition={SLIDE}
                                        className="font-mono tabular-nums"
                                    >
                                        {displayYear}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </span>
                    </Link>

                    {/* About button — grows to show waving hand */}
                    <Link
                        href="/about"
                        onMouseEnter={() => setAboutHovered(true)}
                        onMouseLeave={() => setAboutHovered(false)}
                        className="rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                    >
                        <motion.span
                            layout
                            transition={SPRING}
                            className="inline-flex items-center gap-2 px-6 py-3"
                        >
                            <motion.span layout="position">More About Me</motion.span>
                            <AnimatePresence>
                                {aboutHovered && (
                                    <motion.span
                                        key="wave"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            rotate: [-20, 15, -20, 15, -20, 10, 0],
                                        }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{
                                            opacity: { duration: 0.15 },
                                            scale: { duration: 0.15 },
                                            rotate: { duration: 1.2, ease: "easeInOut" },
                                        }}
                                        style={{ originX: "50%", originY: "85%" }}
                                        className="select-none text-base leading-none"
                                    >
                                        👋
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.span>
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex-1 max-w-md relative"
            >
                <img
                    src="/toon_cartoon.png"
                    alt="Cartoon version of Toon"
                    className="w-full h-auto drop-shadow-2xl dark:hidden"
                />
                <img
                    src="/toon_dithered_mac.png"
                    alt="Cartoon version of Toon (Night Mode)"
                    className="w-full h-auto drop-shadow-2xl hidden dark:block"
                />
            </motion.div>
        </section>
    );
}
