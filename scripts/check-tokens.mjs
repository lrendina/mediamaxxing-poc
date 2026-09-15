#!/usr/bin/env node
/* check:tokens — the structural half of DESIGN-TOKENS.md.
 *
 * Fails the run, marketing surface only:
 *   - hex colours in .ts/.tsx
 *   - any radius utility but `rounded`, `rounded-full` and `rounded-none`
 *   - any shadow utility but `shadow-1`, `shadow-2` and `shadow-none`
 *   - Tailwind palette colours, and the legacy token names the creator app
 *     still defines
 *
 * Reported, never fails:
 *   - spacing off the 8px scale, until the Phase 3 sweep
 *   - everything in the creator app, which keeps its own .creator-surface
 *     tokens until Phase 9
 *
 * `--summary` hides the per-line spacing report.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "components", "lib"];
const CREATOR = [
  /^app\/creator\//,
  /^components\/creator\//,
  // Shared files that only the app's shell renders.
  /^components\/(SidebarNavItem|MobileTabBar|SurfaceSwitch)\.tsx$/,
  /^lib\/(markdown\.tsx|brand-art\.ts)$/,
];

const SPACING_PX = new Set([0, 8, 16, 24, 32, 48, 64, 96, 128]);
const LAYOUT_VARS = new Set(["[var(--gutter)]", "[var(--section-pad)]"]);

const SIDES = "ss|se|ee|es|tl|tr|br|bl|s|e|t|r|b|l";
const RADIUS = new RegExp(`^rounded(?:-(?:${SIDES}))?(?:-(.+))?$`);
const SHADOW = /^shadow(?:-(.+))?$/;
const SPACING = /^(?:p[xytrblse]?|m[xytrblse]?|gap(?:-[xy])?|space-[xy])-(.+)$/;
const COLOR_UTIL =
  /^(?:bg|text|border(?:-[xytrblse])?|ring(?:-offset)?|fill|stroke|from|via|to|outline|decoration|divide|placeholder|caret|accent)-(.+?)(?:\/[\w.[\]]+)?$/;
const PALETTE =
  /^(?:white|black|(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3})$/;
const LEGACY_COLOR =
  /^(?:lime|border-strong|on-pastel|on-art|money-ink|status(?:-sunk)?|live|panel|payout|canvas-alt|rank-[a-z]+(?:-sunk)?)$/;
const LEGACY_VAR =
  /var\(--(?:radius-(?:card|control|tile)|shadow-(?:lift|pop)|lime|border-strong|on-pastel|on-art|money-ink|status(?:-sunk)?|live|panel|payout|canvas-alt|topnav|feed-max|rail-left|rail-right|text-(?:xs|sm|md|lg|xl|2xl))\)/g;
const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])/g;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walk(path);
    return /\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

/* Blank out comments but keep line numbers, so prose like "no shadow at
   rest" never reads as a class. */
function stripComments(source) {
  const blank = (match) => match.replace(/[^\n]/g, " ");
  return source
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/(^|\s)\/\/.*$/gm, blank);
}

/* Split a line into utility names with variants (`md:`, `hover:`) and the
   important/negative markers removed. Colons inside [arbitrary] values
   don't count as variant separators. */
function utilities(line) {
  return line
    .split(/[\s"'`{}]+/)
    .map((raw) => {
      let depth = 0;
      let cut = -1;
      for (let i = 0; i < raw.length; i++) {
        if (raw[i] === "[") depth++;
        else if (raw[i] === "]") depth--;
        else if (raw[i] === ":" && depth === 0) cut = i;
      }
      return raw.slice(cut + 1).replace(/^!|!$/g, "").replace(/^-/, "");
    })
    .filter(Boolean);
}

function spacingPx(value) {
  if (value === "px") return 1;
  if (/^\d+(\.\d+)?$/.test(value)) return Number(value) * 4;
  const px = value.match(/^\[(\d+(?:\.\d+)?)px\]$/);
  return px ? Number(px[1]) : null;
}

function check(file) {
  const findings = [];
  const add = (line, rule, match, hard) => findings.push({ file, line, rule, match, hard });

  stripComments(readFileSync(file, "utf8"))
    .split("\n")
    .forEach((text, index) => {
      const line = index + 1;
      for (const m of text.matchAll(HEX)) add(line, "hex colour", m[0], true);
      for (const m of text.matchAll(LEGACY_VAR)) add(line, "legacy token", m[0], true);

      for (const util of utilities(text)) {
        const radius = util.match(RADIUS);
        if (radius && radius[1] && !["full", "none"].includes(radius[1])) {
          add(line, "radius — use rounded or rounded-full", util, true);
          continue;
        }
        const shadow = util.match(SHADOW);
        if (shadow && !["1", "2", "none"].includes(shadow[1])) {
          add(line, "shadow — use shadow-1 or shadow-2", util, true);
          continue;
        }
        const color = util.match(COLOR_UTIL);
        if (color && PALETTE.test(color[1])) {
          add(line, "Tailwind palette colour", util, true);
          continue;
        }
        if (color && LEGACY_COLOR.test(color[1])) {
          add(line, "legacy token", util, true);
          continue;
        }
        const spacing = util.match(SPACING);
        if (spacing) {
          const value = spacing[1];
          if (value === "auto" || LAYOUT_VARS.has(value)) continue;
          const px = spacingPx(value);
          if (px === null) {
            if (value.startsWith("[")) add(line, "spacing — arbitrary value", util, false);
          } else if (px === 4) {
            add(line, "spacing — 4px, pills and icon gaps only", util, false);
          } else if (!SPACING_PX.has(px)) {
            add(line, `spacing — ${px}px is off the 8px scale`, util, false);
          }
        }
      }
    });

  return findings;
}

const summaryOnly = process.argv.includes("--summary");
const files = ROOTS.flatMap(walk).sort();
const isCreator = (file) => CREATOR.some((re) => re.test(file));

const marketing = files.filter((f) => !isCreator(f)).flatMap(check);
const creator = files.filter(isCreator).flatMap(check);

const hard = marketing.filter((f) => f.hard);
const spacing = marketing.filter((f) => !f.hard);
const print = (f) => console.log(`    ${f.file}:${f.line}  ${f.match}  (${f.rule})`);

console.log("check:tokens — marketing surface");
if (hard.length) {
  console.log(`  ✗ ${hard.length} hard violation${hard.length === 1 ? "" : "s"}`);
  hard.forEach(print);
} else {
  console.log("  ✓ colour, radius and shadow rules hold");
}
console.log(`  • ${spacing.length} spacing value${spacing.length === 1 ? "" : "s"} to review — reported until the Phase 3 sweep`);
if (!summaryOnly) spacing.forEach(print);

const creatorHard = creator.filter((f) => f.hard).length;
const creatorFiles = new Set(creator.map((f) => f.file)).size;
console.log("\ncheck:tokens — creator app (own tokens until Phase 9, never fails)");
console.log(`  • ${creatorHard} rule hits and ${creator.length - creatorHard} spacing values across ${creatorFiles} files`);

process.exitCode = hard.length ? 1 : 0;
