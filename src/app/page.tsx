import { Hero } from "@/components/Hero";
import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const posts = await getBlogPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="space-y-20">
      <Hero />

      <section className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Recent Posts</h2>
          <Link href="/blog" className="flex items-center text-primary hover:underline group">
            View all posts
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <div className="text-sm text-muted-foreground mb-4">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <p className="text-muted-foreground">{post.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
