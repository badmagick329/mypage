import { ActivityDataResponse, ReposResponse } from "@/lib/types";
import { ACTIVITY, REPOS } from "@/lib/urls";
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
  const url = `${REPOS}${cacheOnly ? "?cache=1" : ""}`;

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

export async function tryFetchActivityData() {
  const resp = (await (await fetch(ACTIVITY)).json()) as ActivityDataResponse;

  if (!resp.ok) {
    return null;
  }
  return resp.data;
}
