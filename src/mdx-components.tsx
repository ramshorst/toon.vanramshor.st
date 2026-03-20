import type { MDXComponents } from "mdx/types";

function Screenshot({
    src,
    alt,
    display = "inline",
}: {
    src: string;
    alt: string;
    display?: "inline" | "wide" | "stretch";
}) {
    const wrapperClass = {
        inline: "my-6 rounded-lg overflow-hidden",
        wide: "my-6 rounded-lg overflow-hidden -mx-5 w-[calc(100%+40px)]",
        stretch: "my-6 overflow-hidden -mx-5 w-[calc(100%+40px)]",
    }[display];

    return (
        <figure className={wrapperClass}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="w-full h-auto block" />
            {alt && (
                <figcaption className="text-xs text-center py-2 px-4 text-muted-foreground bg-muted/40">
                    {alt}
                </figcaption>
            )}
        </figure>
    );
}

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
        Screenshot,
    };
}
