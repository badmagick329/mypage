"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import VideoPlayer from "@/app/projects/_components/VideoPlayer";
import useProjectMediaDisplay from "@/hooks/projects/useProjectMediaDisplay";
import { ProjectMedia } from "@/lib/types";

export default function ProjectMediaDisplay({
  mediaList,
  isVisible = true,
}: {
  mediaList: ProjectMedia[];
  isVisible?: boolean;
}) {
  const { setApi, current, count } = useProjectMediaDisplay({
    mediaListLength: mediaList.length,
    isVisible,
  });

  if (mediaList.length === 1) {
    const m = mediaList[0];
    return (
      <div className="mx-auto w-full max-w-xl">
        {m.type.startsWith("video") ? (
          <div className="flex flex-col items-center gap-1 text-center">
            <VideoPlayer src={m.url} />
            {m.text.length > 0 && (
              <span className="mt-1 text-xs sm:text-sm">{m.text}</span>
            )}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <Carousel setApi={setApi} className="mx-auto w-full max-w-xl">
      <CarouselContent className="flex items-center">
        {mediaList.map((m) =>
          m.type.startsWith("video") ? (
            <CarouselItem key={m.url}>
              <div className="flex flex-col gap-1 text-center">
                <VideoPlayer src={m.url} muted />
                {count > 1 && (
                  <span className="text-foreground-muted text-xs sm:text-sm">
                    {current} of {count}
                  </span>
                )}
                {m.text.length > 0 && (
                  <span className="mt-1 text-xs sm:text-sm">{m.text}</span>
                )}
              </div>
            </CarouselItem>
          ) : null,
        )}
      </CarouselContent>
      {current > 1 && (
        <div className="absolute top-1/2 left-2 flex items-center justify-center">
          <CarouselPrevious
            variant={"ghost"}
            className="bg-primary/80 hover:bg-primary/65! text-background-lighter dark:text-foreground-strong hover:text-background-lighter dark:hover:text-foreground-strong relative left-0 translate-x-0 hover:translate-x-0 hover:cursor-pointer"
          />
        </div>
      )}
      {current < count && (
        <div className="absolute top-1/2 right-2 flex items-center justify-center">
          <CarouselNext
            variant={"ghost"}
            className="bg-primary/80 hover:bg-primary/65! text-background-lighter dark:text-foreground-strong dark:hover:text-background-lighter hover:text-foreground-strong relative left-0 translate-x-0 hover:translate-x-0 hover:cursor-pointer"
          />
        </div>
      )}
    </Carousel>
  );
}
