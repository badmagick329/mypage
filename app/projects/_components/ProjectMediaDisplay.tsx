/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ProjectMedia } from "@/app/projects/_components/projects-data";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VideoPlayer from "@/app/projects/_components/VideoPlayer";

export default function ProjectMediaDisplay({
  mediaList,
  isVisible = true,
}: {
  mediaList: ProjectMedia[];
  isVisible?: boolean;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api || mediaList.length === 1) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, mediaList.length]);

  useEffect(() => {
    if (!api || !isVisible || mediaList.length === 1) {
      return;
    }
    api.reInit();
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
  }, [api, isVisible, mediaList.length]);

  if (mediaList.length === 1) {
    const m = mediaList[0];
    return (
      <div className="mx-auto w-full max-w-xl">
        {m.type.startsWith("video") ? (
          <div className="flex flex-col items-center gap-1 text-center">
            <VideoPlayer src={m.url} />
            {m.text && (
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
        {mediaList.map((m) => {
          return m.type.startsWith("video") ? (
            <CarouselItem key={m.url}>
              <div className="flex flex-col gap-1 text-center">
                <VideoPlayer src={m.url} muted />
                {count > 1 && (
                  <span className="text-foreground-muted text-xs sm:text-sm">
                    {current} of {count}
                  </span>
                )}
                {m.text && (
                  <span className="mt-1 text-xs sm:text-sm">{m.text}</span>
                )}
              </div>
            </CarouselItem>
          ) : null;
        })}
      </CarouselContent>
      {current > 1 && (
        <div className="absolute top-1/2 left-2 flex items-center justify-center">
          <CarouselPrevious
            variant={"ghost"}
            className="bg-primary/80 hover:bg-primary/65! relative left-0 translate-x-0 hover:translate-x-0 hover:cursor-pointer"
          />
        </div>
      )}
      {current < count && (
        <div className="absolute top-1/2 right-2 flex items-center justify-center">
          <CarouselNext
            variant={"ghost"}
            className="bg-primary/80 hover:bg-primary/65! relative right-0 translate-x-0 hover:translate-x-0 hover:cursor-pointer"
          />
        </div>
      )}
    </Carousel>
  );
}
