"use client";

import React from "react";
import { motion } from "motion/react";
import { Notice, NoticePriority, NoticeStatus } from "./types/notice.types";

const NoticePageContainer = () => {
  const isDateExpired = (dateStr: string): boolean => {
    const currentDate = new Date();
    
    // Parse English date format (e.g., "15 March 2025")
    const dateMatch = dateStr.match(/(\d+)\s+(\w+)\s+(\d+)/);
    if (dateMatch) {
      const day = parseInt(dateMatch[1]);
      const month = dateMatch[2];
      const year = parseInt(dateMatch[3]);
      
      const monthMap: { [key: string]: number } = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3,
        'May': 4, 'June': 5, 'July': 6, 'August': 7,
        'September': 8, 'October': 9, 'November': 10, 'December': 11
      };
      
      const monthNum = monthMap[month];
      if (monthNum !== undefined) {
        const noticeDate = new Date(year, monthNum, day);
        return noticeDate < currentDate;
      }
    }
    return false;
  };

  const notices: Notice[] = [
    {
      id: "6",
      date: "24 April 2026",
      title: "নবম শ্রেণী – জীববিজ্ঞান সৃজনশীল পরীক্ষা (অধ্যায় ৩: কোষ বিভাজন)",
      priority: "HIGH",
      category: "পরীক্ষা",
      description:
        "আগামীকাল শুক্রবার ২৪ এপ্রিল, নবম শ্রেণীর জীববিজ্ঞান তৃতীয় অধ্যায় কোষ বিভাজন এর ওপর সৃজনশীল পরীক্ষা অনুষ্ঠিত হবে। সবাইকে সকাল ৯ টা থেকে ১২টা এর মধ্যে পরীক্ষায় অংশগ্রহণের জন্য নির্দেশ দেয়া হলো।",
      status: isDateExpired("24 April 2026") ? "Expired" : "Upcoming",
    },
    {
      id: "5",
      date: "24 April 2026",
      title: "নবম শ্রেণী – জীববিজ্ঞান সৃজনশীল পরীক্ষা (১৩শ অধ্যায়)",
      priority: "HIGH",
      category: "পরীক্ষা",
      description:
        "আগামীকাল শুক্রবার ২৪ এপ্রিল, নবম শ্রেণীর জীববিজ্ঞান ১৩শ অধ্যায় এর ওপর সৃজনশীল পরীক্ষা অনুষ্ঠিত হবে। সবাইকে সকাল ৯ টা থেকে ১২টা এর মধ্যে পরীক্ষায় অংশগ্রহণের জন্য নির্দেশ দেয়া হলো। ",
      status: isDateExpired("24 April 2026") ? "Expired" : "Upcoming",
    },
    {
      id: "4",
      date: "18 March 2026",
      title: "ঈদুল ফিতরের ছুটি",
      priority: "HIGH",
      category: "ছুটি",
      description:
        "পবিত্র ঈদুল ফিতরের আনন্দে ১৮ মার্চ ২০২৬ (বুধবার) থেকে সকল ক্লাস বন্ধ থাকবে।\nইনশাআল্লাহ ২৮ মার্চ ২০২৬ (শনিবার) থেকে ক্লাস পূর্বের ব্যাচ টাইম অনুযায়ী পুনরায় শুরু হবে।\n\nসকল শিক্ষার্থীকে নির্ধারিত সময় মেনে উপস্থিত থাকার অনুরোধ রইলো। 🌙📚",
      status: isDateExpired("18 March 2026") ? "Expired" : "Upcoming",
    },
    {
      id: "3",
      date: "15 March 2026",
      title: "নবম-দশম শ্রেণীর ১ম মডেল টেস্ট পরীক্ষা",
      priority: "HIGH",
      category: "পরীক্ষা",
      description:
        "প্রিয় শিক্ষার্থী,\nআগামী ১৫ ও ১৬ মার্চ Ridoy sir's Biology -তে নবম-দশম শ্রেণীর ১ম মডেল টেস্ট পরীক্ষা অনুষ্ঠিত হবে।\nনবম শ্রেণি: ১ম ও ২য় অধ্যায়\nদশম শ্রেণি: ১১, ১২ ও ১৩ অধ্যায়\nপরীক্ষার ধরন: ২৫ MCQ, ৪টি সৃজনশীল, ১০টি সংক্ষিপ্ত প্রশ্ন | পূর্ণমান: ৭৫\nশিক্ষার্থীরা দুই দিনের যেকোনো একদিন সকাল ৮টা থেকে বিকাল ৫টার মধ্যে এসে ৩ ঘণ্টার পরীক্ষা দিতে পারবে।\nসকলকে অবশ্যই উপস্থিত থাকতে হবে�",
      status: isDateExpired("15 March 2026") ? "Expired" : "Upcoming",
    },
    {
      id: "1",
      date: "6 March 2026",
      title: "নবম শ্রেণী – চ্যাপ্টার ফাইনাল পরীক্ষা",
      priority: "HIGH",
      category: "পরীক্ষা",
      description:
        "আগামীকাল শুক্রবার 6 মার্চ নবম শ্রেণীর দ্বিতীয় অধ্যায়ের উপরে চ্যাপ্টার ফাইনাল পরীক্ষা অনুষ্ঠিত হবে। পরীক্ষার ধরনঃ তিনটি সৃজনশীল থাকবে প্রশ্ন থাকবে দুইটির উত্তর দিতে হবে। Ridoy sir's Biology classroom.",
      status: isDateExpired("6 March 2026") ? "Expired" : "Upcoming",
    },
    {
      id: "2",
      date: "6 March 2026",
      title: "দশম শ্রেণী – Short Question পরীক্ষা",
      priority: "HIGH",
      category: "পরীক্ষা",
      description:
        "আগামীকাল শুক্রবার 6 মার্চ, ১০ ম শ্রেণীর ১১ অধ্যায়ের উপরে Short Question পরীক্ষা অনুষ্ঠিত হবে। Ridoy sir's Biology classroom.",
      status: isDateExpired("6 March 2026") ? "Expired" : "Upcoming",
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
          {notices.length > 0 ? (
            <div className="max-w-6xl mx-auto">
              <div className="rounded-3xl border border-hr-white/15 bg-linear-to-br from-hr-white/8 via-hr-white/4 to-hr-white/0 backdrop-blur-sm shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-hr-white/10">
                        <th className="text-left px-6 py-4 text-hr-white font-hr-600" style={{ fontSize: "var(--text-hr-regular-16)" }}>Date</th>
                        <th className="text-left px-6 py-4 text-hr-white font-hr-600" style={{ fontSize: "var(--text-hr-regular-16)" }}>Title</th>
                        <th className="text-left px-6 py-4 text-hr-white font-hr-600" style={{ fontSize: "var(--text-hr-regular-16)" }}>Description</th>
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
                                  {notice.priority}
                                </span>
                                <span
                                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeColor(notice.status)}`}
                                >
                                  {notice.status}
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

