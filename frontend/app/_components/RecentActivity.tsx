"use client";

import { ActivityData, ActivityDataResponse } from "@/lib/types";
import { ACTIVITY } from "@/lib/urls";
import { useQuery } from "@tanstack/react-query";
import { JetBrains_Mono } from "next/font/google";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from "react";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

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
    <div className="mt-4">
      <RecentCommits data={data} />
    </div>
  );
}

function RecentCommits({ data }: { data: ActivityData }) {
  return (
    <section className="flex flex-col items-center gap-2">
      <h3 className="text-lg font-semibold sm:text-xl">Recent Commits</h3>
      <ScrollArea className="border-border h-48 max-w-2xl border p-2">
        <div
          className={`text-2xs flex flex-col gap-2 tracking-tighter sm:text-xs ${jetbrainsMono.className}`}
        >
          {data.activityTimeline.slice(0, 300).map((t) => {
            return (
              <React.Fragment key={t.sha}>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <div className="flex justify-between gap-2">
                    <p className="text-foreground-muted whitespace-nowrap">
                      {t.date?.replace("T", " ").replace("Z", "")}
                    </p>
                    <p className="font-semibold text-blue-700 dark:text-blue-500">
                      {t.repo}
                    </p>
                  </div>
                  <p>{t.message.split("\n")[0]}</p>
                </div>
                <Separator />
              </React.Fragment>
            );
          })}
        </div>
      </ScrollArea>
    </section>
  );
}
