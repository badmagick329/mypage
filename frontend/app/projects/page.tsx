import ProjectsClientPage from "@/app/projects/_components/ProjectsClientPage";
import type { Metadata } from "next";
import { projectsData } from "@/app/projects/_components/projects-data";
import { ProjectDataWithUpdatedAt, ReposResponse } from "@/lib/types";
import { REPOS } from "@/lib/urls";

export const dynamic = "force-dynamic";

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
    title: "Projects | Uzair Farooqi",
    description:
      "Explore my portfolio of web development projects. Built with modern technologies like React, Next.js, TypeScript, and more.",
    url: "/projects",
  },
  alternates: {
    canonical: "/projects",
  },
};

export default async function Projects() {
  const resp = (await (await fetch(REPOS)).json()) as ReposResponse;
  let projects: ProjectDataWithUpdatedAt[];
  if (!resp.ok) {
    projects = projectsData.map((p) => ({
      ...p,
      updatedAt: "",
    }));
  } else {
    projects = projectsData.map((p) => ({
      ...p,
      updatedAt:
        resp.data.find((r) => r.name === p.githubProjectName)?.updatedAt || "",
    }));
  }

  return <ProjectsClientPage projects={projects} />;
}
