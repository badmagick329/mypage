"use client";

import { useEffect, useRef, useState } from "react";
import "plyr/dist/plyr.css";

interface VideoPlayerProps {
  src: string;
  type?: string;
  title?: string;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
}

export default function VideoPlayer({
  src,
  title,
  type,
  autoplay = false,
  muted = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !videoRef.current) return;

    let player: import("plyr").default | null = null;

    import("plyr").then((PlyrModule) => {
      if (!videoRef.current) return;

      const Plyr = PlyrModule.default;
      player = new Plyr(videoRef.current, {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          "fullscreen",
        ],
        settings: ["captions", "speed", "loop"],
        speed: {
          selected: 1,
          options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
        },
        tooltips: {
          controls: true,
          seek: true,
        },
        autoplay,
        muted,
        blankVideo: "/videos/blankvideo.mp4",
      });
    });

    return () => {
      player?.destroy();
    };
  }, [autoplay, muted, isMounted]);

  if (!isMounted) {
    return (
      <div className="overflow-hidden rounded-md">
        <div className="bg-background-lighter aspect-video w-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md">
      <video
        ref={videoRef}
        controls
        playsInline
        data-poster={`${src}-poster.webp`}
        title={title}
      >
        <source src={src} type={type === "" ? "video/mp4" : type} />
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
}
