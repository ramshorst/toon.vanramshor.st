import { BreathingLoaderShowcase } from "@/components/explorations/BreathingLoaderShowcase";
import { ComponentNav } from "@/components/explorations/ComponentNav";

export default function BreathingLoaderPage() {
    return (
        <main className="container mx-auto px-4 py-24">
            <div className="max-w-2xl mx-auto">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Component</p>
                <h1 className="text-4xl font-bold tracking-tight mb-4">Breathing Loader</h1>
                <p className="text-muted-foreground mb-16">
                    A pill that slides left and right, stretching as it reaches each end before snapping back to a circle.
                </p>

                <div className="rounded-2xl border border-border bg-card p-6 overflow-hidden">
                    <BreathingLoaderShowcase />
                </div>

                <ComponentNav currentHref="/explorations/breathing-loader" />
            </div>
        </main>
    );
}
