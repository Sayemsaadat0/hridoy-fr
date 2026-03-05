"use client";

import React from "react";
import { motion } from "motion/react";
import { Notice, NoticePriority, NoticeStatus } from "./types/notice.types";

const NoticePageContainer = () => {
  const notices: Notice[] = [
    {
      id: "1",
      date: "৬ মার্চ ২০২৫",
      title: "নবম শ্রেণী – চ্যাপ্টার ফাইনাল পরীক্ষা",
      priority: "HIGH",
      category: "পরীক্ষা",
      description:
        "আগামীকাল শুক্রবার 6 মার্চ নবম শ্রেণীর দ্বিতীয় অধ্যায়ের উপরে চ্যাপ্টার ফাইনাল পরীক্ষা অনুষ্ঠিত হবে। পরীক্ষার ধরনঃ তিনটি সৃজনশীল থাকবে প্রশ্ন থাকবে দুইটির উত্তর দিতে হবে। Ridoy sir's Biology classroom.",
      status: "Upcoming",
    },
    {
      id: "2",
      date: "৬ মার্চ ২০২৫",
      title: "দশম শ্রেণী – Short Question পরীক্ষা",
      priority: "HIGH",
      category: "পরীক্ষা",
      description:
        "আগামীকাল শুক্রবার 6 মার্চ, ১০ ম শ্রেণীর ১১ অধ্যায়ের উপরে Short Question পরীক্ষা অনুষ্ঠিত হবে। Ridoy sir's Biology classroom.",
      status: "Upcoming",
    },
  ];

  const getPriorityBadgeColor = (priority: NoticePriority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500 text-white";
      case "MEDIUM":
        return "bg-yellow-500 text-black";
      case "LOW":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusBadgeColor = (status: NoticeStatus) => {
    switch (status) {
      case "New":
        return "bg-green-500 text-white";
      case "Active":
        return "bg-blue-500 text-white";
      case "Upcoming":
        return "bg-purple-500 text-white";
      case "Expired":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hr-green-toxic/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-hr-green-light/4 rounded-full blur-[80px]" />
      </div>

      {/* Section 1: Notice Banner */}
      <section className="relative py-10 lg:py-16 mt-10">
        <div className="hr-container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1
              className="text-hr-white font-hr-800 mb-6"
              style={{ fontSize: "var(--text-hr-regular-50)" }}
            >
              <span className="text-hr-green-toxic">Notices</span> & Updates
            </h1>
            <p
              className="text-hr-gray font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-18)" }}
            >
              Stay updated with the latest announcements, schedules, and important information.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Notice Cards */}
      <section className="relative py-10 lg:py-16">
        <div className="hr-container relative z-10">
          {notices.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {notices.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-3xl border border-hr-white/15 bg-linear-to-br from-hr-white/8 via-hr-white/4 to-hr-white/0 backdrop-blur-sm shadow-xl p-6 lg:p-8 hover:border-hr-green-toxic/30 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getPriorityBadgeColor(notice.priority)}`}
                    >
                      {notice.priority}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeColor(notice.status)}`}
                    >
                      {notice.status}
                    </span>
                    <span className="text-hr-gray text-sm font-hr-400">
                      {notice.date}
                    </span>
                  </div>
                  <h3
                    className="text-hr-white font-hr-700 mb-3"
                    style={{ fontSize: "var(--text-hr-regular-20)" }}
                  >
                    {notice.title}
                  </h3>
                  <p
                    className="text-hr-gray font-hr-400 leading-relaxed"
                    style={{ fontSize: "var(--text-hr-regular-16)" }}
                  >
                    {notice.description}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-hr-white/15 bg-linear-to-br from-hr-white/8 via-hr-white/4 to-hr-white/0 backdrop-blur-sm shadow-xl p-12 lg:p-16">
              <div className="text-center">
                <p
                  className="text-hr-gray font-hr-400"
                  style={{ fontSize: "var(--text-hr-regular-18)" }}
                >
                  No notices available at the moment. Check back later for updates.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NoticePageContainer;

