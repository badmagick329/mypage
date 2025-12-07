import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center px-2">
      <div className="container flex max-w-md flex-col items-center">
        <article className="bg-background-light shadow-welcome-card mt-12 flex w-full flex-col rounded-md">
          <section className="bg-welcome-card-header shadow-welcome-card flex flex-col items-center rounded-t-md py-4 text-center">
            <h1 className="text-foreground-strong text-6xl font-black">404</h1>
            <p className="mt-1 font-semibold">Page Not Found</p>
          </section>
          <section className="flex flex-col items-center p-6 text-center">
            <WandIcon className="text-primary mb-4 h-16 w-16 opacity-80" />
            <p className="text-lg">
              Oops! The page you&apos;re looking for doesn&apos;t exist or has
              been moved.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 font-medium transition-colors"
              >
                Go Home
              </Link>
              <Link
                href="/projects"
                className="bg-background hover:bg-accent rounded-md border px-4 py-2 font-medium transition-colors"
              >
                View Projects
              </Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

function WandIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 4V2" />
      <path d="M15 16v-2" />
      <path d="M8 9h2" />
      <path d="M20 9h2" />
      <path d="M17.8 11.8 19 13" />
      <path d="M15 9h.01" />
      <path d="M17.8 6.2 19 5" />
      <path d="m3 21 9-9" />
      <path d="M12.2 6.2 11 5" />
    </svg>
  );
}
