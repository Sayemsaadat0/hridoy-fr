"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { PublicRoutine } from "@/models/routine.model";
import { DEFAULT_ROUTINE_ICON, ROUTINE_LIMITS, type RoutineScheduleGroup } from "@/models/routine.constants";
import { PublishedPill, ResourceManager } from "@/components/admin/ResourceManager";
import { emptyScheduleGroup, RoutineScheduleEditor } from "@/components/admin/RoutineScheduleEditor";
import type { ColumnConfig, FieldConfig, FormValues } from "@/components/admin/types";
import { str } from "@/components/admin/format";

type Routine = Omit<PublicRoutine, "createdAt" | "updatedAt"> & { createdAt: string; updatedAt: string };

// The picker bundles every Lucide icon, so it loads only when the routines page needs it.
const IconPicker = dynamic(() => import("@/components/admin/IconPicker").then((m) => m.IconPicker), {
  ssr: false,
  loading: () => <div className="h-24 animate-pulse rounded-lg bg-hr-white/10" />,
});
const LucideIconByName = dynamic(
  () => import("@/components/admin/IconPicker").then((m) => m.LucideIconByName),
  { ssr: false, loading: () => <span className="inline-block h-4 w-4" /> }
);

const columns: ColumnConfig<Routine>[] = [
  {
    header: "Class",
    cell: (routine) => (
      <div className="flex items-center gap-2.5 whitespace-nowrap">
        <LucideIconByName name={routine.icon} className="h-4 w-4 text-hr-green-toxic" />
        <span className="font-hr-600">{routine.classTitle}</span>
      </div>
    ),
  },
  {
    header: "Schedule",
    cell: (routine) => (
      <ul className="min-w-64 space-y-1">
        {routine.scheduleGroups.map((group, index) => (
          <li key={index}>
            <span className="font-hr-600">{group.days}</span>
            <span className="text-hr-gray"> · {group.timeSlots.map((slot) => slot.time).join(", ")}</span>
          </li>
        ))}
      </ul>
    ),
  },
  { header: "Status", cell: (routine) => <PublishedPill isPublished={routine.isPublished} /> },
];

const isScheduleGroups = (value: unknown): value is RoutineScheduleGroup[] => Array.isArray(value);

const fields: FieldConfig[] = [
  {
    name: "classTitle",
    label: "Class",
    type: "text",
    required: true,
    maxLength: ROUTINE_LIMITS.classTitle,
    placeholder: "e.g. নবম শ্রেণি",
  },
  {
    name: "icon",
    label: "Icon",
    type: "custom",
    render: ({ labelId, value, onChange }) => (
      <IconPicker
        labelId={labelId}
        value={typeof value === "string" && value ? value : DEFAULT_ROUTINE_ICON}
        onChange={onChange}
      />
    ),
  },
  {
    name: "scheduleGroups",
    label: "Schedule",
    type: "custom",
    required: true,
    hint: "Group days that share the same class times. The colour sets the time badge on the routine page.",
    render: ({ labelId, value, onChange }) => (
      <RoutineScheduleEditor
        labelId={labelId}
        groups={isScheduleGroups(value) ? value : [emptyScheduleGroup()]}
        onChange={onChange}
      />
    ),
  },
  { name: "isPublished", label: "Published", type: "switch" },
];

const toFormValues = (routine?: Routine): FormValues => ({
  classTitle: routine?.classTitle ?? "",
  icon: routine?.icon ?? DEFAULT_ROUTINE_ICON,
  // Copied so editing in the form never mutates the list's data.
  scheduleGroups: routine
    ? routine.scheduleGroups.map((group) => ({ ...group, timeSlots: group.timeSlots.map((slot) => ({ ...slot })) }))
    : [emptyScheduleGroup()],
  isPublished: routine?.isPublished ?? true,
});

const toPayload = (values: FormValues) => ({
  classTitle: str(values.classTitle),
  icon: str(values.icon) || DEFAULT_ROUTINE_ICON,
  scheduleGroups: (isScheduleGroups(values.scheduleGroups) ? values.scheduleGroups : []).map((group) => ({
    days: group.days.trim(),
    timeSlots: group.timeSlots.map((slot) => ({ time: slot.time.trim(), variant: slot.variant })),
  })),
  isPublished: values.isPublished === true,
});

const RoutinesPage = () => (
  <ResourceManager<Routine>
    title="Routines"
    description="Weekly class schedule shown on the routine page"
    singular="Routine"
    endpoint="/api/routines"
    baseParams={{ published: "all" }}
    columns={columns}
    fields={fields}
    toFormValues={toFormValues}
    toPayload={toPayload}
    getItemLabel={(routine) => routine.classTitle}
    searchPlaceholder="Search class or days…"
    emptyMessage="No routines yet."
  />
);

export default RoutinesPage;
