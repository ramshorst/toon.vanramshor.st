import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
    const avatarUrl = "https://avatars.githubusercontent.com/u/5200239";
    const res = await fetch(avatarUrl);
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const src = `data:image/png;base64,${base64}`;

    return new ImageResponse(
        (
            <img
                src={src}
                width={32}
                height={32}
                style={{ borderRadius: 4 }}
            />
        ),
        { ...size }
    );
}
