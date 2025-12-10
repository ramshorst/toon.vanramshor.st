"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Heading = {
    id: string;
    text: string;
    level: number;
};

export function TableOfContents() {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("h2, h3"))
            .filter((element) => element.id)
            .map((element) => ({
                id: element.id,
                text: element.textContent || "",
                level: Number(element.tagName.substring(1)),
            }));
        setHeadings(elements);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" }
        );

        elements.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    if (headings.length < 3) return null;

    return (
        <nav className="hidden lg:block sticky top-32 ml-12 w-64 max-h-[calc(100vh-8rem)] overflow-auto">
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                On this page
            </h4>
            <ul className="space-y-2 text-sm">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: (heading.level - 2) * 16 }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={cn(
                                "block transition-colors hover:text-primary",
                                activeId === heading.id
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: "smooth",
                                });
                                setActiveId(heading.id);
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
