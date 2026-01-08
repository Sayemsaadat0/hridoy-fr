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
    question: "Where is the location and contact info?",
    answer:
      "Biology adda Bogura is located near Bogura City College. You can reach us at phone: 01518390674 or email: info@biologyaddabogura.com. Visit our contact page for more details and directions.",
  },
  {
    id: "2",
    question: "What courses are running right now? What sector do we cover?",
    answer:
      "We currently offer courses for Inter 1st Year, Inter 2nd Year, Class 9-10 Biology, and Admission preparation. Our comprehensive curriculum covers all major biology topics to help students excel in their academic journey.",
  },
  {
    id: "3",
    question: "What educational levels do you cover?",
    answer:
      "We cover Inter 1st Year, Inter 2nd Year, Class 9-10 Biology, and Admission preparation courses. Our expert tutoring helps students at all these levels master biology concepts and achieve their academic goals.",
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
