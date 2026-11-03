"use client";

import React from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ROUTINE_LIMITS,
  ROUTINE_VARIANTS,
  type RoutineScheduleGroup,
  type RoutineTimeSlot,
  type RoutineVariant,
} from "@/models/routine.constants";
import { adminInputClass, adminSelectClass } from "./styles";

const VARIANT_LABELS: Record<RoutineVariant, string> = {
  blue: "Blue",
  rose: "Rose",
  teal: "Teal",
};

const VARIANT_DOTS: Record<RoutineVariant, string> = {
  blue: "bg-sky-500",
  rose: "bg-rose-500",
  teal: "bg-teal-500",
};

export const emptyTimeSlot = (): RoutineTimeSlot => ({ time: "", variant: "blue" });
export const emptyScheduleGroup = (): RoutineScheduleGroup => ({ days: "", timeSlots: [emptyTimeSlot()] });

const iconButtonClass =
  "rounded-md p-2 text-hr-gray transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:pointer-events-none disabled:opacity-30";
const addButtonClass =
  "inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-hr-600 text-hr-green-toxic transition-colors hover:bg-hr-green-toxic/10 disabled:pointer-events-none disabled:opacity-40";

interface RoutineScheduleEditorProps {
  labelId: string;
  groups: RoutineScheduleGroup[];
  onChange: (groups: RoutineScheduleGroup[]) => void;
}

/**
 * Edits a routine's day groups and their time slots. Every group keeps at least one slot
 * and the routine keeps at least one group, matching the API's validation.
 */
export function RoutineScheduleEditor({ labelId, groups, onChange }: RoutineScheduleEditorProps) {
  const updateGroup = (index: number, patch: Partial<RoutineScheduleGroup>) =>
    onChange(groups.map((group, i) => (i === index ? { ...group, ...patch } : group)));

  const updateSlot = (groupIndex: number, slotIndex: number, patch: Partial<RoutineTimeSlot>) =>
    updateGroup(groupIndex, {
      timeSlots: groups[groupIndex].timeSlots.map((slot, i) => (i === slotIndex ? { ...slot, ...patch } : slot)),
    });

  return (
    <div role="group" aria-labelledby={labelId} className="space-y-3">
      {groups.map((group, groupIndex) => {
        const groupLabel = `Day group ${groupIndex + 1}`;
        return (
          <fieldset
            key={groupIndex}
            className="space-y-3 rounded-xl border border-hr-white/10 bg-hr-white/5 p-3 sm:p-4"
          >
            <legend className="sr-only">{groupLabel}</legend>

            <div className="flex items-center gap-2">
              <Input
                aria-label={`${groupLabel} days`}
                required
                maxLength={ROUTINE_LIMITS.days}
                placeholder="Days, e.g. শনি, সোম, বুধ"
                value={group.days}
                onChange={(event) => updateGroup(groupIndex, { days: event.target.value })}
                className={adminInputClass}
              />
              <button
                type="button"
                aria-label={`Remove ${groupLabel.toLowerCase()}`}
                title="Remove day group"
                disabled={groups.length === 1}
                onClick={() => onChange(groups.filter((_, i) => i !== groupIndex))}
                className={iconButtonClass}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="space-y-2 sm:pl-4">
              {group.timeSlots.map((slot, slotIndex) => {
                const slotLabel = `${groupLabel} time slot ${slotIndex + 1}`;
                return (
                  <li key={slotIndex} className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className={cn("h-2 w-2 shrink-0 rounded-full", VARIANT_DOTS[slot.variant])}
                    />
                    <Input
                      aria-label={`${slotLabel} time`}
                      required
                      maxLength={ROUTINE_LIMITS.time}
                      placeholder="Time, e.g. সকাল ৮:০০ - ৯:০০"
                      value={slot.time}
                      onChange={(event) => updateSlot(groupIndex, slotIndex, { time: event.target.value })}
                      className={cn(adminInputClass, "min-w-0 flex-1")}
                    />
                    <select
                      aria-label={`${slotLabel} colour`}
                      value={slot.variant}
                      onChange={(event) =>
                        updateSlot(groupIndex, slotIndex, { variant: event.target.value as RoutineVariant })
                      }
                      className={cn(adminSelectClass, "w-24 shrink-0")}
                    >
                      {ROUTINE_VARIANTS.map((variant) => (
                        <option key={variant} value={variant}>
                          {VARIANT_LABELS[variant]}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      aria-label={`Remove ${slotLabel.toLowerCase()}`}
                      title="Remove time slot"
                      disabled={group.timeSlots.length === 1}
                      onClick={() =>
                        updateGroup(groupIndex, { timeSlots: group.timeSlots.filter((_, i) => i !== slotIndex) })
                      }
                      className={iconButtonClass}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="sm:pl-4">
              <button
                type="button"
                disabled={group.timeSlots.length >= ROUTINE_LIMITS.maxSlotsPerGroup}
                onClick={() => updateGroup(groupIndex, { timeSlots: [...group.timeSlots, emptyTimeSlot()] })}
                className={addButtonClass}
              >
                <Plus className="h-3.5 w-3.5" />
                Add time slot
              </button>
            </div>
          </fieldset>
        );
      })}

      <button
        type="button"
        disabled={groups.length >= ROUTINE_LIMITS.maxGroups}
        onClick={() => onChange([...groups, emptyScheduleGroup()])}
        className={addButtonClass}
      >
        <Plus className="h-3.5 w-3.5" />
        Add day group
      </button>
    </div>
  );
}
