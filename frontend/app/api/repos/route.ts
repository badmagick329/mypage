import { serverConfig } from "@/lib/server/config";
import { GitHubRepository } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import * as fs from "node:fs";

type RepoSummary = {
  name: string;
  updatedAt: string;
};

export async function GET(request: NextRequest) {
  const dataDir = getDataDir();
  if (!dataDir) {
    return NextResponse.json<{ error: string }>(
      { error: "DATA_DIR is not set" },
      { status: 500 },
    );
  }

  try {
    const content = fs
      .readFileSync(`${dataDir}/${serverConfig.repoListFile}`)
      .toString();
    const parsed: RepoSummary[] = (JSON.parse(content) as GitHubRepository[])
      .filter((d) => serverConfig.displayedRepos.includes(d.name))
      .map((d) => ({
        name: d.name,
        updatedAt: d.updated_at,
      }));

    return NextResponse.json<RepoSummary[]>(parsed);
  } catch {
    return NextResponse.json<{ error: string }>(
      { error: "Failed to read repository data" },
      { status: 500 },
    );
  }
}

function getDataDir(): string | undefined {
  return process.env.DATA_DIR;
}
