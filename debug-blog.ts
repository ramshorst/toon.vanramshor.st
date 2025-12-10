import { getBlogSlugs } from "./src/lib/blog-slugs";

async function main() {
    try {
        console.log("Calling getBlogSlugs...");
        const slugs = getBlogSlugs();
        console.log("Slugs:", slugs);
        console.log("Count:", slugs.length);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
