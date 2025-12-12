"use client";

import { ProjectDataWithUpdatedAt } from "@/lib/types";
import { useMemo, useState } from "react";

export interface UseProjectTagsReturn {
  selectedTags: string[];
  allTags: string[];
  toggleTag: (tag: string) => void;
  filteredProjects: ProjectDataWithUpdatedAt[];
  tagsAndCount: Map<string, number>;
}

export default function useProjectTags(
  projects: ProjectDataWithUpdatedAt[],
): UseProjectTagsReturn {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      return selectedTags.length === 0
        ? true
        : selectedTags.every((tag) => p.tags.includes(tag));
    });
  }, [projects, selectedTags]);

  const allTags = useMemo(
    () => [...new Set(projects.flatMap((p) => p.tags))].sort(),
    [projects],
  );

  const tagsAndCount = useMemo(() => {
    const tagsAndCount = new Map<string, number>();
    filteredProjects.forEach((project) => {
      project.tags.forEach((tag) => {
        tagsAndCount.set(tag, (tagsAndCount.get(tag) || 0) + 1);
      });
    });
    return tagsAndCount;
  }, [filteredProjects]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  return {
    selectedTags,
    allTags,
    toggleTag,
    filteredProjects,
    tagsAndCount,
  };
}
