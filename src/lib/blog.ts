import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

const contentDir = path.join(process.cwd(), "src/content");

export type BlogPost = {
    slug: string;
    title: string;
    publishedAt: string;
    lastUpdated?: string;
    summary: string;
    content: React.ReactNode;
    category?: string;
    popular?: boolean;
};

export function getBlogSlugs() {
    if (!fs.existsSync(contentDir)) {
        return [];
    }
    const files = fs.readdirSync(contentDir);
    return files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(".mdx", ""));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    if (!fs.existsSync(contentDir)) {
        return [];
    }

    const files = fs.readdirSync(contentDir);
    const posts = await Promise.all(
        files
            .filter((file) => file.endsWith(".mdx"))
            .map(async (file) => {
                const slug = file.replace(".mdx", "");
                const filePath = path.join(contentDir, file);
                const source = fs.readFileSync(filePath, "utf8");

                const { frontmatter, content } = await compileMDX<{
                    title: string;
                    publishedAt: string;
                    lastUpdated?: string;
                    summary: string;
                    category?: string;
                    popular?: boolean;
                }>({
                    source,
                    options: { parseFrontmatter: true },
                });

                return {
                    slug,
                    title: frontmatter.title,
                    publishedAt: frontmatter.publishedAt,
                    lastUpdated: frontmatter.lastUpdated,
                    summary: frontmatter.summary,
                    content,
                    category: frontmatter.category,
                    popular: frontmatter.popular,
                };
            })
    );

    return posts.sort((a, b) => (new Date(b.publishedAt) > new Date(a.publishedAt) ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const posts = await getBlogPosts();
    return posts.find((post) => post.slug === slug);
}

export async function getPopularPosts(): Promise<BlogPost[]> {
    const posts = await getBlogPosts();
    return posts.filter((post) => post.popular);
}

export async function getCategories(): Promise<string[]> {
    const posts = await getBlogPosts();
    const categories = new Set(posts.map((post) => post.category).filter(Boolean));
    return Array.from(categories) as string[];
}
