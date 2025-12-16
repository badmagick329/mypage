import * as fs from "node:fs";
import { serverConfig } from "@/lib/server/config";
import { ActivityData, ActivityDataResponse } from "@/lib/types";

const cachedData = {
  data: null as ActivityData | null,
  lastUpdate: null as number | null,
};

export async function getGitHubActivity(): Promise<ActivityDataResponse> {
  const dataDir = getDataDir();
  if (!dataDir) {
    return { ok: false, error: "DATA_DIR is not set" };
  }
  const stat = fs.statSync(`${dataDir}/${serverConfig.activityFile}`);
  if (stat.mtimeMs === cachedData.lastUpdate && cachedData.data !== null) {
    console.log("Returning cached data");
    return { ok: true, data: cachedData.data };
  }

  const content = fs
    .readFileSync(`${dataDir}/${serverConfig.activityFile}`)
    .toString();
  const parsed: ActivityData = JSON.parse(content);

  parsed.languageTimeline = Object.fromEntries(
    Object.entries(parsed.languageTimeline).map(([month, languages]) => [
      month,
      Object.fromEntries(
        Object.entries(languages).filter(
          ([lang]) => !["Shell", "SQL"].includes(lang),
        ),
      ),
    ]),
  );

  const oldest = new Date();
  oldest.setFullYear(oldest.getFullYear() - 5);
  const filteredData = filterByDate(parsed, oldest);

  cachedData.data = filteredData;
  cachedData.lastUpdate = stat.mtimeMs;
  console.log("Updated Cache");
  return {
    ok: true,
    data: filteredData,
  };
}

function filterByDate(data: ActivityData, oldest: Date): ActivityData {
  const filteredData: ActivityData = {
    activityTimeline: [],
    languageTimeline: {},
  };

  filteredData.activityTimeline = data.activityTimeline.filter((activity) => {
    if (activity.date) {
      const activityDate = new Date(activity.date);
      return activityDate >= oldest;
    } else {
      return false;
    }
  });
  filteredData.languageTimeline = Object.fromEntries(
    Object.entries(data.languageTimeline).filter(([month]) => {
      const [year, monthNum] = month.split("-").map(Number);
      const monthDate = new Date(year, monthNum - 1);
      return monthDate >= oldest;
    }),
  );
  return filteredData;
}

function getDataDir(): string | undefined {
  return process.env.DATA_DIR;
}
