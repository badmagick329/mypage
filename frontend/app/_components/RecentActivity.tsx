"use client";

import { ActivityDataResponse } from "@/lib/types";
import { ACTIVITY } from "@/lib/urls";
import { useQuery } from "@tanstack/react-query";
import LanguagesStackedBarChart from "@/app/_components/LanguagesStackedBarChart";
import RecentCommits from "@/app/_components/RecentCommits";

export default function RecentActivity() {
  const { data, isSuccess } = useQuery({
    queryKey: ["activityData"],
    queryFn: async () => {
      const resp = (await (
        await fetch(ACTIVITY)
      ).json()) as ActivityDataResponse;

      if (!resp.ok) {
        return null;
      }
      return resp.data;
    },
  });

  if (!isSuccess || data === null) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-col gap-8">
      <RecentCommits data={data} />
      <LanguagesStackedBarChart data={data} />
    </div>
  );
}
