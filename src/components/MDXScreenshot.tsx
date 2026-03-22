"use client";

import { useContext } from "react";
import { SkipScreenshotSrcContext } from "@/lib/screenshot-context";

export function MDXScreenshot({
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
    const skipSrc = useContext(SkipScreenshotSrcContext);
    if (skipSrc === src) return null;

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
