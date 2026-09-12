import type { ReactNode } from "react";

/* A deliberately small markdown renderer for the campaign guidelines body:
   h2, paragraphs, blockquote callouts, bullet lists, inline links, and
   images. No dependency (Phase 0 list is closed) and no HTML passthrough.
   Images render as a labelled gray block — we have none of the assets. */

type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "img"; alt: string };

function parseBlocks(src: string): Block[] {
  const lines = src.split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (line.startsWith("## ")) { blocks.push({ type: "h2", text: line.slice(3) }); i++; continue; }
    if (line.startsWith("> ")) { blocks.push({ type: "quote", text: line.slice(2) }); i++; continue; }
    const img = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (img) { blocks.push({ type: "img", alt: img[1] }); i++; continue; }
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) { items.push(lines[i].slice(2)); i++; }
      blocks.push({ type: "ul", items });
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(## |> |- |!\[)/.test(lines[i])) { para.push(lines[i]); i++; }
    blocks.push({ type: "p", text: para.join(" ") });
  }
  return blocks;
}

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <a
        key={k++}
        href={m[2]}
        target="_blank"
        rel="noreferrer"
        className="text-action underline underline-offset-2 hover:opacity-80"
      >
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function renderMarkdown(src: string, opts: { imageLabel: string }) {
  return parseBlocks(src).map((b, i) => {
    switch (b.type) {
      case "h2":
        return (
          <h2 key={i} className="text-[18px] font-medium leading-tight mt-6 first:mt-0">
            {b.text}
          </h2>
        );
      case "p":
        return (
          <p key={i} className="text-[15px] text-ink/85">
            {inline(b.text)}
          </p>
        );
      case "quote":
        return (
          <div
            key={i}
            className="rounded-[var(--radius-control)] bg-action-sunk border-l-[3px] border-action px-4 py-3 text-[15px]"
          >
            {inline(b.text)}
          </div>
        );
      case "ul":
        return (
          <ul key={i} className="list-disc pl-5 flex flex-col gap-1.5 text-[15px] text-ink/85">
            {b.items.map((it, j) => (
              <li key={j}>{inline(it)}</li>
            ))}
          </ul>
        );
      case "img":
        return (
          <div
            key={i}
            role="img"
            aria-label={b.alt}
            className="aspect-video w-full rounded-[var(--radius-control)] bg-surface-sunk border border-border flex items-center justify-center text-[13px] text-muted"
          >
            {opts.imageLabel}: {b.alt}
          </div>
        );
    }
  });
}
