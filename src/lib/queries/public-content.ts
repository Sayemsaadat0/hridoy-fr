import { connectDB } from "@/lib/db";
import { Program, toPublicProgram, type PublicProgram } from "@/models/program.model";
import { Faq, toPublicFaq, type PublicFaq } from "@/models/faq.model";
import {
  GalleryItem,
  toPublicGalleryItem,
  type PublicGalleryItem,
} from "@/models/gallery-item.model";
import { Notice, toPublicNotice } from "@/models/notice.model";

/**
 * Server-only reads for the public site (Server Components). They query MongoDB
 * directly instead of calling our own /api routes over HTTP.
 *
 * A database outage degrades a section to empty rather than taking the page down.
 */
async function safeQuery<T>(label: string, query: () => Promise<T[]>): Promise<T[]> {
  try {
    await connectDB();
    return await query();
  } catch (error) {
    console.error(`[public-content] failed to load ${label}`, error);
    return [];
  }
}

export function getPublishedPrograms(limit?: number): Promise<PublicProgram[]> {
  return safeQuery("programs", async () => {
    const query = Program.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });
    if (limit) query.limit(limit);
    return (await query).map(toPublicProgram);
  });
}

export function getPublishedFaqs(): Promise<PublicFaq[]> {
  return safeQuery("faqs", async () =>
    (await Faq.find({ isPublished: true }).sort({ order: 1, createdAt: -1 })).map(toPublicFaq)
  );
}

export function getPublishedGalleryItems(): Promise<PublicGalleryItem[]> {
  return safeQuery("gallery", async () =>
    (await GalleryItem.find({ isPublished: true }).sort({ order: 1, createdAt: -1 })).map(
      toPublicGalleryItem
    )
  );
}

export function getPublishedNotices(limit = 100) {
  return safeQuery("notices", async () =>
    (
      await Notice.find({ isPublished: true })
        .sort({ date: -1, createdAt: -1 })
        .limit(limit)
    ).map(toPublicNotice)
  );
}
