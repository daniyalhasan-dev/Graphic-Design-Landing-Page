import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Maximize, Pause, Play, Volume2, X } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectViewerProps = {
  project: Project;
  projectNumber: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function ProjectViewer({
  project,
  projectNumber,
  total,
  onClose,
  onPrevious,
  onNext,
}: ProjectViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
      if (event.code === "Space") {
        event.preventDefault();
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) void video.play();
        else video.pause();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, onNext, onPrevious]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) video.muted = !video.muted;
  };

  const requestFullscreen = () => {
    const video = videoRef.current;
    if (video?.requestFullscreen) void video.requestFullscreen();
  };

  return (
    <div className="project-viewer" role="dialog" aria-modal="true" aria-label={project.title}>
      <header className="viewer-header">
        <button className="text-control" type="button" onClick={onClose}>
          <ArrowLeft aria-hidden="true" /> Back to work
        </button>
        <span className="viewer-count">{String(projectNumber).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <button className="icon-control" type="button" onClick={onClose} aria-label="Close project">
          <X aria-hidden="true" />
        </button>
      </header>

      <div className={`viewer-stage viewer-stage-${project.aspectRatio}`}>
        <video
          ref={videoRef}
          key={project.id}
          poster={project.thumbnail}
          src={project.videoUrl}
          playsInline
          preload="metadata"
        />
        <div className="video-controls" aria-label="Video controls">
          <button className="icon-control" type="button" onClick={togglePlayback} aria-label="Play or pause">
            <Play className="play-state" aria-hidden="true" />
            <Pause className="pause-state" aria-hidden="true" />
          </button>
          <div className="video-progress" aria-hidden="true"><span /></div>
          <button className="icon-control" type="button" onClick={toggleMute} aria-label="Mute or unmute">
            <Volume2 aria-hidden="true" />
          </button>
          <button className="icon-control" type="button" onClick={requestFullscreen} aria-label="Enter fullscreen">
            <Maximize aria-hidden="true" />
          </button>
        </div>
      </div>

      <section className="viewer-details">
        <div className="viewer-title-wrap">
          <span className="eyebrow">Project {String(projectNumber).padStart(2, "0")}</span>
          <h2>{project.title}</h2>
        </div>
        <dl className="project-meta">
          <div><dt>Type</dt><dd>{project.type}</dd></div>
        </dl>
      </section>

      <nav className="viewer-navigation" aria-label="Project navigation">
        <button type="button" onClick={onPrevious}><ArrowLeft aria-hidden="true" /><span>Previous project</span></button>
        <button type="button" onClick={onNext}><span>Next project</span><ArrowRight aria-hidden="true" /></button>
      </nav>
    </div>
  );
}