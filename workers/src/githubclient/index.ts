import { Octokit } from "octokit";
import type { Activity, ActivityData, Commit, UserRepo } from "../lib/types";
import * as fs from "node:fs";

export class GitHubClient {
  private octokit: Octokit;
  private cachedRepos: UserRepo[] | null;
  private allCommits: Activity[] = [];
  private languageUsageByMonth = new Map<string, Record<string, number>>(); // "2025-11" -> { ts: 15, py: 10 }
  private cacheFile: string;

  constructor(cacheFile: string) {
    console.log(`Initializing GitHubClient with cache file: ${cacheFile}`);
    this.octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    this.cachedRepos = null;
    this.cacheFile = cacheFile;
    try {
      const oldData = JSON.parse(
        fs.readFileSync(cacheFile).toString()
      ) as ActivityData;

      if (oldData) {
        console.log("Found old data");
        this.allCommits = oldData.activityTimeline;
        console.log(`${this.allCommits.length} commits`);
      }
    } catch {
      //
    }
  }

  get data(): ActivityData {
    return {
      activityTimeline: this.allCommits,
      languageTimeline: Object.fromEntries(this.languageUsageByMonth),
    };
  }

  async fetchNewData() {
    if (await this.isNearRateLimit()) {
      console.log("Stopping due to rate limit");
      return;
    }

    const repos = await this.getRepos();

    const lastFetch = this.lastFetch();
    const reposProcessed = [] as string[];

    for (let i = 0; i < repos.length; i++) {
      const repo = repos[i]!;
      console.log(`[${i + 1}/${repos.length}] - Processing repo: ${repo.name}`);

      try {
        const commits = await this.getCommits(repo, lastFetch);
        for (const commit of commits) {
          await this.extractDataFromCommit(repo, commit);
        }

        this.saveToFile();
        reposProcessed.push(repo.name);

        if (await this.isNearRateLimit()) {
          console.log("Stopping due to rate limit");
          break;
        }
      } catch (error) {
        this.createLanguageTimeline();
        this.saveToFile();
        console.error(`Error processing repo ${repo.name}:`, error);
        break;
      }
    }

    this.createLanguageTimeline();
    this.saveToFile();
    console.log("repos processed");
    console.log(reposProcessed);
  }

  private lastFetch() {
    let lastFetch: Date | null = null;

    for (const activity of this.allCommits) {
      if (activity.date) {
        console.log(`Last fetch date: ${activity.date}`);
        lastFetch = new Date(activity.date);
        break;
      }
    }
    if (lastFetch === null) {
      lastFetch = new Date();
      lastFetch.setFullYear(lastFetch.getFullYear() - 10);
    }
    return lastFetch;
  }

  private async isNearRateLimit() {
    const { data } = await this.octokit.request("GET /rate_limit");
    const remaining = data.rate.remaining;
    const resetTime = new Date(data.rate.reset * 1000);

    console.log(`Rate limit: ${remaining} remaining`);
    console.log(`Resets at: ${resetTime.toLocaleString()}`);

    if (remaining < 1000) {
      console.error(`Not enough requests! Need to wait until ${resetTime}`);
      return true;
    }
    return false;
  }

  private async getRepos() {
    if (this.cachedRepos) {
      return this.cachedRepos;
    }
    const { data: repos } = await this.octokit.request("GET /user/repos", {
      type: "public",
      per_page: 100,
      sort: "updated",
    });

    const filtered = repos.filter((r) => r.owner.login === "badmagick329");
    this.cachedRepos = filtered;
    return filtered;
  }

  private async getCommits(repo: UserRepo, commitsSince: Date) {
    console.log(
      `[${repo.name}] - getting commits since ${commitsSince?.toISOString()}`
    );

    const recentByDate = await this.octokit.paginate(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner: repo.owner.login,
        repo: repo.name,
        since: commitsSince.toISOString(),
        per_page: 100,
      }
    );
    const recentByCount = await this.octokit.paginate(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner: repo.owner.login,
        repo: repo.name,
        per_page: 50,
      }
    );

    return Array.from(
      new Map(
        [...recentByDate, ...recentByCount].map((c) => [c.sha, c])
      ).values()
    ).filter((c) => c.author?.login === "badmagick329");
  }

  private async extractDataFromCommit(repo: UserRepo, commit: Commit) {
    const { data: commitDetail } = await this.octokit.request(
      "GET /repos/{owner}/{repo}/commits/{ref}",
      {
        owner: repo.owner.login,
        repo: repo.name,
        ref: commit.sha,
      }
    );

    const commitDetails = {
      date: commitDetail.commit.author?.date,
      message: commitDetail.commit.message,
      repo: repo.name,
      repoUrl: repo.html_url,
      sha: commit.sha,
      files: commitDetail.files?.map((f) => f.filename) || ([] as string[]),
    };

    this.allCommits.push(commitDetails);
    this.dedupeAllCommits();
  }

  private createLanguageTimeline() {
    this.languageUsageByMonth = new Map<string, Record<string, number>>();

    for (const commit of this.allCommits) {
      const month = commit.date?.substring(0, 7); // "2025-11"
      if (!month) {
        continue;
      }

      if (!this.languageUsageByMonth.has(month)) {
        this.languageUsageByMonth.set(month, {});
      }

      const monthData = this.languageUsageByMonth.get(month);
      if (!monthData) {
        continue;
      }

      for (const file of commit.files) {
        const extension = getFileExtension(file);
        if (extension) {
          monthData[extension] = (monthData[extension] || 0) + 1;
        }
      }
    }
  }

  private dedupeAllCommits() {
    return Array.from(
      new Map(this.allCommits.map((c) => [c.sha, c])).values()
    ).sort((a, b) => {
      const timeA = a.date ? new Date(a.date).getTime() : 0;
      const timeB = b.date ? new Date(b.date).getTime() : 0;
      return timeB - timeA;
    });
  }

  private saveToFile() {
    fs.writeFileSync(this.cacheFile, JSON.stringify(this.data));
  }
}

function getFileExtension(filename: string): string | null {
  const ext = filename.split(".").pop()?.toLowerCase();

  const langMap: Record<string, string> = {
    c: "C",
    cpp: "C++",
    cs: "C#",
    css: "CSS",
    go: "Go",
    html: "HTML",
    java: "Java",
    js: "JavaScript",
    jsx: "JavaScript",
    kt: "Kotlin",
    php: "PHP",
    py: "Python",
    rb: "Ruby",
    rs: "Rust",
    scss: "CSS",
    sh: "Shell",
    sql: "SQL",
    svelte: "JavaScript",
    swift: "Swift",
    ts: "TypeScript",
    tsx: "TypeScript",
  };

  return ext && langMap[ext] ? langMap[ext] : null;
}
