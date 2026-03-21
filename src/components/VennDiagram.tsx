"use client";

import { useEffect, useRef, useState } from "react";

// Container is w-96 = 384px. Each circle is w-60 = 240px. Overlap = 384 - 240 = 144px...
// Actually: left circle left:0→240px, right circle right:0→starts at 144px. Overlap: 144–240px, center = 192px = 50% of 384px.

const SPRING = "cubic-bezier(0.16, 1, 0.3, 1)";

export function VennDiagram() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const circleBase = "absolute top-0 h-44 w-60 rounded-full border border-foreground/15 bg-foreground/[0.04] flex items-center text-sm font-medium text-muted-foreground";

    return (
        <figure
            ref={ref}
            className="not-prose my-16 flex justify-center"
            aria-label="Venn diagram: Design Engineer sits at the intersection of Front-end Engineer and UI Designer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Container width = 240 + 240 - 96 = 384px = w-96. left-1/2 = 192px = exact center of overlap. */}
            <div className="relative w-96 h-44">

                {/* Left circle */}
                <div
                    className={`${circleBase} left-0 justify-start pl-8 pr-20`}
                    style={{
                        transition: `transform 0.85s ${SPRING}, opacity 0.7s ease`,
                        transform: visible
                            ? hovered ? "translateX(6px)" : "translateX(0)"
                            : "translateX(32px)",
                        opacity: visible ? 1 : 0,
                    }}
                >
                    Front-end<br />Engineer
                </div>

                {/* Right circle */}
                <div
                    className={`${circleBase} right-0 justify-end pr-8 pl-20 whitespace-nowrap`}
                    style={{
                        transition: `transform 0.85s ${SPRING}, opacity 0.7s ease`,
                        transform: visible
                            ? hovered ? "translateX(-6px)" : "translateX(0)"
                            : "translateX(-32px)",
                        opacity: visible ? 1 : 0,
                    }}
                >
                    UI Designer
                </div>

                {/* Intersection label — left:50% of 384px = 192px = centre of the 96px overlap zone */}
                <div
                    className="absolute text-center text-[10px] font-bold text-foreground/60 uppercase tracking-[0.18em] leading-relaxed pointer-events-none"
                    style={{
                        top: "50%",
                        left: "50%",
                        transform: visible
                            ? "translate(-50%, -50%) scale(1)"
                            : "translate(-50%, -50%) scale(0.75)",
                        transition: `opacity 0.5s ease 0.55s, transform 0.5s ${SPRING} 0.55s`,
                        opacity: visible ? 1 : 0,
                    }}
                >
                    Design<br />Engineer
                </div>
            </div>
        </figure>
    );
}
