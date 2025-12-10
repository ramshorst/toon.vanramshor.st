import type { MDXComponents } from "mdx/types";

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function createHeading(level: 2 | 3) {
    const HeadingComponent = ({ children }: { children: React.ReactNode }) => {
        const text = typeof children === "string" ? children : String(children);
        const id = slugify(text);
        const Tag = `h${level}` as const;

        return (
            <Tag id={id}>
                {children}
            </Tag>
        );
    };
    HeadingComponent.displayName = `Heading${level}`;
    return HeadingComponent;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        h2: createHeading(2),
        h3: createHeading(3),
    };
}
