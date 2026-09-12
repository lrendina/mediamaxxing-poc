import type { PayTier } from "@/content/creator/types";
import { CAMPAIGN_DETAIL } from "@/content/creator/ui";
import { formatRate, formatViews } from "@/lib/format";
import { LayersIcon } from "./app-icons";
import { IconTile } from "./IconTile";

/* "Pay Rate by Views" — layers icon, note, then one row per tier. The
   headline rate is the TOP tier, so the last row is the loud one. */
export function PayRateTable({ tiers }: { tiers: PayTier[] }) {
  return (
    <section
      aria-labelledby="pay-rate-heading"
      className="rounded-[var(--radius-card)] bg-surface border border-border p-4 flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        <IconTile tone="action" size="sm">
          <LayersIcon width={16} height={16} />
        </IconTile>
        <div className="flex flex-col leading-tight">
          <h2 id="pay-rate-heading" className="text-[15px] font-medium">
            {CAMPAIGN_DETAIL.payRate.title}
          </h2>
          <p className="text-[13px] text-muted">{CAMPAIGN_DETAIL.payRate.note}</p>
        </div>
      </div>
      <table className="w-full text-[15px]">
        <tbody>
          {tiers.map((t, i) => {
            const top = i === tiers.length - 1;
            return (
              <tr key={t.minViews} className="border-t border-border">
                <th scope="row" className="py-2.5 text-left font-normal text-ink/85">
                  {CAMPAIGN_DETAIL.payRate.range(
                    formatViews(t.minViews),
                    t.maxViews === null ? null : formatViews(t.maxViews)
                  )}
                </th>
                <td className={`py-2.5 text-right font-expanded ${top ? "text-money" : "text-ink"}`}>
                  {formatRate(t.rateCentsPerThousand)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
