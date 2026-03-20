import Link from "next/link";
import { Github, Linkedin, Rss, Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border bg-gradient-to-b from-background to-muted/20 mt-32">
            <div className="container mx-auto px-6 py-16">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2">
                        <Link href="/" className="font-bold text-2xl tracking-tight mb-4 block">
                            Toon van Ramshorst
                        </Link>
                        <p className="text-muted-foreground max-w-sm text-lg">
                            Design engineer. Building things people use, at the intersection of code and craft.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Explore</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="https://calendly.com/ramshorst/30min" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <Link
                                href="https://github.com/ramshorst"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                            >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link
                                href="https://linkedin.com/in/toonvanramshorst"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                            >
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link
                                href="/feed.xml"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                            >
                                <Rss className="h-5 w-5" />
                                <span className="sr-only">RSS Feed</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <span>Designed & Built with</span>
                        <Heart className="h-3 w-3 text-red-500 animate-pulse fill-red-500" />
                        <span>in France</span>
                    </div>
                    <div>
                        © 2008 - present
                    </div>
                </div>
            </div>
        </footer>
    );
}