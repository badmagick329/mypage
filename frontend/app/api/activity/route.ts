import { getGitHubActivity } from "@/lib/server/github-activity";
import { ActivityDataResponse } from "@/lib/types";
import { Effect, Option } from "effect";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<ActivityDataResponse>> {
  const result = await Effect.runPromise(getGitHubActivity);
  return Option.match(result, {
    onNone: () =>
      NextResponse.json(
        { ok: false, error: "Could not fetch activity data" },
        { status: 500 },
      ),
    onSome: (data) => NextResponse.json({ ok: true, data }),
  });
}
