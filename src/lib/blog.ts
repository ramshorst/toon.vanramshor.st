import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

const contentDir = path.join(process.cwd(), "src/content");

export type BlogPost = {
    slug: string;
    title: string;
    publishedAt: string;
    summary: string;
    content: React.ReactNode;
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
                    summary: string;
                }>({
                    source,
                    options: { parseFrontmatter: true },
                });

                return {
                    slug,
                    title: frontmatter.title,
                    publishedAt: frontmatter.publishedAt,
                    summary: frontmatter.summary,
                    content,
                };
            })
    );

    return posts.sort((a, b) => (new Date(b.publishedAt) > new Date(a.publishedAt) ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const posts = await getBlogPosts();
    return posts.find((post) => post.slug === slug);
}
