import ProjectCard from "@/app/projects/_components/ProjectCard";
import { projectsData } from "@/app/projects/_components/projects-data";

export default function Projects() {
  return (
    <div className="flex w-full flex-col px-2">
      <h1 className="my-8 text-center text-3xl font-black">Projects</h1>
      <div className="grid-auto-fill justify-items-center-safe sm:px-2 md:px-8 xl:px-24">
        {projectsData.map((p) => (
          <ProjectCard
            key={p.name}
            homePage={p?.homePage}
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
