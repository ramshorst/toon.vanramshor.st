import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border bg-muted/30">
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Toon van Ramshorst. All rights reserved.
                </div>

                <div className="flex items-center gap-4">
                    <Link href="https://github.com/ramshorst" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href="https://linkedin.com/in/toonvanramshorst" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    {/* Add more social links as needed */}
                </div>
            </div>
        </footer>
    );
}
