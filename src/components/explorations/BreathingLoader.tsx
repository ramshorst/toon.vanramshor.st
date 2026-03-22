"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

type Props = {
    color?: string;
    duration?: number;
    size?: number;
    travelRatio?: number; // multiplier of size; travel distance = size * travelRatio
};

// The shape is defined by two virtual "endpoint balls":
//   lead  — the front edge of the pill, moves first
//   trail — the rear edge, follows with a delay
//
// width   = |lead - trail| + size   (minimum = size when both overlap → circle)
// centerX = (lead + trail) / 2

function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

const LAG = 0.32; // fraction of a half-cycle the trail lags behind the lead

export function BreathingLoader({ color = "rgb(148, 165, 88)", duration = 1.4, size = 12, travelRatio = 0.33 }: Props) {
    const motionX     = useMotionValue(0);
    const motionWidth = useMotionValue(size);

    const phaseRef       = useRef(0);
    const lastTsRef      = useRef<number | null>(null);
    const durationRef    = useRef(duration);
    const sizeRef        = useRef(size);
    const travelRatioRef = useRef(travelRatio);

    useEffect(() => { durationRef.current = duration; }, [duration]);
    useEffect(() => { sizeRef.current = size; }, [size]);
    useEffect(() => { travelRatioRef.current = travelRatio; }, [travelRatio]);

    useEffect(() => {
        let rafId: number;

        const tick = (ts: number) => {
            if (lastTsRef.current !== null) {
                const dt = (ts - lastTsRef.current) / 1000;
                phaseRef.current = (phaseRef.current + dt / durationRef.current) % 1;
            }
            lastTsRef.current = ts;

            const p      = phaseRef.current;
            const sz     = sizeRef.current;
            const travel = sz * travelRatioRef.current;

            // half-cycle helpers
            function halfCycle(t: number, from: number, to: number) {
                const leadT  = easeInOut(Math.min(t / (1 - LAG), 1));
                const trailT = easeInOut(Math.max((t - LAG) / (1 - LAG), 0));
                return {
                    lead:  lerp(from, to, leadT),
                    trail: lerp(from, to, trailT),
                };
            }

            let lead: number, trail: number;

            if (p < 0.5) {
                ({ lead, trail } = halfCycle(p / 0.5, -travel, travel));
            } else {
                ({ lead, trail } = halfCycle((p - 0.5) / 0.5, travel, -travel));
            }

            motionWidth.set(Math.abs(lead - trail) + sz);
            motionX.set((lead + trail) / 2);

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: size * travelRatio * 2 + size * 4, height: size * 4 }}>
            <motion.div
                style={{
                    width:           motionWidth,
                    height:          size,
                    borderRadius:    size / 2,
                    backgroundColor: color,
                    x:               motionX,
                }}
            />
        </div>
    );
}
