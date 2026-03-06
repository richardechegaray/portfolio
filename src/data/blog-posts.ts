import type { BlogPost } from "@/lib/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "building-this-site",
    title: "How I Built This Portfolio",
    date: "March 2026",
    excerpt:
      "A quick look at the tech stack and design decisions behind this site.",
    content: `
      <p>I wanted a portfolio that felt like <em>me</em> — not a template, not a wall of text, just something fun to scroll through. So I built this from scratch with Next.js, Tailwind, and Framer Motion.</p>

      <h2>The Stack</h2>
      <p>Next.js 16 with App Router handles routing and static generation. Tailwind v4 keeps styling fast and consistent. Framer Motion powers the scroll-linked animations — the parallax hero, the growing timeline line, and the card fade-ins. Lenis gives everything that smooth, buttery scroll feel.</p>

      <h2>The Timeline</h2>
      <p>The homepage timeline is the centerpiece. Each card animates in as you scroll, with a progress line that grows down the center. I went with a zigzag layout on desktop (cards alternate left and right) and a single column on mobile. Each event type — career, education, personal — gets its own color accent so you can scan quickly.</p>

      <h2>The Space Theme</h2>
      <p>I've always loved space aesthetics. The background has multiple star layers with different parallax speeds, plus random shooting stars. A custom rocket SVG cursor replaces the default pointer, and a spotlight glow follows your mouse around the page. It's all CSS and JS — no heavy libraries.</p>

      <h2>What's Next</h2>
      <p>I'll keep adding clips and blog posts as I go. The whole thing is open source on <a href="https://github.com/richardechegaray/portfolio" target="_blank" rel="noopener noreferrer">GitHub</a> if you want to poke around.</p>
    `,
    tags: ["Next.js", "Web Dev", "Design"],
    readingTime: "2 min read",
  },
  {
    slug: "three-years-at-meta",
    title: "What I Learned in 3 Years at Meta",
    date: "March 2026",
    excerpt:
      "Reflections on building audio systems for Ray-Ban Meta smart glasses, Oakley smart glasses, and more at Reality Labs.",
    content: `
      <p>I joined Meta straight out of UBC in August 2022, moved to San Francisco, and spent three years on the Audio Systems team at Reality Labs — building the audio platform for products like the Ray-Ban Meta smart glasses, Ray-Ban Meta Display, and Oakley smart glasses. Here's what I actually learned.</p>

      <h2>Your Code Runs on Someone's Face</h2>
      <p>Most of my work was in C++ and Java on the DSP, AHAL (audio hardware abstraction layer), and audio platform layer. I worked on things like Adaptive Volume Control, earcon systems, audio ducking policies, and the communication protocols between the main processor and microcontroller. When your code runs on a tiny chip inside a pair of sunglasses that someone wears all day, the constraints are unforgiving — every millisecond of latency and every milliwatt of power draw matters. You can't just make something work. You have to make it work within a power budget, on limited hardware, shipping to millions of people. Engineering Physics taught me how to think about systems. Meta taught me how to think about constraints.</p>

      <h2>Concurrency Will Humble You</h2>
      <p>One of my biggest areas of ownership was audio concurrency — making sure that music, phone calls, voice assistants, video recording, and system sounds all played nicely together on the glasses. What happens when you're listening to music, a phone call comes in, and you start recording a video? Every one of those scenarios needed to be defined, implemented, and tested. I ended up building a master document tracking every concurrency scenario across multiple products, checking for parity, and driving the ones that weren't working to completion. Multithreaded audio bugs don't show up in your unit tests — they show up when someone's on a call and their volume gets stuck at zero. I learned to respect shared state, to be paranoid about race conditions, and to test obsessively on real hardware.</p>

      <h2>Ownership Sneaks Up on You</h2>
      <p>When I started, I needed guidance on what to work on next. By my third year, cross-functional teams were routing volume and concurrency bugs directly to me as the point of contact. That shift didn't happen overnight. It came from saying yes to oncall tasks (one shift I handled 30+ issues), digging into unfamiliar parts of the stack to understand how things actually worked, and writing documentation so others wouldn't have to go through the same pain. One of the projects I'm proudest of was being the sole engineer responsible for the earcon refresh across all product families — working directly with the Creative Audio team through multiple iterations, landing changes across every product branch, and making sure nothing regressed. It wasn't glamorous work, but it was mine.</p>

      <h2>Testing Is a Culture, Not a Chore</h2>
      <p>I helped drive our audio team's code coverage from 35% to 66%, and was the DRI for coverage in one of our key branches. I was a top contributor during our first test sprint and ended up creating guidance documents to help other teams across the org maintain their coverage through a major platform migration. The lesson wasn't just "write more tests" — it was that testing culture compounds. When you make it easy and expected, the whole team's code gets more reliable.</p>

      <h2>Scale Changes How You Think</h2>
      <p>In school, shipping means your professor runs your code once. At Meta, a change I made could end up on millions of devices worldwide. That shift changes how you approach everything — you write better tests, you think harder about edge cases, you ask more questions in code review. I helped resolve SEVs where the DSP was crashing, debugged protocol-level packet mismatches on dev boards, and shipped features gated behind careful rollout mechanisms. I broke things. Sometimes in production. Every time, I learned something I wouldn't have learned any other way.</p>

      <h2>The People Make It</h2>
      <p>The best part of Meta was the cross-functional collaboration. I worked closely with engineers on CoreOS, System UX, connectivity, and interfaces teams to debug issues and ship features. Senior engineers would sit with you for an hour to walk through a tricky audio pipeline, and teammates would push back on your design doc because they cared about getting it right. I gave knowledge-sharing presentations on infrastructure work I'd done, wrote wiki guides for future engineers, and tried to make onboarding easier for the next person. That culture of open feedback made me significantly better than I was walking in.</p>

      <h2>Moving On</h2>
      <p>After three years, I felt ready for a change. I'm proud of what I shipped — millions of people are wearing the products I helped build. I went from needing task assignments to owning entire workstreams independently. I'm grateful for the friendships, the mentorship, and the lessons I'll carry forward. Now I'm back in Vancouver, excited to find the next thing worth building.</p>
    `,
    tags: ["Career", "Meta", "Reflection"],
    readingTime: "5 min read",
  },
];