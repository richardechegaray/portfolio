import { config } from "dotenv";
config({ path: ".env.local" });

import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFile } from "fs/promises";

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

async function main() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  console.log("Reading video file...");
  const tmpDir = process.env.TEMP || process.env.TMPDIR || "/tmp";
  const videoData = await readFile(`${tmpDir}/volleyball-test/test-short.mp4`);
  const base64Video = videoData.toString("base64");
  console.log(`Video size: ${(videoData.length / 1024 / 1024).toFixed(1)}MB, base64 size: ${(base64Video.length / 1024 / 1024).toFixed(1)}MB`);

  console.log("Sending to Gemini...");
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
  console.log("\nRaw response:\n", text);

  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    console.error("No JSON array found in response");
    process.exit(1);
  }

  const highlights = JSON.parse(jsonMatch[0]);
  console.log(`\nParsed ${highlights.length} highlights:`);
  highlights.forEach((h: any, i: number) => {
    console.log(`  ${i + 1}. [${h.highlight_type}] ${h.title} (${h.start_time}s - ${h.end_time}s)`);
    console.log(`     ${h.description}`);
  });
}

main().catch(console.error);
