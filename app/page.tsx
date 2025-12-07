import WelcomeMessage from "@/app/_components/WelcomeMessage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Uzair",
  description:
    "Welcome to my portfolio. I'm a full stack developer who loves solving problems by building software, primarily web applications.",
  openGraph: {
    title: "Uzair | Full Stack Developer",
    description:
      "Welcome to my portfolio. I'm a full stack developer who loves solving problems by building software.",
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="mt-18 px-2">
      <WelcomeMessage />
    </div>
  );
}
