import type { Metadata } from "next";
import { CampaignDetailScreen } from "@/components/creator/CampaignDetailScreen";
import { BRANDS } from "@/content/creator/brands";
import { OPENART_CAMPAIGNS } from "@/content/creator/campaigns";

export const metadata: Metadata = {
  title: "Campaign — Creator app — MediaMaxxing",
};

/* Only the OpenArt family has fixtures, so those are the only static
   paths. Anything else 404s from inside the screen. */
export function generateStaticParams() {
  return OPENART_CAMPAIGNS.map((c) => ({
    brand: BRANDS.find((b) => b.id === c.brandId)!.slug,
    campaign: c.slug,
  }));
}

export default async function CampaignDetailPage({
  params,
}: PageProps<"/creator/campaigns/[brand]/[campaign]">) {
  const { brand, campaign } = await params;
  return <CampaignDetailScreen brandSlug={brand} campaignSlug={campaign} />;
}
