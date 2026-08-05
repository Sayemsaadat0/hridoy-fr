"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";

// Dynamically import ResponsiveMasonry with ssr: false and a skeleton loading state
const ResponsiveMasonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.ResponsiveMasonry),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-hr-white/5 border border-hr-white/10 rounded-xl h-64 w-full"
          />
        ))}
      </div>
    ),
  }
);

// Dynamically import Masonry with ssr: false
const Masonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.default),
  { ssr: false }
);

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  description?: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/g/1.jpg",
    title: "বায়োলজি লেকচার সেশন",
    description: "মৌলিক জৈবিক নীতিগুলোর ওপর আকর্ষণীয় ক্লাসরুম শিক্ষাদান।"
  },
  {
    id: 2,
    src: "/g/2.jpg",
    title: "ইন্টারেক্টিভ আলোচনা",
    description: "জৈবিক তত্ত্ব ও বৈজ্ঞানিক ধারণা নিয়ে শিক্ষার্থীদের সক্রিয় আলোচনা।"
  },
  {
    id: 3,
    src: "/g/3.jpg",
    title: "প্র্যাকটিক্যাল ল্যাবরেটরি",
    description: "হাতে-কলমে পরীক্ষামূলক শিক্ষা এবং টিস্যুর মাইক্রোস্কোপিক বিশ্লেষণ।"
  },
  {
    id: 4,
    src: "/g/4.jpg",
    title: "কোষ বিভাজন অধ্যয়ন",
    description: "মাইক্রোস্কোপের নিচে মাইটোসিস ও মিয়োসিসের আশ্চর্য জগৎ অনুসন্ধান।"
  },
  {
    id: 5,
    src: "/g/5.jpg",
    title: "স্টুডেন্ট মেন্টরশিপ",
    description: "শিক্ষাগত উৎকর্ষতা ও পরীক্ষার কৌশলে ব্যক্তিগত দিকনির্দেশনা।"
  },
  {
    id: 6,
    src: "/g/6.jpg",
    title: "বিস্তারিত ডায়াগ্রাম",
    description: "সমৃদ্ধ ভিজ্যুয়াল উপকরণের মাধ্যমে অ্যানাটমি ও জটিল জৈবিক পথ শেখা।"
  },
  {
    id: 7,
    src: "/g/7.jpg",
    title: "মানসম্পন্ন নোট",
    description: "জটিল বায়োলজি টপিক সহজ করার জন্য প্রস্তুত করা সুসংগঠিত নোট।"
  },
  {
    id: 8,
    src: "/g/8.jpg",
    title: "নিবেদিত পড়ার সময়",
    description: "কঠিন জৈবিক সিস্টেম আয়ত্ত করতে ক্লাসরুমে একাগ্রতা ও নিষ্ঠা।"
  },
  {
    id: 9,
    src: "/g/9.jpg",
    title: "গ্রুপ লার্নিং সেশন",
    description: "পারস্পরিক শেখা ও সহযোগিতা বৃদ্ধিতে সম্মিলিত পড়ার আসর।"
  },
  {
    id: 10,
    src: "/g/10.jpg",
    title: "সাপ্তাহিক মূল্যায়ন",
    description: "অগ্রগতি পর্যবেক্ষণ ও ধারণাগত স্পষ্টতা বৃদ্ধিতে নিয়মিত মূল্যায়ন।"
  },
  {
    id: 11,
    src: "/g/11.jpg",
    title: "অ্যানাটমি ওয়ার্কশপ",
    description: "মানব অঙ্গ-প্রত্যঙ্গ ও শারীরবৃত্তীয় কার্যকারিতার গভীর পাঠ।"
  },
  {
    id: 12,
    src: "/g/12.jpg",
    title: "মাইক্রোস্কোপ পরীক্ষা",
    description: "উদ্ভিদ টিস্যু, কোষের গঠন এবং কোষীয় গতিবিদ্যা পরীক্ষা।"
  },
  {
    id: 13,
    src: "/g/13.jpg",
    title: "সন্দেহ নিরসন সেশন",
    description: "প্রশ্নের সমাধান এবং সিলেবাসের কঠিন টপিক স্পষ্ট করতে ব্যক্তিগত মনোযোগ।"
  },
  {
    id: 15,
    src: "/g/15.jpg",
    title: "বোর্ড পরীক্ষার প্রস্তুতি",
    description: "গুরুত্বপূর্ণ বায়োলজি পরীক্ষার জন্য নির্দিষ্ট কৌশল ও নিবিড় রিভিউ ক্লাস।"
  },
  {
    id: 16,
    src: "/g/16.jpg",
    title: "ইন্টারেক্টিভ স্লাইড উপস্থাপনা",
    description: "জটিল প্রক্রিয়া সহজবোধ্য করতে আধুনিক ভিজ্যুয়াল প্রযুক্তির ব্যবহার।"
  },
  {
    id: 17,
    src: "/g/17.jpg",
    title: "জেনেটিক্স ও বংশগতি ক্লাস",
    description: "DNA গঠন, বংশগতির ধারা এবং আধুনিক জেনেটিক কোড বোঝা।"
  },
  {
    id: 18,
    src: "/g/18.jpg",
    title: "উদ্ভিদ জগৎ অনুসন্ধান",
    description: "উদ্ভিদের বৈচিত্র্য, শ্রেণিবিন্যাস এবং অ্যানাটমি অধ্যয়ন।"
  },
  {
    id: 19,
    src: "/g/19.jpg",
    title: "পিয়ার-টু-পিয়ার ইন্টারঅ্যাকশন",
    description: "সহযোগিতামূলক শিক্ষাগত বুদ্ধিমত্তা বাড়াতে ধারণা ও সমাধানের আদান-প্রদান।"
  },
  {
    id: 20,
    src: "/g/20.jpg",
    title: "কনসেপ্ট ম্যাপিং",
    description: "জটিল ইকোলজিক্যাল ও জৈবিক সিস্টেমের সম্পর্ক ভিজ্যুয়ালাইজ করা।"
  },
  {
    id: 21,
    src: "/g/21.jpg",
    title: "শিক্ষাগত সাফল্য",
    description: "মাইলফলক, উচ্চ স্কোর এবং শিক্ষার্থীদের অসাধারণ পারফরম্যান্স উদযাপন।"
  },
  {
    id: 22,
    src: "/g/22.jpg",
    title: "রিভিশন ওয়ার্কশিট",
    description: "পরীক্ষার পূর্ণাঙ্গ প্রস্তুতির জন্য অনুশীলনী শিট সমাধান।"
  },
  {
    id: 23,
    src: "/g/23.jpg",
    title: "অলিম্পিয়াড প্রস্তুতি",
    description: "প্রতিযোগিতামূলক বায়োলজি পরীক্ষার জন্য উন্নত শিক্ষা মডিউল।"
  },
  {
    id: 24,
    src: "/g/24.jpg",
    title: "সক্রিয় প্রশ্নোত্তর সেশন",
    description: "শিক্ষার্থীদের সতর্ক রাখতে প্রাণবন্ত ও দ্রুতগতির প্রশ্নোত্তর।"
  },
  {
    id: 25,
    src: "/g/25.jpg",
    title: "ল্যাবরেটরি সেরা অনুশীলন",
    description: "বৈজ্ঞানিক যন্ত্রপাতির নিরাপত্তা, সতর্কতা ও সঠিক ব্যবহার শেখা।"
  },
  {
    id: 26,
    src: "/g/26.jpg",
    title: "দৈনিক মূল্যায়ন ফিডব্যাক",
    description: "দুর্বল বিষয়গুলো চিহ্নিত ও উন্নত করতে কুইজের ওপর ব্যক্তিগত ফিডব্যাক।"
  },
  {
    id: 27,
    src: "/g/27.jpg",
    title: "রিদয় স্যার বায়োলজির সাফল্য",
    description: "পরবর্তী প্রজন্মের শিক্ষার্থীদের মেডিকেল ও বিজ্ঞানের স্বপ্ন পূরণে সহায়তা।"
  }
];

