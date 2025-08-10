export { CalendarLayout } from './CalendarLayout';
export { ScrapbookLayout } from './ScrapbookLayout';
export { JournalLayout } from './JournalLayout';
export { PolaroidLayout } from './PolaroidLayout';
export { TimelineLayout } from './TimelineLayout';
export { PostcardLayout } from './PostcardLayout';
export { MapLayout } from './MapLayout';
export { VinylLayout } from './VinylLayout';
export { BookshelfLayout } from './BookshelfLayout';
export { ArtGalleryLayout } from './ArtGalleryLayout';

// Layout types for easy switching
export const LAYOUT_TYPES = {
  TIMELINE: 'timeline',
  CALENDAR: 'calendar',
  SCRAPBOOK: 'scrapbook',
  JOURNAL: 'journal',
  POLAROID: 'polaroid',
  POSTCARD: 'postcard',
  MAP: 'map',
  VINYL: 'vinyl',
  BOOKSHELF: 'bookshelf',
  ART_GALLERY: 'art_gallery'
} as const;

export type LayoutType = typeof LAYOUT_TYPES[keyof typeof LAYOUT_TYPES];
