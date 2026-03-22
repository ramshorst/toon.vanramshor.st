"use client";

import { motion } from "framer-motion";

type Props = {
    swatches: string[];
    activeIndex: number;
    onChange: (index: number) => void;
    layoutId: string;
};

export function ColorSwatchPicker({ swatches, activeIndex, onChange, layoutId }: Props) {
    return (
        <div className="flex items-center gap-2">
            {swatches.map((swatch, i) => (
                <motion.button
                    key={i}
                    onClick={() => onChange(i)}
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.85 }}
                    transition={{ duration: 0.075, ease: "easeOut" }}
                    className="relative w-4 h-4 rounded-full focus:outline-none"
                    style={{ backgroundColor: swatch }}
                    onFocus={(e) => { e.currentTarget.style.boxShadow = `0 0 0 5px ${swatch}28`; }}
                    onBlur={(e) => { e.currentTarget.style.boxShadow = ""; }}
                >
                    {activeIndex === i && (
                        <motion.span
                            layoutId={layoutId}
                            className="absolute rounded-full pointer-events-none"
                            style={{ inset: -3, boxShadow: `0 0 0 1.5px ${swatch}66` }}
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        />
                    )}
                </motion.button>
            ))}
        </div>
    );
}
