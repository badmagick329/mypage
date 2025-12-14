import { getGitHubActivity } from "@/lib/server/github-activity";
import { ActivityDataResponse } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<ActivityDataResponse>> {
  const activityDataResponse = await getGitHubActivity();

  if (!activityDataResponse.ok) {
    console.error("Error activity data:", activityDataResponse.error);
    return NextResponse.json(
      { ok: false, error: activityDataResponse.error },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, data: activityDataResponse.data });
}
