"use client";

import { useState, useEffect } from "react";
import { BreathingLoader } from "./BreathingLoader";
import { ThemeToggle } from "./ThemeToggle";

// Exponential mapping: slider 0 = slow (6s), slider 100 = fast (0.8s)
const MIN_DURATION = 0.8;
const MAX_DURATION = 6;
function sliderToDuration(s: number) {
    return Math.exp(Math.log(MAX_DURATION) + (Math.log(MIN_DURATION) - Math.log(MAX_DURATION)) * s / 100);
}

export function BreathingLoaderShowcase({ onThemeChange }: { onThemeChange?: (v: "light" | "dark") => void }) {
    const [speed,       setSpeed]       = useState(75);
    const [size]                        = useState(20);
    const [travelRatio, setTravelRatio] = useState(0.44);
    const [cardTheme, setCardTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const t = document.documentElement.getAttribute("data-theme");
        setCardTheme(t === "dark" ? "dark" : "light");
    }, []);

    function handleThemeChange(v: "light" | "dark") {
        setCardTheme(v);
        onThemeChange?.(v);
    }

    const duration = sliderToDuration(speed);

    return (
        <div data-theme={cardTheme} className="bg-card -m-6 p-6 rounded-2xl">
            <div className="flex items-center justify-center" style={{ height: 120 }}>
                <BreathingLoader duration={duration} size={size} travelRatio={travelRatio} />
            </div>
            <div className="border-t border-border/40 pt-4 flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-xs text-muted-foreground/60 shrink-0">Speed</span>
                        <input
                            type="range" min={0} max={100} step={1}
                            value={speed} onChange={(e) => setSpeed(Number(e.target.value))}
                            className="w-full"
                        />
                    </label>
                    <label className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-xs text-muted-foreground/60 shrink-0">Travel</span>
                        <input
                            type="range" min={0} max={2} step={0.01}
                            value={travelRatio} onChange={(e) => setTravelRatio(Number(e.target.value))}
                            className="w-full"
                        />
                    </label>
                    <div className="shrink-0 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground/60">Light</span>
                        <ThemeToggle value={cardTheme} onChange={handleThemeChange} />
                        <span className="text-xs text-muted-foreground/60">Dark</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
