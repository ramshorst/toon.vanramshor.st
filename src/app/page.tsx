import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { getBlogPosts } from "@/lib/blog";
import { getProjects } from "@/lib/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const posts = await getBlogPosts();
  const recentPosts = posts.slice(0, 5);
  const projects = await getProjects();
  const projectYears = [...new Set(projects.map((p) => p.year))].sort((a, b) => a - b);

  // Count tag usage and find the most recent project per tag
  const tagCounts = new Map<string, number>();
  const tagLatestProject = new Map<string, { slug: string; year: number }>();

  for (const project of projects) {
    for (const tag of project.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
      const current = tagLatestProject.get(tag);
      if (!current || project.year > current.year) {
        tagLatestProject.set(tag, { slug: project.slug, year: project.year });
      }
    }
  }

  const DEPRIORITIZED = new Set([
    "PHP", "MySQL", "SEO", "Multilingual", "Food Tech", "Exhibition",
    "Architecture", "Urban Planning", "Hospitality", "Spatial Reasoning",
    "IMAP", "CRUD", "CMS", "Storybook", "B2B", "Content Architecture",
  ]);

  const sortedTags = [...tagCounts.entries()]
    .sort((a, b) => {
      const aLow = DEPRIORITIZED.has(a[0]);
      const bLow = DEPRIORITIZED.has(b[0]);
      if (aLow !== bLow) return aLow ? 1 : -1;
      return b[1] - a[1];
    })
    .map(([tag]) => tag);

  const tagLinks: Record<string, string> = {};
  for (const tag of sortedTags) {
    const proj = tagLatestProject.get(tag);
    if (proj) tagLinks[tag] = `/projects#${proj.slug}`;
  }

  return (
    <div className="space-y-20">
      <Hero projectYears={projectYears} />

      <div className="max-w-2xl mx-auto space-y-20">

        {/* Tech stack */}
        {sortedTags.length > 0 && (
          <section>
            <TechStack tags={sortedTags} tagLinks={tagLinks} />
          </section>
        )}

        {/* Recent writing */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Recent writing</h2>
            <Link href="/blog" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              All posts
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="divide-y divide-border/60">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={post.category ? `/${post.category}/${post.slug}` : `/blog/${post.slug}`}
                className="flex items-baseline justify-between gap-6 py-5 group"
              >
                <h3 className="text-base font-medium group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
                <time className="shrink-0 text-sm text-muted-foreground tabular-nums">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
