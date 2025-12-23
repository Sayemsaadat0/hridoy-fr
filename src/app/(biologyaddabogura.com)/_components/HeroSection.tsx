"use client";

import { Play, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <div className="relative min-h-screen mt-10 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-linear(rgba(182,245,0,0.03)_1px,transparent_1px),linear-linear(90deg,rgba(182,245,0,0.03)_1px,transparent_1px)] bg-size-[80px_80px] opacity-50" />

      {/* Radial linear overlays */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hr-green-toxic/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-hr-green-light/4 rounded-full blur-[80px]" />

      {/* Main Content */}
      <div className="relative z-10 hr-container pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 ">
          {/* Left Side - Text Content */}
          <div className="space-y-8 lg:space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-hr-green-toxic/10 border border-hr-green-toxic/20 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-hr-green-toxic rounded-full" />
              <span
                className="text-hr-green-toxic font-hr-600"
                style={{ fontSize: "var(--text-hr-regular-14)" }}
              >
                Expert-Led Biology Education
              </span>
            </div>

            {/* Enhanced Main Heading */}
            <div className="space-y-6 lg:space-y-8">
              <h1 className="text-hr-regular-32 md:text-hr-regular-60 text-hr-white tracking-tight leading-[0.95] font-hr-800">
                BIOLOGY
                <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-hr-green-toxic via-hr-green-light to-hr-green-toxic">
                    ADDA
                  </span>
                  <span className="text-hr-white"> BOGURA</span>
                  {/* <span className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-hr-green-toxic via-hr-green-light to-transparent opacity-50" /> */}
                </span>
              </h1>
              <p
                className="text-hr-gray max-w-lg font-hr-500 leading-relaxed"
                style={{ fontSize: "var(--text-hr-regular-22)" }}
              >
                Learn from an experienced instructor with proven expertise
              </p>
              <p
                className="text-hr-fiord max-w-lg leading-relaxed"
                style={{ fontSize: "var(--text-hr-regular-16)" }}
              >
                Master complex biological concepts through engaging lessons,
                interactive modules, and personalized guidance from industry
                experts. Transform your understanding of life sciences.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-5">
              <button
                className="px-8 py-4 bg-linear-to-r from-hr-green-toxic to-hr-green-light hover:from-hr-green-toxic/95 hover:to-hr-green-light/95 text-hr-white rounded-xl transition-all shadow-lg shadow-hr-green-toxic/10 hover:shadow-hr-green-toxic/20 hover:scale-[1.02] transform font-hr-600"
                style={{ fontSize: "var(--text-hr-regular-16)" }}
              >
                Get Started
              </button>
              <button
                className="flex items-center gap-3 px-6 py-4 text-hr-white hover:text-hr-green-toxic transition-colors group"
                style={{ fontSize: "var(--text-hr-regular-16)" }}
              >
                <div className="w-14 h-14 rounded-full bg-hr-white/5 backdrop-blur-sm border border-hr-white/10 flex items-center justify-center group-hover:bg-hr-green-toxic/10 group-hover:border-hr-green-toxic/30 transition-all">
                  <Play className="w-6 h-6 fill-current ml-1 text-hr-white group-hover:text-hr-green-toxic transition-colors" />
                </div>
                <span className="font-hr-500">Watch Video</span>
              </button>
            </div>

            {/* Enhanced Stats */}
            <div className="flex items-center gap-8 lg:gap-12 pt-8 border-t border-hr-white/10">
              <div className="group">
                <div
                  className="text-hr-white font-hr-800 mb-1 transition-transform group-hover:scale-110"
                  style={{ fontSize: "var(--text-hr-regular-32)" }}
                >
                  10K+
                </div>
                <div
                  className="text-hr-fiord font-hr-500"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  Students
                </div>
              </div>
              <div className="group">
                <div
                  className="flex items-center gap-1 text-hr-white font-hr-800 mb-1 transition-transform group-hover:scale-110"
                  style={{ fontSize: "var(--text-hr-regular-32)" }}
                >
                  4.9
                  <Sparkles className="w-5 h-5 text-hr-orange" />
                </div>
                <div
                  className="text-hr-fiord font-hr-500"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  Rating
                </div>
              </div>
              <div className="group">
                <div
                  className="text-hr-white font-hr-800 mb-1 transition-transform group-hover:scale-110"
                  style={{ fontSize: "var(--text-hr-regular-32)" }}
                >
                  50+
                </div>
                <div
                  className="text-hr-fiord font-hr-500"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  Courses
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image Card */}
          <div className="relative lg:h-[750px] flex items-center justify-center">
            {/* Instructor Card */}
            <div className="relative z-10 w-full max-w-md">
              <div className="relative rounded-3xl overflow-hidden border border-hr-white/15 bg-linear-to-br from-hr-white/8 via-hr-white/4 to-hr-white/0 backdrop-blur-sm shadow-xl">
                <div className="relative">
                  <motion.div
                    className="relative overflow-hidden"
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 1.2,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: 0.3,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        duration: 1.2,
                        ease: [0.25, 0.1, 0.25, 1],
                        delay: 0.5,
                      }}
                    >
                      <Image
                        src="https://images.unsplash.com/photo-1758685848006-1bc450061624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXQlMjBkYXJrfGVufDF8fHx8MTc2NTU5NzcwNXww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Experienced Biology Instructor"
                        width={800}
                        height={1000}
                        className="w-full h-[650px] object-cover"
                        priority
                      />
                    </motion.div>
                  </motion.div>

                  {/* Info overlay */}
                  <div className="absolute bottom-0 bg-linear-to-t h-1/2 from-hr-black to-transparent left-0  right-0 p-6 lg:p-8 space-y-4">
                    <div className="flex h-full items-end  gap-4">
                      <div>
                        <div
                          className="text-hr-white font-hr-700 mb-1"
                          style={{ fontSize: "var(--text-hr-regular-20)" }}
                        >
                          Dr. Sarah Mitchell
                        </div>
                        <div
                          className="text-hr-gray font-hr-500"
                          style={{ fontSize: "var(--text-hr-regular-14)" }}
                        >
                          PhD in Molecular Biology
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
