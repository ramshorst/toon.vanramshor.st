import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Toon van Ramshorst - Technical Designer & AI Coder";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(to bottom right, #fcfbf7, #e6f0e6)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 40,
                    }}
                >
                    {/* Stylized T Icon (Simulated with text/shape for now as loading local images in edge can be tricky without fetch) */}
                    <div
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            background: "#4ade80",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: 48,
                            fontWeight: "bold",
                            marginRight: 20,
                        }}
                    >
                        T
                    </div>
                    <div style={{ fontSize: 64, fontWeight: "bold", color: "#1a2e1a" }}>
                        Toon van Ramshorst
                    </div>
                </div>
                <div
                    style={{
                        fontSize: 32,
                        color: "#4b5563",
                        maxWidth: 800,
                        textAlign: "center",
                        lineHeight: 1.4,
                    }}
                >
                    Technical Designer & AI Coder
                    <br />
                    Crafting digital experiences with code, design, and AI.
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
