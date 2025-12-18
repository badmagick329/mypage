import { getReposSummary } from "@/lib/server/repos";
import { ReposResponse } from "@/lib/types";
import { Effect, Option } from "effect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ReposResponse>> {
  const url = new URL(request.url);
  const fetchFromCache = Boolean(url.searchParams.get("cache")) ?? false;

  const reposSummaryResult = await Effect.runPromise(
    getReposSummary(fetchFromCache),
  );

  return Option.match(reposSummaryResult, {
    onNone: () =>
      NextResponse.json(
        { ok: false, error: "Error fetching repos summary" },
        { status: 500 },
      ),
    onSome: (data) => NextResponse.json({ ok: true, data }),
  });
}
