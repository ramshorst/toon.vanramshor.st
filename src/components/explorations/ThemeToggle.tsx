"use client";

import { motion } from "framer-motion";

type Props = {
    value: "light" | "dark";
    onChange: (v: "light" | "dark") => void;
};

export function ThemeToggle({ value, onChange }: Props) {
    const isDark = value === "dark";

    return (
        <button
            onClick={() => onChange(isDark ? "light" : "dark")}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="flex-none focus:outline-none"
        >
            <motion.div
                animate={{
                    backgroundColor: isDark
                        ? "var(--muted-foreground)"
                        : "color-mix(in srgb, var(--muted-foreground) 25%, var(--muted))",
                }}
                transition={{ duration: 0.2 }}
                className="relative w-7 h-[15px] rounded-full"
            >
                <motion.div
                    animate={{ x: isDark ? 14 : 2 }}
                    transition={{ type: "spring", stiffness: 600, damping: 35 }}
                    className="absolute top-[2px] w-[11px] h-[11px] rounded-full"
                    style={{ backgroundColor: "var(--background)" }}
                />
            </motion.div>
        </button>
    );
}
