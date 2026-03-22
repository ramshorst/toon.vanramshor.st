import { MagneticButton } from "@/components/explorations/MagneticButton";

export default function MagneticButtonPage() {
    return (
        <main className="container mx-auto px-4 py-24">
            <div className="max-w-2xl mx-auto">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Component</p>
                <h1 className="text-4xl font-bold tracking-tight mb-4">Magnetic Button</h1>
                <p className="text-muted-foreground mb-16">
                    A button that magnetically pulls toward the cursor and fills with color on hover.
                </p>

                <div className="rounded-2xl border border-border bg-card flex items-center justify-center py-24">
                    <MagneticButton>Hover me</MagneticButton>
                </div>
            </div>
        </main>
    );
}
