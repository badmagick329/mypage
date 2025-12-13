import { ReposResponse } from "@/lib/types";
import { REPOS } from "@/lib/urls";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function tryFetchReposSummary({
  cacheOnly,
}: {
  cacheOnly: boolean;
}) {
  const url = `${REPOS}?cache=${cacheOnly ? "1" : ""}`;

  try {
    const resp = (await (await fetch(url)).json()) as ReposResponse;
    if (!resp.ok) {
      return null;
    }
    return resp.data;
  } catch {
    return null;
  }
}
