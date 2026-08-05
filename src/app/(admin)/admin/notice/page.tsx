import React from "react";
import { Plus } from "lucide-react";
import {
  AdminActionButton,
  AdminEmptyState,
  AdminPageHeader,
} from "@/components/layouts/AdminPageHeader";

const NoticePage = () => {
  return (
    <div>
      <AdminPageHeader
        title="Notice"
        description="Manage notices shown on the site"
        action={
          <AdminActionButton>
            <Plus className="h-4 w-4" />
            Add Notice
          </AdminActionButton>
        }
      />

      <AdminEmptyState>No notices yet.</AdminEmptyState>
    </div>
  );
};

export default NoticePage;
