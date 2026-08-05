import React from "react";
import { Plus } from "lucide-react";
import {
  AdminActionButton,
  AdminEmptyState,
  AdminPageHeader,
} from "@/components/layouts/AdminPageHeader";

const FaqsPage = () => {
  return (
    <div>
      <AdminPageHeader
        title="FAQs"
        description="Manage frequently asked questions shown on the site"
        action={
          <AdminActionButton>
            <Plus className="h-4 w-4" />
            Add FAQ
          </AdminActionButton>
        }
      />

      <AdminEmptyState>No FAQs yet.</AdminEmptyState>
    </div>
  );
};

export default FaqsPage;
