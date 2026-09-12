"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import {
  fixturesFor,
  parseState,
  STATE_PARAM,
  type CreatorState,
} from "@/content/creator";
import type { CreatorFixtures } from "@/content/creator/types";

type Ctx = {
  state: CreatorState;
  fixtures: CreatorFixtures;
  /* Appends ?state=populated to in-app links so the fixture set survives
     navigation. Marketing links pass through untouched. */
  href: (path: string) => string;
  /* "Apply to join" on a locked brand card. Client-only — marks the brand
     joined for the rest of the session so it moves into My Brands. Lives
     here, above the routes, so it survives navigating into a detail view
     and back. Resets on reload; nothing is sent anywhere. */
  applyToBrand: (brandId: string) => void;
};

const CreatorStateContext = createContext<Ctx | null>(null);

/* Reads ?state= once per navigation and hands every screen the matching
   fixture set. Must sit under a <Suspense> boundary — useSearchParams
   bails static rendering out to the client below it. */
export function CreatorStateProvider({ children }: { children: ReactNode }) {
  const params = useSearchParams();
  const state = parseState(params.get(STATE_PARAM));
  /* Kept per fixture state so applying as a new creator doesn't leak into
     the populated set when the state switch flips. */
  const [applied, setApplied] = useState<Record<CreatorState, string[]>>({
    new: [],
    populated: [],
  });

  const value = useMemo<Ctx>(() => {
    const base = fixturesFor(state);
    const ids = applied[state];
    return {
      state,
      fixtures: ids.length
        ? {
            ...base,
            brands: base.brands.map((b) =>
              ids.includes(b.id) ? { ...b, joined: true } : b
            ),
          }
        : base,
      href: (path) =>
        state === "populated" && path.startsWith("/creator")
          ? `${path}${path.includes("?") ? "&" : "?"}${STATE_PARAM}=populated`
          : path,
      applyToBrand: (brandId) =>
        setApplied((prev) =>
          prev[state].includes(brandId)
            ? prev
            : { ...prev, [state]: [...prev[state], brandId] }
        ),
    };
  }, [state, applied]);

  return (
    <CreatorStateContext.Provider value={value}>
      {children}
    </CreatorStateContext.Provider>
  );
}

export function useCreator() {
  const ctx = useContext(CreatorStateContext);
  if (!ctx) {
    throw new Error("useCreator must be used inside CreatorStateProvider");
  }
  return ctx;
}
