"use client";

import Image from "next/image";

/* Placeholder content for Phase 2. Real values wire up in Phase 4 (content
   extraction) and Phase 5 (homepage assembly). */

const suggested = [
  { name: "Steven",   handle: "stee.ugc",          earnings: "$100,227", src: "/proof/creators/steven/dashboard.png"   },
  { name: "Jennifer", handle: "jennymakescontent", earnings: "$45,402",  src: "/proof/creators/jennifer/dashboard.png" },
  { name: "Brayden",  handle: "bray.codes",        earnings: "$42,225",  src: "/proof/creators/brayden/dashboard.png"  },
];

export function RightRail() {
  return (
    <aside
      aria-label="Complementary"
      className="
        hidden xl:flex sticky top-0 h-screen w-[300px]
        flex-col gap-4 px-4 py-5
        border-l border-ink/5 overflow-y-auto
      "
    >
      {/* Live counter — the money is the design. */}
      <div className="rounded-2xl bg-panel p-5 flex flex-col gap-1.5">
        <p className="text-[13px] text-muted">Paid to creators this month</p>
        <p className="text-[40px] font-expanded leading-none text-payout">
          $1,204,908
        </p>
        <p className="text-[13px] text-muted">Across 342 creators</p>
      </div>

      {/* Sign-in card. Non-functional — labelled as such. */}
      <div className="rounded-2xl border border-ink/10 p-5 flex flex-col gap-3">
        <p className="text-[15px] font-medium leading-tight">
          Ready to earn?
        </p>
        <p className="text-[13px] text-muted">
          Free to join. No résumé, no follower count.
        </p>
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="sr-only" htmlFor="rr-email">
            Email address
          </label>
          <input
            id="rr-email"
            type="email"
            placeholder="you@example.com"
            className="
              rounded-full px-4 py-2 min-h-11
              bg-canvas border border-ink/15
              text-[15px] placeholder:text-muted
            "
          />
          <button
            type="submit"
            className="
              rounded-full bg-ink text-canvas
              px-4 py-2 min-h-11
              text-[15px] font-medium leading-none
              hover:opacity-90 transition
            "
          >
            Continue
          </button>
        </form>
        <p className="text-[11px] text-muted">
          Prototype — form is not connected.
        </p>
      </div>

      {/* Suggested — top earners. */}
      <div className="flex flex-col gap-3">
        <p className="text-[13px] text-muted px-1">Earning right now</p>
        <ul className="flex flex-col gap-1">
          {suggested.map((c) => (
            <li key={c.handle}>
              <a
                href={`#creator-${c.handle}`}
                className="
                  flex items-center gap-3 rounded-xl p-2 min-h-11
                  hover:bg-ink/[0.04] transition
                "
              >
                <span className="relative h-9 w-9 shrink-0 rounded-full overflow-hidden bg-panel">
                  <Image
                    src={c.src}
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-col leading-tight min-w-0">
                  <span className="text-[15px] truncate">{c.name}</span>
                  <span className="text-[13px] text-muted truncate">
                    @{c.handle}
                  </span>
                </span>
                <span className="ml-auto text-[13px] font-expanded text-payout">
                  {c.earnings}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
