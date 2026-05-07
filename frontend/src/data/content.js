// Single source of truth for portfolio content.
// To update the site, only edit this file.

export const profile = {
  name: "Nibras Shiddiq Abyan",
  tagline: "Crafting digital experiences with clean code.",
  bio: "I'm Nibras — an Informatics student at Universitas Brawijaya who fell into web development and stayed for the small details. I like building interfaces that don't just look good, but feel quick and intuitive to use. Right now I'm deep in React, poking at generative AI on the side, and always drawn to projects that actually mean something.",
  photo: "/photo.jpg",
  email: "nibrasabyan08@gmail.com",
  github: "https://github.com/nibrasabyan",
  githubUsername: "nibrasabyan",
  linkedin: "https://www.linkedin.com/in/nibras-shiddiq-abyan-a42b01379/",
  instagram: "https://www.instagram.com/_nibrasabyan/",
  university: "Universitas Brawijaya",
  field: "Web Development",
  location: "Malang, Indonesia",
  // CV file path. Set to a value like "/cv.pdf" once available to show the download button.
  cv: null,
};

export const skills = [
  {
    category: "Frontend",
    items: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "REST API", "Python"],
  },
  {
    category: "Tools & Workflow",
    items: ["Git", "GitHub", "Figma", "VS Code", "Vite"],
  },
  {
    category: "AI & Emerging",
    items: ["Generative AI", "Prompt Engineering"],
  },
];

export const certificates = [
  {
    id: 1,
    title: "Generative Artificial Intelligence",
    qualification: "Fundamental Principles and Practical Applications",
    issuer: "Institute for Data Innovation and Artificial Intelligence (IDEA-AI)",
    issueDate: "December 17, 2025",
    validUntil: "December 17, 2028",
    certificateId: "2921-1362-1450-6147",
    credentialUrl: "/certificate-idea-ai.pdf",
  },
];

// Format: { role, organization, period, description, type: "organization" | "work" | "volunteer" }
export const experiences = [];

// Comment out a section name to hide it from the navigation.
// "experience" is hidden automatically when experiences[] is empty.
export const navSections = [
  "about",
  "skills",
  "experience",
  "certificates",
  "projects",
  "contact",
];
