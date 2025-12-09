"use client";
import { Avatar } from "@/app/_components/svgs/Avatar";
import { useState } from "react";

export default function WelcomeMessage() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <article className="bg-background-light shadow-welcome-card relative flex max-w-md flex-col rounded-md">
      <Avatar
        size={84}
        className="absolute -top-9 -right-4 -rotate-6"
        isHovering={isHovering}
      />
      <section className="bg-welcome-card-header shadow-welcome-card flex flex-col items-center rounded-t-md py-2 text-center">
        <h3 className="text-foreground-strong text-3xl font-black">HELLO</h3>
        <div
          className="flex w-fit justify-center hover:cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className="font-semibold">My name is</span>
          <HandwrittenName isHovering={isHovering} />
        </div>
      </section>
      <section className="p-4">
        <p>
          I&apos;m a London based software developer and I primarily work on web
          apps. Please feel free to look through some of my{" "}
          <a href="/projects" className="font-semibold hover:underline">
            projects
          </a>
          .
        </p>
        <br />
        <p>
          Say hi to me on the{" "}
          <a href="/contact" className="font-semibold hover:underline">
            contact
          </a>{" "}
          page
        </p>
      </section>
    </article>
  );
}

function HandwrittenName({ isHovering }: { isHovering: boolean }) {
  const fontSize = 56;
  return (
    <svg
      viewBox="0 0 180 60"
      className={`h-auto w-18 transition-all duration-300 ${
        isHovering ? "drop-shadow-2xl" : ""
      }`}
    >
      <g
        style={{
          filter: isHovering
            ? "drop-shadow(0 0 6px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
            : "drop-shadow(0 0 2px rgba(255, 255, 255, 0.4))",
          transition: "filter 150 ease-out",
        }}
      >
        <text
          x="10"
          y="45"
          fontSize={fontSize - 6}
          style={{ fontFamily: "var(--font-caveat), cursive" }}
          fill="currentColor"
          className="text-foreground"
          transform="rotate(-2 25 45)"
        >
          U
        </text>
        <text
          x="40"
          y="48"
          fontSize={fontSize}
          style={{ fontFamily: "var(--font-caveat), cursive" }}
          fill="currentColor"
          className="text-foreground"
          transform="rotate(1 55 48)"
        >
          z
        </text>
        <text
          x="65"
          y="46"
          fontSize={fontSize}
          style={{ fontFamily: "var(--font-caveat), cursive" }}
          fill="currentColor"
          className="text-foreground"
          transform="rotate(-1.5 80 46)"
        >
          a
        </text>
        <text
          x="90"
          y="44"
          fontSize={fontSize}
          style={{ fontFamily: "var(--font-caveat), cursive" }}
          fill="currentColor"
          className="text-foreground"
          transform="rotate(2 105 44)"
        >
          i
        </text>
        <text
          x="110"
          y="47"
          fontSize={fontSize}
          style={{ fontFamily: "var(--font-caveat), cursive" }}
          fill="currentColor"
          className="text-foreground"
          transform="rotate(-0.5 125 47)"
        >
          r
        </text>
      </g>
    </svg>
  );
}
