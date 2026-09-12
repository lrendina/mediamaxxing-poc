import type { Course } from "@/content/creator/types";
import { COURSES_PAGE } from "@/content/creator/ui";
import { formatPercent } from "@/lib/format";
import { BookIcon, ClockIcon } from "./app-icons";
import { ProgressBar } from "./ProgressBar";

/* Thumbnail, "1. Essentials", meta row, "0 / 3 completed" with "0%",
   thin bar. The thumbnail is a labelled gray block — no asset. */
export function CourseCard({ course }: { course: Course }) {
  const fraction = course.lessonCount ? course.completedLessons / course.lessonCount : 0;
  const complete = course.completedLessons >= course.lessonCount;
  return (
    <article className="rounded-[var(--radius-card)] bg-surface border border-border overflow-hidden flex flex-col">
      <div
        role="img"
        aria-label={`${course.title} thumbnail`}
        className="aspect-video bg-surface-sunk flex items-center justify-center text-[13px] text-muted"
      >
        {course.title}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-[15px] font-medium">
          {COURSES_PAGE.courseTitle(course.order, course.title)}
        </h2>
        <div className="flex items-center gap-3 text-[13px] text-muted">
          <span className="inline-flex items-center gap-1">
            <BookIcon aria-hidden width={14} height={14} />
            {COURSES_PAGE.lessons(course.lessonCount)}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon aria-hidden width={14} height={14} />
            {COURSES_PAGE.duration(course.durationMinutes)}
          </span>
        </div>
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-muted">
            {COURSES_PAGE.completed(course.completedLessons, course.lessonCount)}
          </span>
          <span className={`font-expanded ${complete ? "text-money" : "text-ink"}`}>
            {formatPercent(fraction)}
          </span>
        </div>
        <ProgressBar
          value={course.completedLessons}
          max={course.lessonCount}
          tone={complete ? "money" : "action"}
          label={`${course.title} progress`}
          height="h-1.5"
        />
      </div>
    </article>
  );
}
