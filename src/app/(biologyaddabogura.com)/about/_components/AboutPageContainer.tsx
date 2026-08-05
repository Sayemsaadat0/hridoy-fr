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
              <span className="text-hr-green-toxic">আমাদের</span> সম্পর্কে
            </h1>
            <p
              className="text-hr-gray font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-18)" }}
            >
              পরিচিত হোন আপনার নিবেদিত বায়োলজি শিক্ষকের সাথে, যার শিক্ষাদানের
              অভিজ্ঞতা ৬ বছরেরও বেশি — ব্যক্তিগত, পূর্ণাঙ্গ এবং আকর্ষণীয় পাঠের
              মাধ্যমে শিক্ষার্থীদের বায়োলজিতে এগিয়ে থাকতে সাহায্য করাই যার লক্ষ্য।
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
            আপনার <span className="text-hr-green-toxic">বায়োলজি শেখার</span> যাত্রা শুরু হোক এখান থেকেই
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <p
              className="text-hr-gray font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-16)" }}
            >
              ২০১৮ সাল থেকে বায়োলজি পড়ানোর অভিজ্ঞতা নিয়ে, আমি জানি প্রতিটি
              শিক্ষার্থী আলাদাভাবে শেখে। আমার শিক্ষাপদ্ধতিতে স্পষ্ট ব্যাখ্যা,
              ভিজ্যুয়াল উপকরণ এবং বাস্তব উদাহরণের সমন্বয় থাকে, যা জটিল বায়োলজি
              ধারণাগুলো সহজে বোঝা ও মনে রাখা সম্ভব করে তোলে।
            </p>
            <p
              className="text-hr-gray font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-16)" }}
            >
              আপনি পরীক্ষার জন্য প্রস্তুতি নিচ্ছেন, কোনো নির্দিষ্ট টপিকে সমস্যায়
              আছেন, বা বায়োলজি সম্পর্কে আরও গভীর জ্ঞান অর্জন করতে চান — যাই হোক
              না কেন, আমি আপনার শেখার ধরন ও লক্ষ্য অনুযায়ী ব্যক্তিগত দিকনির্দেশনা
              দিয়ে থাকি। কোষ বিভাজন থেকে জেনেটিক্স, বাস্তুবিদ্যা থেকে মানব
              শারীরস্থান — বায়োলজির প্রতিটি বিষয় আমি ভালোবাসা ও দক্ষতা দিয়ে
              কভার করি।
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
                    alt="বায়োলজি শিক্ষক শিক্ষার্থীদের পড়াচ্ছেন"
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
                    &quot;২০১৮ সাল থেকে শিক্ষার্থীদের বায়োলজিতে এগিয়ে থাকতে সহায়তা&quot;
                  </p>
                  <p
                    className="text-hr-gray font-hr-500"
                    style={{ fontSize: "var(--text-hr-regular-14)" }}
                  >
                    অভিজ্ঞ বায়োলজি শিক্ষক
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
                <span className="text-hr-green-toxic">৬+ বছরের</span> শিক্ষাদানের অভিজ্ঞতা
              </h2>
              <p
                className="text-hr-gray font-hr-400 leading-relaxed"
                style={{ fontSize: "var(--text-hr-regular-16)" }}
              >
                ২০১৮ সাল থেকে, আমি পূর্ণাঙ্গ শিক্ষাদানের মাধ্যমে শিক্ষার্থীদের
                বায়োলজি আয়ত্ত করতে সহায়তা করে আসছি। আমার অভিজ্ঞতা বায়োলজি
                শিক্ষার সকল স্তর জুড়ে বিস্তৃত — মাধ্যমিক পর্যায়ের মৌলিক বিষয়
                থেকে শুরু করে উচ্চতর টপিক পর্যন্ত। আমি বিশ্বাস করি এমন একটি
                সহায়ক শিক্ষার পরিবেশ গড়ে তোলায়, যেখানে শিক্ষার্থীরা প্রশ্ন
                করতে পারে, ধারণা অনুসন্ধান করতে পারে এবং বায়োলজিতে আত্মবিশ্বাস
                গড়ে তুলতে পারে।
              </p>

              {/* Quote */}
              <div className="relative pl-6 ">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-hr-green-toxic/30" />
                <p
                  className="text-hr-gray font-hr-400 leading-relaxed italic"
                  style={{ fontSize: "var(--text-hr-regular-16)" }}
                >
                  &quot;বায়োলজি কেবল তথ্য মুখস্থ করা নয় — এটি জীবজগতের
                  আশ্চর্যজনক দুনিয়াকে বোঝার বিষয়। আমার লক্ষ্য হলো প্রতিটি
                  শিক্ষার্থীর জন্য বায়োলজিকে সহজলভ্য, আকর্ষণীয় ও উপভোগ্য করে
                  তোলা।&quot;
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
              কেন বেছে নেবেন <span className="text-hr-green-toxic">রিদয় স্যার বায়োলজি</span>-কে
            </h2>
            <p
              className="text-hr-gray max-w-2xl mx-auto font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-18)" }}
            >
              ৬ বছরেরও বেশি নিবেদিত শিক্ষাদানের অভিজ্ঞতা নিয়ে, আমি পূর্ণাঙ্গ
              বায়োলজি শিক্ষা দিই যা শিক্ষার্থীদের শিক্ষাগত লক্ষ্য পূরণ ও
              জীববিজ্ঞান সম্পর্কে গভীর ধারণা গড়ে তুলতে সাহায্য করে।
            </p>
          </div>

          {/* Feature Blocks */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Users,
                title: "Experienced Tutor",
                description:
                  "কোষের গঠন থেকে বাস্তুবিদ্যা ও জেনেটিক্স — বায়োলজির সকল গুরুত্বপূর্ণ বিষয়ে প্রমাণিত দক্ষতা নিয়ে ২০১৮ সাল থেকে শিক্ষাদান।",
              },
              {
                icon: Target,
                title: "Personalized Learning",
                description:
                  "প্রতিটি শিক্ষার্থীর শেখার ধরন, গতি এবং নির্দিষ্ট শিক্ষাগত প্রয়োজন অনুযায়ী সাজানো শিক্ষাপদ্ধতি।",
              },
              {
                icon: TrendingUp,
                title: "Proven Results",
                description:
                  "কার্যকর শিক্ষাপদ্ধতির মাধ্যমে শিক্ষার্থীদের গ্রেড উন্নত করা, আত্মবিশ্বাস গড়ে তোলা এবং বায়োলজির প্রতি সত্যিকারের ভালোবাসা তৈরিতে সহায়তা।",
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
                        <span className="text-hr-green-toxic">অভিজ্ঞ</span> শিক্ষক
                      </>
                    ) : feature.title === "Personalized Learning" ? (
                      <>
                        ব্যক্তিগত <span className="text-hr-green-toxic">শিক্ষাপদ্ধতি</span>
                      </>
                    ) : (
                      <>
                        <span className="text-hr-green-toxic">প্রমাণিত</span> ফলাফল
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