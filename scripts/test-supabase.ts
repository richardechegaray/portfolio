import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  // Insert a test source video
  const { data: video, error: insertError } = await supabase
    .from("source_videos")
    .insert({
      youtube_url: "https://www.youtube.com/watch?v=test123",
      youtube_id: "test123",
      title: "Test Video",
      duration_seconds: 120,
      status: "completed",
    })
    .select()
    .single();

  if (insertError) {
    console.error("Insert failed:", insertError);
    process.exit(1);
  }
  console.log("Inserted source video:", video.id);

  // Insert a test highlight
  const { data: highlight, error: hlError } = await supabase
    .from("highlights")
    .insert({
      source_video_id: video.id,
      title: "Test Kill",
      description: "A test highlight",
      start_time: 10.0,
      end_time: 15.0,
      r2_key: "clips/test.mp4",
      r2_url: "https://example.com/clips/test.mp4",
      highlight_type: "kill",
    })
    .select()
    .single();

  if (hlError) {
    console.error("Highlight insert failed:", hlError);
    process.exit(1);
  }
  console.log("Inserted highlight:", highlight.id, "duration:", highlight.duration);

  // Query back
  const { data: videos, error: queryError } = await supabase
    .from("source_videos")
    .select("*, highlights(*)")
    .eq("id", video.id);

  if (queryError) {
    console.error("Query failed:", queryError);
    process.exit(1);
  }
  console.log("Queried back:", JSON.stringify(videos, null, 2));

  // Clean up
  await supabase.from("highlights").delete().eq("id", highlight.id);
  await supabase.from("source_videos").delete().eq("id", video.id);
  console.log("Cleaned up test data. Supabase is working!");
}

main().catch(console.error);
