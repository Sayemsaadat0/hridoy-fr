"use client";

import React from "react";
import CourseCard from "./CourseCard";
import { Course } from "./types/course.types";
import { ArrowRight } from "lucide-react";

const HomeCourses = ({ courses }: { courses: Course[] }) => {
  if (courses.length === 0) return null;

  return (
    <div className="relative  overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 hr-container">
        {/* Header Section */}
        <div className="mb-12 lg:mb-16">
          <div className="space-y-3 text-center">
            {/* Badge */}
            <div>
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-hr-green-toxic/10 border border-hr-green-toxic/20 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-hr-green-toxic rounded-full" />
                <span
                  className="text-hr-green-toxic font-hr-600"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  আমাদের প্রোগ্রাম
                </span>
              </div>
            </div>

            {/* Heading */}
            <div>
              <h2 className=" mb-4 text-hr-regular-32 md:text-hr-regular-60 text-hr-white tracking-tight leading-[0.95] font-hr-800">
                রেটেড <span className="text-hr-green-toxic">প্রোগ্রাম</span>
              </h2>
              <p
                className="text-hr-gray max-w-2xl mx-auto font-hr-500 leading-relaxed"
                style={{ fontSize: "var(--text-hr-regular-18)" }}
              >
                বিশেষজ্ঞদের ডিজাইন করা আমাদের সবচেয়ে জনপ্রিয় কোর্সগুলো দেখুন।
              </p>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* View All Button */}
        {/* <div className="text-center">
          <button
            className="px-8 py-4 bg-linear-to-r from-hr-green-toxic to-hr-green-light hover:from-hr-green-toxic/95 hover:to-hr-green-light/95 text-hr-white rounded-xl transition-all shadow-lg shadow-hr-green-toxic/10 hover:shadow-hr-green-toxic/20 hover:scale-[1.02] transform font-hr-600 group"
            style={{ fontSize: "var(--text-hr-regular-16)" }}
          >
            <span className="flex items-center gap-2">
              View All Courses
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default HomeCourses;
