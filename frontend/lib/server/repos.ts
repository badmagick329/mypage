import {
  DiskCachedGitHubResponse,
  GitHubRepository,
  ReposSummary,
} from "@/lib/types";
import { serverConfig } from "@/lib/server/config";
import { Octokit } from "octokit";
import { Effect, Option } from "effect";
import * as disk from "@/lib/wrappers/file-io";
import { timestampLog } from "@/lib/wrappers";

const cachedData = {
  data: null as DiskCachedGitHubResponse | null,
  lastUpdate: null as number | null,
};

export const getReposSummary = (cacheOnly: boolean) =>
  Effect.gen(function* () {
    const result = yield* getFullData(cacheOnly);
    return Option.match(result, {
      onNone: () => Option.none() as Option.Option<ReposSummary>,
      onSome: (value) => {
        const data = {} as ReposSummary;
        value
          .filter((d) => serverConfig.displayedRepos.includes(d.name))
          .forEach(
            (d) =>
              (data[d.name] = {
                updatedAt: d.pushed_at,
              }),
          );
        return Option.some(data);
      },
    });
  });

const getFullData = (cachedOnly: boolean) =>
  Effect.gen(function* () {
    const parsed = yield* disk
      .loadFileWithInMemoryCache(serverConfig.repoListFile, cachedData)
      .pipe(
        Effect.map((d) => Option.some(d)),
        Effect.catchTag("ParseError", () => Option.none()),
      );

    return yield* Option.match(parsed, {
      onNone: () => {
        return Effect.gen(function* () {
          if (!cachedData) {
            timestampLog("Cache is stale or missing, updating...");
            const newData = yield* updateCache();
            if (newData) {
              return Option.some(newData);
            }
          }

          return Option.none() as Option.Option<GitHubRepository[]>;
        });
      },
      onSome: (value) => {
        return Effect.gen(function* () {
          const isCacheStaleOrMissing =
            !value.lastUpdated ||
            Date.now() - new Date(value.lastUpdated).getTime() >
              serverConfig.repoListCacheDuration;

          if (!cachedOnly && isCacheStaleOrMissing) {
            timestampLog("Cache is stale or missing, updating...");
            const newData = yield* updateCache();
            if (newData) {
              return Option.some(newData);
            }
          }
          timestampLog("Returning cached data");
          if (parsed) {
            return Option.some(value.data);
          }

          return Option.none() as Option.Option<GitHubRepository[]>;
        });
      },
    });
  }).pipe(
    Effect.catchTags({
      EnvError: (error) => {
        timestampLog(`Environment variable ${error.variable} is not set`);
        return Effect.succeed(
          Option.none() as Option.Option<GitHubRepository[]>,
        );
      },
      FileIOError: (error) => {
        timestampLog(`Failed to read/write repository data - ${error.cause}`);
        return Effect.succeed(
          Option.none() as Option.Option<GitHubRepository[]>,
        );
      },
    }),
  );

const updateCache = () =>
  Effect.gen(function* () {
    const auth = process.env.GITHUB_TOKEN;
    const octokit = new Octokit({ auth });

    const response = yield* Effect.promise(() =>
      octokit
        .request(`GET /user/repos`, {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
          type: "public",
          per_page: 100,
          sort: "created",
        })
        .catch(() => null),
    );
    if (!response) {
      return null;
    }
    timestampLog("Writing updated repo list to cache");
    yield* disk.tryWriteDataFile(
      serverConfig.repoListFile,
      JSON.stringify({
        lastUpdated: new Date().toISOString(),
        data: response.data,
      }),
    );
    return response.data as GitHubRepository[];
  });
