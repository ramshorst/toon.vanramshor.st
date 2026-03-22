"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SatisfyingButton, BUTTON_THEMES } from "./SatisfyingButton";

export function SatisfyingButtonShowcase() {
    const [activeTheme, setActiveTheme] = useState(0);

    return (
        <>
            <div className="flex items-center justify-center py-8">
                <SatisfyingButton theme={BUTTON_THEMES[activeTheme]} />
            </div>
            <div className="border-t border-border/40 pt-4 flex items-center gap-3">
                <span className="text-xs text-muted-foreground/60">Color</span>
                <div className="flex items-center gap-2">
                    {BUTTON_THEMES.map((t, i) => (
                        <motion.button
                            key={i}
                            onClick={() => setActiveTheme(i)}
                            whileHover={{ scale: 1.25 }}
                            whileTap={{ scale: 0.85 }}
                            transition={{ duration: 0.075, ease: "easeOut" }}
                            className="relative w-4 h-4 rounded-full focus:outline-none"
                            style={{ backgroundColor: t.swatch }}
                            onFocus={(e) => { e.currentTarget.style.boxShadow = `0 0 0 5px ${t.swatch}28`; }}
                            onBlur={(e) => { e.currentTarget.style.boxShadow = ""; }}
                        >
                            {activeTheme === i && (
                                <motion.span
                                    layoutId="satisfying-active-ring"
                                    className="absolute rounded-full pointer-events-none"
                                    style={{ inset: -3, boxShadow: `0 0 0 1.5px ${t.swatch}66` }}
                                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>
        </>
    );
}
