import ProjectCard from "@/app/projects/_components/ProjectCard";
import { projectsData } from "@/app/projects/_components/projects-data";

export default function Projects() {
  return (
    <div className="flex w-full flex-col items-center px-2">
      <div className="container">
        <h1 className="my-8 text-center text-3xl font-black">Projects</h1>
        <div className="flex flex-col items-center">
          {projectsData.map((p) => (
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
