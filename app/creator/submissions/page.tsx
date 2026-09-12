import type { Metadata } from "next";
import { SubmissionsScreen } from "@/components/creator/SubmissionsScreen";

export const metadata: Metadata = {
  title: "Submissions — Creator app — MediaMaxxing",
};

export default function SubmissionsPage() {
  return <SubmissionsScreen />;
}
