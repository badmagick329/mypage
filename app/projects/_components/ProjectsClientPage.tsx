"use client";
import FilterBar from "@/app/projects/_components/FilterBar";
import ProjectCard from "@/app/projects/_components/ProjectCard";
import { type ProjectData } from "@/app/projects/_components/projects-data";
import { useState } from "react";

export default function ProjectsClientPage({
  projects,
}: {
  projects: ProjectData[];
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const allTags = [...new Set(projects.flatMap((p) => p.tags))].toSorted();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const filteredProjects = projects.filter((p) => {
    return selectedTags.length === 0
      ? true
      : selectedTags.every((tag) => p.tags.includes(tag));
  });

  return (
    <div className="flex w-full flex-col items-center px-2">
      <div className="container">
        <h1 className="my-8 text-center text-3xl font-black">Projects</h1>
        <div className="flex flex-col items-center">
          <FilterBar
            allTags={allTags}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
          />
          {filteredProjects.map((p) => (
            <ProjectCard
              key={p.name}
              name={p.name}
              githubProjectName={p.githubProjectName}
              homePage={p?.homePage}
              tagline={p.tagline}
              shortDescription={p.shortDescription}
              mediaList={p?.mediaList}
              description={p.description}
              why={p.why}
              tech={p.tech}
              tags={p.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
