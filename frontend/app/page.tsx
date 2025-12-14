import RecentActivity from "@/app/_components/RecentActivity";
import WelcomeMessage from "@/app/_components/WelcomeMessage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Uzair Farooqi",
  description:
    "Welcome to my portfolio. I'm a full stack developer who loves solving problems by building software, primarily web applications.",
  keywords: [
    "full stack developer",
    "web developer",
    "software developer",
    "programmer",
    "portfolio",
  ],
  openGraph: {
    title: "Uzair Farooqi | Full Stack Developer",
    description:
      "Welcome to my portfolio. I'm a full stack developer who loves solving problems by building software, primarily web applications.",
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="flex grow flex-col items-center justify-between gap-4 px-2 pt-18 pb-8">
      <WelcomeMessage />
      <RecentActivity />
    </div>
  );
}
