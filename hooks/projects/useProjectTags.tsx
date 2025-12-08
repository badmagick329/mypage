"use client";

import { ProjectData } from "@/app/projects/_components/projects-data";
import { useMemo, useState } from "react";

export interface UseProjectTagsReturn {
  selectedTags: string[];
  allTags: string[];
  toggleTag: (tag: string) => void;
  filteredProjects: ProjectData[];
  tagsAndCount: Map<string, number>;
}

export default function useProjectTags(
  projects: ProjectData[],
): UseProjectTagsReturn {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      return selectedTags.length === 0
        ? true
        : selectedTags.every((tag) => p.tags.includes(tag));
    });
  }, [projects, selectedTags]);

  const allTags = [...new Set(projects.flatMap((p) => p.tags))].toSorted();

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
