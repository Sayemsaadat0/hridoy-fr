import React from "react";
import GalleryPageContainer from "./_components/GalleryPageContainer";
import { getPublishedGalleryItems } from "@/lib/queries/public-content";

export const dynamic = "force-dynamic";

const Gallery = async () => {
  const items = await getPublishedGalleryItems();

  return (
    <div>
      <GalleryPageContainer
        items={items.map(({ id, imageUrl, title, description }) => ({
          id,
          src: imageUrl,
          title,
          description: description ?? undefined,
        }))}
      />
    </div>
  );
};

export default Gallery;
