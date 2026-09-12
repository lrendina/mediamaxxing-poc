import { CAMPAIGN_DETAIL } from "@/content/creator/ui";
import { renderMarkdown } from "@/lib/markdown";
import { ExternalLinkIcon, WarningIcon } from "./app-icons";

/* Amber-bordered card: warning icon, title, read-carefully line, "Open in
   Notion" external link, then the long-form body as real prose. */
export function GuidelinesPanel({
  markdown,
  notionUrl,
}: {
  markdown: string;
  notionUrl: string;
}) {
  return (
    <section
      aria-labelledby="guidelines-heading"
      className="rounded-[var(--radius-card)] bg-surface border-2 border-warn overflow-hidden"
    >
      <div className="flex flex-wrap items-center gap-3 bg-warn text-surface-dark px-4 py-3">
        <WarningIcon aria-hidden width={22} height={22} strokeWidth={2} className="shrink-0" />
        <div className="flex-1 min-w-[12rem] flex flex-col leading-tight">
          <h2 id="guidelines-heading" className="font-display-sm text-[20px]">
            {CAMPAIGN_DETAIL.guidelines.title}
          </h2>
          <p className="text-[13px] font-medium opacity-80">{CAMPAIGN_DETAIL.guidelines.readCarefully}</p>
        </div>
        <a
          href={notionUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 min-h-9 px-3.5 rounded-full bg-surface-dark text-ink-inverse text-[13px] font-semibold hover:opacity-90"
        >
          {CAMPAIGN_DETAIL.guidelines.openNotion}
          <ExternalLinkIcon aria-hidden width={14} height={14} />
        </a>
      </div>
      <div className="flex flex-col gap-3 p-4 md:p-5 max-w-[68ch]">
        {renderMarkdown(markdown, { imageLabel: CAMPAIGN_DETAIL.guidelines.imageMissing })}
      </div>
    </section>
  );
}
