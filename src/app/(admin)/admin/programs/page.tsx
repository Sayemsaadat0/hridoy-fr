"use client";

import React from "react";
import type { ProgramLevel, PublicProgram } from "@/models/program.model";
import { ImagePreview } from "@/components/admin/ResourceFormDialog";
import { PublishedPill, ResourceManager, StatusPill } from "@/components/admin/ResourceManager";
import type { ColumnConfig, FieldConfig, FormValues, SelectOption } from "@/components/admin/types";
import { str } from "@/components/admin/format";

type Program = Omit<PublicProgram, "createdAt" | "updatedAt"> & { createdAt: string; updatedAt: string };

const LEVEL_OPTIONS = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
] as const satisfies readonly (SelectOption & { value: ProgramLevel })[];

const levelTone = { Beginner: "blue", Intermediate: "amber", Advanced: "red" } as const;

const columns: ColumnConfig<Program>[] = [
  {
    header: "Program",
    cell: (program) => (
      <div className="flex min-w-64 items-start gap-3">
        <ImagePreview src={program.thumbnail} className="h-12 w-16" />
        <div className="space-y-1">
          <p className="font-hr-600">{program.title}</p>
          <p className="line-clamp-1 text-hr-gray">{program.description}</p>
        </div>
      </div>
    ),
  },
  { header: "Level", cell: (program) => <StatusPill tone={levelTone[program.level]}>{program.level}</StatusPill> },
  { header: "Duration", cell: (program) => program.duration, className: "whitespace-nowrap" },
  { header: "Enrolled", cell: (program) => program.enrollmentCount ?? "—", className: "whitespace-nowrap" },
  { header: "Status", cell: (program) => <PublishedPill isPublished={program.isPublished} /> },
];

const fields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true, maxLength: 200, fullWidth: true },
  { name: "description", label: "Description", type: "textarea", required: true, maxLength: 1000 },
  { name: "image", label: "Thumbnail", type: "image", required: true, currentUrlKey: "thumbnail" },
  { name: "level", label: "Level", type: "select", required: true, options: LEVEL_OPTIONS },
  { name: "duration", label: "Duration", type: "text", required: true, maxLength: 60, placeholder: "e.g. ২ সপ্তাহ" },
  {
    name: "enrollmentCount",
    label: "Enrolled students",
    type: "text",
    maxLength: 20,
    placeholder: "e.g. ২.৫K",
    hint: "Leave empty to hide.",
  },
  { name: "isPublished", label: "Published", type: "switch" },
];

const toFormValues = (program?: Program): FormValues => ({
  title: program?.title ?? "",
  description: program?.description ?? "",
  image: null,
  thumbnail: program?.thumbnail ?? "", // preview only; never sent
  level: program?.level ?? "Beginner",
  duration: program?.duration ?? "",
  enrollmentCount: program?.enrollmentCount ?? "",
  isPublished: program?.isPublished ?? true,
});

const toPayload = (values: FormValues) => ({
  title: str(values.title),
  description: str(values.description),
  // Only a newly chosen file is sent; the API uploads it and stores the URL.
  image: values.image instanceof File ? values.image : undefined,
  level: str(values.level),
  duration: str(values.duration),
  enrollmentCount: str(values.enrollmentCount) || null,
  isPublished: values.isPublished === true,
});

const ProgramsPage = () => (
  <ResourceManager<Program>
    title="Programs"
    description="Courses shown on the home and courses pages"
    singular="Program"
    endpoint="/api/programs"
    baseParams={{ published: "all" }}
    columns={columns}
    fields={fields}
    toFormValues={toFormValues}
    toPayload={toPayload}
    getItemLabel={(program) => program.title}
    searchPlaceholder="Search programs…"
    emptyMessage="No programs yet."
  />
);

export default ProgramsPage;
