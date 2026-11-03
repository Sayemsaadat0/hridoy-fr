"use client";

/**
 * Lucide icon picker. This module imports the full Lucide icon set, so load it with
 * `next/dynamic` (see LazyIconPicker / LazyLucideIcon) to keep it out of the main admin bundle.
 */
import React, { useDeferredValue, useMemo, useState } from "react";
import { icons, Search, type LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { adminInputClass } from "./styles";

type IconName = keyof typeof icons;

const ALL_ICON_NAMES = Object.keys(icons) as IconName[];
const MAX_RESULTS = 60;

/** Shown before the admin types anything. */
const SUGGESTED: IconName[] = [
  "BookOpen",
  "GraduationCap",
  "School",
  "Microscope",
  "FlaskConical",
  "Dna",
  "Leaf",
  "Sprout",
  "Brain",
  "HeartPulse",
  "Atom",
  "TestTube",
  "NotebookPen",
  "PencilRuler",
  "Library",
  "Users",
  "CalendarDays",
  "Clock",
  "Star",
  "Trophy",
  "Target",
  "Lightbulb",
  "Award",
  "BookMarked",
];

const isIconName = (name: string): name is IconName => Object.hasOwn(icons, name);

/** "FlaskConical" → "flaskconical"; queries are compared without spaces, dashes or case. */
const normalize = (value: string) => value.toLowerCase().replace(/[\s_-]+/g, "");

export function LucideIconByName({ name, className }: { name: string; className?: string }) {
  const Icon: LucideIcon = isIconName(name) ? icons[name] : icons.BookOpen;
  return <Icon className={className} aria-hidden />;
}

interface IconPickerProps {
  labelId: string;
  value: string;
  onChange: (name: string) => void;
}

export function IconPicker({ labelId, value, onChange }: IconPickerProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const { results, total } = useMemo(() => {
    const needle = normalize(deferredQuery);
    if (!needle) {
      // Keep the current icon visible even when it isn't one of the suggestions.
      const suggested = isIconName(value) && !SUGGESTED.includes(value) ? [value, ...SUGGESTED] : SUGGESTED;
      return { results: suggested, total: suggested.length };
    }
    const matches = ALL_ICON_NAMES.filter((name) => normalize(name).includes(needle));
    return { results: matches.slice(0, MAX_RESULTS), total: matches.length };
  }, [deferredQuery, value]);

  return (
    <div role="group" aria-labelledby={labelId} className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-hr-green-toxic/30 bg-hr-green-toxic/10 text-hr-green-toxic">
          <LucideIconByName name={value} className="h-5 w-5" />
        </div>
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-hr-gray" />
          <Input
            type="search"
            aria-label="Search icons"
            placeholder={`Search ${ALL_ICON_NAMES.length.toLocaleString()} icons, e.g. flask, book…`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            // Enter would otherwise submit the whole form.
            onKeyDown={(event) => event.key === "Enter" && event.preventDefault()}
            className={cn(adminInputClass, "pl-9")}
          />
        </div>
      </div>

      {results.length === 0 ? (
        <p className="rounded-lg border border-hr-white/10 bg-hr-white/5 px-3 py-4 text-center text-sm text-hr-gray">
          No icons match “{query}”.
        </p>
      ) : (
        <div className="grid max-h-56 grid-cols-6 gap-1.5 overflow-y-auto rounded-lg border border-hr-white/10 bg-hr-white/5 p-2 sm:grid-cols-10">
          {results.map((name) => {
            const Icon = icons[name];
            const selected = name === value;
            return (
              <button
                key={name}
                type="button"
                title={name}
                aria-label={name}
                aria-pressed={selected}
                onClick={() => onChange(name)}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-md text-hr-gray transition-colors hover:bg-hr-white/10 hover:text-hr-white",
                  selected && "bg-hr-green-toxic/20 text-hr-green-toxic ring-1 ring-hr-green-toxic/50"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </button>
            );
          })}
        </div>
      )}

      <p className="text-xs text-hr-gray">
        Selected: <span className="font-hr-600 text-hr-white">{value}</span>
        {total > results.length && ` · showing ${results.length} of ${total}, refine your search`}
      </p>
    </div>
  );
}
