export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: CourseLevel;
  duration: string; // e.g., "12 weeks"
  enrollmentCount: string | null; // e.g., "2.5K"
}

export interface CourseCardProps {
  course: Course;
}

