# PRD: Volleyball Clip Highlight Creator

**Author:** Richard Echegaray
**Created:** 2026-03-14
**Target:** Live interview implementation (2026-03-17, ~1 hour)
**Test run:** 2026-03-15

---

## 1. Overview

A feature on the portfolio's Projects page that takes a YouTube link of raw volleyball gameplay footage, sends it to an AI video-understanding model (Google Gemini) to identify highlight moments, then extracts those clips using ffmpeg, stores them in Cloudflare R2, and persists metadata in Supabase. The extracted highlights are displayed as playable video cards on the project detail page.

---

## 2. Goals

- Demonstrate full-stack engineering across video processing, AI integration, cloud storage, and database design
- Show understanding of video encoding pipelines (relevant to the team's domain)
- Build a working end-to-end flow within ~1 hour of live coding
- Produce a feature that lives naturally within the existing portfolio site

---

## 3. User Flow

```
1. User navigates to /projects/volleyball-highlights
2. User pastes a YouTube URL into an input field
3. User clicks "Generate Highlights"
4. System shows a processing state (progress indicator)
5. Backend:
   a. Downloads the YouTube video (yt-dlp)
   b. Sends video to Gemini API for analysis
   c. Gemini returns highlight timestamps + descriptions
   d. ffmpeg extracts each clip segment
   e. Clips are uploaded to Cloudflare R2
   f. Clip metadata is saved to Supabase
6. UI updates to show extracted highlight clips as playable cards
7. Previously generated highlights persist and are visible on page load
```

---

## 4. Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend                          │
│  /projects/volleyball-highlights                     │
│  ┌────────────┐  ┌──────────────────────────────┐   │
│  │ URL Input  │  │ Highlight Cards Grid         │   │
│  │ + Submit   │  │ (playable video cards)       │   │
│  └────────────┘  └──────────────────────────────┘   │
└──────────────┬──────────────────▲────────────────────┘
               │                  │
               ▼                  │
┌──────────────────────────────────────────────────────┐
│              Next.js API Routes                       │
│                                                       │
│  POST /api/highlights/generate                        │
│    1. yt-dlp → download video to /tmp                 │
│    2. Gemini API → analyze video → timestamps         │
│    3. ffmpeg → extract clips                          │
│    4. Upload clips → Cloudflare R2                    │
│    5. Save metadata → Supabase                        │
│                                                       │
│  GET /api/highlights                                  │
│    → Fetch all highlights from Supabase               │
│                                                       │
│  GET /api/highlights/[id]/stream                      │
│    → Proxy stream from R2 (optional, for CORS)        │
└──────────┬────────────┬──────────────┬───────────────┘
           │            │              │
           ▼            ▼              ▼
     ┌──────────┐ ┌──────────┐  ┌───────────┐
     │  Gemini  │ │Cloudflare│  │ Supabase  │
     │   API    │ │    R2    │  │ (Postgres)│
     │          │ │  (video  │  │ (metadata)│
     │  Video   │ │  storage)│  │           │
     │ analysis │ │          │  │           │
     └──────────┘ └──────────┘  └───────────┘
```

---

## 5. Technical Design

### 5.1 Database Schema (Supabase / Postgres)

```sql
-- Source videos that have been processed
CREATE TABLE source_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  youtube_url TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  title TEXT,
  duration_seconds INTEGER,
  processed_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Individual highlight clips extracted from source videos
CREATE TABLE highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_video_id UUID REFERENCES source_videos(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_time REAL NOT NULL,        -- seconds into source video
  end_time REAL NOT NULL,          -- seconds into source video
  duration REAL GENERATED ALWAYS AS (end_time - start_time) STORED,
  r2_key TEXT NOT NULL,            -- object key in R2 bucket
  r2_url TEXT NOT NULL,            -- public URL for playback
  thumbnail_r2_key TEXT,           -- thumbnail image key (stretch goal)
  highlight_type TEXT,             -- 'kill', 'block', 'ace', 'rally', 'dig', etc.
  confidence REAL,                 -- Gemini's confidence score if provided
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_highlights_source ON highlights(source_video_id);
CREATE INDEX idx_highlights_type ON highlights(highlight_type);
```

### 5.2 API Routes

#### `POST /api/highlights/generate`

**Request:**
```json
{
  "youtubeUrl": "https://www.youtube.com/watch?v=..."
}
```

**Response (streaming/SSE for progress updates):**
```json
{
  "sourceVideoId": "uuid",
  "highlights": [
    {
      "id": "uuid",
      "title": "Big cross-court kill",
      "description": "Outside hitter rips a cross-court shot off the block",
      "startTime": 124.5,
      "endTime": 129.0,
      "r2Url": "https://r2.example.com/clips/abc123.mp4",
      "highlightType": "kill"
    }
  ]
}
```

**Processing pipeline (sequential):**

1. **Validate** — check URL format, extract YouTube video ID
2. **Download** — `yt-dlp -f "bestvideo[height<=720]+bestaudio" -o /tmp/{id}.mp4 {url}`
   - Cap at 720p to keep file sizes manageable
   - Reject videos longer than 30 minutes (fetch duration via `yt-dlp --get-duration` before downloading)
3. **Analyze** — Send to Gemini 2.0 Flash (or Pro) with a structured prompt:
   ```
   Analyze this volleyball game footage. Identify the most exciting
   highlight moments (kills, blocks, aces, great digs, long rallies).

   For each highlight, return:
   - start_time (seconds)
   - end_time (seconds)
   - title (short, descriptive)
   - description (1-2 sentences)
   - highlight_type (kill | block | ace | dig | rally | save | other)

   Return as JSON array. Aim for 5-15 highlights.
   Add 2 seconds of buffer before and after each moment.
   ```
4. **Extract** — For each highlight, run ffmpeg:
   ```bash
   ffmpeg -ss {start} -to {end} -i /tmp/{id}.mp4 \
     -c:v libx264 -preset fast -crf 23 \
     -c:a aac -b:a 128k \
     -movflags +faststart \
     /tmp/clips/{clipId}.mp4
   ```
   - `-movflags +faststart` moves the moov atom for web streaming
   - Re-encode to normalize codec/container
5. **Upload** — Upload each clip to R2 via S3-compatible SDK
6. **Persist** — Insert source_video + highlight rows into Supabase
7. **Cleanup** — Delete temp files from /tmp

#### `GET /api/highlights`

Returns all highlights grouped by source video, ordered by most recent.

**Query params (stretch):** `?type=kill&limit=20`

**Response:**
```json
{
  "sourceVideos": [
    {
      "id": "uuid",
      "youtubeUrl": "...",
      "title": "...",
      "processedAt": "...",
      "highlights": [...]
    }
  ]
}
```

### 5.3 Frontend Components

#### Project Page (`/projects/volleyball-highlights`)

This is a **live interactive project page**, not just a static description. It uses the existing project detail page layout but adds interactive components below the description.

```
┌──────────────────────────────────────────┐
│  ← Back to Projects                      │
│                                          │
│  Volleyball Highlight Creator            │
│  [tech tags: Next.js, Gemini, ffmpeg...] │
│                                          │
│  Description text...                     │
│                                          │
│  ┌─────────────────────────────────────┐ │
│  │  🏐 Generate Highlights             │ │
│  │  ┌─────────────────────┐ ┌───────┐ │ │
│  │  │ Paste YouTube URL   │ │ Go    │ │ │
│  │  └─────────────────────┘ └───────┘ │ │
│  └─────────────────────────────────────┘ │
│                                          │
│  ┌─ Processing... ─────────────────────┐ │
│  │  ✓ Downloading video                │ │
│  │  ✓ Analyzing with AI               │ │
│  │  ⟳ Extracting clips (3/8)          │ │
│  │  ○ Uploading to storage             │ │
│  └─────────────────────────────────────┘ │
│                                          │
│  ── Highlights ─────────────────────────  │
│  ┌──────┐ ┌──────┐ ┌──────┐            │
│  │▶ clip│ │▶ clip│ │▶ clip│            │
│  │ Kill │ │ Ace  │ │Rally │            │
│  │ 0:34 │ │ 1:22 │ │ 2:45 │            │
│  └──────┘ └──────┘ └──────┘            │
│  ┌──────┐ ┌──────┐ ┌──────┐            │
│  │▶ clip│ │▶ clip│ │▶ clip│            │
│  │Block │ │ Dig  │ │ Kill │            │
│  │ 5:10 │ │ 7:33 │ │ 9:01 │            │
│  └──────┘ └──────┘ └──────┘            │
└──────────────────────────────────────────┘
```

**New components to build:**

| Component | Purpose |
|-----------|---------|
| `HighlightGenerator` | URL input form + submit button + processing status |
| `HighlightCard` | Playable video card with title, type badge, duration |
| `HighlightGrid` | Responsive grid of HighlightCards |
| `ProcessingStatus` | Step-by-step progress indicator during generation |

### 5.4 Dependencies to Add

| Package | Purpose |
|---------|---------|
| `@google/generative-ai` | Gemini API client (video analysis) |
| `@supabase/supabase-js` | Supabase client (database) |
| `@aws-sdk/client-s3` | S3-compatible client for Cloudflare R2 |

**System dependencies (must be installed on the server/machine):**

| Tool | Purpose |
|------|---------|
| `yt-dlp` | YouTube video download |
| `ffmpeg` | Video clip extraction + encoding |

### 5.5 Environment Variables

```env
# Gemini
GEMINI_API_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# Cloudflare R2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=volleyball-highlights
R2_PUBLIC_URL=          # Custom domain or R2.dev URL for public access
```

---

## 6. Implementation Plan

### 6A. Pre-Work (Sunday test run — 2026-03-15)

Infrastructure, utilities, and validation. Nothing flashy — just making sure every piece works in isolation so Monday is pure building.

#### Accounts & Config
- [x] Create Google AI Studio account, get Gemini API key
- [x] Create Supabase project, run the SQL schema (Section 5.1), get URL + service role key
- [x] Create Cloudflare R2 bucket `volleyball-clips`, create API token, enable public access
- [x] Install yt-dlp and ffmpeg locally, verify both work
- [x] Create `.env.local` with all keys populated
- [x] Add `.env.local` to `.gitignore` (should already be there via Next.js)

#### Utility Modules (client wrappers only — no pipeline logic)
- [x] `lib/gemini.ts` — Initialize Gemini client, export a typed `analyzeVideo(filePath): Promise<Highlight[]>` function
- [x] `lib/supabase.ts` — Initialize Supabase client, export typed query helpers
- [x] `lib/r2.ts` — Initialize S3 client pointing at R2, export `uploadClip(buffer, key): Promise<string>` returning the public URL
- [x] `lib/highlights.ts` — TypeScript types for the highlight pipeline (shared between API routes and frontend)

#### Validation & Prompt Tuning
- [x] Test Gemini prompt with a real ~5-10 min volleyball YouTube video
- [x] Iterate on the prompt until JSON output is reliable and timestamps are accurate
- [x] Test yt-dlp download + ffmpeg extraction manually end-to-end
- [x] Test R2 upload + public URL access
- [x] Test Supabase insert + query
- [x] Find 2-3 good test videos (bookmark URLs for Monday)

**Test Videos:**
- https://www.youtube.com/watch?v=L12P91HEYqM (~24 min, verified working)
- https://www.youtube.com/watch?v=VAl1Nly2IuA
- https://www.youtube.com/watch?v=YGQh9oFnqmM

#### Install Dependencies
- [ ] `npm install @google/generative-ai @supabase/supabase-js @aws-sdk/client-s3`

**End state:** Every external service is proven to work. Utility modules are ready to import. You have tested video URLs bookmarked.

---

### 6B. Live Interview (Monday — 2026-03-17, ~1 hour)

Build the feature end-to-end, assembling pre-tested pieces into a working product. Each phase produces a demoable state so you're never caught with nothing to show.

#### Phase 1: Page + UI (~15 min)
**Goal:** Project page exists with interactive UI, mock data flowing.

- [ ] Add project entry to `projects.ts` with description + tech stack
- [ ] Create `HighlightGenerator` component (URL input + passphrase field + submit)
- [ ] Create `POST /api/highlights/generate` route (accepts URL, returns mock data)
- [ ] Create `HighlightCard` + `HighlightGrid` components (render mock clips)
- [ ] Wire up: submit URL → show mock highlights

**Demoable state:** Interactive page with form submission and rendered cards.

#### Phase 2: Full Pipeline (~25 min)
**Goal:** End-to-end working — real video in, real playable clips out.

This is the core of the interview. You're writing the pipeline orchestration and ffmpeg logic live.

- [ ] Wire yt-dlp download into the API route (with 30-min duration check)
- [ ] Wire Gemini analysis using the pre-built `analyzeVideo()` utility
- [ ] Write ffmpeg clip extraction logic — loop over timestamps, encode each clip:
  ```bash
  ffmpeg -ss {start} -to {end} -i input.mp4 \
    -c:v libx264 -preset fast -crf 23 \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    output.mp4
  ```
- [ ] Upload clips to R2 using the pre-built `uploadClip()` utility
- [ ] Save metadata to Supabase using pre-built helpers
- [ ] Update frontend to display real clips from the API response
- [ ] Add processing status indicator (`ProcessingStatus` component)

**Demoable state:** Paste a YouTube URL → AI analyzes → clips extracted + encoded → stored in R2 → playable in the browser.

#### Phase 3: Polish + Persistence (~15 min)
**Goal:** Highlights survive page reload, error handling, UI polish.

- [ ] Create `GET /api/highlights` to fetch persisted highlights from Supabase
- [ ] Load existing highlights on page mount
- [ ] Add passphrase auth check on the generate endpoint
- [ ] Add error handling (invalid URL, video too long, Gemini failure)
- [ ] Clean up temp files after upload
- [ ] UI polish — loading states, empty states, error messages

**Demoable state:** Full pipeline with cloud persistence, auth gate, and polished UX.

#### If Time Remains (~5 min)
- [ ] Highlight type filter badges (kills, blocks, aces, etc.)
- [ ] Source video linking (click to open YouTube at that timestamp)
- [ ] Thumbnail generation via ffmpeg

---

## 7. Stretch Goals (if time permits or post-interview)

| Feature | Description |
|---------|-------------|
| **Thumbnail generation** | Use ffmpeg to extract a frame from each clip as a poster image |
| **SSE progress streaming** | Stream real-time progress updates to the UI during processing |
| **Highlight type filters** | Filter displayed clips by type (kills, blocks, aces, etc.) |
| **HLS encoding** | Encode clips as HLS segments for adaptive bitrate streaming |
| **Video player polish** | Custom player controls, clip trimming UI, playback speed |
| **Source video linking** | Click a highlight to open the source YouTube video at that timestamp |
| **Batch processing** | Queue multiple YouTube URLs for processing |
| **Duplicate detection** | Skip re-processing if a YouTube URL was already processed |
| **MCP server integration** | Expose the highlight pipeline as an MCP (Model Context Protocol) server so Claude or any MCP-compatible AI client can trigger generation conversationally — e.g., "Generate highlights from this volleyball video: [URL]". The server would expose tools like `generate_highlights(youtube_url)`, `list_highlights(source_video_id?)`, and `get_highlight(id)`. This turns the entire pipeline into an AI-callable tool, letting you manage your highlights library from Claude Code, Claude Desktop, or any MCP client without touching the web UI. |

---

## 8. Abuse Prevention

| Layer | Description |
|-------|-------------|
| **Auth gate** | Only authenticated users can trigger generation. For the interview, use a simple passphrase checked against an env var (`HIGHLIGHTS_PASSPHRASE`). Production upgrade: Supabase Auth so only your account has access. Highlight **viewing** stays public. |
| **Rate limiting** | Cap generation to 3 requests per hour per IP. Use `@upstash/ratelimit` (Redis-based, free tier) or in-memory for demo. |
| **Video length cap** | Reject videos longer than 30 minutes. Check duration via `yt-dlp --get-duration` before downloading. |
| **Budget alerts** | Set spending alerts on Cloudflare R2 and Supabase to catch unexpected usage spikes. |

---

## 9. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Gemini rate limits / slow response | Use Gemini 2.0 Flash (faster, cheaper). Have a fallback mock response ready. |
| Large video download takes too long | Cap video length at 10-15 min for demo. Use 720p max. |
| ffmpeg not available in prod (Vercel) | For the interview, run locally (`next dev`). For prod, use a separate worker/serverless function with ffmpeg layer. |
| yt-dlp breaks on a specific URL | Have a pre-downloaded test video as backup. |
| R2 upload fails | Fall back to serving clips from local `/tmp` for the demo. |
| Gemini returns bad timestamps | Add validation: clamp to video duration, merge overlapping clips, filter out clips < 2s. |

---

## 10. Demo Script (for the interview)

1. **Intro (~2 min):** "I'm building a volleyball highlight creator that uses AI to find the best moments in raw gameplay footage and extract them as individual clips. I've set up the infrastructure and client utilities ahead of time — today I'm building the feature itself."
2. **Walk through the PRD briefly** — show the architecture diagram, explain the pipeline
3. **Phase 1 (~15 min)** — build the project page + UI with mock data
4. **Phase 2 (~25 min)** — write the pipeline orchestration: yt-dlp → Gemini → ffmpeg encoding → R2 upload → Supabase persist. This is the meat — video encoding logic, AI integration, and cloud storage all wired together live.
5. **Phase 3 (~15 min)** — add persistence on page load, auth gate, error handling, UI polish
6. **Wrap up (~3 min):** Demo the working feature end-to-end, discuss what you'd do next (HLS adaptive streaming, job queues for prod, thumbnail generation)

---

## 11. Key Talking Points (for the interview)

- **Why Gemini over other models?** — Native video understanding without frame extraction. Reduces pipeline complexity. Multimodal input means the model sees motion, timing, and context that frame-by-frame approaches miss.
- **Why R2 over S3?** — Zero egress fees for video serving. S3-compatible API so the code is portable. Good fit for a portfolio project's budget.
- **Why re-encode with ffmpeg instead of stream-copying?** — Normalizes codec/container across different YouTube sources. `-movflags +faststart` ensures the moov atom is at the start for progressive web playback. Consistent quality with CRF encoding.
- **Why Supabase?** — Managed Postgres with a generous free tier. Row-level security if you ever want to add auth. Real-time subscriptions could power live progress updates as a stretch goal.
- **Trade-offs:** Running ffmpeg server-side is expensive for prod. In a real system, you'd use a job queue (e.g., BullMQ, Temporal) with dedicated encoding workers, or a managed service like AWS MediaConvert / Mux.
