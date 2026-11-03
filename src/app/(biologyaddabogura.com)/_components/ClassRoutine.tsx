import React from "react";
import { BookOpen, Clock, icons } from "lucide-react";
import type { RoutineScheduleGroup, RoutineVariant } from "@/models/routine.constants";

export interface ClassRoutineItem {
  id: string;
  classTitle: string;
  /** Lucide icon component name, e.g. "BookOpen". */
  icon: string;
  scheduleGroups: RoutineScheduleGroup[];
}

const BADGE_STYLES: Record<RoutineVariant, string> = {
  blue: "bg-sky-500/10 text-sky-400 border border-sky-500/20 hover:bg-sky-500/20",
  rose: "bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20",
  teal: "bg-teal-500/10 text-teal-400 border border-teal-500/20 hover:bg-teal-500/20",
};

const BULLET_STYLES: Record<RoutineVariant, string> = {
  blue: "bg-sky-500 shadow-sky-500/50",
  rose: "bg-rose-500 shadow-rose-500/50",
  teal: "bg-teal-500 shadow-teal-500/50",
};


/** Weekly class routine cards. Data comes from the Routine API (managed in the admin panel). */
const ClassRoutine = ({ routines }: { routines: ClassRoutineItem[] }) => {
  return (
    <div className="relative overflow-hidden py-6">
      {/* Background gradients mirroring the premium site feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-hr-green-toxic/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 hr-container">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-hr-green-toxic/10 border border-hr-green-toxic/20 rounded-full backdrop-blur-sm mb-4">
            <div className="w-2 h-2 bg-hr-green-toxic rounded-full animate-pulse" />
            <span
              className="text-hr-green-toxic font-hr-600 tracking-wider uppercase"
              style={{ fontSize: "var(--text-hr-regular-12)" }}
            >
              ক্লাস সিডিউল
            </span>
          </div>
          <h2 className="mb-4 text-hr-regular-32 md:text-hr-regular-60 text-hr-white tracking-tight leading-[0.95] font-hr-800">
            সাপ্তাহিক <span className="text-hr-green-toxic">রুটিন</span>
          </h2>
          <p
            className="text-hr-gray max-w-2xl mx-auto font-hr-500 leading-relaxed"
            style={{ fontSize: "var(--text-hr-regular-18)" }}
          >
            নবম ও দশম শ্রেণির বায়োলজি ক্লাসের সাপ্তাহিক সিডিউল দেখে নিন।
          </p>
        </div>

        {/* Routine Grid Container */}
        <div className="max-w-4xl mx-auto">
          {routines.length === 0 ? (
            <p
              className="rounded-2xl border border-hr-white/10 bg-hr-green-dark/40 p-8 text-center text-hr-gray font-hr-500"
              style={{ fontSize: "var(--text-hr-regular-16)" }}
            >
              রুটিন শীঘ্রই প্রকাশ করা হবে।
            </p>
          ) : (
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {routines.map((item) => {
              // Rendered on the server, so the full icon set never reaches the browser.
              const IconComponent = icons[item.icon as keyof typeof icons] ?? BookOpen;

              return (
                <div
                  key={item.id}
                  className="group relative rounded-2xl border border-hr-white/10 bg-hr-green-dark/40 backdrop-blur-sm p-6 lg:p-8 hover:border-hr-green-toxic/30 transition-all hover:shadow-xl hover:shadow-hr-green-toxic/5 h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Card Title Header */}
                    <div className="flex items-center gap-3.5 mb-8">
                      <div className="p-3 bg-hr-green-toxic/10 text-hr-green-toxic rounded-xl transition-all duration-300 group-hover:scale-110">
                        <IconComponent className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <h3
                        className="text-hr-white font-hr-700 transition-colors group-hover:text-hr-green-toxic"
                        style={{ fontSize: "var(--text-hr-regular-22)" }}
                      >
                        {item.classTitle}
                      </h3>
                    </div>

                    {/* Schedule Groups */}
                    <div className="space-y-6">
                      {item.scheduleGroups.map((group, groupIdx) => {
                        // The group's bullet takes the colour of its first time slot.
                        const bulletVariant = group.timeSlots[0]?.variant ?? "blue";

                        return (
                          <div key={groupIdx} className="space-y-3">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-2 h-2 rounded-full shadow-[0_0_8px_1px] ${BULLET_STYLES[bulletVariant]}`}
                              />
                              <span
                                className="text-hr-white font-hr-600 tracking-wide"
                                style={{ fontSize: "var(--text-hr-regular-16)" }}
                              >
                                {group.days}
                              </span>
                            </div>

                            {/* Time Slots badges */}
                            <div className="flex flex-wrap gap-2.5 pl-4.5">
                              {group.timeSlots.map((slot, slotIdx) => (
                                <span
                                  key={slotIdx}
                                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs md:text-sm font-hr-600 rounded-full transition-all duration-300 cursor-default ${BADGE_STYLES[slot.variant]}`}
                                >
                                  <Clock className="w-3.5 h-3.5 stroke-[2]" />
                                  {slot.time}
                                </span>
                              ))}
                            </div>

                            {/* Divider if not the last item in the card */}
                            {groupIdx < item.scheduleGroups.length - 1 && (
                              <div className="border-t border-hr-white/5 pt-5 mt-5" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassRoutine;
