import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TableOfContents } from "@/components/TableOfContents";

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return {};
    }

    return {
        title: `${post.title} | Toon van Ramshorst`,
        description: post.summary,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-6xl mx-auto py-12 flex gap-12 relative">
            <article className="flex-1 max-w-3xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                    <time className="text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                </header>

                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
                    {post.content}
                </div>

                <footer className="mt-8 pt-5 border-t border-border text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
                    {post.lastUpdated ? (
                        <span>
                            Last updated on{" "}
                            {new Date(post.lastUpdated).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    ) : (
                        <span />
                    )}
                    <Link
                        href={`https://github.com/ramshorst/toon.vanramshor.st/blob/main/src/content/${slug}.mdx`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Suggest an edit on GitHub →
                    </Link>
                </footer>
            </article>
            <TableOfContents />
        </div>
    );
}
