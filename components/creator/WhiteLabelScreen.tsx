import { WHITE_LABEL_PAGE } from "@/content/creator/ui";
import { EarningsIcon, ListIcon, PlusIcon, SparkleIcon, WalletIcon } from "./app-icons";
import { PrototypeButton } from "./PrototypeButton";

const featureIcon = {
  list: ListIcon,
  rate: EarningsIcon,
  payout: WalletIcon,
  plus: PlusIcon,
} as const;

/* Marketing content inside the app: a lime block, a poster headline,
   four numbered feature cells, one black pill. */
export function WhiteLabelScreen() {
  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-[var(--radius-card)] bg-lime text-surface-dark p-6 md:p-10 flex flex-col gap-8">
        <span className="inline-flex self-start items-center gap-1.5 rounded-[6px] bg-surface-dark text-lime px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em]">
          <SparkleIcon aria-hidden width={12} height={12} />
          {WHITE_LABEL_PAGE.badge}
        </span>
        <h1 className="font-display text-[clamp(44px,8vw,120px)] max-w-[12ch]">
          {WHITE_LABEL_PAGE.headline}
        </h1>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="text-[18px] md:text-[20px] font-medium leading-[1.35] max-w-[36ch]">
            {WHITE_LABEL_PAGE.lede}
          </p>
          <PrototypeButton tone="dark" className="!bg-surface-dark !text-lime !min-h-14 !px-8 !text-[17px]">
            <SparkleIcon aria-hidden width={16} height={16} />
            {WHITE_LABEL_PAGE.apply}
          </PrototypeButton>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {WHITE_LABEL_PAGE.features.map((f, i) => {
          const Icon = featureIcon[f.icon as keyof typeof featureIcon];
          return (
            <div key={f.title} className="flex flex-col gap-5 rounded-[var(--radius-card)] bg-surface border-2 border-border p-5 md:p-6">
              <div className="flex items-start justify-between">
                <span className="font-display text-[56px] leading-[0.8] text-lime">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-surface-sunk">
                  <Icon width={20} height={20} />
                </span>
              </div>
              <h2 className="font-display-sm text-[24px]">{f.title}</h2>
              <p className="text-[15px] text-muted leading-[1.5]">{f.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
