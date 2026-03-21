"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const SPRING = "cubic-bezier(0.16, 1, 0.3, 1)";
const steps = ["Designer", "Engineer", "reviews & tweaks"];
const LOOP_H = 40;
const R = 8;

export function HandoffPipeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.4 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const dim = (pct: number) => `color-mix(in srgb, var(--foreground) ${pct}%, transparent)`;
    const lp = hovered ? 40 : 20;

    return (
        <figure
            className="not-prose my-12 flex flex-col items-center"
            aria-label="Handoff pipeline: Designer → Engineer → reviews & tweaks, repeat forever"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div ref={containerRef} className="w-full max-w-lg">

                {/* Steps row — boxes flex equally so width is always consistent */}
                <div className="flex items-center">
                    {steps.map((step, i) => (
                        <div key={step} className="flex items-center" style={{ flex: i === 0 ? "none" : 1, ...(i === 0 && { flexShrink: 0 }) }}>
                            {i > 0 && (
                                <div style={{
                                    width: 36, flexShrink: 0,
                                    textAlign: "center", fontSize: 13,
                                    color: dim(22),
                                    transition: `opacity 0.4s ease ${i * 0.13}s`,
                                    opacity: visible ? 1 : 0,
                                    userSelect: "none",
                                }}>
                                    →
                                </div>
                            )}
                            <div style={{
                                flex: 1,
                                minWidth: 120,
                                padding: "12px 16px",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                borderRadius: 8,
                                border: `1px solid ${dim(10)}`,
                                background: dim(3),
                                transition: `opacity 0.5s ease ${i * 0.13}s, transform 0.65s ${SPRING} ${i * 0.13}s`,
                                opacity: visible ? 1 : 0,
                                transform: visible ? "translateY(0)" : "translateY(12px)",
                            }}>
                                <span style={{ fontSize: 13.5, color: dim(65), whiteSpace: "nowrap" }}>
                                    {step}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SVG loop — width matches container exactly via ResizeObserver */}
                {width > 0 && (
                    <svg
                        width={width}
                        height={LOOP_H}
                        viewBox={`0 0 ${width} ${LOOP_H}`}
                        style={{
                            display: "block",
                            overflow: "visible",
                            transition: `opacity 0.5s ease 0.58s`,
                            opacity: visible ? 1 : 0,
                        }}
                    >
                        {/* ∪ shape from top-right → bottom → top-left */}
                        <path
                            d={`M ${width},0 L ${width},${LOOP_H - R} Q ${width},${LOOP_H} ${width - R},${LOOP_H} L ${R},${LOOP_H} Q 0,${LOOP_H} 0,${LOOP_H - R} L 0,10`}
                            fill="none"
                            stroke={dim(lp)}
                            strokeWidth="1"
                            style={{ transition: "stroke 0.3s ease" }}
                        />

                        {/* Arrowhead pointing up on the left side */}
                        <path
                            d="M -5,18 L 0,9 L 5,18"
                            fill="none"
                            stroke={dim(lp)}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ transition: "stroke 0.3s ease" }}
                        />

                        {/* Label */}
                        <text
                            x={width / 2}
                            y={LOOP_H - 7}
                            textAnchor="middle"
                            style={{
                                fontSize: 10,
                                fontWeight: 600,
                                letterSpacing: "0.13em",
                                textTransform: "uppercase",
                                fill: dim(hovered ? 55 : 28),
                                fontFamily: "inherit",
                                transition: "fill 0.3s ease",
                            }}
                        >
                            Repeat forever
                        </text>
                    </svg>
                )}
            </div>
        </figure>
    );
}
