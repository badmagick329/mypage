/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

export default function useProjectMediaDisplay({
  mediaListLength,
  isVisible,
}: {
  mediaListLength: number;
  isVisible: boolean;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api || mediaListLength === 1) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, mediaListLength]);

  useEffect(() => {
    if (!api || !isVisible || mediaListLength === 1) {
      return;
    }
    api.reInit();
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
  }, [api, isVisible, mediaListLength]);

  return {
    setApi,
    current,
    count,
  };
}
