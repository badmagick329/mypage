import ProjectCard from "@/app/projects/_components/ProjectCard";
import { projectsData } from "@/app/projects/_components/projects-data";

export default function Projects() {
  return (
    <div className="flex w-full flex-col px-2">
      <h1 className="my-8 text-center text-3xl font-black">Projects</h1>
      <div className="grid grid-cols-1 justify-items-center-safe gap-4 md:grid-cols-3">
        {projectsData.map((p) => (
          <ProjectCard
            key={p.name}
            name={p.name}
            githubProjectName={p.githubProjectName}
            description={p.description}
            why={p.why}
            tech={p.tech}
          />
        ))}
      </div>
    </div>
  );
}
