import AIIcon from "@/app/_components/svgs/AIIcon";
import CsharpIcon from "@/app/_components/svgs/CsharpIcon";
import DjangoIcon from "@/app/_components/svgs/DjangoIcon";
import DockerIcon from "@/app/_components/svgs/DockerIcon";
import FFmpegIcon from "@/app/_components/svgs/FFmpegIcon";
import GameIcon from "@/app/_components/svgs/GameIcon";
import GoIcon from "@/app/_components/svgs/GoIcon";
import JavascriptIcon from "@/app/_components/svgs/JavascriptIcon";
import NextjsIcon from "@/app/_components/svgs/NextjsIcon";
import PythonIcon from "@/app/_components/svgs/PythonIcon";
import ReactIcon from "@/app/_components/svgs/ReactIcon";
import RedisIcon from "@/app/_components/svgs/RedisIcon";
import RustIcon from "@/app/_components/svgs/RustIcon";
import SqlIcon from "@/app/_components/svgs/SqlIcon";
import TailwindIcon from "@/app/_components/svgs/TailwindIcon";
import TypescriptIcon from "@/app/_components/svgs/TypescriptIcon";

export default function TechIcons({ tech }: { tech: string[] }) {
  return <>{tech.map((t) => getIcon(t))}</>;
}

function getIcon(name: string) {
  const iconSize = `w-3 h-3 sm:w-4 h-4`;
  switch (name.toLocaleLowerCase()) {
    case "next.js":
      return <NextjsIcon key={name} className={iconSize} />;
    case "react":
      return <ReactIcon key={name} className={iconSize} />;
    case "typescript":
      return <TypescriptIcon key={name} className={iconSize} />;
    case "javascript":
      return <JavascriptIcon key={name} className={iconSize} />;
    case "django":
      return <DjangoIcon key={name} className={iconSize} />;
    case "python":
      return <PythonIcon key={name} className={iconSize} />;
    case "rust":
      return (
        <div key={name} className="flex items-center gap-2">
          <RustIcon className={iconSize} />
          <GameIcon className={iconSize} />
        </div>
      );
    case "postgres":
      return <SqlIcon key={name} className={iconSize} />;
    case "sqlite":
      return <SqlIcon key={name} className={iconSize} />;
    case "c#":
      return <CsharpIcon key={name} className={iconSize} />;
    case "go":
      return <GoIcon key={name} className={iconSize} />;
    case "gemini":
      return <AIIcon key={name} className={iconSize} />;
    case "bullmq":
      return <RedisIcon key={name} className={iconSize} />;
    case "docker":
      return <DockerIcon key={name} className={iconSize} />;
    case "tailwind":
      return <TailwindIcon key={name} className={iconSize} />;
    case "ffmpeg":
      return <FFmpegIcon key={name} className={iconSize} />;
    case "three.js":
      return <GameIcon key={name} className={iconSize} />;
    default:
      return null;
  }
}
