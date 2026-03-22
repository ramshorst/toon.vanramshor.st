import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-border mt-32">
            <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-5">
                    <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
                    <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
                    <Link href="/blog" className="hover:text-foreground transition-colors">Writing</Link>
                </div>
                <div className="flex items-center gap-5">
                    <Link href="https://github.com/ramshorst" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</Link>
                    <Link href="https://linkedin.com/in/toonvanramshorst" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</Link>
                    <Link href="/feed.xml" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">RSS</Link>
                </div>
            </div>
        </footer>
    );
}
