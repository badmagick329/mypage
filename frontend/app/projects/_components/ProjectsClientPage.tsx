"use client";
import FilterBar from "@/app/projects/_components/FilterBar";
import ProjectCard from "@/app/projects/_components/ProjectCard";
import useProjectsClientPage from "@/hooks/projects/useProjectsClientPage";
import useProjectTags from "@/hooks/projects/useProjectTags";
import { ProjectData, ReposSummary } from "@/lib/types";

export default function ProjectsClientPage({
  reposSummary,
  projects,
}: {
  reposSummary: ReposSummary;
  projects: ProjectData[];
}) {
  const { allTags, toggleTag, filteredProjects, selectedTags, tagsAndCount } =
    useProjectTags(projects);
  const { expandedProject, toggleExpansion, summary } =
    useProjectsClientPage(reposSummary);

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
            allProjectsCount={projects.length}
            filteredProjectsCount={filteredProjects.length}
          />
          {filteredProjects.map((p) => (
            <ProjectCard
              key={p.name}
              projectData={p}
              toggleExpansion={toggleExpansion}
              expandedProject={expandedProject}
              updatedAt={summary[p.githubProjectName]?.updatedAt || ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
