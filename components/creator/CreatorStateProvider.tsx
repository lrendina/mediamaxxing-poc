"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
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
};

const CreatorStateContext = createContext<Ctx | null>(null);

/* Reads ?state= once per navigation and hands every screen the matching
   fixture set. Must sit under a <Suspense> boundary — useSearchParams
   bails static rendering out to the client below it. */
export function CreatorStateProvider({ children }: { children: ReactNode }) {
  const params = useSearchParams();
  const state = parseState(params.get(STATE_PARAM));

  const value = useMemo<Ctx>(
    () => ({
      state,
      fixtures: fixturesFor(state),
      href: (path) =>
        state === "populated" && path.startsWith("/creator")
          ? `${path}${path.includes("?") ? "&" : "?"}${STATE_PARAM}=populated`
          : path,
    }),
    [state]
  );

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
