import { Metadata } from "next";
import PhotoGallery from "@/components/PhotoGallery";

export const metadata: Metadata = {
  title: "Photos | Toon van Ramshorst",
  description: "Photo gallery",
};

const photos = Array.from({ length: 24 }, (_, i) => i + 1);

export default function PhotosPage() {
  return (
    <div className="w-screen h-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-8 bg-background overflow-hidden">
      <PhotoGallery photos={photos} />
    </div>
  );
}
