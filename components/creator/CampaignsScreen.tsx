"use client";

import { CAMPAIGNS_PAGE } from "@/content/creator/ui";
import { BrandCard } from "./BrandCard";
import { useCreator } from "./CreatorStateProvider";
import { FeaturedCampaignCard } from "./FeaturedCampaignCard";
import { MissionCard } from "./MissionCard";
import { PageHeader } from "./PageHeader";
import { SectionDisclosure } from "./SectionDisclosure";

/* /creator/campaigns — observed order: header, mission cards, "My Brands"
   disclosure (featured card for the accepted campaign, then joined brand
   cards), "Brands" disclosure (the grid). */
export function CampaignsScreen() {
  const { fixtures } = useCreator();
  const { brands, campaigns, missions } = fixtures;

  const mine = brands.filter((b) => b.joined);
  const others = brands.filter((b) => !b.joined);
  const accepted = campaigns.find((c) => c.status === "accepted");
  const acceptedBrand = accepted ? brands.find((b) => b.id === accepted.brandId) : undefined;

  /* Every brand card links to a detail view. Only OpenArt's campaigns are
     built, so the other brands open OpenArt's Director Advanced detail —
     the shape is the same. Flagged as a prototype shortcut. */
  const detailHrefFor = (brandId: string) => {
    const own = campaigns.find((c) => c.brandId === brandId);
    const target = own ?? campaigns[1] ?? campaigns[0];
    const brand = brands.find((b) => b.id === target.brandId)!;
    return `/creator/campaigns/${brand.slug}/${target.slug}`;
  };

  return (
    <div className="flex flex-col gap-5 max-w-[var(--app-content-max)]">
      <PageHeader title={CAMPAIGNS_PAGE.title} subtitle={CAMPAIGNS_PAGE.subtitle} />

      {missions.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {missions.map((m) => (
            <MissionCard key={m.id} mission={m} />
          ))}
        </div>
      ) : null}

      <SectionDisclosure label={CAMPAIGNS_PAGE.myBrands} count={mine.length}>
        <div className="flex flex-col gap-3">
          {accepted && acceptedBrand ? (
            <FeaturedCampaignCard brand={acceptedBrand} campaign={accepted} />
          ) : null}
          {mine.filter((b) => b.id !== acceptedBrand?.id).length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {mine
                .filter((b) => b.id !== acceptedBrand?.id)
                .map((b) => (
                  <BrandCard key={b.id} brand={b} detailHref={detailHrefFor(b.id)} />
                ))}
            </div>
          ) : null}
        </div>
      </SectionDisclosure>

      <SectionDisclosure label={CAMPAIGNS_PAGE.brands} count={others.length}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {others.map((b) => (
            <BrandCard key={b.id} brand={b} detailHref={detailHrefFor(b.id)} />
          ))}
        </div>
      </SectionDisclosure>
    </div>
  );
}
