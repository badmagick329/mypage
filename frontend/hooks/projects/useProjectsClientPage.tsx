"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { tryFetchReposSummary } from "@/lib/utils";
import { ReposSummary } from "@/lib/types";

export default function useProjectsClientPage(reposSummary: ReposSummary) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const toggleExpansion = (projectName: string) => {
    setExpandedProject((prev) => (prev === projectName ? null : projectName));
  };

  const { data: summary = reposSummary } = useQuery({
    queryKey: ["reposSummary"],
    initialData: reposSummary,
    initialDataUpdatedAt: 0,
    queryFn: async () => {
      const result = await tryFetchReposSummary({ cacheOnly: false });

      if (result === null) {
        return reposSummary;
      }
      return result;
    },
  });

  return {
    expandedProject,
    toggleExpansion,
    summary,
  };
}
