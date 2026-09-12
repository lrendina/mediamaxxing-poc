import { redirect } from "next/navigation";

/* /creator has no screen of its own — the app opens on Campaigns. */
export default function CreatorIndex() {
  redirect("/creator/campaigns");
}
