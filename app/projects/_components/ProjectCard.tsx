"use client";

import { ProjectData } from "@/app/projects/_components/projects-data";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ProjectMediaDisplay from "@/app/projects/_components/ProjectMediaDisplay";

const iconSize = "xs:w-4 xs:h-4 mt-1 h-3 w-3";

export default function ProjectCard({
  name,
  githubProjectName,
  homePage,
  mediaList,
  tagline,
  description,
  why,
  tech,
}: ProjectData) {
  const [isMinimized, setIsMinimized] = useState(true);

  return (
    <article className="bg-background-light shadow-card group -mt-1 flex w-full flex-col items-start gap-4 rounded-t-md first:mt-0 last:rounded-md sm:max-w-[80%] lg:max-w-[60%]">
      <section
        className={`bg-background-lighter/60 relative flex w-full justify-between rounded-t-md px-2 py-6 select-none group-last:rounded-md hover:cursor-pointer`}
        onClick={() => setIsMinimized((p) => !p)}
      >
        <Heading
          name={name}
          homePage={homePage}
          tagline={tagline}
          isMinimized={isMinimized}
        />
        {isMinimized ? (
          <ChevronDown className={iconSize} />
        ) : (
          <ChevronUp className={iconSize} />
        )}
      </section>
      {!isMinimized && (
        <section className="w-full">
          <AdditionalDetail
            mediaList={mediaList}
            description={description}
            why={why}
            tech={tech}
            githubProjectName={githubProjectName}
            isMinimized={isMinimized}
          />
        </section>
      )}
    </article>
  );
}

function Heading({
  name,
  homePage,
  tagline,
  isMinimized,
}: Pick<ProjectData, "name" | "homePage" | "mediaList" | "tagline"> & {
  isMinimized: boolean;
}) {
  if (!homePage) {
    return (
      <div className="flex flex-col gap-2">
        <h3 className="xs:text-xl text-base font-semibold">{name}</h3>
        {isMinimized && (
          <span className="text-foreground-muted">{tagline}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-foreground-strong xs:text-xl w-fit text-base font-semibold">
        <Link href={homePage} target="_blank" className="hover:underline">
          <span className="flex gap-2">
            {name}
            <ExternalLink className={iconSize} />
          </span>
        </Link>
      </h3>
      {isMinimized && <span className="text-foreground-muted">{tagline}</span>}
    </div>
  );
}

function AdditionalDetail({
  description,
  why,
  tech,
  mediaList,
  githubProjectName,
  isMinimized,
}: Pick<
  ProjectData,
  "description" | "why" | "tech" | "githubProjectName" | "mediaList"
> & { isMinimized: boolean }) {
  return (
    <>
      <div className="flex flex-col gap-8 px-2">
        <p className="text-foreground-muted xs:text-base text-sm">
          {description}
        </p>
        <section className="flex flex-col gap-1">
          <span className="xs:text-lg text-base font-bold">Why?</span>
          <span className="xs:text-base text-sm">{why}</span>
        </section>
        {mediaList && (
          <section>
            <ProjectMediaDisplay
              mediaList={mediaList}
              isVisible={!isMinimized}
            />
          </section>
        )}
      </div>
      <footer className="flex grow flex-col justify-end gap-2 px-2 py-4">
        <section className="flex flex-col gap-1">
          <h3 className="xs:text-xl text-base font-semibold">Tech</h3>
          <ul className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <li
                className="bg-background-lighter text-foreground-strong xs:text-sm rounded-md px-2 py-1 text-xs"
                key={t}
              >
                {t}
              </li>
            ))}
          </ul>
        </section>
        <Link
          href={`https://github.com/badmagick329/${githubProjectName}`}
          target="_blank"
          className="text-foreground-muted xs:text-sm text-xs hover:underline"
        >
          <span className="flex gap-2">
            {`https://github.com/badmagick329/${githubProjectName}`}
            <ExternalLink className="xs:w-2.5 xs:h-2.5 mt-1 h-2 w-2" />
          </span>
        </Link>
      </footer>
    </>
  );
}
