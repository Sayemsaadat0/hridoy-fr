"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const images = [
  "/p/1.jpg",
  "/p/2.jpg",
  "/p/3.jpg",
  "/p/4.jpg",
  "/p/5.jpg",
  "/p/6.jpg",
];

const HomeAbout = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden">
      {/* Radial gradient overlays */}
      {/* <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-hr-green-toxic/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-hr-green-light/4 rounded-full blur-[80px]" /> */}
 
      {/* Main Content */}
      <div className="relative z-10 hr-container">
        {/* Badge */}
        <div className="mb-4 text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-hr-green-toxic/10 border border-hr-green-toxic/20 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-hr-green-toxic rounded-full" />
            <span
              className="text-hr-green-toxic font-hr-600"
              style={{ fontSize: "var(--text-hr-regular-14)" }}
            >
              আমাদের সম্পর্কে
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="mb-12 lg:mb-16 text-center">
          <h2 className=" mb-4 text-hr-regular-32 md:text-hr-regular-60 text-hr-white tracking-tight leading-[0.95] font-hr-800">
            ভবিষ্যতের{" "}
            <span className="text-hr-green-toxic">বায়োলজিস্ট</span> গড়ে তোলা
          </h2>
          <p
            className="text-hr-gray max-w-2xl mx-auto font-hr-500 leading-relaxed"
            style={{ fontSize: "var(--text-hr-regular-18)" }}
          >
            সকল স্তরের শিক্ষার্থীদের জন্য বায়োলজি শিক্ষাকে সহজলভ্য, আকর্ষণীয়
            এবং কার্যকর করাই আমাদের লক্ষ্য।
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Image Slider */}
          <div className="relative">
            <motion.div
              className="relative rounded-3xl overflow-hidden border border-hr-white/15 bg-linear-to-br from-hr-white/8 via-hr-white/4 to-hr-white/0 backdrop-blur-sm shadow-xl"
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
              <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={() => {
                      setCurrentIndex((prev) => (prev + 1) % images.length);
                    }}
                  >
                    <Image
                      src={images[currentIndex]}
                      alt={`বায়োলজি ল্যাবরেটরি স্লাইড ${currentIndex + 1}`}
                      fill
                      className="object-cover"
                      priority={currentIndex === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Overlay with Stats */}
                <div className="absolute bottom-0 left-0 bg-linear-to-t h-1/2 from-hr-black/90 to-transparent right-0 p-6 lg:p-8 z-10 pointer-events-none">
                  <div className="flex h-full items-end">
                    <div className="bg-hr-black/60 backdrop-blur-sm rounded-xl border border-hr-white/10 px-6 py-5 pointer-events-auto">
                      <div
                        className="text-hr-green-toxic font-hr-800 mb-1"
                        style={{ fontSize: "var(--text-hr-regular-32)" }}
                      >
                        ৬+
                      </div>
                      <div
                        className="text-hr-white font-hr-500"
                        style={{ fontSize: "var(--text-hr-regular-14)" }}
                      >
                        বছরের অভিজ্ঞতা
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "w-6 bg-hr-green-toxic"
                          : "w-2 bg-hr-white/40 hover:bg-hr-white/60"
                      }`}
                      aria-label={`স্লাইড ${index + 1} এ যান`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Text Content */}
          <div className="space-y-8">
            <div>
              <h3
                className="text-hr-white font-hr-700 mb-6"
                style={{ fontSize: "var(--text-hr-regular-30)" }}
              >
                যেখানে বিজ্ঞান মিলিত হয় ভালোবাসার সাথে
              </h3>
              <p
                className="text-hr-gray font-hr-400 leading-relaxed mb-6"
                style={{ fontSize: "var(--text-hr-regular-16)" }}
              >
                রিদয় স্যার বায়োলজি প্রতিষ্ঠিত হয়েছিল একটি সহজ লক্ষ্য নিয়ে:
                শিক্ষার্থীরা যেভাবে বায়োলজি শেখে ও বোঝে তা বদলে দেওয়া। আমাদের
                বিশেষজ্ঞ-পরিচালিত কোর্সগুলো আধুনিক গবেষণা ও বাস্তবিক প্রয়োগকে
                একসাথে নিয়ে আসে, যাতে আপনি তাত্ত্বিক জ্ঞান ও বাস্তব দক্ষতা
                দুটোই অর্জন করতে পারেন।
              </p>
              <p
                className="text-hr-fiord font-hr-400 leading-relaxed"
                style={{ fontSize: "var(--text-hr-regular-16)" }}
              >
                অভিজ্ঞ শিক্ষক, গবেষক এবং বিশেষজ্ঞদের একটি দল নিয়ে, আমরা হাজার
                হাজার শিক্ষার্থীকে তাদের শিক্ষাগত ও ক্যারিয়ার লক্ষ্য পূরণে
                সাহায্য করেছি জীববিজ্ঞান বিষয়ে।
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 lg:gap-12 pt-6 border-t border-hr-white/10">
              <div className="group">
                <div
                  className="text-hr-green-toxic font-hr-800 mb-1 transition-transform group-hover:scale-110"
                  style={{ fontSize: "var(--text-hr-regular-32)" }}
                >
                  ৯৮%
                </div>
                <div
                  className="text-hr-white font-hr-500"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  শিক্ষার্থী সন্তুষ্টি
                </div>
              </div>
              <div className="group">
                <div
                  className="text-hr-green-toxic font-hr-800 mb-1 transition-transform group-hover:scale-110"
                  style={{ fontSize: "var(--text-hr-regular-32)" }}
                >
                  ২০ হাজার+
                </div>
                <div
                  className="text-hr-white font-hr-500"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  ২০১৮ সাল থেকে ভর্তি হওয়া শিক্ষার্থী
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
