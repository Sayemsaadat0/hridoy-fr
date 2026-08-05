import React from "react";
import { AdminPageHeader } from "@/components/layouts/AdminPageHeader";

const stats = [
  { label: "Programs", value: "—" },
  { label: "FAQs", value: "—" },
  { label: "Notices", value: "—" },
  { label: "Gallery items", value: "—" },
];

const DashboardPage = () => {
  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Overview of your site content"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-hr-white/10 bg-hr-white/5 p-5"
          >
            <p
              className="text-hr-gray font-hr-400"
              style={{ fontSize: "var(--text-hr-regular-14)" }}
            >
              {stat.label}
            </p>
            <p
              className="mt-2 text-hr-green-toxic font-hr-800"
              style={{ fontSize: "var(--text-hr-regular-30)" }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
