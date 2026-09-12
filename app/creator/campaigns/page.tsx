import type { Metadata } from "next";
import { CampaignsScreen } from "@/components/creator/CampaignsScreen";

export const metadata: Metadata = {
  title: "Campaigns — Creator app — MediaMaxxing",
};

export default function CampaignsPage() {
  return <CampaignsScreen />;
}
