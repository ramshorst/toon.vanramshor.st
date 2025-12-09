import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";

export const metadata = {
    title: "Blog | Toon van Ramshorst",
    description: "Thoughts, experiments, and projects.",
};

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="max-w-4xl mx-auto py-12">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>

            <div className="grid gap-8">
                {posts.map((post) => (
                    <article key={post.slug} className="group">
                        <Link href={`/blog/${post.slug}`} className="block">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                                <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <span className="text-sm text-muted-foreground whitespace-nowrap">
                                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                {post.summary}
                            </p>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
