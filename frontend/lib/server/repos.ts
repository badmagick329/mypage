import {
  DiskCachedGitHubResponse,
  GitHubRepository,
  ReposResponse,
  ReposSummary,
} from "@/lib/types";
import { serverConfig } from "@/lib/server/config";
import { Octokit } from "octokit";
import { Effect, Schedule } from "effect";

export async function getReposSummary(
  cachedOnly: boolean,
): Promise<ReposResponse> {
  const rawDataResult = await getRawData(cachedOnly);
  if (!rawDataResult.ok) {
    return { ok: false, error: rawDataResult.error };
  }

  const data = {} as ReposSummary;
  rawDataResult.data
    .filter((d) => serverConfig.displayedRepos.includes(d.name))
    .forEach(
      (d) =>
        (data[d.name] = {
          updatedAt: d.pushed_at,
        }),
    );

  return { ok: true, data };
}

async function getRawData(
  cachedOnly: boolean,
): Promise<
  { ok: true; data: GitHubRepository[] } | { ok: false; error: string }
> {
  const readExit = await Effect.runPromiseExit(readFileSafe());
  if (readExit._tag === "Failure") {
    timestampLog("Failed to read repo cache:", readExit.cause);
    return { ok: false, error: "Failed to read repository data" };
  }

  const content = readExit.value;

  const parseExit = await Effect.runPromiseExit(
    Effect.sync(() => JSON.parse(content) as DiskCachedGitHubResponse),
  );
  if (parseExit._tag === "Failure") {
    timestampLog("Failed to parse repo cache:", parseExit.cause);
    return { ok: false, error: "Failed to read repository data" };
  }

  const parsed = parseExit.value;
  let rawData;

  const getNewData =
    !cachedOnly &&
    (!parsed.lastUpdated ||
      Date.now() - new Date(parsed.lastUpdated).getTime() >
        serverConfig.repoListCacheDuration);

  if (getNewData) {
    timestampLog("Cache is stale or missing, updating...");
    const result = await updateCache();

    if (result?.data) {
      return {
        ok: true,
        data: result.data,
      };
    }
  }

  if (!rawData) {
    return {
      ok: true,
      data: parsed.data,
    };
  }

  return {
    ok: false,
    error: "Failed to read repository data",
  };
}

async function updateCache() {
  const auth = process.env.GITHUB_TOKEN;
  const octokit = new Octokit({ auth });

  const response = await octokit.request(`GET /user/repos`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
    type: "all",
    per_page: 100,
    sort: "created",
  });
  if (response.status !== 200) {
    return;
  }
  const writeFileEffect = writeFileSafe(JSON.stringify(response));

  const result = await Effect.runPromiseExit(writeFileEffect);
  if (result._tag === "Failure") {
    timestampLog("Failed to write updated repo list to cache", result.cause);
    return;
  }

  timestampLog("Writing updated repo list to cache");

  return response as { data: GitHubRepository[] };
}

function getDataDir(): string | undefined {
  return process.env.DATA_DIR;
}

const tryReadFile = (filePath: string) =>
  Effect.tryPromise(() =>
    import("fs/promises").then((fs) => fs.readFile(filePath, "utf-8")),
  );

const tryWriteFile = (filePath: string, content: string) =>
  Effect.tryPromise(() =>
    import("fs/promises").then((fs) => fs.writeFile(filePath, content)),
  );

const readFileWithBackoff = (filePath: string) =>
  tryReadFile(filePath).pipe(
    Effect.retry(
      Schedule.exponential("100 millis").pipe(
        Schedule.union(Schedule.recurs(10)),
      ),
    ),
  );

const readFileSafe = () =>
  Effect.gen(function* () {
    const dataDir = getDataDir();
    if (!dataDir) {
      return yield* Effect.fail(new Error("DATA_DIR is not set"));
    }
    const fileName = `${dataDir}/${serverConfig.repoListFile}`;
    return yield* readFileWithBackoff(fileName);
  });

const writeFileWithBackoff = (filePath: string, content: string) =>
  tryWriteFile(filePath, content).pipe(
    Effect.retry(
      Schedule.exponential("100 millis").pipe(
        Schedule.union(Schedule.recurs(10)),
      ),
    ),
  );

const writeFileSafe = (content: string) =>
  Effect.gen(function* () {
    const dataDir = getDataDir();
    if (!dataDir) {
      return yield* Effect.fail(new Error("DATA_DIR is not set"));
    }
    const fileName = `${dataDir}/${serverConfig.repoListFile}`;
    return yield* writeFileWithBackoff(fileName, content);
  });

const timestampLog = (...args: unknown[]) =>
  console.log(`[${new Date().toISOString()}] - `, ...args);
