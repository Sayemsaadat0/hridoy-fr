import React from "react";
import CoursesPageContainer from "./_components/CoursesPageContainer";
import { getPublishedPrograms } from "@/lib/queries/public-content";
import { toCourse } from "@/lib/queries/public-mappers";

export const dynamic = "force-dynamic";

const Courses = async () => {
  const programs = await getPublishedPrograms();

  return (
    <div>
      <CoursesPageContainer courses={programs.map(toCourse)} />
    </div>
  );
};

export default Courses;
