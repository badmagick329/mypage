"use client";
import { Avatar } from "@/app/_components/svgs/Avatar";
import { useState } from "react";

export default function WelcomeMessage() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <article className="bg-background-light shadow-card relative flex max-w-md flex-col rounded-md">
      <Avatar
        size={84}
        className="absolute -top-9 -right-4 -rotate-6"
        isHovering={isHovering}
      />
      <section className="bg-background-lighter/60 py-2 text-center">
        <h3 className="text-foreground-strong text-3xl font-black">HELLO</h3>
        <div
          className="flex justify-center gap-2 hover:cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className="font-semibold">My name is</span>
          <HandwrittenName isHovering={isHovering} />
        </div>
      </section>
      <section className="p-4">
        <p>
          I like solving problems by building software. I primarily work on web
          apps. Please feel free to look through some of my projects.
        </p>
        <br />
        <p>Check out the contact page if you&apos;d like to get in touch.</p>
      </section>
    </article>
  );
}

function HandwrittenName({ isHovering }: { isHovering: boolean }) {
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
          fontSize="48"
          fontFamily="cursive"
          fontStyle="italic"
          fill="currentColor"
          className="text-foreground"
          transform="rotate(-2 25 45)"
        >
          m
        </text>
        <text
          x="40"
          y="48"
          fontSize="48"
          fontFamily="cursive"
          fontStyle="italic"
          fill="currentColor"
          className="text-foreground"
          transform="rotate(1 55 48)"
        >
          a
        </text>
        <text
          x="65"
          y="46"
          fontSize="48"
          fontFamily="cursive"
          fontStyle="italic"
          fill="currentColor"
          className="text-foreground"
          transform="rotate(-1.5 80 46)"
        >
          g
        </text>
        <text
          x="90"
          y="44"
          fontSize="48"
          fontFamily="cursive"
          fontStyle="italic"
          fill="currentColor"
          className="text-foreground"
          transform="rotate(2 105 44)"
        >
          i
        </text>
        <text
          x="110"
          y="47"
          fontSize="48"
          fontFamily="cursive"
          fontStyle="italic"
          fill="currentColor"
          className="text-foreground"
          transform="rotate(-0.5 125 47)"
        >
          c
        </text>
        <text
          x="135"
          y="45"
          fontSize="48"
          fontFamily="cursive"
          fontStyle="italic"
          fill="currentColor"
          className="text-foreground"
          transform="rotate(1.5 150 45)"
        >
          k
        </text>
      </g>
    </svg>
  );
}
