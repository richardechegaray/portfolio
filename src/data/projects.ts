import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio Website",
    description:
      "This site! A timeline-driven personal portfolio with scroll-linked parallax animations, smooth scrolling, a floating nav, and a cursor spotlight effect. Built from scratch.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis"],
    githubUrl: "https://github.com/richardechegaray/portfolio",
    liveUrl: "/",
    featured: true,
  },
  {
    id: "4",
    title: "Synthetic Data Pipeline for Bin-Picking Robots",
    description:
      "Developed a pipeline that generates labeled synthetic training data from CAD models, replacing costly manual labeling for industrial bin-picking robots. Built with BlenderProc, domain randomization, and Mask-RCNN — achieved AP 100 on the ping pong dataset and AP 73.9 on the package dataset using only synthetic data. Capstone project at UBC in partnership with DaoAI Robotics.",
    longDescription:
      "Partnered with DaoAI Robotics to build a synthetic data generation pipeline that takes CAD models as input and outputs labeled RGB-D images for training computer vision models used in industrial bin-picking. The pipeline leveraged BlenderProc for photorealistic rendering with domain randomization (lighting, object placement, camera angles) and physics simulation for realistic object positioning. Trained Mask-RCNN models on purely synthetic data and validated against real-world images — achieving AP 100 on a calibration dataset and AP 73.9 on a complex package detection task. Built as a UBC Engineering Physics capstone project (ENPH 479).",
    image: "/images/479.png",
    date: "2022",
    techStack: ["BlenderProc", "Mask-RCNN", "Python", "Domain Randomization"],
    pdfUrl: "/files/457report.pdf",
    featured: true,
  },
  {
    id: "5",
    title: "Desktop Point Cloud Visualization Application",
    description:
      "Built a desktop application for researchers at a major tech company to visualize massive 3D point clouds of a fruit fly brain connectome. The tool used a Python API, Unity, and Potree to render and label datasets of up to 10M+ points with interactive navigation, depth lighting, and eye-dome lighting. Capstone project at UBC Engineering Physics (ENPH 459).",
    longDescription:
      "Partnered with a leading research organization to build a desktop visualization tool for exploring a fruit fly brain connectome — a dataset of millions of 3D points representing mapped neurons. Researchers needed a way to navigate, label, and modify massive point clouds that existing tools couldn't handle. Built a data pipeline with a Python API for programmatic control, Unity as the rendering engine, and Potree for efficient level-of-detail point cloud rendering. Implemented features including dynamic point addition/removal, persistent labels, depth lighting, eye-dome lighting, and interpolation. Exceeded the initial 10K point target by processing 100K+ points with sub-second responsiveness, and successfully rendered 10M points at 30+ FPS. UBC Engineering Physics capstone project (ENPH 459).",
    image: "/images/459.png",
    date: "2022",
    techStack: ["Unity", "Python", "Potree", "C#"],
    featured: true,
  },
  {
    id: "2",
    title: "greenEats — 1st Place @ nwHacks 2020",
    description:
      "Built greenEats, a grocery management Android app that tracks food expiration dates to reduce waste. Users could log groceries via receipt scanning (OCR), voice recognition (Azure Speech Services), or manual input, and get recipe recommendations based on what's about to expire. Won 1st place and the Wolfram Award at nwHacks 2020. Built with Java, Firebase, and Azure.",
    longDescription:
      "Built greenEats at nwHacks 2020 — an Android app tackling food waste by helping users track groceries and expiration dates. The app offered three input methods: receipt scanning using Firebase MLKit Vision for OCR, voice recognition powered by Azure Speech Services (my contribution), and manual entry. A virtual fridge tracked inventory and notified users of expiring items, while a custom recipe API suggested meals based on ingredients about to go bad. I also worked on front-end design in Android Studio. Built with Java, Firebase, Azure, and a custom stdlib API. Won 1st place overall and the Wolfram Award. Link above points to the original devpost.",
    image: "/images/nwhacks20.png",
    date: "January 2020",
    techStack: ["Java", "Kotlin", "Android", "Firebase", "Azure Speech", "Firebase MLKit"],
    liveUrl: "https://devpost.com/software/greeneats",
    featured: true,
  },
  {
    id: "3",
    title: "Coming Soon",
    description: "More projects on the way. Stay tuned!",
    techStack: [],
    featured: true,
  },
];