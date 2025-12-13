import { notFound } from "next/navigation";
import { getBlogPosts } from "@/lib/blog";

// Return 404 for all /blog/[slug] routes - posts with categories use /[category]/[slug]
export const dynamicParams = false;

export async function generateStaticParams() {
    // Only generate paths for posts WITHOUT categories
    const posts = await getBlogPosts();
    const uncategorizedPosts = posts.filter((post) => !post.category);

    // If no uncategorized posts exist, return empty array
    // dynamicParams = false will return 404 for any /blog/* URL
    return uncategorizedPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default function BlogSlugPage() {
    // This will only render for uncategorized posts
    // For now, all posts have categories, so this always 404s
    notFound();
}
