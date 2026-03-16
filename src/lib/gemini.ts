import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFile } from "fs/promises";
import type { HighlightTimestamp } from "./highlights";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const PROMPT = `Analyze this volleyball game footage carefully. Identify ONLY the top 10 most exciting highlight moments where a clear play is completed — a point is scored, a big block is made, an ace lands, or an incredible save/dig happens.

Rules:
- Be VERY precise with timestamps. Watch closely for when the play actually starts and ends.
- Each clip should capture the full rally or play leading to the highlight, not just a random moment.
- Do NOT include dead time, timeouts, or moments where nothing exciting is happening.
- Do NOT guess timestamps — only include moments you are confident about.
- Keep clips between 5-15 seconds long.
- Maximum 10 highlights. Pick only the best. Quality over quantity.

For each highlight, return:
- start_time (seconds, as a number — when the rally/play begins)
- end_time (seconds, as a number — shortly after the point is scored)
- title (short, descriptive — e.g. "Cross-court kill" not "Player hits ball")
- description (1-2 sentences describing what actually happens)
- highlight_type (one of: kill, block, ace, dig, rally, save, other)

Return ONLY a valid JSON array of objects, add 2 seconds of buffer after each highlight. No other text.`;

export async function analyzeVideo(
  filePath: string
): Promise<HighlightTimestamp[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const videoData = await readFile(filePath);
  const base64Video = videoData.toString("base64");

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: "video/mp4",
        data: base64Video,
      },
    },
    { text: PROMPT },
  ]);

  const text = result.response.text();

  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error("Gemini response did not contain a JSON array");
  }

  const highlights: HighlightTimestamp[] = JSON.parse(jsonMatch[0]);
  return highlights;
}
