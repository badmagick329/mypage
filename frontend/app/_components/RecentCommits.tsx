import { JetBrains_Mono } from "next/font/google";
import { ActivityData } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from "react";
import Link from "next/link";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });
const lastNCommits = 500;

export default function RecentCommits({ data }: { data: ActivityData }) {
  return (
    <section className="flex flex-col items-center gap-2">
      <h3 className="text-lg font-semibold sm:text-xl">Recent Commits</h3>
      <ScrollArea className="border-border h-48 w-full max-w-2xl border p-2">
        <div
          className={`text-2xs flex flex-col gap-2 tracking-tighter sm:text-xs ${jetbrainsMono.className}`}
        >
          {data.activityTimeline.slice(0, lastNCommits).map((t) => {
            return (
              <React.Fragment key={t.sha}>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <div className="flex justify-between gap-2">
                    <p className="text-foreground-muted whitespace-nowrap">
                      {t.date?.replace("T", " ").replace("Z", "")}
                    </p>
                    <Link
                      className="font-semibold whitespace-nowrap text-blue-700 hover:underline dark:text-blue-500"
                      href={t.repoUrl}
                      target="_blank"
                    >
                      {t.repo}
                    </Link>
                  </div>
                  <Link
                    className="hover:underline"
                    href={`${t.repoUrl}/commit/${t.sha}`}
                    target="_blank"
                  >
                    {t.message.split("\n")[0]}
                  </Link>
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
