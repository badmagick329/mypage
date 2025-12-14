import { getReposSummary } from "@/lib/server/repos";
import { ReposResponse } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ReposResponse>> {
  const url = new URL(request.url);
  const fetchFromCache = Boolean(url.searchParams.get("cache")) ?? false;

  const reposSummaryResult = await getReposSummary(fetchFromCache);

  if (!reposSummaryResult.ok) {
    console.error("Error fetching repos summary:", reposSummaryResult.error);
    return NextResponse.json(
      { ok: false, error: reposSummaryResult.error },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, data: reposSummaryResult.data });
}
