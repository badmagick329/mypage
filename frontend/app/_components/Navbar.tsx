"use client";
import ThemeToggler from "@/app/_components/ThemeToggler";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const path = usePathname();
  return (
    <nav className="bg-background-light sticky top-0 z-10 w-full">
      <div className="grid grid-cols-3 items-center">
        <div></div>
        <ul className="xs:text-xl xs:gap-4 xs:font-bold flex justify-center gap-2 py-4 text-base font-semibold">
          <li>
            <NavLink text="Home" href="/" isActive={path === "/"} />
          </li>
          <li>
            <NavLink
              text="Projects"
              href="/projects"
              isActive={path === "/projects"}
            />
          </li>
          <li>
            <NavLink
              text="Contact"
              href="/contact"
              isActive={path === "/contact"}
            />
          </li>
        </ul>
        <div className="xs:pr-4 justify-self-end pr-1">
          <ThemeToggler />
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  text,
  href,
  isActive,
}: {
  text: string;
  href: string;
  isActive: boolean;
}) {
  if (!isActive) {
    return (
      <Link
        className="hover:text-primary xs:px-4 inline-block rounded-md px-2 text-shadow-2xs hover:cursor-pointer"
        href={href}
      >
        <span className="inline-block transition-transform hover:scale-110">
          {text}
        </span>
      </Link>
    );
  }
  return (
    <span className="xs:px-4 text-primary-muted inline-block rounded-md px-2 select-none text-shadow-2xs">
      {text}
    </span>
  );
}
