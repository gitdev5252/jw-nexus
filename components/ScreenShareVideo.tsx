import React from "react";
import { Track } from "livekit-client";

export function ScreenShareVideo({ track }: { track: Track | null }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (!track || !videoRef.current) return;
    track.attach(videoRef.current);
    return () => {
      track.detach(videoRef.current!);
    };
  }, [track]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="absolute top-0 left-0 w-full h-full object-contain"
    />
  );
}
