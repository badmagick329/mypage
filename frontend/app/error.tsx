"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex w-full flex-col items-center px-2">
      <div className="container flex max-w-md flex-col items-center">
        <article className="bg-background-light shadow-welcome-card mt-12 flex w-full flex-col rounded-md">
          <section className="bg-destructive/20 shadow-welcome-card flex flex-col items-center rounded-t-md py-4 text-center">
            <h1 className="text-foreground-strong text-6xl font-black">
              Oops!
            </h1>
            <p className="mt-1 font-semibold">Something went wrong</p>
          </section>
          <section className="flex flex-col items-center p-6 text-center">
            <AlertIcon className="text-destructive mb-4 h-16 w-16 opacity-80" />
            <p className="text-lg">
              Looks like we encountered an unexpected error. Please try again.
            </p>
            {error.digest && (
              <p className="text-muted-foreground mt-2 text-sm">
                Error ID: {error.digest}
              </p>
            )}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button
                onClick={reset}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 font-medium transition-colors hover:cursor-pointer"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="bg-background hover:bg-accent rounded-md border px-4 py-2 font-medium transition-colors"
              >
                Go Home
              </Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

function AlertIcon({ className }: { className?: string }) {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
