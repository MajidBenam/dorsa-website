'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { InstagramPost } from '@/types/database';

interface GalleryCarouselProps {
  items: InstagramPost[];
  altFallback?: string;
}

export default function GalleryCarousel({ items, altFallback = 'Gallery image' }: GalleryCarouselProps) {
  const [index, setIndex] = useState(0);

  if (!items || items.length === 0) {
    return null;
  }

  const total = items.length;
  const current = items[index];

  const goPrev = () => {
    setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const goNext = () => {
    setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full bg-gradient-primary-full-medium-light">
      {total > 1 && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 text-xs text-white/80 bg-black/50 px-2 py-0.5 rounded-full">
          Photo {index + 1} of {total}
        </div>
      )}

      <div className="relative w-full aspect-[4/3]">
        {current.media_type === 'VIDEO' ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <span className="text-sm">Video</span>
          </div>
        ) : (
          <Image
            src={current.local_path}
            alt={current.caption || altFallback}
            fill
            className="object-contain"
            sizes="100vw"
          />
        )}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={goPrev}
            className="absolute inset-y-0 left-0 flex items-center px-3 text-white hover:text-primary-200 focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/60 hover:bg-black/80">
              <FaChevronLeft />
            </span>
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={goNext}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-white hover:text-primary-200 focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/60 hover:bg-black/80">
              <FaChevronRight />
            </span>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 bg-white/50 px-0.5 py-0.5 rounded-full">
            <div className="flex gap-1.5 bg-black/50 px-2 py-1 rounded-full">
              {items.map((item, i) => (
                <span
                  key={item.id}
                  className={`h-1.5 w-1.5 rounded-full ${
                    i === index ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>

          </div>
        </>
      )}
    </div>
  );
}

