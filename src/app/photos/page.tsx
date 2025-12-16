import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photos | Toon van Ramshorst",
  description: "Photo gallery",
};

const photos = Array.from({ length: 40 }, (_, i) => i + 1);

export default function PhotosPage() {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-8 -mb-8 min-h-screen bg-neutral-600">
      <div className="max-w-[960px] mx-auto py-12 px-4">
        <div className="mb-12 text-neutral-200">
          <p className="text-lg leading-relaxed">
            I'm no professional photographer, just someone who can't walk past
            interesting light or a good texture without reaching for my phone.
            These are some moments I've collected along the way — nothing too
            serious, just things that caught my eye.
          </p>
        </div>
        <div className="flex flex-col gap-10">
          {photos.map((num) => (
            <a
              key={num}
              href={`/photos/p3/${num}.jpeg`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            >
              <picture>
                <source
                  media="(color-gamut: p3)"
                  srcSet={`/photos/p3/${num}.jpeg`}
                />
                <img
                  src={`/photos/srgb/${num}.jpeg`}
                  alt={`Photo ${num}`}
                  loading="lazy"
                  className="w-full h-auto block"
                />
              </picture>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
