import type React from "react";

/** Arrays hold structured values edited by a `custom` field (sent as JSON). */
export type FormValue = string | boolean | File | null | unknown[];
export type FormValues = Record<string, FormValue>;

interface BaseField {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  /** Spans both columns of the form grid. Textareas, images and read-only fields always do. */
  fullWidth?: boolean;
}

export type FieldConfig =
  | (BaseField & { type: "text" | "number" | "date" | "textarea"; maxLength?: number })
  /** File picker; the value is a `File` (or null). `currentUrlKey` names the form value holding the saved image URL for the preview. */
  | (BaseField & { type: "image"; currentUrlKey: string })
  | (BaseField & { type: "select"; options: readonly SelectOption[] })
  | (BaseField & { type: "switch" })
  /** Shown in the dialog but never edited or sent. */
  | (BaseField & { type: "readonly" })
  /** Renders its own control, e.g. a nested list editor. Always full width. */
  | (BaseField & { type: "custom"; render: (props: CustomFieldProps) => React.ReactNode });

export interface CustomFieldProps {
  /** Id of the field's label, for `aria-labelledby`. */
  labelId: string;
  value: FormValue;
  onChange: (value: FormValue) => void;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ColumnConfig<T> {
  header: string;
  cell: (item: T) => React.ReactNode;
  className?: string;
}

export interface FilterConfig {
  name: string;
  label: string;
  options: readonly SelectOption[];
}
