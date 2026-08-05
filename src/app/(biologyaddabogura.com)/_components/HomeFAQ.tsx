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
    question: "লোকেশন ও যোগাযোগের তথ্য কোথায় পাব?",
    answer:
      "রিদয় স্যার বায়োলজি বগুড়া সিটি কলেজের কাছে অবস্থিত। আমাদের সাথে যোগাযোগ করতে পারেন ফোনে: ০১৫১৮৩৯০৬৭৪ অথবা ইমেইলে: info@biologyaddabogura.com। আরও বিস্তারিত ও দিকনির্দেশনার জন্য আমাদের যোগাযোগ পেজ দেখুন।",
  },
  {
    id: "2",
    question: "এখন কী কী কোর্স চলছে? আমরা কোন কোন সেক্টর কভার করি?",
    answer:
      "আমরা বর্তমানে ইন্টার ১ম বর্ষ, ইন্টার ২য় বর্ষ, ৯ম-১০ম শ্রেণির বায়োলজি এবং ভর্তি পরীক্ষার প্রস্তুতির কোর্স অফার করি। আমাদের পূর্ণাঙ্গ কারিকুলাম বায়োলজির সকল গুরুত্বপূর্ণ টপিক কভার করে, যা শিক্ষার্থীদের শিক্ষাজীবনে এগিয়ে থাকতে সাহায্য করে।",
  },
  {
    id: "3",
    question: "কোন কোন শিক্ষাস্তর কভার করা হয়?",
    answer:
      "আমরা ইন্টার ১ম বর্ষ, ইন্টার ২য় বর্ষ, ৯ম-১০ম শ্রেণির বায়োলজি এবং ভর্তি পরীক্ষার প্রস্তুতির কোর্স কভার করি। আমাদের বিশেষজ্ঞ শিক্ষাদান এই সকল স্তরের শিক্ষার্থীদের বায়োলজির ধারণা আয়ত্ত করতে ও শিক্ষাগত লক্ষ্য পূরণে সাহায্য করে।",
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
