"use client";

import LanguagesStackedBarChart from "@/app/_components/LanguagesStackedBarChart";
import RecentCommits from "@/app/_components/RecentCommits";
import ActivityLineChart from "@/app/_components/ActivityLineChart";
import { ActivityData } from "@/lib/types";

export default function RecentActivity({
  activityData,
}: {
  activityData: ActivityData | null;
}) {
  if (activityData === null) return null;

  return (
    <div className="mt-4 flex flex-col gap-8">
      <RecentCommits data={activityData} />
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <ActivityLineChart data={activityData} />
        <LanguagesStackedBarChart data={activityData} />
      </div>
    </div>
  );
}
