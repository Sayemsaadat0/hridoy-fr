"use client";

import React from "react";
import { Eye, Download } from "lucide-react";
import { motion } from "motion/react";
import { Notice, NoticePriority, NoticeStatus } from "./types/notice.types";

const NoticePageContainer = () => {
  // No notices for now
  const notices: Notice[] = [];

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

      {/* Section 2: Empty State */}
      <section className="relative py-10 lg:py-16">
        <div className="hr-container relative z-10">
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
        </div>
      </section>
    </div>
  );
};

export default NoticePageContainer;

