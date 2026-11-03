import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../src/lib/env";
import { createRoutineSchema } from "../src/lib/validation/content";
import { Routine } from "../src/models/routine.model";

/**
 * One-off: loads the routine that used to be hard-coded on the /routine page.
 * Does nothing if any routine already exists, so it is safe to re-run.
 *
 *   npm run seed:routines
 */
const INITIAL_ROUTINES = [
  {
    classTitle: "নবম শ্রেণি",
    icon: "BookOpen",
    scheduleGroups: [
      {
        days: "শনি, সোম, বুধ",
        timeSlots: [
          { time: "সকাল ৮:০০ - ৯:০০", variant: "blue" },
          { time: "সকাল ১০:০০ - ১১:০০", variant: "blue" },
        ],
      },
      {
        days: "রবি, মঙ্গল, বৃহস্পতি",
        timeSlots: [{ time: "সন্ধ্যা ৬:০০ - ৭:০০", variant: "rose" }],
      },
    ],
  },
  {
    classTitle: "দশম শ্রেণি",
    icon: "GraduationCap",
    scheduleGroups: [
      {
        days: "শনি, সোম, বুধ",
        timeSlots: [
          { time: "সকাল ৯:০০ - ১০:০০", variant: "blue" },
          { time: "বিকাল ৪:০০ - ৫:০০", variant: "teal" },
          { time: "সন্ধ্যা ৬:০০ - ৭:০০", variant: "rose" },
        ],
      },
      {
        days: "রবি, মঙ্গল, বৃহস্পতি",
        timeSlots: [{ time: "সকাল ৮:০০ - ৯:০০", variant: "blue" }],
      },
    ],
  },
];

async function main() {
  await mongoose.connect(env.mongoUri);

  const existing = await Routine.countDocuments();
  if (existing > 0) {
    console.log(`Skipped: ${existing} routine(s) already exist.`);
  } else {
    // Same validation as the API, so seeded data can't drift from what admins can save.
    const docs = INITIAL_ROUTINES.map((routine) => createRoutineSchema.parse(routine));
    // Lists are newest first, so insert in reverse to keep নবম before দশম on the page.
    for (const doc of [...docs].reverse()) await Routine.create(doc);
    console.log(`Seeded ${docs.length} routine(s).`);
  }

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
