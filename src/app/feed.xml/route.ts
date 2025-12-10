import RSS from "rss";
import { getBlogPosts } from "@/lib/blog";

export async function GET() {
    const feed = new RSS({
        title: "Toon van Ramshorst",
        description: "Personal website and blog of Toon van Ramshorst - Technical Designer & AI Coder",
        site_url: "https://toon.vanramshor.st",
        feed_url: "https://toon.vanramshor.st/feed.xml",
        copyright: `2008 → present Toon van Ramshorst`,
        pubDate: new Date(),
    });

    const posts = await getBlogPosts();

    posts.forEach((post) => {
        feed.item({
            title: post.title,
            description: post.summary,
            url: `https://toon.vanramshor.st/blog/${post.slug}`,
            date: post.publishedAt,
            author: "Toon van Ramshorst",
        });
    });

    return new Response(feed.xml({ indent: true }), {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
