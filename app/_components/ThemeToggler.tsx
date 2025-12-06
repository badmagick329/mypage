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
      <div className="bg-background-lighter flex h-6 w-6 flex-col rounded-md"></div>
    );
  }

  return (
    <div className="flex flex-col">
      {theme === "dark" ? (
        <button
          className="hover:cursor-pointer hover:text-amber-500"
          onClick={() => setTheme("light")}
        >
          <Sun className="hover:scale-110" />
        </button>
      ) : (
        <button
          className="hover:cursor-pointer hover:text-blue-400"
          onClick={() => setTheme("dark")}
        >
          <Moon className="hover:scale-110" />
        </button>
      )}
    </div>
  );
}
