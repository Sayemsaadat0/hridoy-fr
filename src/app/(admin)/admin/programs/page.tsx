import React from "react";
import { Plus } from "lucide-react";
import {
  AdminActionButton,
  AdminEmptyState,
  AdminPageHeader,
} from "@/components/layouts/AdminPageHeader";

const ProgramsPage = () => {
  return (
    <div>
      <AdminPageHeader
        title="Programs"
        description="Manage the courses/programs shown on the site"
        action={
          <AdminActionButton>
            <Plus className="h-4 w-4" />
            Add Program
          </AdminActionButton>
        }
      />

      <AdminEmptyState>No programs yet.</AdminEmptyState>
    </div>
  );
};

export default ProgramsPage;
