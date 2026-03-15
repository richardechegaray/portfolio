export type HighlightType =
  | "kill"
  | "block"
  | "ace"
  | "dig"
  | "rally"
  | "save"
  | "other";

export interface HighlightTimestamp {
  start_time: number;
  end_time: number;
  title: string;
  description: string;
  highlight_type: HighlightType;
}

export interface Highlight {
  id: string;
  source_video_id: string;
  title: string;
  description: string | null;
  start_time: number;
  end_time: number;
  duration: number;
  r2_key: string;
  r2_url: string;
  highlight_type: HighlightType | null;
  confidence: number | null;
  created_at: string;
}

export interface SourceVideo {
  id: string;
  youtube_url: string;
  youtube_id: string;
  title: string | null;
  duration_seconds: number | null;
  processed_at: string;
  status: "processing" | "completed" | "failed";
  created_at: string;
  highlights?: Highlight[];
}

export type PipelineStep =
  | "downloading"
  | "analyzing"
  | "extracting"
  | "uploading"
  | "saving";

export interface PipelineProgress {
  step: PipelineStep;
  detail?: string;
  clipProgress?: { current: number; total: number };
}
