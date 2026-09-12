import type { Course } from "@/content/creator/types";
import { COURSES_PAGE } from "@/content/creator/ui";
import { formatPercent } from "@/lib/format";
import { BookIcon, ClockIcon } from "./app-icons";
import { ProgressBar } from "./ProgressBar";

/* Numbered thumbnail block, display title, meta, progress. */
export function CourseCard({ course }: { course: Course }) {
  const fraction = course.lessonCount ? course.completedLessons / course.lessonCount : 0;
  const complete = course.completedLessons >= course.lessonCount;
  return (
    <article className="rounded-[var(--radius-card)] bg-surface border-2 border-border overflow-hidden flex flex-col transition hover:border-lime">
      <div
        role="img"
        aria-label={`${course.title} thumbnail`}
        className={`aspect-video flex items-end p-4 ${complete ? "bg-lime text-surface-dark" : "bg-surface-sunk text-ink"}`}
      >
        <span className="font-display text-[96px] leading-[0.8]">
          {String(course.order).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <h2 className="font-display-sm text-[24px]">{course.title}</h2>
        <div className="flex items-center gap-4 text-[12px] uppercase tracking-[0.08em] font-bold text-muted">
          <span className="inline-flex items-center gap-1.5">
            <BookIcon aria-hidden width={14} height={14} />
            {COURSES_PAGE.lessons(course.lessonCount)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon aria-hidden width={14} height={14} />
            {COURSES_PAGE.duration(course.durationMinutes)}
          </span>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-[13px] text-muted">
            {COURSES_PAGE.completed(course.completedLessons, course.lessonCount)}
          </span>
          <span className={`font-display text-[28px] ${complete ? "text-lime" : "text-ink"}`}>
            {formatPercent(fraction)}
          </span>
        </div>
        <ProgressBar
          value={course.completedLessons}
          max={course.lessonCount}
          tone={complete ? "money" : "action"}
          label={`${course.title} progress`}
          height="h-2"
        />
      </div>
    </article>
  );
}
