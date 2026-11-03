"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface HomeFaq {
  id: string;
  question: string;
  answer: string;
}

const HomeFAQ = ({ faqs }: { faqs: HomeFaq[] }) => {
  if (faqs.length === 0) return null;

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
                    সচরাচর জিজ্ঞাসা
                  </span>
                </div>
              </div>

              {/* Heading */}
              <div>
                <h2 className=" mb-4 text-hr-regular-32 md:text-hr-regular-60 text-hr-white tracking-tight leading-[0.95] font-hr-800">
                  <span className="text-hr-green-toxic">FAQ</span>
                </h2>
                <p
                  className="text-hr-gray lg:max-w-lg font-hr-500 leading-relaxed"
                  style={{ fontSize: "var(--text-hr-regular-18)" }}
                >
                  আমাদের কোর্স, ভর্তি প্রক্রিয়া এবং শেখার অভিজ্ঞতা সম্পর্কে
                  জেনে নিন।
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - FAQ Accordion */}
          <div className="pb-10">
            <Accordion type="single" collapsible className="space-y-4 pb-3">
              {faqs.map((faq) => (
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
