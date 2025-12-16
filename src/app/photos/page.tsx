import { Metadata } from "next";
import PhotoGallery from "@/components/PhotoGallery";

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
            serious, just things that caught my eye. I used to post these on
            Instagram, but this feels like a better place for them now.
          </p>
        </div>
        <PhotoGallery photos={photos} />
      </div>
    </div>
  );
}
