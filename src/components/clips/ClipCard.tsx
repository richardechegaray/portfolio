"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Clip } from "@/lib/types";

interface ClipCardProps {
  clip: Clip;
}

export function ClipCard({ clip }: ClipCardProps) {
  return (
    <motion.a
      href={clip.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group block rounded-xl border border-border bg-surface overflow-hidden transition-colors hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-800 flex items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/80 text-white group-hover:bg-accent transition-colors">
          <Play size={20} className="ml-0.5" />
        </div>
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
    </motion.a>
  );
}
