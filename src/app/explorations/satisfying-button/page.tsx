import { SatisfyingButtonShowcase } from "@/components/explorations/SatisfyingButtonShowcase";

export default function SatisfyingButtonPage() {
    return (
        <main className="container mx-auto px-4 py-24">
            <div className="max-w-2xl mx-auto">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Component</p>
                <h1 className="text-4xl font-bold tracking-tight mb-4">Satisfying Button</h1>
                <p className="text-muted-foreground mb-16">
                    A button with a tactile depth effect. Hover to see the accent shift, click to feel it press.
                </p>

                <div className="rounded-2xl border border-border bg-card p-6">
                    <SatisfyingButtonShowcase />
                </div>
            </div>
        </main>
    );
}
