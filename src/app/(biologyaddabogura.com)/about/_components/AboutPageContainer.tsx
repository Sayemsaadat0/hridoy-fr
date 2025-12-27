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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
        </div>
      </section>


      {/* Section 3: We make sure your idea & creation delivered properly */}
      <section className="relative py-10 lg:py-16">
        <div className="hr-container">
          <h2
            className="text-hr-white font-hr-800 mb-6 lg:mb-8 text-center lg:text-left"
            style={{ fontSize: "var(--text-hr-regular-40)" }}
          >
            We make sure your <span className="text-hr-green-toxic">idea & creation</span> delivered properly
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <p
              className="text-hr-gray font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-16)" }}
            >
              Pellentesque mollis urna vel semper egestas. Duis ac dictum lacus.
              Sed sagittis non nunc ac malesuada. Quisque ut eleifend urna.
              Etiam nec porttitor erat, vel ullamcorper erat. Fusce euismod
              ipsum eget nunc pulvinar feugiat.
            </p>
            <p
              className="text-hr-gray font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-16)" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: We empower small business owners */}
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
                    alt="Business owner"
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
                    &quot;Making an impact, together&quot;
                  </p>
                  <p
                    className="text-hr-gray font-hr-500"
                    style={{ fontSize: "var(--text-hr-regular-14)" }}
                  >
                    Biology Adda Founder
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
                We <span className="text-hr-green-toxic">empower</span> small business owners
              </h2>
              <p
                className="text-hr-gray font-hr-400 leading-relaxed"
                style={{ fontSize: "var(--text-hr-regular-16)" }}
              >
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>

              {/* Quote */}
              <div className="relative pl-6 ">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-hr-green-toxic/30" />
                <p
                  className="text-hr-gray font-hr-400 leading-relaxed italic"
                  style={{ fontSize: "var(--text-hr-regular-16)" }}
                >
                  &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: We help business to grow faster and bigger */}
      <section className="relative py-10 lg:py-16">
        <div className="hr-container">
          <div className="text-center mb-8 lg:mb-12">
            <h2
              className="text-hr-white font-hr-800 mb-6"
              style={{ fontSize: "var(--text-hr-regular-40)" }}
            >
              We help business to <span className="text-hr-green-toxic">grow faster</span> and bigger
            </h2>
            <p
              className="text-hr-gray max-w-2xl mx-auto font-hr-400 leading-relaxed"
              style={{ fontSize: "var(--text-hr-regular-18)" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Feature Blocks */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Users,
                title: "Professional Team",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
              },
              {
                icon: Target,
                title: "Target Oriented",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
              },
              {
                icon: TrendingUp,
                title: "Success Guarantee",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
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
                    {feature.title === "Professional Team" ? (
                      <>
                        <span className="text-hr-green-toxic">Professional</span> Team
                      </>
                    ) : feature.title === "Target Oriented" ? (
                      <>
                        Target <span className="text-hr-green-toxic">Oriented</span>
                      </>
                    ) : (
                      <>
                        <span className="text-hr-green-toxic">Success</span> Guarantee
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