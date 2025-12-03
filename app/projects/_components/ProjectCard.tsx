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
    <article className="bg-background-light shadow-card @container flex w-full flex-col items-start gap-4 overflow-hidden rounded-md">
      <section className="bg-background-lighter w-full py-4 text-center">
        <Heading name={name} homePage={homePage} />
      </section>
      <div className="flex flex-col gap-8 px-2">
        <p className="text-foreground-muted text-sm @xs:text-base">
          {description}
        </p>
        <section className="flex flex-col gap-1">
          <span className="text-base font-bold @xs:text-lg">Why?</span>
          <span className="text-sm @xs:text-base">{why}</span>
        </section>
      </div>
      <footer className="flex grow flex-col justify-end gap-2 px-2 py-4">
        <section className="flex flex-col gap-1">
          <h3 className="text-base font-semibold @xs:text-xl">Tech</h3>
          <ul className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <li
                className="bg-background-lighter text-foreground-strong rounded-md px-2 py-1 text-xs @xs:text-sm"
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
          className="text-foreground-muted text-xs hover:underline @xs:text-sm"
        >
          <span className="flex gap-2">
            {`https://github.com/badmagick329/${githubProjectName}`}
            <ExternalLink className="xs:w-2.5 mt-1 h-2 w-2 @xs:h-2.5" />
          </span>
        </Link>
      </footer>
    </article>
  );
}

function Heading({ name, homePage }: { name: string; homePage?: string }) {
  if (!homePage) {
    return <h3 className="text-base font-semibold @xs:text-xl">{name}</h3>;
  }

  return (
    <h3 className="text-foreground-strong text-base font-semibold @xs:text-xl">
      <Link href={homePage} target="_blank" className="hover:underline">
        <span className="flex justify-center gap-2">
          {name}
          <ExternalLink className="xs:w-4 mt-1 h-2.5 w-2.5 @xs:h-4" />
        </span>
      </Link>
    </h3>
  );
}
