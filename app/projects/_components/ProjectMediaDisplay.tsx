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

export default function ProjectMediaDisplay({
  mediaList,
}: {
  mediaList: ProjectMedia[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} className="mx-auto w-full max-w-xl">
      <CarouselContent className="flex items-center">
        {mediaList.map((m) => {
          return m.type.startsWith("video") ? (
            <CarouselItem key={m.url}>
              <div className="flex flex-col gap-1 text-center">
                <video muted controls>
                  <source src={m.url} type={m.type} />
                </video>
                {count > 0 && (
                  <span className="text-foreground-muted text-xs sm:text-sm">
                    {current} of {count}
                  </span>
                )}
                <span className="mt-1 text-xs sm:text-sm">{m.text}</span>
              </div>
            </CarouselItem>
          ) : null;
        })}
      </CarouselContent>
      {current > 1 && (
        <div className="absolute top-1/2 left-2 flex items-center justify-center">
          <CarouselPrevious className="hover:bg-primary/95 relative left-0 translate-x-0 hover:translate-x-0" />
        </div>
      )}
      {current < count && (
        <div className="absolute top-1/2 right-2 flex items-center justify-center">
          <CarouselNext className="hover:bg-primary/95 relative right-0 translate-x-0 hover:translate-x-0" />
        </div>
      )}
    </Carousel>
  );
}
