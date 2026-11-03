"use client";

import React from "react";
import type { PublicFaq } from "@/models/faq.model";
import { PublishedPill, ResourceManager } from "@/components/admin/ResourceManager";
import type { ColumnConfig, FieldConfig, FormValues } from "@/components/admin/types";
import { str } from "@/components/admin/format";

type Faq = Omit<PublicFaq, "createdAt" | "updatedAt"> & { createdAt: string; updatedAt: string };

const columns: ColumnConfig<Faq>[] = [
  {
    header: "Question",
    cell: (faq) => (
      <div className="max-w-xl space-y-1">
        <p className="font-hr-600">{faq.question}</p>
        <p className="line-clamp-2 text-hr-gray">{faq.answer}</p>
      </div>
    ),
  },
  { header: "Status", cell: (faq) => <PublishedPill isPublished={faq.isPublished} /> },
];

const fields: FieldConfig[] = [
  { name: "question", label: "Question", type: "text", required: true, maxLength: 300, fullWidth: true },
  { name: "answer", label: "Answer", type: "textarea", required: true, maxLength: 3000 },
  { name: "isPublished", label: "Published", type: "switch" },
];

const toFormValues = (faq?: Faq): FormValues => ({
  question: faq?.question ?? "",
  answer: faq?.answer ?? "",
  isPublished: faq?.isPublished ?? true,
});

const toPayload = (values: FormValues) => ({
  question: str(values.question),
  answer: str(values.answer),
  isPublished: values.isPublished === true,
});

const FaqsPage = () => (
  <ResourceManager<Faq>
    title="FAQs"
    description="Questions and answers shown on the home page"
    singular="FAQ"
    endpoint="/api/faqs"
    baseParams={{ published: "all" }}
    columns={columns}
    fields={fields}
    toFormValues={toFormValues}
    toPayload={toPayload}
    getItemLabel={(faq) => faq.question}
    searchPlaceholder="Search questions…"
    emptyMessage="No FAQs yet."
  />
);

export default FaqsPage;
