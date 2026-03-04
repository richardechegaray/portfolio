"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Clip } from "@/lib/types";

interface ClipCardProps {
  clip: Clip;
}

function getYouTubeEmbedUrl(url: string): string | null {
  // Handle standard youtube URLs
  const videoMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
  );
  if (videoMatch) {
    return `https://www.youtube.com/embed/${videoMatch[1]}`;
  }

  // For clip URLs, link out directly (clips can't be embedded)
  return null;
}

export function ClipCard({ clip }: ClipCardProps) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(clip.videoUrl);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group block rounded-xl border border-border bg-surface overflow-hidden transition-colors hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
    >
      {/* Video / Thumbnail */}
      <div className="relative aspect-video bg-gray-800">
        {playing && embedUrl ? (
          <iframe
            src={`${embedUrl}?autoplay=1${clip.startTime != null ? `&start=${clip.startTime}` : ""}${clip.endTime != null ? `&end=${clip.endTime}` : ""}`}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <a
            href={embedUrl ? undefined : clip.videoUrl}
            target={embedUrl ? undefined : "_blank"}
            rel={embedUrl ? undefined : "noopener noreferrer"}
            onClick={embedUrl ? () => setPlaying(true) : undefined}
            className="flex h-full w-full items-center justify-center cursor-pointer relative"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={clip.thumbnailUrl}
              alt={clip.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent/80 text-white group-hover:bg-accent transition-colors">
              <Play size={20} className="ml-0.5" />
            </div>
          </a>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display text-sm font-semibold text-foreground">
          {clip.title}
        </h3>
        {clip.description && (
          <p className="mt-1 text-xs text-muted line-clamp-2">
            {clip.description}
          </p>
        )}
        <span className="mt-2 block text-xs text-muted">{clip.date}</span>
      </div>
    </motion.div>
  );
}