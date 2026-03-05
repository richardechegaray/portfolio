import type { TimelineEvent } from "@/lib/types";

export const timelineEvents: TimelineEvent[] = [
  {
    id: "3",
    date: "August 2022",
    year: 2022,
    title: "Joined Meta as Software Engineer",
    icon: "♾️",
    description:
      "Built the audio systems powering Ray-Ban Meta smart glasses.",
    tags: ["career"],
    type: "career",
  },
  {
    id: "4",
    date: "May 2022",
    year: 2022,
    title: "Graduated from UBC",
    description:
      "Earned a Bachelor of Applied Science in Engineering Physics from the University of British Columbia.",
    tags: ["education"],
    type: "education",
  },
  {
    id: "5",
    date: "May 2021",
    year: 2021,
    title: "Software Developer Intern at Daanaa",
    description:
      "Built a desktop application in C# (WPF) to interface with custom integrated circuits, with MSSQL database integration and real-time data visualization.",
    tags: ["career"],
    type: "career",
  },
  {
    id: "6",
    date: "May 2020",
    year: 2020,
    title: "Project Coordinator Intern at RecycleSmart",
    icon: "⚙️",
    description:
      "Supported the Director of IoT through prototype, pilot, and production phases of an SDTC-funded Internet of Things project at RecycleSmart in Richmond, BC.",
    tags: ["career"],
    type: "career",
  },
  {
    id: "12",
    date: "January 2020",
    year: 2020,
    title: "1st Place @ nwHacks 2020",
    icon: "🏆",
    description:
      "Won 1st place at Western Canada's largest hackathon (769 participants). Built an Android app to reduce food waste using Azure Speech, Firebase MLKit, and Firestore.",
    tags: ["Android", "Azure Speech", "Firebase MLKit", "Firestore"],
    type: "achievement",
  },
  {
    id: "7",
    date: "September 2019",
    year: 2019,
    title: "Became an Undergraduate Teaching Assistant at UBC",
    icon: "📚",
    description:
      "TA for the Department of Physics and Astronomy. Led tutorials for PHYS 157 and PHYS 158 — covering thermodynamics, waves, electricity, magnetism, and optics. Ran my own section of 40 students and led group tutorials of 150.",
    tags: ["education"],
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
    tags: ["achievement", "personal"],
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
    tags: ["career"],
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
