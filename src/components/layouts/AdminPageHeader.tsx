import React from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  description,
  action,
}) => {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1
          className="text-hr-white font-hr-800"
          style={{ fontSize: "var(--text-hr-regular-24)" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="mt-1 text-hr-gray font-hr-400"
            style={{ fontSize: "var(--text-hr-regular-14)" }}
          >
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
};

export const AdminActionButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, children, ...props }) => {
  return (
    <button
      type="button"
      className={`flex items-center gap-2 rounded-lg bg-linear-to-r from-hr-green-toxic to-hr-green-light px-4 py-2 font-hr-600 text-hr-white transition-all hover:from-hr-green-toxic/95 hover:to-hr-green-light/95 hover:scale-[1.02] ${className ?? ""}`}
      style={{ fontSize: "var(--text-hr-regular-14)" }}
      {...props}
    >
      {children}
    </button>
  );
};

export const AdminEmptyState: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className="rounded-2xl border border-hr-white/10 bg-hr-white/5 p-10 text-center text-hr-gray font-hr-400"
      style={{ fontSize: "var(--text-hr-regular-14)" }}
    >
      {children}
    </div>
  );
};
