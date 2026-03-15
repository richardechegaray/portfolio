import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFile } from "fs/promises";
import type { HighlightTimestamp } from "./highlights";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const PROMPT = `Analyze this volleyball game footage. Identify the most exciting highlight moments (kills, blocks, aces, great digs, long rallies, impressive saves).

For each highlight, return:
- start_time (seconds, as a number)
- end_time (seconds, as a number)
- title (short, descriptive)
- description (1-2 sentences)
- highlight_type (one of: kill, block, ace, dig, rally, save, other)

Return ONLY a JSON array of objects. Aim for 5-15 highlights.
Add 2 seconds of buffer before and after each moment.`;

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
