import type { Metadata } from "next";
import { EarningsScreen } from "@/components/creator/EarningsScreen";

export const metadata: Metadata = {
  title: "Earnings — Creator app — MediaMaxxing",
};

export default function EarningsPage() {
  return <EarningsScreen />;
}
