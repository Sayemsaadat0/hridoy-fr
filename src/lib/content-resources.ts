import { createContentRoutes } from "@/lib/content-routes";
import {
  createFaqSchema,
  createGalleryItemSchema,
  createProgramSchema,
  createRoutineSchema,
  updateFaqSchema,
  updateGalleryItemSchema,
  updateProgramSchema,
  updateRoutineSchema,
} from "@/lib/validation/content";
import { Program, toPublicProgram } from "@/models/program.model";
import { Faq, toPublicFaq } from "@/models/faq.model";
import { GalleryItem, toPublicGalleryItem } from "@/models/gallery-item.model";
import { Routine, toPublicRoutine } from "@/models/routine.model";

export const programRoutes = createContentRoutes({
  label: "Program",
  model: Program,
  toPublic: toPublicProgram,
  createSchema: createProgramSchema,
  updateSchema: updateProgramSchema,
  searchFields: ["title", "description"],
  image: { urlField: "thumbnail", fileIdField: "thumbnailFileId", folder: "programs" },
});

export const faqRoutes = createContentRoutes({
  label: "FAQ",
  model: Faq,
  toPublic: toPublicFaq,
  createSchema: createFaqSchema,
  updateSchema: updateFaqSchema,
  searchFields: ["question", "answer"],
});

export const galleryRoutes = createContentRoutes({
  label: "Gallery item",
  model: GalleryItem,
  toPublic: toPublicGalleryItem,
  createSchema: createGalleryItemSchema,
  updateSchema: updateGalleryItemSchema,
  searchFields: ["title", "description"],
  image: { urlField: "imageUrl", fileIdField: "imageFileId", folder: "gallery" },
});

export const routineRoutes = createContentRoutes({
  label: "Routine",
  model: Routine,
  toPublic: toPublicRoutine,
  createSchema: createRoutineSchema,
  updateSchema: updateRoutineSchema,
  searchFields: ["classTitle", "scheduleGroups.days"],
});
