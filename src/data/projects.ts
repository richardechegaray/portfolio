import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Portfolio Website",
    description:
      "This site! A timeline-driven personal portfolio with scroll-linked parallax, a space theme with starfield and rocket cursor, smooth scrolling, and a floating nav. Built from scratch.",
    longDescription:
      "I wanted a portfolio that felt like me — not a template, not a wall of text, just something fun to scroll through. So I built this from scratch.\n\nThe homepage is a timeline of my career, education, and personal milestones. Each card animates in as you scroll, with a glowing progress line that grows down the center. Cards alternate left and right on desktop and stack on mobile. Clickable cards (like Penny) open into their own detail pages with photos and videos.\n\nThe space theme runs through the whole site — a multi-layer starfield with parallax scrolling, randomized twinkling, and shooting stars, all pure CSS and JS. A custom rocket SVG cursor replaces the default pointer, and a spotlight glow follows your mouse. The background is a deep near-black (#010a10) that lets the stars pop.\n\nBuilt with Next.js 16 (App Router) for routing and static generation, TypeScript for type safety, and Tailwind CSS v4 with custom theme variables for consistent styling. Framer Motion powers all the scroll-linked animations — the parallax hero, timeline progress line, and card fade-ins. Lenis handles the smooth buttery scrolling. Lucide React provides the icons.\n\nThe project pages, clips page, and blog are all statically generated from TypeScript data files — no CMS, no database. Videos are served from a local /videos directory tracked with Git LFS. The whole thing is deployed on Vercel.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis"],
    githubUrl: "https://github.com/richardechegaray/portfolio",
    liveUrl: "/",
  },
  {
    id: "synthetic-data-pipeline",
    title: "Synthetic Data Pipeline for Bin-Picking Robots",
    description:
      "Developed a pipeline that generates labeled synthetic training data from CAD models, replacing costly manual labeling for industrial bin-picking robots. Built with BlenderProc, domain randomization, and Mask-RCNN — achieved AP 100 on the ping pong dataset and AP 73.9 on the package dataset using only synthetic data. Capstone project at UBC in partnership with DaoAI Robotics.",
    longDescription:
      "Partnered with DaoAI Robotics to build a synthetic data generation pipeline that takes CAD models as input and outputs labeled RGB-D images for training computer vision models used in industrial bin-picking. The pipeline leveraged BlenderProc for photorealistic rendering with domain randomization (lighting, object placement, camera angles) and physics simulation for realistic object positioning. Trained Mask-RCNN models on purely synthetic data and validated against real-world images — achieving AP 100 on a calibration dataset and AP 73.9 on a complex package detection task. Built as a UBC Engineering Physics capstone project (ENPH 479).\n\nSee the full report below for more details.",
    image: "/images/479.png",
    date: "2022",
    techStack: ["BlenderProc", "Mask-RCNN", "Python", "Domain Randomization"],
    pdfUrl: "/files/457report.pdf",
  },
  {
    id: "point-cloud-visualization",
    title: "Desktop Point Cloud Visualization Application",
    description:
      "Built a desktop application for researchers at a major tech company to visualize massive 3D point clouds of a fruit fly brain connectome. The tool used a Python API, Unity, and Potree to render and label datasets of up to 10M+ points with interactive navigation, depth lighting, and eye-dome lighting. Capstone project at UBC Engineering Physics (ENPH 459).",
    longDescription:
      "Partnered with a leading research organization to build a desktop visualization tool for exploring a fruit fly brain connectome — a dataset of millions of 3D points representing mapped neurons. Researchers needed a way to navigate, label, and modify massive point clouds that existing tools couldn't handle. Built a data pipeline with a Python API for programmatic control, Unity as the rendering engine, and Potree for efficient level-of-detail point cloud rendering. Implemented features including dynamic point addition/removal, persistent labels, depth lighting, eye-dome lighting, and interpolation. Exceeded the initial 10K point target by processing 100K+ points with sub-second responsiveness, and successfully rendered 10M points at 30+ FPS. UBC Engineering Physics capstone project (ENPH 459).",
    image: "/images/459.png",
    date: "2022",
    techStack: ["Unity", "Python", "Potree", "C#"],
  },
  {
    id: "quickpick",
    title: "quickPick — Group Decision-Making App",
    description:
      "Built a Tinder-style group decision app where users create or join sessions, swipe on ideas from shared lists, and see ranked results in real time. Android frontend with a Node.js/MongoDB backend and Firebase push notifications.",
    longDescription:
      "Built quickPick, a mobile app that helps groups make decisions through a Tinder-style swiping interface. Users log in via Facebook, create custom lists of options (movies, restaurants, activities, etc.), and host real-time sessions that others join with a 5-digit pin. Everyone swipes through the list independently, and once all participants finish, the app displays ranked results based on the group's collective preferences.\n\nThe Android frontend was built in Java with automated UI tests covering login flows, session joining, and swiping. The backend used Node.js with MongoDB for storing sessions, lists, and users, and Firebase for real-time push notifications to keep all participants in sync. Integrated Unsplash's image API to auto-populate lists with relevant photos, and built a URL caching layer to work around rate limits. Achieved 99.7% backend line coverage with comprehensive unit, integration, and non-functional requirement tests covering latency, scalability (50+ concurrent users), and privacy.",
    image: "/images/quickpick.jpg",
    videos: ["/videos/quickpick.mp4"],
    videoPoster: "/images/quickpick.jpg",
    videoCaption: "Demoing the user flow for creating and voting in a session",
    date: "2021",
    techStack: ["Android", "Java", "Node.js", "MongoDB", "Firebase"],
    githubUrl: "https://github.com/richardechegaray/quickPick",
  },
  {
    id: "robot-simulation",
    title: "Autonomous Driving & License Plate Recognition — 3rd Place",
    description:
      "Built an autonomous simulated car that navigated a course, avoided pedestrians, and read license plates using CNNs and computer vision. Placed 3rd out of 16 teams in UBC's ENPH 353 competition.",
    longDescription:
      "Programmed a simulated autonomous vehicle in Python using ROS and Gazebo for UBC's ENPH 353 machine learning competition. The car navigated an urban course using computer vision for line following, detected crosswalks and waited for pedestrians to pass, and read license plates mounted throughout the environment.\n\nBuilt three specialized CNNs in Keras — one for letters, one for numbers, and one for parking spot labels — along with four backup CNNs to handle common misclassifications (e.g. 8 predicted as 0, B predicted as A). Generated synthetic training data using OpenCV augmentations including Gaussian blur, rotation, and perspective transforms. Navigation was implemented as a state machine that traversed an inner loop first for high-value plates, then looped the outer ring indefinitely. Placed 3rd out of 16 teams with a near-perfect score.",
    image: "/images/birdseye.PNG",
    images: ["/images/origbluecontours.PNG", "/images/whitecontours.PNG", "/images/origframe.PNG"],
    imageCaption: "Experimenting with different contours",
    videos: ["/videos/carDetection.mp4"],
    videoCaption: "Car detection in action",
    date: "2021",
    techStack: ["Python", "ROS", "Gazebo", "Keras", "OpenCV"],
    githubUrl: "https://github.com/richardechegaray/enph353-ubc-parkingrobot-competition",
    pdfUrl: "/files/353report.pdf",
  },
  {
    id: "greeneats",
    title: "greenEats — 1st Place @ nwHacks 2020",
    description:
      "Built greenEats, a grocery management Android app that tracks food expiration dates to reduce waste. Users could log groceries via receipt scanning (OCR), voice recognition (Azure Speech Services), or manual input, and get recipe recommendations based on what's about to expire. Won 1st place and the Wolfram Award at nwHacks 2020. Built with Java, Firebase, and Azure.",
    longDescription:
      "Built greenEats at nwHacks 2020 — an Android app tackling food waste by helping users track groceries and expiration dates. The app offered three input methods: receipt scanning using Firebase MLKit Vision for OCR, voice recognition powered by Azure Speech Services (my contribution), and manual entry. A virtual fridge tracked inventory and notified users of expiring items, while a custom recipe API suggested meals based on ingredients about to go bad. I also worked on front-end design in Android Studio. Built with Java, Firebase, Azure, and a custom stdlib API. Won 1st place overall and the Wolfram Award. Link above points to the original devpost.",
    image: "/images/nwhacksWorking.jpg",
    images: ["/images/nwhacks20.png"],
    date: "January 2020",
    techStack: ["Java", "Kotlin", "Android", "Firebase", "Azure Speech", "Firebase MLKit"],
    githubUrl: "https://github.com/alexcarbo/greenEats",
    liveUrl: "https://devpost.com/software/greeneats",
  },
  {
    id: "autonomous-robot",
    title: "Autonomous Robotics Competition — 3rd Place",
    description:
      "Led software development for a fully autonomous robot that detected and picked up objects using PID control, IR beacon detection, and signal convolution. Placed 3rd overall.",
    longDescription:
      "Served as software lead for a team that built a fully autonomous robot including mechanical, electrical, and software design. Designed and implemented an integration testing plan across iterative design cycles to catch issues early. Placed 3rd in UBC's Autonomous Robotics Competition.\n\nOur strategy was to sweep up Avenger plushies scattered across the course by driving with open arms, then closing to corral them all at once. The robot used signal convolution to filter IR beacon frequencies and identify the correct team bin, then drove the plushies to the right destination. Navigation and pickup were handled via PID control, all programmed in C++.",
    image: "/images/doorsTogether.JPG",
    images: ["/images/doorsClosed.JPG", "/images/doorsOpen.JPG", "/images/robotGif.GIF"],
    videos: ["https://youtu.be/dZkfXFzqVAU"],
    date: "2019",
    techStack: ["C++", "PID Control", "Signal Processing"],
    githubUrl: "https://github.com/richardechegaray/enph253",
  },
];