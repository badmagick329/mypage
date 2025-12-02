import FFmpegTuiScreenshot from "@/public/images/tui_screenshot.png";
import Image from "next/image";

export default function Projects() {
  return (
    <div className="px-2">
      <h1 className="my-8 text-center text-3xl font-black">Projects</h1>
      <div className="grid-cols-1 md:grid-cols-3">
        <article className="bg-background-light shadow-card flex flex-col gap-4 overflow-hidden rounded-md">
          <h3 className="bg-background-lighter/60 py-4 text-center text-xl font-semibold">
            FFmpeg Service
          </h3>
          <p className="text-foreground-muted px-2">This is a description</p>
          <section className="flex flex-col gap-2 px-2">
            <span className="text-lg font-bold">Why?</span>
            <span>Encode Videos</span>
          </section>
          <section className="p-2">
            <Image
              src={FFmpegTuiScreenshot}
              alt="FFmpeg TUI Screenshot"
              className="w-lg"
              unoptimized
            />
          </section>
          <section className="flex flex-col gap-2 px-2 pb-2">
            <h3 className="text-xl font-semibold">Tech Stack</h3>
            <ul className="flex gap-2">
              <li>Typescript</li>
              <li>Bun</li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
