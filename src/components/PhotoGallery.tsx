"use client";

import { useEffect, useState } from "react";

interface PhotoGalleryProps {
  photos: number[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [pressedButton, setPressedButton] = useState<"prev" | "next" | null>(
    null
  );

  const goToPhoto = (index: number) => {
    const newIndex = Math.max(0, Math.min(photos.length - 1, index));
    setCurrentIndex(newIndex);
    setShowHint(false);
  };

  const nextPhoto = () => {
    if (currentIndex < photos.length - 1) {
      setPressedButton("next");
      setTimeout(() => setPressedButton(null), 150);
      goToPhoto(currentIndex + 1);
    }
  };

  const prevPhoto = () => {
    if (currentIndex > 0) {
      setPressedButton("prev");
      setTimeout(() => setPressedButton(null), 150);
      goToPhoto(currentIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          nextPhoto();
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          prevPhoto();
          break;
        case "Home":
          e.preventDefault();
          goToPhoto(0);
          break;
        case "End":
          e.preventDefault();
          goToPhoto(photos.length - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, photos.length]);

  // Hide hint after a delay
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const currentPhoto = photos[currentIndex];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left side - Photo (70%) */}
      <div className="w-[70%] relative flex items-center justify-center p-12">
        <picture className="relative max-w-full max-h-full">
          <source
            media="(color-gamut: p3)"
            srcSet={`/photos/p3/${currentPhoto}.jpeg`}
          />
          <img
            src={`/photos/srgb/${currentPhoto}.jpeg`}
            alt={`Photo ${currentIndex + 1}`}
            className="max-w-full max-h-[calc(100vh-16rem)] w-auto h-auto object-contain"
          />
        </picture>

        {/* Keyboard hint */}
        {showHint && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 transition-opacity duration-500">
            <div className="bg-popover text-popover-foreground text-sm px-4 py-2 rounded-full flex items-center gap-3 border border-border shadow-lg">
              <span className="flex items-center gap-1">
                <kbd className="bg-muted px-2 py-0.5 rounded text-xs">
                  ←
                </kbd>
                <kbd className="bg-muted px-2 py-0.5 rounded text-xs">
                  →
                </kbd>
              </span>
              <span>Navigate photos</span>
            </div>
          </div>
        )}
      </div>

      {/* Right side - Text (30%) */}
      <div className="w-[30%] p-12 flex flex-col justify-center border-l border-border relative">
        {/* Navigation buttons - bottom left, stacked vertically */}
        <div className="absolute bottom-8 left-12 flex flex-col gap-3">
          <button
            onClick={prevPhoto}
            disabled={currentIndex === 0}
            className={`group relative ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
            }`}
            aria-label="Previous photo"
          >
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-lg bg-muted border border-border transition-all duration-150 ${
                pressedButton === "prev"
                  ? "translate-y-1 shadow-none"
                  : "shadow-[0_4px_0_0_rgba(0,0,0,0.1)] group-hover:shadow-[0_2px_0_0_rgba(0,0,0,0.1)] group-hover:translate-y-[2px]"
              } ${
                currentIndex > 0
                  ? "group-hover:bg-accent group-active:translate-y-1 group-active:shadow-none"
                  : ""
              }`}
            >
              <svg
                className="w-6 h-6 text-foreground"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
              </svg>
            </div>
          </button>

          <button
            onClick={nextPhoto}
            disabled={currentIndex === photos.length - 1}
            className={`group relative ${
              currentIndex === photos.length - 1
                ? "opacity-30 cursor-not-allowed"
                : ""
            }`}
            aria-label="Next photo"
          >
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-lg bg-muted border border-border transition-all duration-150 ${
                pressedButton === "next"
                  ? "translate-y-1 shadow-none"
                  : "shadow-[0_4px_0_0_rgba(0,0,0,0.1)] group-hover:shadow-[0_2px_0_0_rgba(0,0,0,0.1)] group-hover:translate-y-[2px]"
              } ${
                currentIndex < photos.length - 1
                  ? "group-hover:bg-accent group-active:translate-y-1 group-active:shadow-none"
                  : ""
              }`}
            >
              <svg
                className="w-6 h-6 text-foreground"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </div>
          </button>
        </div>

        {/* Text content - vertically centered */}
        <div className="text-foreground space-y-6">
          <p className="text-base leading-relaxed">
            I'm no professional photographer, just someone who can't walk
            past interesting light or a good texture without reaching for my
            phone.
          </p>
          <p className="text-base leading-relaxed">
            These are some moments I've collected along the way — nothing too
            serious, just things that caught my eye.
          </p>
          <p className="text-base leading-relaxed">
            I used to post these on Instagram, but this feels like a better
            place for them now.
          </p>
        </div>

        {/* Photo counter */}
        <div className="absolute bottom-8 right-8 text-muted-foreground text-sm font-mono">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>
    </div>
  );
}
