import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Toon van Ramshorst — Technical Designer & AI Coder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    background: "#fcfbf7",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px 80px",
                    fontFamily: "sans-serif",
                    position: "relative",
                }}
            >
                {/* Decorative background ring — top right */}
                <div
                    style={{
                        position: "absolute",
                        top: -160,
                        right: -160,
                        width: 520,
                        height: 520,
                        borderRadius: "50%",
                        border: "80px solid #f3d8bf",
                        opacity: 0.5,
                        display: "flex",
                    }}
                />
                {/* Decorative background ring — bottom left */}
                <div
                    style={{
                        position: "absolute",
                        bottom: -80,
                        left: -80,
                        width: 280,
                        height: 280,
                        borderRadius: "50%",
                        border: "40px solid #ead8c8",
                        opacity: 0.4,
                        display: "flex",
                    }}
                />

                {/* Monogram — top right */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 14,
                            background: "#d99a63",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontSize: 38,
                            fontWeight: 700,
                        }}
                    >
                        T
                    </div>
                </div>

                {/* Main content */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            fontSize: 72,
                            fontWeight: 800,
                            color: "#2a1508",
                            lineHeight: 1.05,
                            letterSpacing: "-2px",
                            marginBottom: 24,
                            display: "flex",
                        }}
                    >
                        Toon van Ramshorst
                    </div>
                    <div
                        style={{
                            fontSize: 30,
                            color: "#6c4b37",
                            fontWeight: 400,
                            display: "flex",
                        }}
                    >
                        Technical Designer & AI Coder
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0,
                        }}
                    >
                        <div
                            style={{
                                width: 40,
                                height: 3,
                                background: "#d99a63",
                                marginRight: 16,
                                display: "flex",
                                borderRadius: 2,
                            }}
                        />
                        <span style={{ fontSize: 22, color: "#6c4b37", display: "flex" }}>
                            Writing on design, code, and the web
                        </span>
                    </div>
                    <span style={{ fontSize: 20, color: "#ead8c8", display: "flex" }}>
                        toon.vanramshor.st
                    </span>
                </div>
            </div>
        ),
        { ...size }
    );
}
