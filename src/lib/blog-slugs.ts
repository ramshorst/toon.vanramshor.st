import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "src/content");

export function getBlogSlugs() {
    if (!fs.existsSync(contentDir)) {
        return [];
    }
    const files = fs.readdirSync(contentDir);
    return files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(".mdx", ""));
}
