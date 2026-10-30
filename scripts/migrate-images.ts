import "dotenv/config";
import path from "node:path";
import { readFile } from "node:fs/promises";
import mongoose, { type Model } from "mongoose";
import { env } from "../src/lib/env";
import { uploadImage } from "../src/lib/image-storage";
import { Program } from "../src/models/program.model";
import { GalleryItem } from "../src/models/gallery-item.model";

/**
 * One-off: moves images that still point at files in /public (e.g. "/g/1.jpg")
 * onto ImageKit and saves the new URL and file id on the record. Records already on
 * ImageKit are skipped, so it is safe to re-run after a partial failure.
 *
 *   npm run migrate:images
 */
const PUBLIC_DIR = path.join(process.cwd(), "public");
// Existing site images can exceed the 5 MB admin limit; ImageKit still serves them resized.
const MIGRATION_MAX_BYTES = 25 * 1024 * 1024;

async function migrate<T>(label: string, model: Model<T>, field: string, fileIdField: string, folder: string) {
  const docs = await model.find({ [field]: { $regex: "^/(?!/)" } }).select(field).lean();
  console.log(`${label}: ${docs.length} local image(s)`);

  let failed = 0;
  for (const doc of docs as Record<string, unknown>[]) {
    const localPath = String(doc[field]);
    const filePath = path.join(PUBLIC_DIR, path.normalize(localPath));
    if (!filePath.startsWith(PUBLIC_DIR + path.sep)) {
      console.error(`  ✗ ${localPath}: outside /public, skipped`);
      failed++;
      continue;
    }

    try {
      const bytes = await readFile(filePath);
      const { url, fileId } = await uploadImage(new Blob([bytes]), path.basename(filePath), folder, MIGRATION_MAX_BYTES);
      // Raw collection update: the field name is dynamic, which mongoose's typed updateOne can't express.
      await model.collection.updateOne({ _id: doc._id as mongoose.Types.ObjectId }, { $set: { [field]: url, [fileIdField]: fileId, updatedAt: new Date() } });
      console.log(`  ✓ ${localPath} → ${url}`);
    } catch (error) {
      failed++;
      console.error(`  ✗ ${localPath}: ${error instanceof Error ? error.message : error}`);
    }
  }
  return failed;
}

async function main() {
  await mongoose.connect(env.mongoUri);
  const failed =
    (await migrate("programs", Program, "thumbnail", "thumbnailFileId", "programs")) +
    (await migrate("gallery", GalleryItem, "imageUrl", "imageFileId", "gallery"));
  await mongoose.disconnect();

  if (failed > 0) {
    console.error(`${failed} image(s) failed; re-run to retry them.`);
    process.exit(1);
  }
}

main().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
