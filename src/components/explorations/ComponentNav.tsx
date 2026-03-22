import Link from "next/link";
import { COMPONENTS } from "@/lib/components-registry";

type Props = { currentHref: string };

export function ComponentNav({ currentHref }: Props) {
    const idx = COMPONENTS.findIndex((c) => c.href === currentHref);
    const prev = idx > 0 ? COMPONENTS[idx - 1] : null;
    const next = idx < COMPONENTS.length - 1 ? COMPONENTS[idx + 1] : null;

    return (
        <div className="grid grid-cols-2 gap-4 mt-16 pt-8 border-t border-border/40">
            <div>
                {prev && (
                    <Link href={prev.href} className="group flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">Previous</span>
                        <span className="text-base font-medium group-hover:text-primary transition-colors inline-flex items-center gap-1.5 leading-none">
                            <span className="leading-none">⟵</span> {prev.title}
                        </span>
                        <span className="text-xs text-muted-foreground/60 mt-0.5 leading-snug">{prev.description}</span>
                    </Link>
                )}
            </div>
            <div className="text-right">
                {next && (
                    <Link href={next.href} className="group flex flex-col gap-1 items-end">
                        <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">Next</span>
                        <span className="text-base font-medium group-hover:text-primary transition-colors inline-flex items-center gap-1.5 leading-none">
                            {next.title} <span className="leading-none">⟶</span>
                        </span>
                        <span className="text-xs text-muted-foreground/60 mt-0.5 leading-snug">{next.description}</span>
                    </Link>
                )}
            </div>
        </div>
    );
}
