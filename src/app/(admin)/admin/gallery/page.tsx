import React from "react";
import { Plus } from "lucide-react";
import {
  AdminActionButton,
  AdminEmptyState,
  AdminPageHeader,
} from "@/components/layouts/AdminPageHeader";

const GalleryPage = () => {
  return (
    <div>
      <AdminPageHeader
        title="Gallery"
        description="Manage images shown in the site gallery"
        action={
          <AdminActionButton>
            <Plus className="h-4 w-4" />
            Add Image
          </AdminActionButton>
        }
      />

      <AdminEmptyState>No images yet.</AdminEmptyState>
    </div>
  );
};

export default GalleryPage;
