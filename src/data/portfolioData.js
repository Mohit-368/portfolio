// src/portfolioData.js
// src/portfolioData.js

export const projects = [
  {
    title: "DevOps Decoded",
    category: "Educational Platform",
    date: "2026",
    description: "An interactive educational platform explaining complex CI/CD pipelines. Features dynamic architectural diagrams and step-by-step guides for implementing automated deployment strategies.",
    tags: ["React", "Tailwind", "Framer Motion", "CI/CD"],
    bgColor: "#0a0a0a",
    accent: "#C6F118",
    image: "/1.jpg",
    liveLink: "#",
    githubLink: "#"
  },
  {
    title: "RAG Pipeline Setup",
    category: "AI Engineering",
    date: "2025",
    description: "Architected a production-ready Retrieval-Augmented Generation (RAG) pipeline for processing large-scale enterprise documents with high accuracy and low latency.",
    tags: ["Python", "LangChain", "Vector DB", "LLMs"],
    bgColor: "#111111",
    accent: "#C6F118",
    image: "/2.jpg",
    liveLink: "#",
    githubLink: "#"
  },
  {
    title: "Microservices Hub",
    category: "Backend Architecture",
    date: "2025",
    description: "A highly distributed microservices architecture designed to handle large volumes of traffic with automated scaling, load balancing, and fault tolerance built-in.",
    tags: ["Node.js", "Docker", "Kubernetes", "AWS"],
    bgColor: "#161616",
    accent: "#C6F118",
    image: "/3.jpg",
    liveLink: "#",
    githubLink: "#"
  },
  {
    title: "CloudOps Monitor",
    category: "Cloud Engineering",
    date: "2026",
    description: "A real-time cloud infrastructure monitoring dashboard for tracking system health, resource utilization, service availability, and deployment activity across distributed environments.",
    tags: ["Python", "AWS", "Docker", "Monitoring"],
    bgColor: "#0d0d0d",
    accent: "#C6F118",
    image: "/4.jpg",
    liveLink: "#",
    githubLink: "#"
  }
];

export const personalInfo = {
  name: "Mohit",
  // We use an array here so each string gets its own line in the massive hero text
  designation: ["AI &", "Full-Stack", "Engineer"], 
  tagline: "Architecting production-ready RAG pipelines, agentic workflows, and highly distributed microservices.",
  availability: "Available For Work",
  personalImage: "src/assets/home.jpg",
  backgroundImage: "src/assets/a.jpg", 
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    leetcode: "https://leetcode.com/yourusername",
    email: "mailto:youremail@example.com",
    resume: "/resume.pdf"
  }
};