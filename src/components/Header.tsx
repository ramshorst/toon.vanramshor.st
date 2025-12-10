"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl tracking-tight hover:text-primary transition-colors">
                    <motion.span
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Toon van Ramshorst
                    </motion.span>
                </Link>

                <nav className="flex items-center gap-6">
                    <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                        About
                    </Link>
                    <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
                        Blog
                    </Link>

                    <Link
                        href="https://calendly.com/ramshorst/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                        Let's talk
                    </Link>

                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                        aria-label="Toggle theme"
                    >
                        {mounted ? (
                            theme === "dark" ? (
                                <Sun className="h-5 w-5 text-yellow-500" />
                            ) : (
                                <Moon className="h-5 w-5 text-slate-700" />
                            )
                        ) : (
                            <div className="h-5 w-5" /> // Placeholder to prevent layout shift
                        )}
                    </button>
                </nav>
            </div>
        </header>
    );
}
