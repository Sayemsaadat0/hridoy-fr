"use client";

import React from "react";
import Image from "next/image";
import { Users, Target, TrendingUp, Quote } from "lucide-react";
import { motion } from "motion/react";

const AboutPageContainer = () => {
  return (
    <div className="relative">
      {/* Section 1: About Us Banner */}
      <section
        className="relative py-10 lg:py-16 mt-10 overflow-hidden"
        style={{
          backgroundImage: 'url("https://i.pinimg.com/736x/8b/13/b5/8b13b55bc384ec63af08388189650dbc.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/80 pointer-events-none z-0" />
        <div className="hr-container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1
              className="text-hr-white font-hr-800 mb-6"
              style={{ fontSize: "var(--text-hr-regular-50)" }}
            >
              <span className="text-hr-green-toxic">About</span> us
            </h1>
            <p
              className="text-hr-gray font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-18)" }}
            >
              Meet your dedicated biology tutor with over 6 years of teaching experience, 
              committed to helping students excel in biology through personalized, 
              comprehensive, and engaging lessons.
            </p>
          </div>
        </div>
      </section>


      {/* Section 3: Teaching Philosophy */}
      <section className="relative py-10 lg:py-16">
        <div className="hr-container">
          <h2
            className="text-hr-white font-hr-800 mb-6 lg:mb-8 text-center lg:text-left"
            style={{ fontSize: "var(--text-hr-regular-40)" }}
          >
            Your <span className="text-hr-green-toxic">Biology Learning</span> Journey Starts Here
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <p
              className="text-hr-gray font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-16)" }}
            >
              As an experienced biology tutor teaching since 2018, I understand that every 
              student learns differently. My teaching approach combines clear explanations, 
              visual aids, and practical examples to make complex biological concepts 
              easy to understand and remember.
            </p>
            <p
              className="text-hr-gray font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-16)" }}
            >
              Whether you&apos;re preparing for exams, struggling with specific topics, 
              or aiming to deepen your understanding of biology, I provide personalized 
              guidance tailored to your learning style and goals. From cell biology to 
              genetics, ecology to human anatomy, I cover all aspects of biology with 
              passion and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Teaching Experience & Journey */}
      <section className="relative py-10 lg:py-16 bg-hr-green-dark/50">
        <div className="hr-container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Image/Video */}
            <div className="relative">
              <motion.div
                className="relative rounded-3xl overflow-hidden border border-hr-white/15 bg-linear-to-br from-hr-white/8 via-hr-white/4 to-hr-white/0 backdrop-blur-sm shadow-xl"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <Image
                    src="https://i.pinimg.com/736x/48/96/6d/48966deea1b696cfee331a4bfc94cd26.jpg"
                    alt="Biology tutor teaching students"
                    width={800}
                    height={600}
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                    unoptimized
                  />
                </motion.div>


                {/* Bottom Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-hr-black/80 backdrop-blur-sm p-6">
                  <p
                    className="text-hr-white font-hr-700 mb-1"
                    style={{ fontSize: "var(--text-hr-regular-18)" }}
                  >
                    &quot;Empowering students to excel in biology since 2018&quot;
                  </p>
                  <p
                    className="text-hr-gray font-hr-500"
                    style={{ fontSize: "var(--text-hr-regular-14)" }}
                  >
                    Experienced Biology Tutor
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              <h2
                className="text-hr-white font-hr-800"
                style={{ fontSize: "var(--text-hr-regular-40)" }}
              >
                <span className="text-hr-green-toxic">6+ Years</span> of Teaching Excellence
              </h2>
              <p
                className="text-hr-gray font-hr-400 leading-relaxed"
                style={{ fontSize: "var(--text-hr-regular-16)" }}
              >
                Since 2018, I have been dedicated to helping students master biology 
                through comprehensive tutoring. My experience spans all levels of biology 
                education, from high school fundamentals to advanced topics. I believe 
                in creating a supportive learning environment where students can ask 
                questions, explore concepts, and build confidence in their biology skills.
              </p>

              {/* Quote */}
              <div className="relative pl-6 ">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-hr-green-toxic/30" />
                <p
                  className="text-hr-gray font-hr-400 leading-relaxed italic"
                  style={{ fontSize: "var(--text-hr-regular-16)" }}
                >
                  &quot;Biology is not just about memorizing facts—it&apos;s about 
                  understanding the fascinating world of living organisms. My goal is 
                  to make biology accessible, engaging, and enjoyable for every student.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Why Choose This Biology Tutor */}
      <section className="relative py-10 lg:py-16">
        <div className="hr-container">
          <div className="text-center mb-8 lg:mb-12">
            <h2
              className="text-hr-white font-hr-800 mb-6"
              style={{ fontSize: "var(--text-hr-regular-40)" }}
            >
              Why Choose <span className="text-hr-green-toxic">Biology Adda</span> for Your Learning
            </h2>
            <p
              className="text-hr-gray max-w-2xl mx-auto font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-18)" }}
            >
              With over 6 years of dedicated teaching experience, I provide comprehensive 
              biology tutoring that helps students achieve their academic goals and develop 
              a deep understanding of biological sciences.
            </p>
          </div>

          {/* Feature Blocks */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Users,
                title: "Experienced Tutor",
                description:
                  "Teaching biology since 2018 with proven expertise in all major biology topics, from cell structure to ecology and genetics.",
              },
              {
                icon: Target,
                title: "Personalized Learning",
                description:
                  "Tailored teaching approach that adapts to each student&apos;s learning style, pace, and specific academic needs.",
              },
              {
                icon: TrendingUp,
                title: "Proven Results",
                description:
                  "Helping students improve their grades, build confidence, and develop a genuine passion for biology through effective teaching methods.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="text-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-hr-green-toxic/10 border border-hr-green-toxic/20 mb-4">
                    <Icon className="w-8 h-8 text-hr-green-toxic" />
                  </div>
                  <h3
                    className="text-hr-white font-hr-700"
                    style={{ fontSize: "var(--text-hr-regular-24)" }}
                  >
                    {feature.title === "Experienced Tutor" ? (
                      <>
                        <span className="text-hr-green-toxic">Experienced</span> Tutor
                      </>
                    ) : feature.title === "Personalized Learning" ? (
                      <>
                        Personalized <span className="text-hr-green-toxic">Learning</span>
                      </>
                    ) : (
                      <>
                        <span className="text-hr-green-toxic">Proven</span> Results
                      </>
                    )}
                  </h3>
                  <p
                    className="text-hr-gray font-hr-400 leading-relaxed"
                    style={{ fontSize: "var(--text-hr-regular-16)" }}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPageContainer;