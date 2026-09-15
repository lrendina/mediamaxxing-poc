/* Compatibility alias. The proof feed and content/creators.ts both import
   `StatGrid` and its `Stat` type; both now resolve to StatRow, which is the
   same component under the name the design system uses. */
export { StatRow as StatGrid } from "./StatRow";
export type { Stat } from "./StatRow";
