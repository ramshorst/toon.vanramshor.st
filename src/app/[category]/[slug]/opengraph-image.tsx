import { ImageResponse } from "next/og";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

export const revalidate = false;
export const dynamicParams = false;

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts
        .filter((post) => post.category)
        .map((post) => ({
            category: post.category,
            slug: post.slug,
        }));
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return new ImageResponse(
            (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        background: "#fcfbf7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 40,
                        color: "#2a1508",
                        fontFamily: "sans-serif",
                    }}
                >
                    toon.vanramshor.st
                </div>
            ),
            { ...size }
        );
    }

    const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const categoryLabel = post.category
        ? post.category.replace(/-/g, " ").toUpperCase()
        : "";

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
                    padding: "64px 80px",
                    fontFamily: "sans-serif",
                    position: "relative",
                }}
            >
                {/* Decorative ring — top right */}
                <div
                    style={{
                        position: "absolute",
                        top: -200,
                        right: -200,
                        width: 600,
                        height: 600,
                        borderRadius: "50%",
                        border: "80px solid #f3d8bf",
                        opacity: 0.45,
                        display: "flex",
                    }}
                />

                {/* Left accent bar */}
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: 8,
                        height: "100%",
                        background: "linear-gradient(to bottom, #d99a63, #d84315)",
                        display: "flex",
                    }}
                />

                {/* Top row: category + monogram */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {categoryLabel ? (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                background: "#f3d8bf",
                                color: "#7b531e",
                                fontSize: 18,
                                fontWeight: 600,
                                letterSpacing: "2px",
                                padding: "8px 20px",
                                borderRadius: 6,
                            }}
                        >
                            {categoryLabel}
                        </div>
                    ) : (
                        <div style={{ display: "flex" }} />
                    )}

                    <div
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: 12,
                            background: "#d99a63",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontSize: 32,
                            fontWeight: 700,
                        }}
                    >
                        T
                    </div>
                </div>

                {/* Title + summary */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            fontSize: 64,
                            fontWeight: 800,
                            color: "#2a1508",
                            lineHeight: 1.08,
                            letterSpacing: "-1.5px",
                            marginBottom: 20,
                            display: "flex",
                            flexWrap: "wrap",
                            maxWidth: 980,
                        }}
                    >
                        {post.title}
                    </div>
                    <div
                        style={{
                            fontSize: 26,
                            color: "#6c4b37",
                            lineHeight: 1.4,
                            maxWidth: 820,
                            display: "flex",
                        }}
                    >
                        {post.summary}
                    </div>
                </div>

                {/* Footer: author + date + site */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {/* Author avatar */}
                        <div
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: "50%",
                                background: "#d99a63",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#ffffff",
                                fontSize: 22,
                                fontWeight: 700,
                                marginRight: 14,
                            }}
                        >
                            T
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: 20, fontWeight: 600, color: "#2a1508", display: "flex" }}>
                                Toon van Ramshorst
                            </span>
                            <span style={{ fontSize: 17, color: "#6c4b37", display: "flex" }}>
                                {formattedDate}
                            </span>
                        </div>
                    </div>
                    <span style={{ fontSize: 19, color: "#ead8c8", display: "flex" }}>
                        toon.vanramshor.st
                    </span>
                </div>
            </div>
        ),
        { ...size }
    );
}
