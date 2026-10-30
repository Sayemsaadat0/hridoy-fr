import type { PublicProgram } from "@/models/program.model";
import type { Course } from "@/app/(biologyaddabogura.com)/_components/types/course.types";

/** Program record → the `Course` shape the public course cards render. */
export function toCourse(program: PublicProgram): Course {
  return {
    id: program.id,
    title: program.title,
    description: program.description,
    thumbnail: program.thumbnail,
    level: program.level,
    duration: program.duration,
    enrollmentCount: program.enrollmentCount,
  };
}

/** Notice dates are calendar days stored as UTC midnight, e.g. "24 April 2026". */
export function formatNoticeDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
