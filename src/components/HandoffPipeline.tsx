"use client";

import { useEffect, useRef, useState } from "react";

const SPRING = "cubic-bezier(0.16, 1, 0.3, 1)";

const steps = ["Designer", "Engineer", "reviews & tweaks"];

export function HandoffPipeline() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.4 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const dim = (pct: number) => `color-mix(in srgb, var(--foreground) ${pct}%, transparent)`;
    const linePct = hovered ? 40 : 20;

    return (
        <figure
            ref={ref}
            className="not-prose my-12 flex flex-col items-center"
            aria-label="Handoff pipeline: Designer → Engineer → reviews & tweaks, repeat forever"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="flex flex-col">

                {/* Steps */}
                <div className="flex items-center gap-0">
                    {steps.map((step, i) => (
                        <div key={step} className="flex items-center">
                            <div
                                style={{
                                    width: 132,
                                    padding: "11px 0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 8,
                                    border: `1px solid ${dim(10)}`,
                                    background: dim(3),
                                    transition: `opacity 0.5s ease ${i * 0.13}s, transform 0.65s ${SPRING} ${i * 0.13}s, border-color 0.3s ease`,
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? "translateY(0)" : "translateY(12px)",
                                }}
                            >
                                <span style={{ fontSize: 13.5, color: dim(65), letterSpacing: "-0.01em" }}>
                                    {step}
                                </span>
                            </div>
                            {i < steps.length - 1 && (
                                <div style={{
                                    width: 32,
                                    textAlign: "center",
                                    fontSize: 12,
                                    color: dim(25),
                                    transition: `opacity 0.4s ease ${i * 0.13 + 0.18}s`,
                                    opacity: visible ? 1 : 0,
                                    userSelect: "none",
                                }}>
                                    →
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Loop bracket */}
                <div style={{
                    transition: `opacity 0.5s ease 0.58s`,
                    opacity: visible ? 1 : 0,
                    position: "relative",
                    marginTop: -1,
                }}>
                    {/* Upward arrowhead on the left */}
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 6,
                        height: 6,
                        borderTop: `1.5px solid ${dim(linePct)}`,
                        borderLeft: `1.5px solid ${dim(linePct)}`,
                        transform: "translate(-0.5px, -3px) rotate(45deg)",
                        transition: "border-color 0.3s ease",
                    }} />

                    {/* The bracket shape */}
                    <div style={{
                        height: 26,
                        borderBottom: `1px solid ${dim(linePct)}`,
                        borderLeft: `1px solid ${dim(linePct)}`,
                        borderRight: `1px solid ${dim(linePct)}`,
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        paddingBottom: 5,
                        transition: "border-color 0.3s ease",
                    }}>
                        <span style={{
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: dim(hovered ? 55 : 30),
                            transition: "color 0.3s ease",
                            userSelect: "none",
                        }}>
                            Repeat forever
                        </span>
                    </div>
                </div>

            </div>
        </figure>
    );
}
