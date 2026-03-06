import type { TimelineEvent } from "@/lib/types";

export const timelineEvents: TimelineEvent[] = [
  {
    id: "dog-dad",
    date: "October 2022",
    year: 2022,
    title: "Adopted Penny!",
    icon: "🐶",
    description:
      "When I moved to SF I knew I wanted to rescue a dog ASAP. I ended up getting a puppy before having a couch, tv, or bed 🤣 best decision ever",
    longDescription:
      "When I moved to the Bay Area for Meta, the very first thing on my mind was rescuing a dog. I ended up adopting Penny before I even had a couch, TV, or bed — and it was the best decision I've ever made.\n\nPenny is a Husky Shepherd mix I rescued from a the SF SPCA. She was 3 months old when I brought her home. She immediately became my adventure buddy — hikes, beach trips, road trips up and down the California coast.\n\nShe's destroyed more shoes than I can count, stolen food off the counter more times than I'd like to admit, and somehow always manages to take up the entire bed. Wouldn't trade it for anything.",
    image: "/images/pennyDestruction.png",
    images: [
      "/images/richAndPenny.png",
      "/images/pennycuddle.jpg",
      "/images/pennyDolo.jpg",
      "/images/pennyBday.png",
    ],
    videos: ["/videos/pennyPlaying.mp4"],
    type: "personal",
  },
  {
    id: "3",
    date: "August 2022",
    year: 2022,
    title: "Joined Meta as Software Engineer",
    icon: "♾️",
    description:
      "Built the audio systems powering Ray-Ban Meta smart glasses.",
    tags: ["C++", "Python", "DSP", "Audio", "AR/VR", "Platform Engineering"],
    type: "career",
  },
  {
    id: "4",
    date: "May 2022",
    year: 2022,
    title: "Graduated from UBC",
    description:
      "Earned a Bachelor of Applied Science in Engineering Physics from the University of British Columbia.",
    image: "/images/graduation.JPG",
    type: "education",
  },
  {
    id: "5",
    date: "May 2021",
    year: 2021,
    title: "Software Developer Intern at Daanaa",
    description:
      "Built a desktop application in C# (WPF) to interface with custom integrated circuits, with MSSQL database integration and real-time data visualization.",
    tags: ["C#", "WPF", "MSSQL"],
    type: "career",
  },
  {
    id: "6",
    date: "May 2020",
    year: 2020,
    title: "Project Coordinator Intern at RecycleSmart",
    icon: "⚙️",
    description:
      "Supported the development of Pello, an AI-powered IoT smart bin sensor that uses ultrasonic sensors and cameras to detect waste fill levels and contamination in real time. SDTC-funded project at RecycleSmart.",
    image: "/images/carl.png",
    link: { label: "Pello", url: "https://www.rts.com/pello-smart-bin-sensors/" },    
    tags: ["Python", "C", "IoT", "Ultrasonic Sensors", "Prototyping"],
    type: "career",
  },
  {
    id: "7",
    date: "September 2019",
    year: 2019,
    title: "Became an Undergraduate Teaching Assistant at UBC",
    icon: "📚",
    description:
      "TA for the Department of Physics and Astronomy. Led tutorials for PHYS 157 and PHYS 158 — covering thermodynamics, waves, electricity, magnetism, and optics. Ran my own section of 40 students and led group tutorials of 150.",
    type: "education",
  },
  {
    id: "8",
    date: "January 2019",
    year: 2019,
    title: "Earned ARCT Piano Performer's Certification",
    icon: "🎹",
    description:
      "Achieved the Associate of the Royal Conservatory of Toronto (ARCT) — the highest performance diploma offered by the Royal Conservatory of Music.",
    type: "achievement",
  },
  {
    id: "9",
    date: "January 2019",
    year: 2019,
    title: "Embedded Software Developer Intern at RST Instruments",
    icon: "📡",
    description:
      "Wrote embedded C for SPI communication between an STM32 MCU and ADXL355 accelerometer, achieving ±0.002° tilt precision. Built an automated test framework in Python with Robot Framework for backwards compatibility testing.",
    tags: ["C", "Python", "STM32"],
    type: "career",
  },
  {
    id: "10",
    date: "September 2018",
    year: 2018,
    title: "Started Engineering at UBC",
    icon: "🧑‍🎓",
    description:
      "Kicked off my engineering degree at UBC. First year was general engineering before I declared Engineering Physics in second year.",
    type: "education",
  },
];
