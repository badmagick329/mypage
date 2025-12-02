/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Moon from "@/app/_components/svgs/Moon";
import Sun from "@/app/_components/svgs/Sun";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col w-6 h-6 bg-background-lighter rounded-md"></div>
    );
  }

  return (
    <div className="flex flex-col">
      {theme === "dark" ? (
        <button
          className="hover:text-amber-500 hover:cursor-pointer"
          onClick={() => setTheme("light")}
        >
          <Sun />
        </button>
      ) : (
        <button
          className="hover:text-blue-400 hover:cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          <Moon />
        </button>
      )}
    </div>
  );
}
