"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  description?: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/hero.gif",
    title: "Biology Classroom Session",
    description: "Interactive learning session with students",
  },
  {
    id: 2,
    src: "/hero1.gif",
    title: "Practical Lab Work",
    description: "Hands-on biology experiments",
  },
  {
    id: 3,
    src: "/hero2.gif",
    title: "Expert Instruction",
    description: "Learn from experienced instructors",
  },
  {
    id: 4,
    src: "/hero.gif",
    title: "Student Engagement",
    description: "Active participation in lessons",
  },
  {
    id: 5,
    src: "/hero1.gif",
    title: "Group Study Session",
    description: "Collaborative learning environment",
  },
  {
    id: 6,
    src: "/hero2.gif",
    title: "Online Classes",
    description: "Virtual biology education",
  },
  {
    id: 7,
    src: "/hero.gif",
    title: "Exam Preparation",
    description: "Comprehensive test preparation",
  },
  {
    id: 8,
    src: "/hero1.gif",
    title: "Research Projects",
    description: "Scientific exploration and discovery",
  },
  {
    id: 9,
    src: "/hero2.gif",
    title: "Academic Excellence",
    description: "Achieving great results together",
  },
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
          Our <span className="text-hr-green-toxic">Gallery</span>
        </h1>
        <p className="text-hr-fiord max-w-2xl mx-auto font-hr-500">
          Explore moments from our biology education journey. Click on any
          image to view larger.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item, index) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer relative overflow-hidden rounded-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hr-black/80 via-hr-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-hr-white font-hr-600 text-lg">
                    {item.title}
                  </h3>
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
                  className="object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-hr-white font-hr-700 text-xl mb-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-hr-fiord font-hr-500">
                    {item.description}
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default GalleryPageContainer;
