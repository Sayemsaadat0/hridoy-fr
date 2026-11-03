import React from "react";
import ClassRoutine from "../_components/ClassRoutine";
import { getPublishedRoutines } from "@/lib/queries/public-content";

// Routines are edited in the admin panel and must show up without a redeploy.
export const dynamic = "force-dynamic";

const RoutinePage = async () => {
  const routines = await getPublishedRoutines();

  return (
    <div className="mt-10 py-20">
      <ClassRoutine
        routines={routines.map(({ id, classTitle, icon, scheduleGroups }) => ({
          id,
          classTitle,
          icon,
          scheduleGroups,
        }))}
      />
    </div>
  );
};

export default RoutinePage;
