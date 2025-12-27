"use client";

import React from "react";
import Image from "next/image";
import { CourseCardProps, CourseLevel } from "./types/course.types";
import { Clock, Users, Star } from "lucide-react";

const levelColors: Record<CourseLevel, string> = {
  Beginner: "bg-blue-500/20 border-blue-500/40 text-blue-400",
  Intermediate: "bg-purple-500/20 border-purple-500/40 text-purple-400",
  Advanced: "bg-orange-500/20 border-orange-500/40 text-orange-400",
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-hr-white/10 bg-hr-green-dark/50 backdrop-blur-sm hover:border-hr-green-toxic/30 transition-all hover:shadow-xl hover:shadow-hr-green-toxic/10 h-full flex flex-col">
      {/* Image Section */}
      <div className="relative h-[240px] overflow-hidden flex-shrink-0">
        <Image
          src={course.thumbnail}
          alt={course.title}
          width={400}
          height={240}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        
        {/* Level Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1.5 rounded-full border backdrop-blur-sm font-hr-600 ${levelColors[course.level]}`}
            style={{ fontSize: "var(--text-hr-regular-12)" }}
          >
            {course.level}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-hr-black/60 via-hr-black/20 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4 flex flex-col flex-1">
        {/* Title */}
        <h3
          className="text-hr-white font-hr-700 group-hover:text-hr-green-toxic transition-colors"
          style={{ fontSize: "var(--text-hr-regular-20)" }}
        >
          {course.title}
        </h3>

        {/* Description */}
        <p
          className="text-hr-gray font-hr-400 leading-relaxed line-clamp-2 flex-shrink-0"
          style={{ fontSize: "var(--text-hr-regular-14)" }}
        >
          {course.description}
        </p>

        {/* Course Details */}
        <div className="flex items-center gap-4 text-hr-fiord flex-shrink-0" style={{ fontSize: "var(--text-hr-regular-14)" }}>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span className="font-hr-500">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span className="font-hr-500">{course.enrollmentCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-hr-orange text-hr-orange" />
            <span className="font-hr-500">{course.rating}</span>
          </div>
        </div>

        {/* Enroll Button */}
        <button className="w-full px-6 py-3 bg-hr-black border border-hr-white/20 hover:border-hr-green-toxic hover:bg-hr-green-toxic/10 text-hr-white rounded-lg transition-all font-hr-600 group/btn mt-auto">
          <span className="flex items-center justify-center gap-2" style={{ fontSize: "var(--text-hr-regular-14)" }}>
            Enroll Now
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;

