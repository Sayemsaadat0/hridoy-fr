"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faqData = [
  {
    id: "1",
    question: "What courses are available?",
    answer:
      "We offer a comprehensive range of biology courses including Molecular Biology, Cell Biology, Genetics & Evolution, and many more. All courses are designed by expert educators and researchers.",
  },
  {
    id: "2",
    question: "How long does it take to complete a course?",
    answer:
      "Course duration varies depending on the program. Beginner courses typically take 8 weeks, intermediate courses take 10 weeks, and advanced courses take 12 weeks. You can learn at your own pace.",
  },
  {
    id: "3",
    question: "Do I need prior biology knowledge?",
    answer:
      "No prior knowledge is required for our beginner courses. We offer courses for all levels - from complete beginners to advanced students. Each course clearly indicates its difficulty level.",
  },
  {
    id: "4",
    question: "Are the courses self-paced or scheduled?",
    answer:
      "Our courses are designed to be flexible. You can learn at your own pace while having access to scheduled live sessions with instructors for additional support and Q&A sessions.",
  },
  {
    id: "5",
    question: "What kind of support do I get?",
    answer:
      "You'll have access to expert instructors, interactive modules, virtual lab experiences, community forums, and personalized guidance to help you succeed in your biology education journey.",
  },
  {
    id: "6",
    question: "Can I get a certificate after completion?",
    answer:
      "Yes! Upon successful completion of any course, you'll receive a certificate that you can add to your portfolio or resume, demonstrating your commitment to biology education.",
  },
];

const HomeFAQ = () => {
  return (
    <div className="relative  overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 hr-container pb-5">
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side - Title Section */}
          <div className="text-center lg:text-left">
            <div className="space-y-6">
              {/* Badge */}
              <div>
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-hr-green-toxic/10 border border-hr-green-toxic/20 rounded-full backdrop-blur-sm">
                  <div className="w-2 h-2 bg-hr-green-toxic rounded-full" />
                  <span
                    className="text-hr-green-toxic font-hr-600"
                    style={{ fontSize: "var(--text-hr-regular-14)" }}
                  >
                    FAQ
                  </span>
                </div>
              </div>

              {/* Heading */}
              <div>
                <h2 className=" mb-4 text-hr-regular-32 md:text-hr-regular-60 text-hr-white tracking-tight leading-[0.95] font-hr-800">
                  Frequently Asked{" "}
                  <span className="text-hr-green-toxic">Questions</span>
                </h2>
                <p
                  className="text-hr-gray lg:max-w-lg font-hr-500 leading-relaxed"
                  style={{ fontSize: "var(--text-hr-regular-18)" }}
                >
                  Find answers to common questions about our courses, enrollment
                  process, and learning experience.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - FAQ Accordion */}
          <div className="pb-10">
            <Accordion type="single" collapsible className="space-y-4 pb-3">
              {faqData.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border border-hr-white/10 rounded-xl bg-hr-green-dark/50 backdrop-blur-sm px-6 py-2 hover:border-hr-green-toxic/30 transition-colors"
                >
                  <AccordionTrigger
                    className={cn(
                      "text-hr-white font-hr-600 hover:no-underline py-6 [&>svg]:text-hr-green-toxic [&>svg]:size-5"
                    )}
                    style={{ fontSize: "var(--text-hr-regular-18)" }}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-hr-gray font-hr-400 leading-relaxed pb-6"
                    style={{ fontSize: "var(--text-hr-regular-16)" }}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFAQ;
