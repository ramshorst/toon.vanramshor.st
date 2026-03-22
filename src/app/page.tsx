import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Explorations } from "@/components/Explorations";

import { getBlogPosts } from "@/lib/blog";
import { getProjects } from "@/lib/projects";

export default async function Home() {
  const posts = await getBlogPosts();
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

        {/* Explorations */}
        <section>
          <Explorations posts={posts} />
        </section>


      </div>
    </div>
  );
}
