import type { Metadata } from "next";
import { RetainersScreen } from "@/components/creator/RetainersScreen";

export const metadata: Metadata = {
  title: "Retainers — Creator app — MediaMaxxing",
};

export default function RetainersPage() {
  return <RetainersScreen />;
}
