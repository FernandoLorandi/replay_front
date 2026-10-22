'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { ProjectSummary } from '@/types/cms';
import { getVideoPlaybackSource } from '@/lib/video';

type ProjectVideoModalProps = {
  project: ProjectSummary | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectVideoModal({
  project,
  isOpen,
  onClose,
}: ProjectVideoModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const playbackSource = getVideoPlaybackSource(project?.videoUrl);

  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], iframe, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) {
        event.preventDefault();
        return;
      }

      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocusedElementRef.current?.isConnected) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [isOpen]);

  if (!isOpen || !project) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8"
      onMouseDown={onClose}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-5xl rounded-3xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl shadow-black/50 md:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-video-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2
            id="project-video-modal-title"
            className="text-2xl font-semibold tracking-tight text-white md:text-4xl"
          >
            {project.title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-zinc-700 text-xl leading-none text-white transition hover:border-zinc-500 hover:bg-zinc-900"
            aria-label="Fechar video"
            onClick={onClose}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="aspect-video overflow-hidden rounded-xl bg-zinc-900">
          {playbackSource?.kind === 'iframe' ? (
            <iframe
              src={playbackSource.src}
              title={`Video completo: ${project.title}`}
              className="size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          ) : playbackSource?.kind === 'video' ? (
            <video
              src={playbackSource.src}
              className="size-full"
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <div className="flex size-full items-center justify-center px-6 text-center text-sm leading-6 text-zinc-400">
              Video indisponivel no momento.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
