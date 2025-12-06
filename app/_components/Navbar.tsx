import ThemeToggler from "@/app/_components/ThemeToggler";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="bg-background-light w-full">
      <div className="grid grid-cols-3 items-center">
        <div></div>
        <ul className="xs:text-lg xs:gap-4 flex justify-center gap-2 py-4 text-base font-semibold">
          <li>
            <NavLink text="Home" href="/" />
          </li>
          <li>
            <NavLink text="Projects" href="/projects" />
          </li>
          <li>
            <NavLink text="Contact" href="/contact" />
          </li>
        </ul>
        <div className="xs:pr-4 justify-self-end pr-1">
          <ThemeToggler />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ text, href }: { text: string; href: string }) {
  return (
    <Link
      className="hover:text-primary xs:px-4 rounded-md px-2 py-2 text-shadow-2xs hover:cursor-pointer"
      href={href}
    >
      <span className="inline-block transition-transform hover:scale-110">
        {text}
      </span>
    </Link>
  );
}
