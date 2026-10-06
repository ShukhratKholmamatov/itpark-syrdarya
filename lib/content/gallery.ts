export interface GalleryImage {
  full: string;
  thumb: string;
  /** Tailwind aspect hint for the masonry layout */
  tall?: boolean;
}

// Photos live in /public/images/gallery (g01..g13). Thumbnails are g01_thumb etc.
export const gallery: GalleryImage[] = Array.from({ length: 13 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    full: `/images/gallery/g${n}.webp`,
    thumb: `/images/gallery/g${n}_thumb.webp`,
    tall: i % 3 === 1,
  };
});
