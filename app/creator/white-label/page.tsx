import type { Metadata } from "next";
import { WhiteLabelScreen } from "@/components/creator/WhiteLabelScreen";

export const metadata: Metadata = {
  title: "Campaign White Label — Creator app — MediaMaxxing",
};

export default function WhiteLabelPage() {
  return <WhiteLabelScreen />;
}
