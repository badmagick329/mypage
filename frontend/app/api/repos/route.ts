import { getReposSummary } from "@/lib/server/repos";
import { RepoSummary } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET(): Promise<
  NextResponse<{ ok: false; error: string } | { ok: true; data: RepoSummary[] }>
> {
  const reposSummaryResult = await getReposSummary();
  if (!reposSummaryResult.ok) {
    console.error("Error fetching repos summary:", reposSummaryResult.error);
    return NextResponse.json(
      { ok: false, error: reposSummaryResult.error },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, data: reposSummaryResult.data });
}
