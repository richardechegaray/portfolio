import type { TimelineEvent } from "@/lib/types";

export const timelineEvents: TimelineEvent[] = [
  {
    id: "meta",
    date: "August 2022",
    year: 2022,
    title: "Joined Meta as a Software Engineer",
    icon: "♾️",
    description:
      "Built the audio systems powering Ray-Ban Meta smart glasses.",
    image: "/images/meta.jpg",
    tags: ["C++", "Python", "DSP", "Audio", "AR/VR", "Platform Engineering"],
    type: "career",
  },
  {
    id: "dog-dad",
    date: "August 2022",
    year: 2022,
    title: "Adopted Penny!",
    icon: "🐶",
    description:
      "When I moved to SF I knew I wanted to rescue a dog ASAP. I ended up getting a puppy before having a couch, tv, or bed 🤣 best decision ever",
    longDescription:
      "When I moved to the Bay Area for Meta, the very first thing on my mind was rescuing a dog. I ended up adopting Penny before I even had a couch, TV, or bed — and it was the best decision I've ever made.\n\nPenny is a Husky Shepherd mix I rescued from a the SF SPCA. She was 3 months old when I brought her home. She immediately became my adventure buddy — hikes, beach trips, road trips up and down the California coast.\n\nShe's destroyed more shoes than I can count, stolen food off the counter more times than I'd like to admit, and somehow always manages to take up the entire bed. Wouldn't trade it for anything.",
    image: "/images/pennyDestruction.jpg",
    images: [
      "/images/richAndPenny.jpg",
      "/images/pennycuddle.jpg",
      "/images/pennyDolo.jpg",
      "/images/pennyBday.jpg",
    ],
    videos: ["/videos/pennyPlaying.mp4"],
    videoPoster: "/images/tn_penny.jpg",
    type: "personal",
  },
  {
    id: "ubc-grad",
    date: "May 2022",
    year: 2022,
    title: "Graduated from UBC",
    description:
      "Earned a Bachelor of Applied Science in Engineering Physics from the University of British Columbia.",
    image: "/images/graduation.jpg",
    type: "education",
  },
  {
    id: "daanaa",
    date: "May 2021",
    year: 2021,
    title: "Software Developer Intern at Daanaa",
    description:
      "Built a desktop application in C# (WPF) to interface with custom integrated circuits, with MSSQL database integration and real-time data visualization.",
    tags: ["C#", "WPF", "MSSQL"],
    type: "career",
  },
  {
    id: "recyclesmart",
    date: "May 2020",
    year: 2020,
    title: "Project Coordinator Intern at RecycleSmart",
    icon: "⚙️",
    description:
      "Supported the development of Pello, an AI-powered IoT smart bin sensor that uses ultrasonic sensors and cameras to detect waste fill levels and contamination in real time. SDTC-funded project at RecycleSmart.",
    longDescription:
      "Pello is a smart waste sensor designed to optimize commercial garbage collection routes. Instead of trucks running fixed schedules and emptying bins that are barely full, Pello lets haulers only visit bins that actually need emptying — cutting unnecessary trips and meaningfully reducing greenhouse gas emissions.\n\nWorking directly with the VP of Pello, I helped bring the device from concept to a live deployment across UBC's campus — up to 200 bins.\n\nIt started with the fundamentals: testing different ultrasonic sensors to understand their behaviour at various distances and angles, and figuring out which ones were actually worth building around. From there I moved into physical prototyping — CADing cone geometries, building a plywood test enclosure by hand, and running a systematic test suite across sensor types, mount configurations, and cone profiles (wide, narrow, thin) to nail down the best combination for the first product iteration. I also helped assemble the electrical components for the camera module.\n\nThe most memorable part was the UBC rollout itself. Installing across an entire university campus is a different beast than a lab — we ran into rainwater ingress from improperly sealed units, and bins with sloped backs that made flush mounting impossible. For the latter, we designed a custom wedge mount on the fly to maintain a consistent vertical placement angle. Shipping something and then debugging it in the real world taught me more than any amount of bench testing.\n\nOnce everything was live, we could monitor the entire network through our IoT dashboard in real time — a satisfying moment after months of work going from a sensor on a bench to a city-scale deployment.",
    image: "/images/pelloInstalled.jpg",
    images: [
      "/images/pelloInstalledBack.jpg",
      "/images/pelloInstalledSlopeBin.jpg",
      "/images/pelloWithSlopeBracket.jpg",
      "/images/slopeBinInstallation.jpg",
      "/images/slopeBinStick.jpg",
      "/images/carl.jpg",
      "/images/2coneTest.jpg",
      "/images/3coneTest.jpg",
    ],
    link: { label: "Pello", url: "https://www.rts.com/pello-smart-bin-sensors/" },
    tags: ["Python", "C", "IoT", "Ultrasonic Sensors", "Prototyping"],
    type: "career",
  },
  {
    id: "ubc-ta",
    date: "September 2019",
    year: 2019,
    title: "Became an Undergraduate Teaching Assistant at UBC",
    icon: "📚",
    description:
      "TA for the Department of Physics and Astronomy. Led tutorials for PHYS 157 and PHYS 158 — covering thermodynamics, waves, electricity, magnetism, and optics. Ran my own section of 40 students and led group tutorials of 150.",
    image: "/images/kausikTa.jpg",
    type: "education",
  },
  {
    id: "arct",
    date: "January 2019",
    year: 2019,
    title: "Earned ARCT Piano Performer's Certification",
    icon: "🎹",
    description:
      "Achieved the Associate of the Royal Conservatory of Toronto (ARCT) — the highest performance diploma offered by the Royal Conservatory of Music.",
    type: "achievement",
  },
  {
    id: "rst",
    date: "January 2019",
    year: 2019,
    title: "Embedded Software Developer Intern at RST Instruments",
    icon: "📡",
    description:
      "Wrote embedded C for SPI communication between an STM32 MCU and ADXL355 accelerometer, achieving ±0.002° tilt precision. Built an automated test framework in Python with Robot Framework for backwards compatibility testing.",
    image: "/images/rst.jpg",
    tags: ["C", "Python", "STM32"],
    type: "career",
  },
  {
    id: "ubc-start",
    date: "September 2017",
    year: 2017,
    title: "Started Engineering at UBC",
    icon: "🧑‍🎓",
    description:
      "Kicked off my engineering degree at UBC. First year was general engineering before I declared Engineering Physics in second year.",
    image: "/images/ubcPic.jpg",
    type: "education",
  },
];
