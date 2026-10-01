import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

type InlinePortfolioVideoProps = {
  project: Project;
  priority?: boolean;
};

export function InlinePortfolioVideo({ project, priority = false }: InlinePortfolioVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
          void video.play().catch(() => setIsPlaying(false));
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.55] },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  if (project.mediaType === "image") {
    return (
      <article className={`inline-project project-${project.aspectRatio}`}>
        <div className="inline-video-frame inline-image-frame">
          <img
            src={project.thumbnail}
            alt={`${project.title} artwork`}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : undefined}
            style={{ objectPosition: project.imagePosition, objectFit: project.imageFit }}
          />
          <div className="inline-image-mark" aria-hidden="true">
            Still / {project.aspectRatio === "portrait" ? "9:16" : "16:9"}
          </div>
        </div>
        <div className="inline-project-caption">
          <h3>{project.title}</h3>
          <span>{project.type}</span>
        </div>
      </article>
    );
  }

  return (
    <article className={`inline-project project-${project.aspectRatio}`}>
      <div className="inline-video-frame">
        <video
          ref={videoRef}
          src={project.videoUrl}
          poster={project.thumbnail}
          muted={isMuted}
          loop
          playsInline
          preload={priority ? "metadata" : "none"}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
          onClick={togglePlayback}
          aria-label={`${project.title} video`}
        />
        <div className="inline-video-scrim" aria-hidden="true" />
        <div className="inline-video-controls" aria-label={`${project.title} video controls`}>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={togglePlayback}
            aria-label={isPlaying ? `Pause ${project.title}` : `Play ${project.title}`}
          >
            {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </Button>
          <span className="video-state">{isPlaying ? "Playing" : "Paused"}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleSound}
            aria-label={isMuted ? `Turn sound on for ${project.title}` : `Mute ${project.title}`}
          >
            {isMuted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
          </Button>
        </div>
      </div>
      <div className="inline-project-caption">
        <h3>{project.title}</h3>
        <span>{project.type}</span>
      </div>
    </article>
  );
}
