import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/blog";

export const revalidate = false;

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
    const post = await getBlogPost(params.slug);

    if (!post) {
        return new ImageResponse(
            (
                <div
                    style={{
                        background: "linear-gradient(to bottom right, #fcfbf7, #e6f0e6)",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 48,
                        color: "#1a2e1a",
                    }}
                >
                    Post not found
                </div>
            ),
            { ...size }
        );
    }

    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(to bottom right, #fcfbf7, #e6f0e6)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: 80,
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 40,
                    }}
                >
                    <div
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            background: "#4ade80",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: 36,
                            fontWeight: "bold",
                            marginRight: 20,
                        }}
                    >
                        T
                    </div>
                    <div style={{ fontSize: 32, fontWeight: "bold", color: "#4b5563" }}>
                        Toon van Ramshorst
                    </div>
                </div>

                <div
                    style={{
                        fontSize: 64,
                        fontWeight: "bold",
                        color: "#1a2e1a",
                        marginBottom: 20,
                        lineHeight: 1.1,
                    }}
                >
                    {post.title}
                </div>

                <div style={{ fontSize: 32, color: "#6b7280" }}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
