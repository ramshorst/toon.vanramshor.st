import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";

const projectsDir = path.join(process.cwd(), "src/content/projects");

export type Project = {
    slug: string;
    company: string;
    year: number;
    endYear?: number;
    sector: string;
    role: string;
    description: string;
    tags: string[];
    url?: string;
    draft?: boolean;
    firstScreenshot?: string;
    hideScreenshotPreview?: boolean;
    content: React.ReactNode;
};

export async function getProjects(): Promise<Project[]> {
    if (!fs.existsSync(projectsDir)) {
        return [];
    }

    const files = fs.readdirSync(projectsDir);
    const projects = await Promise.all(
        files
            .filter((file) => file.endsWith(".mdx"))
            .map(async (file) => {
                const slug = file.replace(".mdx", "");
                const filePath = path.join(projectsDir, file);
                const source = fs.readFileSync(filePath, "utf8");

                const { frontmatter, content } = await compileMDX<{
                    company: string;
                    year: number;
                    endYear?: number;
                    sector: string;
                    role: string;
                    description: string;
                    tags: string[];
                    url?: string;
                    draft?: boolean;
                    hideScreenshotPreview?: boolean;
                }>({
                    source,
                    options: { parseFrontmatter: true },
                    components: useMDXComponents({}),
                });

                const firstScreenshotMatch = source.match(/<Screenshot[^>]+\bsrc=["']([^"']+)["']/);
                const firstScreenshot = firstScreenshotMatch?.[1];

                return {
                    slug,
                    company: frontmatter.company,
                    year: frontmatter.year,
                    endYear: frontmatter.endYear,
                    sector: frontmatter.sector,
                    role: frontmatter.role,
                    description: frontmatter.description,
                    tags: frontmatter.tags ?? [],
                    url: frontmatter.url,
                    draft: frontmatter.draft ?? false,
                    firstScreenshot: frontmatter.hideScreenshotPreview ? undefined : firstScreenshot,
                    hideScreenshotPreview: frontmatter.hideScreenshotPreview,
                    content,
                };
            })
    );

    return projects
        .filter((p) => !p.draft)
        .sort((a, b) => b.year - a.year || a.company.localeCompare(b.company));
}
