import type { Course } from "./types";

/* Observed: one course, "1. Essentials", 3 lessons, 2m, 0 / 3 completed. */
export const COURSES_NEW: Course[] = [
  { id: "essentials", order: 1, title: "Essentials", lessonCount: 3, durationMinutes: 2, completedLessons: 0 },
];

/* Populated: the same course, finished. Only one course exists on the
   live app, so the populated grid is still one card. */
export const COURSES_ACTIVE: Course[] = [
  { id: "essentials", order: 1, title: "Essentials", lessonCount: 3, durationMinutes: 2, completedLessons: 3 },
];
