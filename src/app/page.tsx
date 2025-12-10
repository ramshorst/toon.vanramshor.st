import { Hero } from "@/components/Hero";
import { getBlogPosts, getCategories, getPopularPosts } from "@/lib/blog";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const posts = await getBlogPosts();
  const recentPosts = posts.slice(0, 5);
  const popularPosts = await getPopularPosts();
  const categories = await getCategories();

  return (
    <div className="space-y-20">
      <Hero />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Recent Posts</h2>
            <Link href="/blog" className="flex items-center text-primary hover:underline group">
              View all posts
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-8">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={post.category ? `/${post.category}/${post.slug}` : `/blog/${post.slug}`}
                className="block group"
              >
                <article className="space-y-3">
                  {post.category && (
                    <div className="text-sm font-medium text-primary uppercase tracking-wider">
                      {post.category}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{post.summary}</p>
                  <div className="text-primary font-medium group-hover:underline inline-flex items-center">
                    Read more <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </main>

        <aside className="lg:col-span-4 space-y-12">
          {popularPosts.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b border-border">Popular Posts</h3>
              <div className="space-y-6">
                {popularPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={post.category ? `/${post.category}/${post.slug}` : `/blog/${post.slug}`}
                    className="block group"
                  >
                    <h4 className="font-bold group-hover:text-primary transition-colors mb-1">
                      {post.title}
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {categories.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b border-border">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/${category}`} // Note: This route needs to be implemented or handled
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
