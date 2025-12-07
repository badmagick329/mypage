import ProjectCard from "@/app/projects/_components/ProjectCard";
import { projectsData } from "@/app/projects/_components/projects-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of web development projects including video encoding services, archive tools, Discord utilities, and more. Built with React, Next.js, TypeScript, Python, and Django.",
  keywords: [
    "web development projects",
    "React projects",
    "Next.js portfolio",
    "TypeScript projects",
    "full stack projects",
    "software portfolio",
  ],
  openGraph: {
    title: "Projects | Uzair",
    description:
      "Explore my portfolio of web development projects. Built with modern technologies like React, Next.js, TypeScript, and more.",
    url: "/projects",
  },
  alternates: {
    canonical: "/projects",
  },
};

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
