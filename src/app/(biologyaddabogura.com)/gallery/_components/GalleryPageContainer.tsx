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
    title: "Biology Lecture Session",
    description: "Engaging classroom instruction focusing on fundamental biological principles."
  },
  {
    id: 2,
    src: "/g/2.jpg",
    title: "Interactive Discussion",
    description: "Students actively discussing biological theories and scientific concepts."
  },
  {
    id: 3,
    src: "/g/3.jpg",
    title: "Practical Laboratory",
    description: "Hands-on experimental learning and microscopic analysis of tissues."
  },
  {
    id: 4,
    src: "/g/4.jpg",
    title: "Cell Division Study",
    description: "Exploring the wonders of mitosis and meiosis under the microscope."
  },
  {
    id: 5,
    src: "/g/5.jpg",
    title: "Student Mentorship",
    description: "One-on-one student guidance for academic excellence and exam strategies."
  },
  {
    id: 6,
    src: "/g/6.jpg",
    title: "Detailed Diagrams",
    description: "Learning anatomy and complex biological pathways through rich visual aids."
  },
  {
    id: 7,
    src: "/g/7.jpg",
    title: "Exemplary Notes",
    description: "Structured academic notes prepared to make complex biology topics easy."
  },
  {
    id: 8,
    src: "/g/8.jpg",
    title: "Dedicated Study Hour",
    description: "Focus and dedication in the classroom to master difficult biological systems."
  },
  {
    id: 9,
    src: "/g/9.jpg",
    title: "Group Learning Session",
    description: "Collaborative study circles promoting peer learning and mutual support."
  },
  {
    id: 10,
    src: "/g/10.jpg",
    title: "Weekly Assessment",
    description: "Regular evaluations to track progress and strengthen conceptual clarity."
  },
  {
    id: 11,
    src: "/g/11.jpg",
    title: "Anatomy Workshop",
    description: "Deep dive into human organ systems and physiological functions."
  },
  {
    id: 12,
    src: "/g/12.jpg",
    title: "Microscope Investigation",
    description: "Examining plant tissues, cell structure, and cellular dynamics."
  },
  {
    id: 13,
    src: "/g/13.jpg",
    title: "Doubt Clearing Session",
    description: "Personalized attention to resolve questions and clarify tricky syllabus topics."
  },
  {
    id: 15,
    src: "/g/15.jpg",
    title: "Board Exam Preparation",
    description: "Targeted strategy and intensive review classes for major biology examinations."
  },
  {
    id: 16,
    src: "/g/16.jpg",
    title: "Interactive Slide Presentation",
    description: "Utilizing modern visual technology to make complex processes digestible."
  },
  {
    id: 17,
    src: "/g/17.jpg",
    title: "Genetics & Heredity Class",
    description: "Understanding DNA structure, inheritance patterns, and modern genetic codes."
  },
  {
    id: 18,
    src: "/g/18.jpg",
    title: "Plant Kingdom Exploration",
    description: "Studying the diversity, classification, and anatomy of flora."
  },
  {
    id: 19,
    src: "/g/19.jpg",
    title: "Peer-to-Peer Interaction",
    description: "Exchanging ideas and solutions to boost cooperative academic intelligence."
  },
  {
    id: 20,
    src: "/g/20.jpg",
    title: "Concept Mapping",
    description: "Visualizing relationships between complex ecological and biological systems."
  },
  {
    id: 21,
    src: "/g/21.jpg",
    title: "Academic Achievement",
    description: "Celebrating milestones, high scores, and exceptional student performances."
  },
  {
    id: 22,
    src: "/g/22.jpg",
    title: "Revision Worksheets",
    description: "Solving comprehensive practice sheets designed for robust exam readiness."
  },
  {
    id: 23,
    src: "/g/23.jpg",
    title: "Olympiad Preparation",
    description: "Advanced learning modules for competitive biological science exams."
  },
  {
    id: 24,
    src: "/g/24.jpg",
    title: "Active Q&A Session",
    description: "Lively interaction and fast-paced questioning to keep students sharp."
  },
  {
    id: 25,
    src: "/g/25.jpg",
    title: "Laboratory Best Practices",
    description: "Learning safety, precision, and the correct handling of scientific apparatus."
  },
  {
    id: 26,
    src: "/g/26.jpg",
    title: "Daily Assessment Feedback",
    description: "Individual feedback on quizzes to pinpoint and build up weak areas."
  },
  {
    id: 27,
    src: "/g/27.jpg",
    title: "Biology Adda Success",
    description: "Empowering next-generation learners to achieve their medical and science dreams."
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
          Our <span className="text-hr-green-toxic">Gallery</span>
        </h1>
        <p className="text-hr-fiord max-w-2xl mx-auto font-hr-500">
          Explore moments from our biology education journey. Click on any
          image to view it in high resolution.
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


