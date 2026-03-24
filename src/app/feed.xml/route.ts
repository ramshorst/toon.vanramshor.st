import RSS from "rss";
import fs from "fs";
import path from "path";
import { getBlogPosts } from "@/lib/blog";
import { COMPONENTS } from "@/lib/components-registry";

export const dynamic = "force-static";

const BASE_URL = "https://toon.vanramshor.st";
const CONTENT_DIR = path.join(process.cwd(), "src/content");

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function inlineMarkdown(text: string): string {
    return text
        // Bold+italic
        .replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>")
        // Bold
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        // Italic
        .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
        // Inline code
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        // Links
        .replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, `<a href="${BASE_URL}$2">$1</a>`)
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>');
}

function mdxToHtml(rawMdx: string): string {
    // Strip frontmatter (---...--- at start)
    let content = rawMdx.replace(/^---[\s\S]*?---\n+/, "");

    // Handle Screenshot components → <figure><img /></figure>
    content = content.replace(
        /<Screenshot\s+src="([^"]+)"(?:\s+alt="([^"]*)")?(?:\s+href="([^"]*)")?(?:\s+display="[^"]*")?\s*\/>/g,
        (_, src, alt = "", href) => {
            const imgSrc = src.startsWith("/") ? `${BASE_URL}${src}` : src;
            const img = `<img src="${imgSrc}" alt="${escapeHtml(alt)}" style="max-width:100%;height:auto;border-radius:8px;" />`;
            const inner = href ? `<a href="${href.startsWith("/") ? BASE_URL + href : href}">${img}</a>` : img;
            return `<figure style="margin:2em 0;">${inner}${alt ? `<figcaption style="font-size:0.85em;text-align:center;margin-top:0.5em;color:#6c4b37;">${escapeHtml(alt)}</figcaption>` : ""}</figure>\n\n`;
        }
    );

    // Custom interactive components → fallback links
    content = content
        .replace(/<VennDiagram\s*\/>/g, `<p><a href="${BASE_URL}/web-development/design-engineer"><em>→ View interactive diagram on the website</em></a></p>\n\n`)
        .replace(/<HandoffPipeline\s*\/>/g, `<p><a href="${BASE_URL}/web-development/design-engineer"><em>→ View interactive diagram on the website</em></a></p>\n\n`);

    // Preserve fenced code blocks
    const codeBlocks: string[] = [];
    content = content.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        const idx = codeBlocks.push(
            `<pre style="background:#1c1917;color:#e8d5bf;padding:1em;border-radius:6px;overflow-x:auto;"><code${lang ? ` class="language-${lang}"` : ""}>${escapeHtml(code.trimEnd())}</code></pre>`
        ) - 1;
        return `%%CB${idx}%%`;
    });

    // Split into paragraph blocks and convert each
    const paragraphs = content.split(/\n{2,}/);
    const htmlParts = paragraphs.map((block) => {
        block = block.trim();
        if (!block) return "";

        // Restore code block
        if (/^%%CB\d+%%$/.test(block)) {
            const idx = parseInt(block.match(/%%CB(\d+)%%/)?.[1] ?? "0");
            return codeBlocks[idx];
        }

        // Already-converted HTML (figure, p with link, etc.)
        if (/^<(figure|p|pre|ul|ol|blockquote|hr)/.test(block)) return block;

        // Horizontal rule
        if (/^---+$/.test(block)) return "<hr style=\"border:none;border-top:1px solid #e5d8cd;margin:2em 0;\" />";

        // Headings
        const headingMatch = block.match(/^(#{1,4})\s+(.*)/);
        if (headingMatch) {
            const level = headingMatch[1].length;
            const text = inlineMarkdown(headingMatch[2]);
            return `<h${level} style="margin-top:1.5em;">${text}</h${level}>`;
        }

        // Unordered list (all lines start with - or *)
        const lines = block.split("\n");
        if (lines.every((l) => /^\s*[-*+] /.test(l))) {
            const items = lines.map((l) => `<li>${inlineMarkdown(l.replace(/^\s*[-*+] /, ""))}</li>`).join("");
            return `<ul style="padding-left:1.5em;">${items}</ul>`;
        }

        // Ordered list
        if (lines.every((l) => /^\s*\d+\.\s/.test(l))) {
            const items = lines.map((l) => `<li>${inlineMarkdown(l.replace(/^\s*\d+\.\s/, ""))}</li>`).join("");
            return `<ol style="padding-left:1.5em;">${items}</ol>`;
        }

        // Blockquote
        if (lines.every((l) => l.startsWith("> "))) {
            const inner = lines.map((l) => l.slice(2)).join(" ");
            return `<blockquote style="border-left:4px solid #d99a63;margin:1em 0;padding:0.5em 1em;color:#6c4b37;">${inlineMarkdown(inner)}</blockquote>`;
        }

        // Default: paragraph (join broken lines)
        return `<p>${inlineMarkdown(lines.join(" "))}</p>`;
    });

    return htmlParts.filter(Boolean).join("\n");
}

function getRawMdx(slug: string): string | null {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, "utf8");
}

export async function GET() {
    const feed = new RSS({
        title: "Toon van Ramshorst",
        description: "Personal website and blog of Toon van Ramshorst — Technical Designer & AI Coder",
        site_url: BASE_URL,
        feed_url: `${BASE_URL}/feed.xml`,
        copyright: `2008 → present Toon van Ramshorst`,
        pubDate: new Date(),
        image_url: `${BASE_URL}/icon.png`,
    });

    // Add blog posts with full content
    const posts = await getBlogPosts();
    posts.forEach((post) => {
        const rawMdx = getRawMdx(post.slug);
        const fullHtml = rawMdx
            ? `<p><em>${escapeHtml(post.summary)}</em></p>\n${mdxToHtml(rawMdx)}`
            : `<p>${escapeHtml(post.summary)}</p>`;

        feed.item({
            title: post.title,
            description: fullHtml,
            url: post.category
                ? `${BASE_URL}/${post.category}/${post.slug}`
                : `${BASE_URL}/blog/${post.slug}`,
            date: post.publishedAt,
            author: "Toon van Ramshorst",
            categories: post.category ? [post.category] : [],
        });
    });

    // Add published components from the explorations registry
    COMPONENTS.forEach((component) => {
        feed.item({
            title: component.title,
            description: `<p>${escapeHtml(component.description)}</p><p><a href="${BASE_URL}${component.href}">→ View the component</a></p>`,
            url: `${BASE_URL}${component.href}`,
            date: component.date,
            author: "Toon van Ramshorst",
            categories: ["components"],
        });
    });

    return new Response(feed.xml({ indent: true }), {
        headers: {
            "Content-Type": "text/xml; charset=utf-8",
        },
    });
}
