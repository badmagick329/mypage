import ProjectsClientPage from "@/app/projects/_components/ProjectsClientPage";
import type { Metadata } from "next";
import { projectsData } from "@/app/projects/_components/projects-data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of web development projects. Built with React, Next.js, TypeScript, Python, and Django.",
  keywords: [
    "web development projects",
    "React projects",
    "Next.js portfolio",
    "TypeScript projects",
    "full stack projects",
    "software portfolio",
    "programmer portfolio",
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
  return <ProjectsClientPage projects={projectsData} />;
}
