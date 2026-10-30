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

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  description?: string;
}


const GalleryPageContainer = ({ items }: { items: GalleryItem[] }) => {
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
          {items.map((item, index) => (
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


