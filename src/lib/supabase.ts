import { createClient } from "@supabase/supabase-js";
import type { Highlight, SourceVideo } from "./highlights";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function insertSourceVideo(video: {
  youtube_url: string;
  youtube_id: string;
  title?: string;
  duration_seconds?: number;
}): Promise<SourceVideo> {
  const { data, error } = await supabase
    .from("source_videos")
    .insert(video)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSourceVideoStatus(
  id: string,
  status: "processing" | "completed" | "failed"
) {
  const { error } = await supabase
    .from("source_videos")
    .update({ status })
    .eq("id", id);

  if (error) throw error;
}

export async function insertHighlights(
  highlights: Omit<Highlight, "id" | "duration" | "created_at">[]
) {
  const { data, error } = await supabase
    .from("highlights")
    .insert(highlights)
    .select();

  if (error) throw error;
  return data;
}

export async function getHighlightsGroupedByVideo(): Promise<SourceVideo[]> {
  const { data: videos, error: videoError } = await supabase
    .from("source_videos")
    .select("*")
    .eq("status", "completed")
    .order("processed_at", { ascending: false });

  if (videoError) throw videoError;

  const { data: highlights, error: highlightError } = await supabase
    .from("highlights")
    .select("*")
    .in("source_video_id", videos.map((v: SourceVideo) => v.id));

  if (highlightError) throw highlightError;

  return videos.map((video: SourceVideo) => ({
    ...video,
    highlights: highlights.filter(
      (h: Highlight) => h.source_video_id === video.id
    ),
  }));
}
