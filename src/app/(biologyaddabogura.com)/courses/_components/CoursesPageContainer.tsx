"use client";

import React, { useMemo, useState } from "react";
import CourseCard from "../../_components/CourseCard";
import { Course } from "../../_components/types/course.types";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { motion } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CoursesPageContainer = ({ courses }: { courses: Course[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const visibleCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return courses.filter(
      (course) =>
        (selectedCategory === "All" || course.level === selectedCategory) &&
        (!query ||
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query))
    );
  }, [courses, searchQuery, selectedCategory]);


  const categories: { value: string; label: string }[] = [
    { value: "All", label: "সকল" },
    { value: "Beginner", label: "শিক্ষানবিস" },
    { value: "Intermediate", label: "মধ্যম" },
    { value: "Advanced", label: "উচ্চতর" },
  ];

  return (
    <div className="relative overflow-hidden mt-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hr-green-toxic/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-hr-green-light/4 rounded-full blur-[80px]" />
      </div>

      {/* Section 1: Courses Banner */}
      <section className="relative pt-12 lg:pt-24">
        <div className="hr-container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="">
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

            <h1
              className="text-hr-white font-hr-800 mb-6"
              style={{ fontSize: "var(--text-hr-regular-50)" }}
            >
              সকল <span className="text-hr-green-toxic">কোর্স</span>
            </h1>
            <p
              className="text-hr-gray font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-18)" }}
            >
              আপনার পড়াশোনায় এগিয়ে থাকতে ডিজাইন করা আমাদের পূর্ণাঙ্গ বায়োলজি
              কোর্স সংগ্রহ দেখুন।
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Filters and Courses */}
      <section className="relative py-10 lg:py-16">
        <div className="hr-container relative z-10">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-hr-white/20 bg-hr-black/50 text-hr-white hover:border-hr-green-toxic hover:bg-hr-green-toxic/10 transition-all">
                  <Filter className="w-5 h-5" />
                  <span
                    className="font-hr-600"
                    style={{ fontSize: "var(--text-hr-regular-16)" }}
                  >
                    ফিল্টার
                  </span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] p-5 sm:w-[400px] bg-hr-green-dark border-hr-white/15"
              >
                <SheetHeader>
                  <SheetTitle
                    className="text-hr-white"
                    style={{ fontSize: "var(--text-hr-regular-24)" }}
                  >
                    ফিল্টার
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-8">
                  {/* Search */}
                  <div>
                    <h3
                      className="text-hr-white font-hr-700 mb-4"
                      style={{ fontSize: "var(--text-hr-regular-18)" }}
                    >
                      সার্চ
                    </h3>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-hr-gray" />
                      <Input
                        type="search"
                        placeholder="কোর্স সার্চ করুন..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 h-12 bg-hr-black/50 border-hr-white/20 text-hr-white placeholder:text-hr-gray focus:border-hr-green-toxic focus:ring-hr-green-toxic/20"
                      />
                    </div>
                  </div>

                  {/* Category Filters */}
                  <div>
                    <h3
                      className="text-hr-white font-hr-700 mb-4"
                      style={{ fontSize: "var(--text-hr-regular-18)" }}
                    >
                      বিভাগ
                    </h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <label
                          key={category.value}
                          className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-hr-white/5 transition-colors"
                        >
                          <div className="relative">
                            <input
                              type="radio"
                              name="category"
                              value={category.value}
                              checked={selectedCategory === category.value}
                              onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setIsFilterOpen(false);
                              }}
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 transition-all ${
                                selectedCategory === category.value
                                  ? "border-hr-green-toxic bg-hr-green-toxic/20"
                                  : "border-hr-white/20 bg-hr-black/50 group-hover:border-hr-green-toxic/30"
                              }`}
                            >
                              {selectedCategory === category.value && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-2.5 h-2.5 rounded-full bg-hr-green-toxic" />
                                </div>
                              )}
                            </div>
                          </div>
                          <span
                            className={`font-hr-500 transition-colors ${
                              selectedCategory === category.value
                                ? "text-hr-green-toxic"
                                : "text-hr-gray group-hover:text-hr-white"
                            }`}
                            style={{ fontSize: "var(--text-hr-regular-16)" }}
                          >
                            {category.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Filters (Desktop Only) */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="rounded-3xl border border-hr-white/15 bg-linear-to-br from-hr-white/8 via-hr-white/4 to-hr-white/0 backdrop-blur-sm p-6 shadow-xl sticky top-24">
                {/* Search */}
                <div className="mb-8">
                  <h3
                    className="text-hr-white font-hr-700 mb-4"
                    style={{ fontSize: "var(--text-hr-regular-18)" }}
                  >
                    সার্চ
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-hr-gray" />
                    <Input
                      type="search"
                      placeholder="কোর্স সার্চ করুন..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 h-12 bg-hr-black/50 border-hr-white/20 text-hr-white placeholder:text-hr-gray focus:border-hr-green-toxic focus:ring-hr-green-toxic/20"
                    />
                  </div>
                </div>

                {/* Category Filters */}
                <div>
                  <h3
                    className="text-hr-white font-hr-700 mb-4"
                    style={{ fontSize: "var(--text-hr-regular-18)" }}
                  >
                    বিভাগ
                  </h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label
                        key={category.value}
                        className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-hr-white/5 transition-colors"
                      >
                        <div className="relative">
                          <input
                            type="radio"
                            name="category"
                            value={category.value}
                            checked={selectedCategory === category.value}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 transition-all ${
                              selectedCategory === category.value
                                ? "border-hr-green-toxic bg-hr-green-toxic/20"
                                : "border-hr-white/20 bg-hr-black/50 group-hover:border-hr-green-toxic/30"
                            }`}
                          >
                            {selectedCategory === category.value && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-hr-green-toxic" />
                              </div>
                            )}
                          </div>
                        </div>
                        <span
                          className={`font-hr-500 transition-colors ${
                            selectedCategory === category.value
                              ? "text-hr-green-toxic"
                              : "text-hr-gray group-hover:text-hr-white"
                          }`}
                          style={{ fontSize: "var(--text-hr-regular-16)" }}
                        >
                          {category.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Side - Courses Grid */}
            <div className="lg:col-span-3 col-span-full">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {visibleCourses.length === 0 && (
                  <p
                    className="col-span-full rounded-2xl border border-hr-white/10 bg-hr-white/5 p-10 text-center text-hr-gray"
                    style={{ fontSize: "var(--text-hr-regular-16)" }}
                  >
                    কোনো কোর্স পাওয়া যায়নি।
                  </p>
                )}
                {visibleCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    className="h-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPageContainer;

