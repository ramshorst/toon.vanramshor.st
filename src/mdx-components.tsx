import type { MDXComponents } from "mdx/types";

function Screenshot({
    src,
    alt,
    href,
    display = "inline",
}: {
    src: string;
    alt: string;
    href?: string;
    display?: "inline" | "wide" | "stretch";
}) {
    const wrapperClass = {
        inline: "mt-12 overflow-hidden",
        wide: "mt-12 overflow-hidden -mx-5 w-[calc(100%+40px)]",
        stretch: "mt-12 overflow-hidden -mx-5 w-[calc(100%+40px)]",
    }[display];

    const image = (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={src} alt={alt} className="w-full h-auto block shadow-sm rounded-lg" />
    );

    return (
        <figure className={wrapperClass}>
            <div className="bg-muted/40 pt-6 px-[60px] pb-6">
                {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
                        {image}
                    </a>
                ) : image}
                {alt && (
                    <figcaption className="text-xs text-center mt-2 text-muted-foreground">
                        {alt}
                    </figcaption>
                )}
            </div>
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
