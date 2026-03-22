"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const STRENGTH = 0.3;
const SPRING = { stiffness: 200, damping: 18, mass: 0.5 };

export function MagneticButton({ children = "Click me" }: { children?: React.ReactNode }) {
    const ref = useRef<HTMLButtonElement>(null);
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, SPRING);
    const y = useSpring(rawY, SPRING);

    function onMove(e: React.MouseEvent<HTMLButtonElement>) {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        rawX.set((e.clientX - cx) * STRENGTH);
        rawY.set((e.clientY - cy) * STRENGTH);
    }

    function onLeave() {
        rawX.set(0);
        rawY.set(0);
    }

    return (
        <motion.button
            ref={ref}
            style={{ x, y }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            whileTap={{ scale: 0.94 }}
            className="relative px-4 py-2 rounded-md border border-foreground/20 bg-transparent text-foreground font-medium text-sm overflow-hidden group cursor-pointer select-none"
        >
            <motion.span
                className="absolute inset-0 bg-foreground"
                initial={{ scale: 0, borderRadius: "100%" }}
                whileHover={{ scale: 2.5, borderRadius: "0%" }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            />
            <motion.span
                className="relative"
                initial={{ color: "var(--foreground)" }}
                whileHover={{ color: "var(--background)" }}
                transition={{ duration: 0.2, delay: 0.1 }}
            >{children}</motion.span>
        </motion.button>
    );
}
