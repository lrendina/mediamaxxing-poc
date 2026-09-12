import { WHITE_LABEL_PAGE } from "@/content/creator/ui";
import { EarningsIcon, ListIcon, PlusIcon, SparkleIcon, WalletIcon } from "./app-icons";
import { FeatureListCard } from "./FeatureListCard";
import { PrototypeButton } from "./PrototypeButton";

const featureIcon = {
  list: ListIcon,
  rate: EarningsIcon,
  payout: WalletIcon,
  plus: PlusIcon,
} as const;

/* /creator/white-label — marketing content inside the app shell. Centred
   h1 and lede at ~620px is the observed layout and the one place in the
   app where centred text is right: it is a landing page, and it is
   living inside the product's own shell. That is the thesis, verbatim. */
export function WhiteLabelScreen() {
  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-action-sunk text-action px-3 py-1 text-[13px] font-medium">
        <SparkleIcon aria-hidden width={14} height={14} />
        {WHITE_LABEL_PAGE.badge}
      </span>

      <div className="flex flex-col items-center text-center gap-3 max-w-[620px]">
        <h1 className="font-display text-[48px] sm:text-[56px] leading-[0.98]">{WHITE_LABEL_PAGE.headline}</h1>
        <p className="text-[17px] text-muted leading-[1.5]">{WHITE_LABEL_PAGE.lede}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-[760px]">
        {WHITE_LABEL_PAGE.features.map((f) => {
          const Icon = featureIcon[f.icon as keyof typeof featureIcon];
          return (
            <FeatureListCard
              key={f.title}
              icon={<Icon width={20} height={20} />}
              title={f.title}
              body={f.body}
            />
          );
        })}
      </div>

      <PrototypeButton tone="action">
        <SparkleIcon aria-hidden width={16} height={16} />
        {WHITE_LABEL_PAGE.apply}
      </PrototypeButton>
    </div>
  );
}
