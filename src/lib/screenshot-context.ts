import { createContext } from "react";

// When set to a src string, the MDXScreenshot component will skip rendering
// the screenshot that matches — used to avoid duplication when the thumbnail
// animates into the full hero image in the expanded project row.
export const SkipScreenshotSrcContext = createContext<string | null>(null);
