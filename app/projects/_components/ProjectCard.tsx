import { ProjectData } from "@/app/projects/_components/projects-data";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ProjectCard({
  name,
  githubProjectName,
  homePage,
  description,
  why,
  tech,
}: ProjectData) {
  return (
    <article className="bg-background-light shadow-card flex w-full max-w-md min-w-xs flex-col items-start gap-4 overflow-hidden rounded-md">
      <Heading name={name} homePage={homePage} />
      <div className="flex flex-col gap-8 px-2">
        <p className="xs:text-base text-foreground-muted text-sm">
          {description}
        </p>
        <section className="flex flex-col gap-1">
          <span className="xs:text-lg text-base font-bold">Why?</span>
          <span className="xs:text-base text-sm">{why}</span>
        </section>
      </div>
      <footer className="flex grow flex-col justify-end gap-2 px-2 py-4">
        <section className="flex flex-col gap-1">
          <h3 className="xs:text-xl text-base font-semibold">Tech</h3>
          <ul className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <li className="xs:text-base text-sm" key={t}>
                {t}
              </li>
            ))}
          </ul>
        </section>
        <Link
          href={`https://github.com/badmagick329/${githubProjectName}`}
          target="_blank"
          className="xs:text-sm text-foreground-muted text-xs hover:underline"
        >
          <span className="flex gap-2">
            {`https://github.com/badmagick329/${githubProjectName}`}
            <ExternalLink className="xs:h-2.5 xs:w-2.5 mt-1 h-1 w-1" />
          </span>
        </Link>
      </footer>
    </article>
  );
}

function Heading({ name, homePage }: { name: string; homePage?: string }) {
  if (!homePage) {
    return (
      <h3 className="bg-background-lighter/60 xs:text-xl w-full py-4 text-center text-base font-semibold">
        {name}
      </h3>
    );
  }

  return (
    <h3 className="bg-background-lighter/60 xs:text-xl w-full py-4 text-center text-base font-semibold">
      <Link href={homePage} target="_blank" className="hover:underline">
        <span className="flex justify-center gap-2">
          {name}
          <ExternalLink className="xs:h-4 xs:w-4 mt-1 h-2.5 w-2.5" />
        </span>
      </Link>
    </h3>
  );
}
