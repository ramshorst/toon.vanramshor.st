"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface PhotoGalleryProps {
  photos: number[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const photoRefs = useRef<(HTMLElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);

  // For accelerating keyboard navigation
  const navigationState = useRef({
    direction: 0, // -1 for up, 1 for down, 0 for none
    startTime: 0,
    animationFrame: 0,
    lastNavTime: 0,
  });

  // Track which photo is most visible using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let maxRatio = 0;
        let maxIndex = -1;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = photoRefs.current.indexOf(entry.target as HTMLElement);
            if (entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio;
              maxIndex = index;
            }
          }
        });

        if (maxIndex !== -1) {
          setCurrentIndex(maxIndex);
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] }
    );

    photoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [photos.length]);

  // Precise scroll to photo - aligns to top of image with offset
  const scrollToPhoto = useCallback(
    (index: number, smooth = true) => {
      const targetIndex = Math.max(0, Math.min(photos.length - 1, index));
      const target = photoRefs.current[targetIndex];

      if (target) {
        const rect = target.getBoundingClientRect();
        const scrollTop = window.scrollY;

        // Align to top of image with 95px offset
        const scrollTo = scrollTop + rect.top - 95;

        window.scrollTo({
          top: scrollTo,
          behavior: smooth ? "smooth" : "auto",
        });
        setCurrentIndex(targetIndex);
      }
    },
    [photos.length]
  );

  // Accelerating navigation loop
  const runNavigationLoop = useCallback(() => {
    const state = navigationState.current;
    if (state.direction === 0) return;

    const now = performance.now();
    const elapsed = now - state.startTime;

    // Acceleration curve: starts snappy, gets faster
    // Base interval of 200ms, decreasing to 60ms over 1 second
    const minInterval = 60;
    const maxInterval = 200;
    const accelerationTime = 1000;

    const progress = Math.min(elapsed / accelerationTime, 1);
    // Ease-in curve for acceleration
    const easedProgress = progress * progress;
    const currentInterval =
      maxInterval - (maxInterval - minInterval) * easedProgress;

    if (now - state.lastNavTime >= currentInterval) {
      state.lastNavTime = now;

      setCurrentIndex((prev) => {
        const newIndex = Math.max(
          0,
          Math.min(photos.length - 1, prev + state.direction)
        );
        // Use instant scroll during rapid navigation for responsiveness
        const target = photoRefs.current[newIndex];
        if (target) {
          const rect = target.getBoundingClientRect();
          const scrollTop = window.scrollY;
          const scrollToPos = scrollTop + rect.top - 95;

          window.scrollTo({
            top: scrollToPos,
            behavior: elapsed > 150 ? "auto" : "smooth",
          });
        }
        return newIndex;
      });
    }

    state.animationFrame = requestAnimationFrame(runNavigationLoop);
  }, [photos.length]);

  const startNavigation = useCallback(
    (direction: number) => {
      const state = navigationState.current;
      if (state.direction !== 0) return; // Already navigating

      state.direction = direction;
      state.startTime = performance.now();
      state.lastNavTime = 0; // Navigate immediately

      setShowHint(false);
      runNavigationLoop();
    },
    [runNavigationLoop]
  );

  const stopNavigation = useCallback(() => {
    const state = navigationState.current;
    state.direction = 0;
    if (state.animationFrame) {
      cancelAnimationFrame(state.animationFrame);
      state.animationFrame = 0;
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with other inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Ignore key repeats - we handle acceleration ourselves
      if (e.repeat) {
        e.preventDefault();
        return;
      }

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
        case "j":
          e.preventDefault();
          startNavigation(1);
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "k":
          e.preventDefault();
          startNavigation(-1);
          break;
        case "Home":
          e.preventDefault();
          scrollToPhoto(0);
          setShowHint(false);
          break;
        case "End":
          e.preventDefault();
          scrollToPhoto(photos.length - 1);
          setShowHint(false);
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const navKeys = [
        "ArrowDown",
        "ArrowRight",
        "ArrowUp",
        "ArrowLeft",
        "j",
        "k",
      ];
      if (navKeys.includes(e.key)) {
        stopNavigation();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      stopNavigation();
    };
  }, [startNavigation, stopNavigation, scrollToPhoto, photos.length]);

  // Hide hint after a delay
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Keyboard hint */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-500 ${
          showHint ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-black/70 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full flex items-center gap-3">
          <span className="flex items-center gap-1">
            <kbd className="bg-white/20 px-2 py-0.5 rounded text-xs">↑</kbd>
            <kbd className="bg-white/20 px-2 py-0.5 rounded text-xs">↓</kbd>
          </span>
          <span>Navigate photos</span>
        </div>
      </div>

      {/* Progress indicator - horizontal lines */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToPhoto(index)}
            className={`h-1 w-6 rounded-full transition-opacity duration-200 cursor-pointer ${
              index === currentIndex
                ? "bg-white opacity-100"
                : "bg-white opacity-30 hover:opacity-60"
            }`}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>

      {/* Photo counter */}
      <div className="fixed right-4 bottom-6 z-50 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full font-mono">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Photos */}
      <div className="flex flex-col gap-10">
        {photos.map((num, index) => (
          <a
            key={num}
            ref={(el) => {
              photoRefs.current[index] = el;
            }}
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
    </>
  );
}