const GalleryPageContainer = () => {
  return (
    <div className="hr-container py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 lg:mb-16"
      >
        <h1 className="text-hr-regular-32 md:text-hr-regular-48 text-hr-white font-hr-800 mb-4">
          আমাদের <span className="text-hr-green-toxic">গ্যালারি</span>
        </h1>
        <p className="text-hr-fiord max-w-2xl mx-auto font-hr-500">
          আমাদের বায়োলজি শিক্ষার যাত্রার মুহূর্তগুলো দেখুন। হাই রেজোলিউশনে
          দেখতে কোনো ছবিতে ক্লিক করুন।
        </p>
      </motion.div>

      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3 }}
      >
        <Masonry gutter="24px">
          {galleryItems.map((item, index) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (index % 12) * 0.05 }}
                  className="group cursor-pointer relative overflow-hidden rounded-xl border border-hr-white/10 bg-hr-black/30 backdrop-blur-sm shadow-md hover:shadow-hr-green-toxic/5 hover:border-hr-green-toxic/30 transition-all duration-300"
                >
                  <div className="relative overflow-hidden w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    {/* Subtle aesthetic overlay on hover */}
                    <div className="absolute inset-0 bg-hr-green-toxic/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-hr-black border-hr-white/20 p-0 overflow-hidden">
                <DialogTitle className="sr-only">{item.title}</DialogTitle>
                <div className="relative aspect-video w-full">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-contain"
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    );
  };
  
  export default GalleryPageContainer;


