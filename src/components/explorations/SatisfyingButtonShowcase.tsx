"use client";

import { useState, useEffect } from "react";
import { SatisfyingButton, BUTTON_THEMES } from "./SatisfyingButton";
import { ColorSwatchPicker } from "./ColorSwatchPicker";
import { ThemeToggle } from "./ThemeToggle";

const SWATCHES = BUTTON_THEMES.map((t) => t.swatch);

export function SatisfyingButtonShowcase({ onThemeChange }: { onThemeChange?: (v: "light" | "dark") => void }) {
    const [activeTheme, setActiveTheme] = useState(0);
    const [cardTheme, setCardTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const t = document.documentElement.getAttribute("data-theme");
        setCardTheme(t === "dark" ? "dark" : "light");
    }, []);

    function handleThemeChange(v: "light" | "dark") {
        setCardTheme(v);
        onThemeChange?.(v);
    }

    return (
        <div data-theme={cardTheme} className="bg-card -m-6 p-6 rounded-2xl">
            <div className="flex items-center justify-center py-8">
                <SatisfyingButton theme={BUTTON_THEMES[activeTheme]} isDark={cardTheme === "dark"} />
            </div>
            <div className="border-t border-border/40 pt-4 flex items-center gap-3">
                <span className="text-xs text-muted-foreground/60">Color</span>
                <ColorSwatchPicker
                    swatches={SWATCHES}
                    activeIndex={activeTheme}
                    onChange={setActiveTheme}
                    layoutId="satisfying-active-ring"
                />
                <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs text-muted-foreground/60">Light</span>
                    <ThemeToggle value={cardTheme} onChange={handleThemeChange} />
                    <span className="text-xs text-muted-foreground/60">Dark</span>
                </div>
            </div>
        </div>
    );
}
