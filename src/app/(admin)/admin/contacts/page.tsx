"use client";

import React from "react";
import type { ContactStatus, PublicContactMessage } from "@/models/contact-message.model";
import { ResourceManager, StatusPill } from "@/components/admin/ResourceManager";
import type { ColumnConfig, FieldConfig, FormValues, SelectOption } from "@/components/admin/types";
import { formatDateTime, str } from "@/components/admin/format";

type ContactMessage = Omit<PublicContactMessage, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

const STATUS_OPTIONS = [
  { value: "NEW", label: "New" },
  { value: "READ", label: "Read" },
  { value: "ARCHIVED", label: "Archived" },
] as const satisfies readonly (SelectOption & { value: ContactStatus })[];

const statusTone = { NEW: "green", READ: "blue", ARCHIVED: "gray" } as const;
const statusLabel = Object.fromEntries(STATUS_OPTIONS.map((o) => [o.value, o.label])) as Record<ContactStatus, string>;

const fullName = (message: ContactMessage) => `${message.firstName} ${message.lastName}`;

const columns: ColumnConfig<ContactMessage>[] = [
  {
    header: "Received",
    cell: (message) => formatDateTime(message.createdAt),
    className: "whitespace-nowrap tabular-nums text-hr-gray",
  },
  {
    header: "From",
    cell: (message) => (
      <div className="space-y-0.5 whitespace-nowrap">
        <p className="font-hr-600">{fullName(message)}</p>
        <p className="text-hr-gray">{message.phone}</p>
        <p className="text-hr-gray">{message.email}</p>
      </div>
    ),
  },
  {
    header: "Message",
    cell: (message) => (
      <div className="max-w-lg space-y-1">
        <p className="font-hr-600">{message.subject}</p>
        <p className="line-clamp-2 text-hr-gray">{message.details}</p>
      </div>
    ),
  },
  {
    header: "Status",
    cell: (message) => <StatusPill tone={statusTone[message.status]}>{statusLabel[message.status]}</StatusPill>,
  },
];

const fields: FieldConfig[] = [
  { name: "name", label: "Name", type: "readonly" },
  { name: "contact", label: "Phone · Email", type: "readonly" },
  { name: "subject", label: "Subject", type: "readonly" },
  { name: "details", label: "Message", type: "readonly" },
  { name: "status", label: "Status", type: "select", required: true, options: STATUS_OPTIONS },
];

// Opening a new message pre-selects "Read" so saving marks it handled.
const toFormValues = (message?: ContactMessage): FormValues => ({
  name: message ? fullName(message) : "",
  contact: message ? `${message.phone} · ${message.email}` : "",
  subject: message?.subject ?? "",
  details: message?.details ?? "",
  status: message?.status === "NEW" ? "READ" : (message?.status ?? "READ"),
});

const toPayload = (values: FormValues) => ({ status: str(values.status) });

const ContactsPage = () => (
  <ResourceManager<ContactMessage>
    title="Contacts"
    description="Messages submitted through the contact form"
    singular="Message"
    endpoint="/api/contacts"
    filters={[{ name: "status", label: "Status", options: STATUS_OPTIONS }]}
    columns={columns}
    fields={fields}
    toFormValues={toFormValues}
    toPayload={toPayload}
    getItemLabel={(message) => message.subject}
    searchPlaceholder="Search name, phone, message…"
    emptyMessage="No contact messages yet."
    canCreate={false}
    editLabel="Open"
  />
);

export default ContactsPage;
