"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Brand } from "@/content/creator/types";
import { CAMPAIGNS_PAGE } from "@/content/creator/ui";
import { BrandCard } from "./BrandCard";
import { useCreator } from "./CreatorStateProvider";
import { FeaturedCampaignCard } from "./FeaturedCampaignCard";
import { MissionCard } from "./MissionCard";
import { PageHeader } from "./PageHeader";
import { SectionDisclosure } from "./SectionDisclosure";
import { WelcomeModal } from "./WelcomeModal";

/* /creator/campaigns — observed order: header, mission cards, "My Brands"
   disclosure (featured card for the accepted campaign, then joined brand
   cards), "Brands" disclosure (the grid). Cards in "Brands" are locked
   (not observed, per explicit request) — "Apply to join" moves the brand
   up into "My Brands" and unlocks its link into the detail view.

   ?welcome=1 (the "Get started" button's destination, see content/nav.ts)
   opens WelcomeModal over this page instead of routing to a separate
   /creator/welcome page — dismissing it just drops the query param. */
export function CampaignsScreen() {
  const { fixtures, applyToBrand } = useCreator();
  const { brands, campaigns, missions } = fixtures;
  /* The applied card unmounts from "Brands" as it moves, so its button
     can't hold focus; screen readers hear where it went instead. */
  const [announcement, setAnnouncement] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const showWelcome = searchParams.get("welcome") === "1";
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeWelcome = () => {
    dialogRef.current?.close();
    const params = new URLSearchParams(searchParams);
    params.delete("welcome");
    const query = params.toString();
    router.replace(`/creator/campaigns${query ? `?${query}` : ""}`);
  };

  useEffect(() => {
    if (showWelcome) dialogRef.current?.showModal();
  }, [showWelcome]);

  const mine = brands.filter((b) => b.joined);
  const others = brands.filter((b) => !b.joined);
  const accepted = campaigns.find((c) => c.status === "accepted");
  const acceptedBrand = accepted ? mine.find((b) => b.id === accepted.brandId) : undefined;

  const apply = (brand: Brand) => {
    applyToBrand(brand.id);
    setAnnouncement(CAMPAIGNS_PAGE.locked.moved(brand.name));
  };

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
          {mine.length === 0 ? (
            <p className="text-[13px] text-muted">{CAMPAIGNS_PAGE.locked.emptyMine}</p>
          ) : null}
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
            <BrandCard key={b.id} brand={b} onApply={() => apply(b)} />
          ))}
        </div>
      </SectionDisclosure>

      <p role="status" className="sr-only">
        {announcement}
      </p>

      <WelcomeModal dialogRef={dialogRef} profile={fixtures.profile} onClose={closeWelcome} />
    </div>
  );
}
