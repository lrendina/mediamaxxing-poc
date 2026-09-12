import type { Metadata } from "next";
import { CoursesScreen } from "@/components/creator/CoursesScreen";

export const metadata: Metadata = {
  title: "Courses — Creator app — MediaMaxxing",
};

export default function CoursesPage() {
  return <CoursesScreen />;
}
