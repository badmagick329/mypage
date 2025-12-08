"use client";
import FilterBar from "@/app/projects/_components/FilterBar";
import ProjectCard from "@/app/projects/_components/ProjectCard";
import { type ProjectData } from "@/app/projects/_components/projects-data";
import useProjectTags from "@/hooks/projects/useProjectTags";
import { useState } from "react";

export default function ProjectsClientPage({
  projects,
}: {
  projects: ProjectData[];
}) {
  const { allTags, toggleTag, filteredProjects, selectedTags, tagsAndCount } =
    useProjectTags(projects);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const toggleExpansion = (projectName: string) => {
    setExpandedProject((prev) => (prev === projectName ? null : projectName));
  };

  return (
    <div className="flex w-full flex-col items-center px-2 pb-8">
      <div className="container">
        <h1 className="my-8 text-center text-3xl font-black">Projects</h1>
        <div className="flex flex-col items-center">
          <FilterBar
            allTags={allTags}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
            tagsAndCount={tagsAndCount}
          />
          {filteredProjects.map((p) => (
            <ProjectCard
              key={p.name}
              projectData={p}
              toggleExpansion={toggleExpansion}
              expandedProject={expandedProject}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
