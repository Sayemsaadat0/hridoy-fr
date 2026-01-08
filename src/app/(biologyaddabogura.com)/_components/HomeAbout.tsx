"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

const HomeAbout = () => {
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
              About Us
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="mb-12 lg:mb-16 text-center">
          <h2 className=" mb-4 text-hr-regular-32 md:text-hr-regular-60 text-hr-white tracking-tight leading-[0.95] font-hr-800">
            Empowering Future{" "}
            <span className="text-hr-green-toxic">Biologists</span>
          </h2>
          <p
            className="text-hr-gray max-w-2xl mx-auto font-hr-500 leading-relaxed"
            style={{ fontSize: "var(--text-hr-regular-18)" }}
          >
            We&apos;re dedicated to making biology education accessible,
            engaging, and effective for students at all levels.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Image */}
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
                  src="https://media.discordapp.net/attachments/1457987145389314170/1458774515776622602/download_72.jpg?ex=6960dd23&is=695f8ba3&hm=c6ce39e6312ed81e112ede4744a9c7465c1ccd676a272f2ac3e39bb4df53acde&=&format=webp&width=779&height=779"
                  alt="Biology Laboratory"
                  width={800}
                  height={600}
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                  priority
                  unoptimized
                  onError={(e) => {
                    console.error("Image failed to load:", e);
                  }}
                />
              </motion.div>

              {/* Overlay with Stats */}
              <div className="absolute bottom-0 left-0 bg-linear-to-t h-1/2 from-hr-black to-transparent right-0 p-6 lg:p-8">
                <div className="flex h-full items-end">
                  <div className="bg-hr-black/60 backdrop-blur-sm rounded-xl border border-hr-white/10 px-6 py-5">
                    <div
                      className="text-hr-green-toxic font-hr-800 mb-1"
                      style={{ fontSize: "var(--text-hr-regular-32)" }}
                    >
                      6+
                    </div>
                    <div
                      className="text-hr-white font-hr-500"
                      style={{ fontSize: "var(--text-hr-regular-14)" }}
                    >
                      Years of Excellence
                    </div>
                  </div>
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
                Where Science Meets Passion
              </h3>
              <p
                className="text-hr-gray font-hr-400 leading-relaxed mb-6"
                style={{ fontSize: "var(--text-hr-regular-16)" }}
              >
                Biology Adda was founded with a simple mission: to transform the
                way students learn and understand biology. Our expert-led
                courses combine cutting-edge research with practical
                applications, ensuring you gain both theoretical knowledge and
                real-world skills.
              </p>
              <p
                className="text-hr-fiord font-hr-400 leading-relaxed"
                style={{ fontSize: "var(--text-hr-regular-16)" }}
              >
                With a team of experienced educators, researchers, and industry
                professionals, we&apos;ve helped thousands of students achieve
                their academic and career goals in biological sciences.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 lg:gap-12 pt-6 border-t border-hr-white/10">
              <div className="group">
                <div
                  className="text-hr-green-toxic font-hr-800 mb-1 transition-transform group-hover:scale-110"
                  style={{ fontSize: "var(--text-hr-regular-32)" }}
                >
                  98%
                </div>
                <div
                  className="text-hr-white font-hr-500"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  Student Satisfaction
                </div>
              </div>
              <div className="group">
                <div
                  className="text-hr-green-toxic font-hr-800 mb-1 transition-transform group-hover:scale-110"
                  style={{ fontSize: "var(--text-hr-regular-32)" }}
                >
                  20K+
                </div>
                <div
                  className="text-hr-white font-hr-500"
                  style={{ fontSize: "var(--text-hr-regular-14)" }}
                >
                  Students Enrolled Since 2018
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
