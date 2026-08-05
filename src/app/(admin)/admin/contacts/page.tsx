import React from "react";
import { AdminEmptyState, AdminPageHeader } from "@/components/layouts/AdminPageHeader";

const ContactsPage = () => {
  return (
    <div>
      <AdminPageHeader
        title="Contacts"
        description="View messages submitted through the contact form"
      />

      <AdminEmptyState>No contact messages yet.</AdminEmptyState>
    </div>
  );
};

export default ContactsPage;
