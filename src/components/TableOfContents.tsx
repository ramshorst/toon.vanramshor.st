"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Heading = {
    id: string;
    text: string;
    level: number;
};

export function TableOfContents({ inline }: { inline?: boolean }) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("h2, h3"))
            .filter((element) => element.id)
            .map((element) => ({
                id: element.id,
                text: element.textContent || "",
                level: Number(element.tagName.substring(1)),
            }));
        setHeadings(elements);
        setMounted(true);

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

    if (inline) {
        return (
            <nav className="mb-12 border-y border-border py-6">
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    {headings.map((heading, index) => (
                        <li
                            key={heading.id}
                            style={{
                                paddingLeft: `${(heading.level - 2) * 12}px`,
                                opacity: 0,
                                ...(mounted
                                    ? { animation: `tocFadeIn 0.45s ease ${0.1 + index * 0.04}s forwards` }
                                    : {}),
                            }}
                        >
                            <a
                                href={`#${heading.id}`}
                                className={cn(
                                    "transition-colors duration-300 hover:text-primary",
                                    activeId === heading.id
                                        ? "text-primary font-medium"
                                        : "text-muted-foreground"
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.getElementById(heading.id);
                                    if (!el) return;
                                    const top = el.getBoundingClientRect().top + window.scrollY - 96;
                                    window.scrollTo({ top, behavior: "smooth" });
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

    return (
        <nav className="hidden lg:block sticky top-32 ml-12 w-64 max-h-[calc(100vh-8rem)] overflow-auto">
            <h4
                className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground"
                style={
                    mounted
                        ? { opacity: 0, animation: "tocFadeIn 0.5s ease 0.1s forwards" }
                        : { opacity: 0 }
                }
            >
                On this page
            </h4>
            <ul className="space-y-1 text-sm">
                {headings.map((heading, index) => (
                    <li
                        key={heading.id}
                        className={cn(
                            "border-l-2 transition-colors duration-300",
                            activeId === heading.id
                                ? "border-primary"
                                : "border-transparent"
                        )}
                        style={{
                            paddingLeft: `${(heading.level - 2) * 12 + 10}px`,
                            opacity: 0,
                            ...(mounted
                                ? {
                                      animation: `tocFadeIn 0.45s ease ${0.15 + index * 0.055}s forwards`,
                                  }
                                : {}),
                        }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={cn(
                                "block py-0.5 transition-colors duration-300 hover:text-primary",
                                activeId === heading.id
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById(heading.id);
                                if (!el) return;
                                const top = el.getBoundingClientRect().top + window.scrollY - 96;
                                window.scrollTo({ top, behavior: "smooth" });
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
