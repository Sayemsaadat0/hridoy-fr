"use client";

import React, { useState } from "react";
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

const CoursesPageContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample courses data
  const courses: Course[] = [
    {
      id: "1",
      title: "Molecular Biology Masterclass",
      description:
        "Deep dive into DNA, RNA, and protein synthesis with hands-on virtual lab experiences.",
      thumbnail:
        "https://i.pinimg.com/736x/6c/8e/01/6c8e01266d78f1ca972b0386f9f9afa5.jpg",
      level: "Advanced",
      duration: "12 weeks",
      enrollmentCount: "2.5K",
      rating: 4.9,
    },
    {
      id: "2",
      title: "Cell Biology Fundamentals",
      description:
        "Master cellular structures, functions, and processes from the ground up.",
      thumbnail:
        "https://i.pinimg.com/736x/6c/8e/01/6c8e01266d78f1ca972b0386f9f9afa5.jpg",
      level: "Beginner",
      duration: "8 weeks",
      enrollmentCount: "4.2K",
      rating: 4.8,
    },
    {
      id: "3",
      title: "Genetics & Evolution",
      description:
        "Explore heredity, genetic variation, and evolutionary biology principles.",
      thumbnail:
        "https://i.pinimg.com/736x/6c/8e/01/6c8e01266d78f1ca972b0386f9f9afa5.jpg",
      level: "Intermediate",
      duration: "10 weeks",
      enrollmentCount: "3.1K",
      rating: 4.9,
    },
    {
      id: "4",
      title: "Human Anatomy & Physiology",
      description:
        "Comprehensive study of human body systems and their functions.",
      thumbnail:
        "https://i.pinimg.com/736x/6c/8e/01/6c8e01266d78f1ca972b0386f9f9afa5.jpg",
      level: "Intermediate",
      duration: "14 weeks",
      enrollmentCount: "3.8K",
      rating: 4.7,
    },
    {
      id: "5",
      title: "Microbiology Essentials",
      description:
        "Learn about microorganisms, their roles, and impact on health and environment.",
      thumbnail:
        "https://i.pinimg.com/736x/6c/8e/01/6c8e01266d78f1ca972b0386f9f9afa5.jpg",
      level: "Beginner",
      duration: "9 weeks",
      enrollmentCount: "2.9K",
      rating: 4.6,
    },
    {
      id: "6",
      title: "Ecology & Environmental Biology",
      description:
        "Understand ecosystems, biodiversity, and environmental conservation.",
      thumbnail:
        "https://i.pinimg.com/736x/6c/8e/01/6c8e01266d78f1ca972b0386f9f9afa5.jpg",
      level: "Intermediate",
      duration: "11 weeks",
      enrollmentCount: "2.1K",
      rating: 4.8,
    },
  ];

  const categories = ["All", "Beginner", "Intermediate", "Advanced"];

  return (
    <div className="relative overflow-hidden mt-10">
      {/* Background Effects */}
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
                  Our Programs
                </span>
              </div>
            </div>

            <h1
              className="text-hr-white font-hr-800 mb-6"
              style={{ fontSize: "var(--text-hr-regular-50)" }}
            >
              All <span className="text-hr-green-toxic">Courses</span>
            </h1>
            <p
              className="text-hr-gray font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-18)" }}
            >
              Explore our comprehensive collection of biology courses designed to
              help you excel in your studies.
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
                    Filters
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
                    Filters
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-8">
                  {/* Search */}
                  <div>
                    <h3
                      className="text-hr-white font-hr-700 mb-4"
                      style={{ fontSize: "var(--text-hr-regular-18)" }}
                    >
                      Search
                    </h3>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-hr-gray" />
                      <Input
                        type="search"
                        placeholder="Search courses..."
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
                      Category
                    </h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-hr-white/5 transition-colors"
                        >
                          <div className="relative">
                            <input
                              type="radio"
                              name="category"
                              value={category}
                              checked={selectedCategory === category}
                              onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setIsFilterOpen(false);
                              }}
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 transition-all ${
                                selectedCategory === category
                                  ? "border-hr-green-toxic bg-hr-green-toxic/20"
                                  : "border-hr-white/20 bg-hr-black/50 group-hover:border-hr-green-toxic/30"
                              }`}
                            >
                              {selectedCategory === category && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-2.5 h-2.5 rounded-full bg-hr-green-toxic" />
                                </div>
                              )}
                            </div>
                          </div>
                          <span
                            className={`font-hr-500 transition-colors ${
                              selectedCategory === category
                                ? "text-hr-green-toxic"
                                : "text-hr-gray group-hover:text-hr-white"
                            }`}
                            style={{ fontSize: "var(--text-hr-regular-16)" }}
                          >
                            {category}
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
                    Search
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-hr-gray" />
                    <Input
                      type="search"
                      placeholder="Search courses..."
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
                    Category
                  </h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-hr-white/5 transition-colors"
                      >
                        <div className="relative">
                          <input
                            type="radio"
                            name="category"
                            value={category}
                            checked={selectedCategory === category}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 transition-all ${
                              selectedCategory === category
                                ? "border-hr-green-toxic bg-hr-green-toxic/20"
                                : "border-hr-white/20 bg-hr-black/50 group-hover:border-hr-green-toxic/30"
                            }`}
                          >
                            {selectedCategory === category && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-hr-green-toxic" />
                              </div>
                            )}
                          </div>
                        </div>
                        <span
                          className={`font-hr-500 transition-colors ${
                            selectedCategory === category
                              ? "text-hr-green-toxic"
                              : "text-hr-gray group-hover:text-hr-white"
                          }`}
                          style={{ fontSize: "var(--text-hr-regular-16)" }}
                        >
                          {category}
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
                {courses.map((course, index) => (
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

