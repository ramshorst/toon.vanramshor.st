import Script from "next/script";

export function Newsletter() {
    return (
        <section>
            <div className="mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Newsletter</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
                New essays and explorations, straight to your inbox. No spam.
            </p>
            <Script async src="https://subscribe-forms.beehiiv.com/embed.js" />
            <iframe
                src="https://subscribe-forms.beehiiv.com/4b51cac8-4041-43e6-8079-d101d3775f42"
                data-test-id="beehiiv-embed"
                frameBorder={0}
                scrolling="no"
                style={{ width: "100%", height: 291, margin: 0, borderRadius: 0, backgroundColor: "transparent", boxShadow: "none" }}
            />
        </section>
    );
}
