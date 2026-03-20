"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const WHEEL_SIZE = 176;
const CURRENT_GREEN = "#e5d8cd";

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)));
    };
    return [f(0), f(8), f(4)];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h = 0,
        s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        else if (max === g) h = ((b - r) / d + 2) / 6;
        else h = ((r - g) / d + 4) / 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function rgbToHex(r: number, g: number, b: number): string {
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function hexToRgb(hex: string): [number, number, number] {
    return [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
    ];
}

export function ColorPickerFloating() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(CURRENT_GREEN);
    const [lightness, setLightness] = useState(35);
    const [copied, setCopied] = useState(false);
    const wheelRef = useRef<HTMLCanvasElement>(null);
    const isDragging = useRef(false);

    const drawWheel = useCallback(() => {
        const canvas = wheelRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const size = WHEEL_SIZE;
        const cx = size / 2,
            cy = size / 2,
            r = size / 2 - 1;
        const imageData = ctx.createImageData(size, size);
        const data = imageData.data;

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const dx = x - cx,
                    dy = y - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const idx = (y * size + x) * 4;
                if (dist <= r) {
                    const hue = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
                    const sat = (dist / r) * 100;
                    const [rr, gg, bb] = hslToRgb(hue, sat, lightness);
                    data[idx] = rr;
                    data[idx + 1] = gg;
                    data[idx + 2] = bb;
                    data[idx + 3] = 255;
                } else {
                    data[idx + 3] = 0;
                }
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }, [lightness]);

    useEffect(() => {
        if (isOpen) drawWheel();
    }, [isOpen, drawWheel]);

    const pickColorFromEvent = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
            const canvas = wheelRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            const x = Math.round(((clientX - rect.left) / rect.width) * WHEEL_SIZE);
            const y = Math.round(((clientY - rect.top) / rect.height) * WHEEL_SIZE);
            const cx = WHEEL_SIZE / 2,
                cy = WHEEL_SIZE / 2;
            if (Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) > WHEEL_SIZE / 2 - 1) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
            setSelectedColor(hex);
            document.documentElement.style.setProperty("--border", hex);
            document.documentElement.style.setProperty("--input", hex);
        },
        []
    );

    const hsl = rgbToHsl(...hexToRgb(selectedColor));

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {isOpen && (
                <div
                    className="bg-card border border-border rounded-2xl shadow-2xl p-4 flex flex-col gap-4 w-56"
                    style={{ fontFamily: "var(--font-mono)" }}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                            Color Picker
                        </span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-muted-foreground hover:text-foreground hover:scale-125 active:scale-90 transition-all duration-150 text-xs leading-none"
                            aria-label="Close color picker"
                        >
                            ✕
                        </button>
                    </div>

                    <canvas
                        ref={wheelRef}
                        width={WHEEL_SIZE}
                        height={WHEEL_SIZE}
                        className="w-full aspect-square cursor-crosshair rounded-full"
                        onMouseDown={(e) => {
                            isDragging.current = true;
                            pickColorFromEvent(e);
                        }}
                        onMouseMove={(e) => {
                            if (isDragging.current) pickColorFromEvent(e);
                        }}
                        onMouseUp={() => {
                            isDragging.current = false;
                        }}
                        onMouseLeave={() => {
                            isDragging.current = false;
                        }}
                        onTouchStart={pickColorFromEvent}
                        onTouchMove={pickColorFromEvent}
                    />

                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Lightness</span>
                            <span>{lightness}%</span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="85"
                            value={lightness}
                            onChange={(e) => setLightness(Number(e.target.value))}
                            className="w-full cursor-pointer accent-primary"
                        />
                    </div>

                    <div className="flex items-center gap-2.5">
                        <div
                            className="w-9 h-9 rounded-lg flex-shrink-0 border border-border"
                            style={{ background: selectedColor }}
                        />
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate">{selectedColor}</div>
                            <div className="text-xs text-muted-foreground">
                                {hsl[0]}° {hsl[1]}% {hsl[2]}%
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(selectedColor);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 1500);
                            }}
                            className="text-xs px-2 py-1 bg-muted hover:bg-muted/70 hover:scale-105 active:scale-95 rounded-md transition-all duration-150 flex-shrink-0"
                        >
                            {copied ? "✓" : "copy"}
                        </button>
                    </div>

                    <div className="border-t border-border pt-3 flex flex-col gap-1.5">
                        <div className="text-xs text-muted-foreground">Current border</div>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-5 h-5 rounded flex-shrink-0"
                                style={{ background: CURRENT_GREEN }}
                            />
                            <code className="text-xs text-muted-foreground">{CURRENT_GREEN}</code>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full shadow-lg overflow-hidden border-2 border-background transition-transform hover:scale-110 active:scale-95"
                style={{
                    background: `conic-gradient(
                        hsl(0, 75%, 55%),
                        hsl(45, 75%, 50%),
                        hsl(90, 65%, 40%),
                        hsl(135, 65%, 38%),
                        hsl(180, 65%, 42%),
                        hsl(225, 70%, 52%),
                        hsl(270, 70%, 55%),
                        hsl(315, 70%, 52%),
                        hsl(360, 75%, 55%)
                    )`,
                }}
                title="Toggle color picker"
                aria-label="Toggle color picker"
            />
        </div>
    );
}
