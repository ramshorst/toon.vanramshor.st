"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
    { href: "/projects", label: "Projects" },
    { href: "/components", label: "Components" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
];

export function Header() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => { setMounted(true); }, []);
    useEffect(() => { setMenuOpen(false); }, [pathname]);
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const ThemeButton = ({ className = "" }: { className?: string }) => (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className={`p-2 rounded-full hover:bg-muted transition-all duration-150 ${className}`}
            aria-label="Toggle theme"
        >
            {mounted ? (
                resolvedTheme === "dark"
                    ? <Sun className="h-5 w-5 text-yellow-500/60 hover:text-primary transition-colors" />
                    : <Moon className="h-5 w-5 text-slate-400 hover:text-muted-foreground transition-colors" />
            ) : (
                <div className="h-5 w-5" />
            )}
        </button>
    );

    return (
        <>
            <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="font-bold text-xl tracking-tight" onClick={() => setMenuOpen(false)}>
                        <motion.div initial="initial" whileHover="hover" className="relative">
                            <div className="flex">
                                {"Toon van Ramshorst".split("").map((char, i) => (
                                    <motion.span
                                        key={i}
                                        variants={{
                                            initial: { color: "var(--foreground)" },
                                            hover: { color: resolvedTheme === "dark" ? "var(--primary)" : "var(--muted-foreground)" },
                                        }}
                                        transition={{ duration: 0.2, ease: "easeInOut", delay: 0.015 * i }}
                                        className="inline-block"
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {NAV_LINKS.map(({ href, label }) => (
                            <Link key={href} href={href} className="text-sm font-medium hover:text-muted-foreground dark:hover:text-primary transition-colors">
                                {label}
                            </Link>
                        ))}
                        <Link href="/photos" className="text-sm font-medium hover:text-muted-foreground dark:hover:text-primary transition-colors">
                            Photos
                        </Link>
                        <Link
                            href="https://calendly.com/ramshorst/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:text-muted-foreground dark:hover:text-primary transition-colors"
                        >
                            Let's talk
                        </Link>
                        <ThemeButton className="hover:scale-110 active:scale-90" />
                    </nav>

                    {/* Mobile controls */}
                    <div className="flex md:hidden items-center gap-1">
                        <ThemeButton />
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            className="p-2 rounded-full hover:bg-muted transition-all duration-150"
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {menuOpen ? (
                                    <motion.div
                                        key="x"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.16 }}
                                    >
                                        <X className="h-5 w-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.16 }}
                                    >
                                        <Menu className="h-5 w-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="fixed inset-0 z-40 md:hidden bg-background flex flex-col"
                        style={{ paddingTop: "4rem" }}
                    >
                        <nav className="flex flex-col justify-center flex-1 px-8">
                            {[
                                ...NAV_LINKS,
                                { href: "https://calendly.com/ramshorst/30min", label: "Let's talk" },
                            ].map(({ href, label }, i) => (
                                <motion.div
                                    key={href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: i * 0.06, duration: 0.28, ease: "easeOut" }}
                                >
                                    <Link
                                        href={href}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-4xl font-bold tracking-tight hover:text-muted-foreground dark:hover:text-primary transition-colors block py-3 border-b border-border/40 last:border-0"
                                    >
                                        {label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
