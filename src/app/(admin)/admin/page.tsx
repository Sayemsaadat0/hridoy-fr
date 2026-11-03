import React from "react";
import Link from "next/link";
import { AdminPageHeader } from "@/components/layouts/AdminPageHeader";
import { ROUTES } from "@/lib/config";
import { connectDB } from "@/lib/db";
import { Program } from "@/models/program.model";
import { Faq } from "@/models/faq.model";
import { Notice, getDhakaToday } from "@/models/notice.model";
import { GalleryItem } from "@/models/gallery-item.model";
import { Routine } from "@/models/routine.model";
import { ContactMessage } from "@/models/contact-message.model";

// Counts must reflect edits immediately.
export const dynamic = "force-dynamic";

interface Stat {
  label: string;
  value: number | null;
  detail: string;
  href: string;
}

async function loadStats(): Promise<Stat[]> {
  const counts = await connectDB()
    .then(() =>
      Promise.all([
        Program.countDocuments(),
        Program.countDocuments({ isPublished: false }),
        Faq.countDocuments(),
        Faq.countDocuments({ isPublished: false }),
        Notice.countDocuments(),
        Notice.countDocuments({ isPublished: true, date: { $gte: getDhakaToday() } }),
        GalleryItem.countDocuments(),
        GalleryItem.countDocuments({ isPublished: false }),
        Routine.countDocuments(),
        Routine.countDocuments({ isPublished: false }),
        ContactMessage.countDocuments(),
        ContactMessage.countDocuments({ status: "NEW" }),
      ])
    )
    .catch((error) => {
      console.error("[admin dashboard] failed to load counts", error);
      return null;
    });

  const [
    programs,
    programDrafts,
    faqs,
    faqDrafts,
    notices,
    liveNotices,
    photos,
    photoDrafts,
    routines,
    routineDrafts,
    messages,
    newMessages,
  ] = counts ?? Array<number | null>(12).fill(null);

  const drafts = (n: number | null) => (n === null ? "" : n === 0 ? "All published" : `${n} draft${n === 1 ? "" : "s"}`);

  return [
    { label: "Programs", value: programs, detail: drafts(programDrafts), href: ROUTES.ADMIN_PROGRAMS },
    { label: "FAQs", value: faqs, detail: drafts(faqDrafts), href: ROUTES.ADMIN_FAQS },
    {
      label: "Notices",
      value: notices,
      detail: liveNotices === null ? "" : `${liveNotices} active or upcoming`,
      href: ROUTES.ADMIN_NOTICE,
    },
    { label: "Gallery photos", value: photos, detail: drafts(photoDrafts), href: ROUTES.ADMIN_GALLERY },
    { label: "Routines", value: routines, detail: drafts(routineDrafts), href: ROUTES.ADMIN_ROUTINES },
    {
      label: "Contact messages",
      value: messages,
      detail: newMessages === null ? "" : newMessages === 0 ? "No unread messages" : `${newMessages} unread`,
      href: ROUTES.ADMIN_CONTACTS,
    },
  ];
}

const DashboardPage = async () => {
  const stats = await loadStats();
  const failed = stats.every((stat) => stat.value === null);

  return (
    <div>
      <AdminPageHeader title="Dashboard" description="Overview of your site content" />

      {failed && (
        <p role="alert" className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Couldn&apos;t reach the database. Check the connection settings and reload.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-2xl border border-hr-white/10 bg-hr-white/5 p-5 transition-colors hover:border-hr-green-toxic/40 hover:bg-hr-white/8 focus-visible:outline-2 focus-visible:outline-hr-green-toxic"
          >
            <p className="text-hr-gray font-hr-400" style={{ fontSize: "var(--text-hr-regular-14)" }}>
              {stat.label}
            </p>
            <p
              className="mt-2 text-hr-green-toxic font-hr-800 tabular-nums"
              style={{ fontSize: "var(--text-hr-regular-30)" }}
            >
              {stat.value ?? "—"}
            </p>
            <p className="mt-1 text-xs text-hr-gray group-hover:text-hr-white">{stat.detail}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
