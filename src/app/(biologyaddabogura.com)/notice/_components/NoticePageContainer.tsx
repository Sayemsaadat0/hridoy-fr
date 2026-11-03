"use client";

import React from "react";
import { motion } from "motion/react";
import { Notice, NoticePriority, NoticeStatus } from "./types/notice.types";

const NoticePageContainer = ({ notices }: { notices: Notice[] }) => {

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

  const priorityLabels: Record<NoticePriority, string> = {
    HIGH: "জরুরি",
    MEDIUM: "মধ্যম",
    LOW: "সাধারণ",
  };

  const statusLabels: Record<NoticeStatus, string> = {
    New: "নতুন",
    Active: "চলমান",
    Upcoming: "আসন্ন",
    Expired: "সমাপ্ত",
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
              <span className="text-hr-green-toxic">নোটিশ</span> ও আপডেট
            </h1>
            <p
              className="text-hr-gray font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-18)" }}
            >
              সর্বশেষ ঘোষণা, সিডিউল এবং গুরুত্বপূর্ণ তথ্য জানতে সাথে থাকুন।
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Notice Table */}
      <section className="relative py-10 lg:py-16">
        <div className="hr-container relative z-10">
          {notices.length > 0 ? (
            <div className="max-w-6xl mx-auto">
              <div className="rounded-3xl border border-hr-white/15 bg-linear-to-br from-hr-white/8 via-hr-white/4 to-hr-white/0 backdrop-blur-sm shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-hr-white/10">
                        <th className="text-left px-6 py-4 text-hr-white font-hr-600" style={{ fontSize: "var(--text-hr-regular-16)" }}>তারিখ</th>
                        <th className="text-left px-6 py-4 text-hr-white font-hr-600" style={{ fontSize: "var(--text-hr-regular-16)" }}>শিরোনাম</th>
                        <th className="text-left px-6 py-4 text-hr-white font-hr-600" style={{ fontSize: "var(--text-hr-regular-16)" }}>বিস্তারিত</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notices.map((notice, index) => (
                        <motion.tr
                          key={notice.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className={`border-b border-hr-white/5 transition-colors ${
                            notice.status === "Expired"
                              ? "opacity-60"
                              : "hover:bg-hr-white/5"
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div className={`text-sm font-hr-400 ${
                                notice.status === "Expired" ? "text-gray-500" : "text-hr-gray"
                              }`}>
                                {notice.date}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <span
                                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getPriorityBadgeColor(notice.priority)}`}
                                >
                                  {priorityLabels[notice.priority]}
                                </span>
                                <span
                                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeColor(notice.status)}`}
                                >
                                  {statusLabels[notice.status]}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className={`px-6 py-4 font-hr-600 ${
                            notice.status === "Expired" ? "text-gray-400" : "text-hr-white"
                          }`} style={{ fontSize: "var(--text-hr-regular-16)" }}>
                            {notice.title}
                          </td>
                          <td className={`px-6 py-4 text-sm font-hr-400 ${
                            notice.status === "Expired" ? "text-gray-500" : "text-hr-gray"
                          }`}>
                            {notice.description}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-hr-white/15 bg-linear-to-br from-hr-white/8 via-hr-white/4 to-hr-white/0 backdrop-blur-sm shadow-xl p-12 lg:p-16">
              <div className="text-center">
                <p
                  className="text-hr-gray font-hr-400"
                  style={{ fontSize: "var(--text-hr-regular-18)" }}
                >
                  এই মুহূর্তে কোনো নোটিশ নেই। আপডেটের জন্য পরে আবার দেখুন।
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

