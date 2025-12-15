import type { Endpoints } from "@octokit/types";

export type Activity = {
  date: string | undefined;
  message: string;
  repo: string;
  repoUrl: string;
  sha: string;
  files: string[];
};

export type LanguageTimeline = {
  [yearMonth: string]: {
    [language: string]: number;
  };
};

export type ActivityData = {
  activityTimeline: Activity[];
  languageTimeline: LanguageTimeline;
};

export type UserRepo = Endpoints["GET /user/repos"]["response"]["data"][number];
export type Commit =
  Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"][number];
