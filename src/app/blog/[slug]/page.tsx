import { getBlogPost } from "@/lib/blog";
import { getBlogSlugs } from "@/lib/blog-slugs";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const slugs = getBlogSlugs();
    return slugs.map((slug) => ({
        slug,
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
        <article className="max-w-3xl mx-auto py-12">
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
        </article>
    );
}
