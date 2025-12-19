import { serverConfig } from "@/lib/server/config";
import { ActivityData, LanguageTimeline } from "@/lib/types";
import { Effect, Option } from "effect";
import { loadFileWithInMemoryCache } from "@/lib/wrappers/file-io";

const cachedData = {
  data: null as ActivityData | null,
  lastUpdate: null as number | null,
};

export const getGitHubActivity = Effect.gen(function* () {
  const result = yield* loadFileWithInMemoryCache(
    serverConfig.activityFile,
    cachedData,
    postProcessData,
  );
  return Option.some(result) as Option.Option<ActivityData>;
}).pipe(
  Effect.catchAll(() =>
    Effect.succeed(Option.none() as Option.Option<ActivityData>),
  ),
);

const filterByDate = (data: ActivityData, oldest: Date): ActivityData => {
  const filteredData: ActivityData = {
    activityTimeline: [],
    languageTimeline: {},
  };

  filteredData.activityTimeline = data.activityTimeline.filter(
    (activity) => activity.date && new Date(activity.date) >= oldest,
  );

  filteredData.languageTimeline = Object.fromEntries(
    Object.entries(data.languageTimeline).filter(([month]) => {
      const [year, monthNum] = month.split("-").map(Number);
      const monthDate = new Date(year, monthNum - 1);
      return monthDate >= oldest;
    }),
  );
  return filteredData;
};

const excludeLanguages = (
  excludeLanguages: string[],
  languageTimeline: LanguageTimeline,
) =>
  Object.fromEntries(
    Object.entries(languageTimeline).map(([month, languages]) => [
      month,
      Object.fromEntries(
        Object.entries(languages).filter(
          ([lang]) => !excludeLanguages.includes(lang),
        ),
      ),
    ]),
  );

const postProcessData = (data: ActivityData) => {
  data.languageTimeline = excludeLanguages(
    ["Shell", "SQL"],
    data.languageTimeline,
  );

  const oldest = new Date();
  oldest.setFullYear(oldest.getFullYear() - 5);
  const filteredData = filterByDate(data, oldest);
  return filteredData;
};
