"use client";

import { COURSES_PAGE } from "@/content/creator/ui";
import { CourseCard } from "./CourseCard";
import { useCreator } from "./CreatorStateProvider";
import { PageHeader } from "./PageHeader";

/* /creator/courses — one course exists; the grid is built anyway. */
export function CoursesScreen() {
  const { fixtures } = useCreator();
  return (
    <div className="flex flex-col gap-5 max-w-[var(--app-content-max)]">
      <PageHeader title={COURSES_PAGE.title} subtitle={COURSES_PAGE.subtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {fixtures.courses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );
}
