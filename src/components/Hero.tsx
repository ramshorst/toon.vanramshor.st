"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
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
                        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Toon</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl md:text-2xl text-muted-foreground mb-10"
                >
                    I build things for the web. Welcome to my digital garden where I share my thoughts, experiments, and projects.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex gap-4 justify-center md:justify-start"
                >
                    <Link
                        href="/blog"
                        className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                    >
                        Read the Blog
                    </Link>
                    <Link
                        href="/about"
                        className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                    >
                        More About Me
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex-1 max-w-md"
            >
                <img
                    src="/toon_cartoon.png"
                    alt="Cartoon version of Toon"
                    className="w-full h-auto drop-shadow-2xl"
                />
            </motion.div>
        </section>
    );
}
