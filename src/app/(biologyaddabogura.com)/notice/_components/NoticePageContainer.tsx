"use client";

import React from "react";
import { Eye, Download } from "lucide-react";
import { motion } from "motion/react";
import { Notice, NoticePriority, NoticeStatus } from "./types/notice.types";

const NoticePageContainer = () => {
  // Sample notice data
  const notices: Notice[] = [
    {
      id: "1",
      date: "2024-12-10",
      title: "New Molecular Biology Course Launch",
      priority: "HIGH",
      category: "Announcement",
      description:
        "We are excited to announce the launch of our advanced Molecular Biology course starting January 2025.",
      status: "New",
    },
    {
      id: "2",
      date: "2024-12-08",
      title: "Holiday Schedule Update",
      priority: "MEDIUM",
      category: "Schedule",
      description:
        "Please note that our support team will be available with limited hours during the holiday season.",
      status: "Active",
    },
    {
      id: "3",
      date: "2024-12-05",
      title: "System Maintenance - December 15",
      priority: "HIGH",
      category: "Maintenance",
      description:
        "Scheduled maintenance will occur on December 15 from 2:00 AM to 4:00 AM EST. Services may be temporarily unavailable.",
      status: "Upcoming",
    },
    {
      id: "4",
      date: "2024-12-01",
      title: "New Study Materials Available",
      priority: "LOW",
      category: "Resources",
      description:
        "Updated study materials and practice questions have been added to the Cell Biology course.",
      status: "Active",
    },
    {
      id: "5",
      date: "2024-11-28",
      title: "Thanksgiving Sale - 30% Off All Courses",
      priority: "MEDIUM",
      category: "Promotion",
      description:
        "Special Thanksgiving offer! Get 30% off on all courses. Use code: THANKS2024",
      status: "Expired",
    },
    {
      id: "6",
      date: "2024-11-25",
      title: "Certificate Distribution for November Graduates",
      priority: "MEDIUM",
      category: "Certificates",
      description:
        "Certificates for November graduates are now available for download from your dashboard.",
      status: "Active",
    },
    {
      id: "7",
      date: "2024-11-20",
      title: "Guest Lecture: Dr. Sarah Mitchell on Genetics",
      priority: "HIGH",
      category: "Event",
      description:
        "Join us for an exclusive guest lecture on Advanced Genetics by Dr. Sarah Mitchell on December 5.",
      status: "Active",
    },
    {
      id: "8",
      date: "2024-11-15",
      title: "Platform Updates and New Features",
      priority: "LOW",
      category: "Update",
      description:
        "We have rolled out several new features including improved video player, better search, and mobile app enhancements.",
      status: "Active",
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

      {/* Section 2: Notice Table */}
      <section className="relative py-10 lg:py-16">
        <div className="hr-container relative z-10">
          <div className="rounded-3xl border border-hr-white/15 bg-linear-to-br from-hr-white/8 via-hr-white/4 to-hr-white/0 backdrop-blur-sm shadow-xl overflow-hidden">
            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Header */}
                <thead className="bg-hr-black/50 border-b border-hr-white/10">
                  <tr>
                    <th
                      className="px-6 py-4 text-left text-hr-gray font-hr-600"
                      style={{ fontSize: "var(--text-hr-regular-14)" }}
                    >
                      Date
                    </th>
                    <th
                      className="px-6 py-4 text-left text-hr-gray font-hr-600"
                      style={{ fontSize: "var(--text-hr-regular-14)" }}
                    >
                      Title
                    </th>
                    <th
                      className="px-6 py-4 text-left text-hr-gray font-hr-600"
                      style={{ fontSize: "var(--text-hr-regular-14)" }}
                    >
                      Category
                    </th>
                    <th
                      className="px-6 py-4 text-left text-hr-gray font-hr-600"
                      style={{ fontSize: "var(--text-hr-regular-14)" }}
                    >
                      Description
                    </th>
                    <th
                      className="px-6 py-4 text-left text-hr-gray font-hr-600"
                      style={{ fontSize: "var(--text-hr-regular-14)" }}
                    >
                      Status
                    </th>
                    <th
                      className="px-6 py-4 text-left text-hr-gray font-hr-600"
                      style={{ fontSize: "var(--text-hr-regular-14)" }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {notices.map((notice, index) => (
                    <motion.tr
                      key={notice.id}
                      className="border-b border-hr-white/5 hover:bg-hr-white/5 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      {/* Date */}
                      <td className="px-6 py-4">
                        <span
                          className="text-hr-gray font-hr-400"
                          style={{ fontSize: "var(--text-hr-regular-14)" }}
                        >
                          {notice.date}
                        </span>
                      </td>

                      {/* Title */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="text-hr-white font-hr-600"
                            style={{ fontSize: "var(--text-hr-regular-16)" }}
                          >
                            {notice.title}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-hr-700 ${getPriorityBadgeColor(
                              notice.priority
                            )}`}
                          >
                            {notice.priority}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span
                          className="text-hr-gray font-hr-400"
                          style={{ fontSize: "var(--text-hr-regular-14)" }}
                        >
                          {notice.category}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="px-6 py-4 max-w-md">
                        <p
                          className="text-hr-gray font-hr-400 line-clamp-2"
                          style={{ fontSize: "var(--text-hr-regular-14)" }}
                        >
                          {notice.description}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-hr-600 ${getStatusBadgeColor(
                            notice.status
                          )}`}
                        >
                          {notice.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            className="p-2 text-hr-gray hover:text-hr-green-toxic transition-colors"
                            aria-label="View notice"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 text-hr-gray hover:text-hr-green-toxic transition-colors"
                            aria-label="Download notice"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoticePageContainer;

