import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
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
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                    <time className="text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                </header>

                <div className="prose prose-lg dark:prose-invert mx-auto prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
                    {post.content}
                </div>

                {post.lastUpdated && (
                    <footer className="mt-12 pt-6 border-t border-border text-sm text-muted-foreground text-center">
                        Last updated on{" "}
                        {new Date(post.lastUpdated).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </footer>
                )}
            </article>
            <TableOfContents />
        </div>
    );
}
