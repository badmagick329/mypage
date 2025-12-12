import * as fs from "node:fs";
import { CachedSummary, GitHubRepository, ReposResponse } from "@/lib/types";
import { serverConfig } from "@/lib/server/config";
import { Octokit } from "octokit";

export async function getReposSummary(): Promise<ReposResponse> {
  const dataDir = getDataDir();
  if (!dataDir) {
    return { ok: false, error: "DATA_DIR is not set" };
  }

  try {
    const rawDataResult = await getRawData();
    if (!rawDataResult.ok) {
      return { ok: false, error: rawDataResult.error };
    }

    const data = rawDataResult.data
      .filter((d) => serverConfig.displayedRepos.includes(d.name))
      .map((d) => ({
        name: d.name,
        updatedAt: d.pushed_at,
      }));

    return { ok: true, data };
  } catch {
    return { ok: false, error: "Failed to read repository data" };
  }
}

async function getRawData(): Promise<
  { ok: true; data: GitHubRepository[] } | { ok: false; error: string }
> {
  const dataDir = getDataDir();
  if (!dataDir) {
    return { ok: false, error: "DATA_DIR is not set" };
  }

  try {
    const content = fs
      .readFileSync(`${dataDir}/${serverConfig.repoListFile}`)
      .toString();
    const parsed: CachedSummary = JSON.parse(content);
    let rawData;

    if (
      !parsed.lastUpdated ||
      Date.now() - new Date(parsed.lastUpdated).getTime() >
        serverConfig.repoListCacheDuration
    ) {
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
  } catch {
    return { ok: false, error: "Failed to read repository data" };
  }
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

  fs.writeFileSync(
    `${getDataDir()}/${serverConfig.repoListFile}`,
    JSON.stringify(response),
  );
  return response as { data: GitHubRepository[] };
}

function getDataDir(): string | undefined {
  return process.env.DATA_DIR;
}
