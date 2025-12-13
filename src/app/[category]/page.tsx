import { getBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Return 404 for paths not in generateStaticParams
export const dynamicParams = false;
export async function generateStaticParams() {
    const posts = await getBlogPosts();
    const categories = new Set(posts.map((post) => post.category).filter(Boolean));
    return Array.from(categories).map((category) => ({
        category,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const formattedCategory = category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    return {
        title: `${formattedCategory} | Toon van Ramshorst`,
        description: `Articles about ${formattedCategory}`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const allPosts = await getBlogPosts();
    const posts = allPosts.filter((post) => post.category === category);

    if (posts.length === 0) {
        notFound();
    }

    const formattedCategory = category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <div className="max-w-4xl mx-auto py-12">
            <header className="mb-12">
                <div className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">
                    Category
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">{formattedCategory}</h1>
            </header>

            <div className="grid gap-8">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/${category}/${post.slug}`}
                        className="block group"
                    >
                        <article className="space-y-3">
                            <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                {post.title}
                            </h2>
                            <div className="text-sm text-muted-foreground">
                                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                            <p className="text-muted-foreground leading-relaxed">{post.summary}</p>
                            <div className="text-primary font-medium group-hover:underline inline-flex items-center">
                                Read more <ArrowRight className="ml-1 h-4 w-4" />
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}
