/**
 * Personal & Profile Configuration
 * Update this file to easily customize your information across the site.
 */
const profileConfig = {
  name: "Timothy Loh",
  roleTitle: "SIT DigiPen Real-Time Interactive Simulation Undergraduate",
  tagline: "Final-year Computer Science undergraduate passionate about low-level computer systems and understanding what happens beneath the abstractions most of us take for granted. I enjoy working close to the hardware, exploring computer architecture and systems programming.",
  status: "Final-Year Undergraduate • Actively Seeking Internships",
  avatarUrl: "./assets/profile.jpeg",
  
  // Education & Academics
  education: {
    degree: "Computer Science in Real-Time Interactive Simulation",
    institution: "Singapore Institute of Technology | DigiPen",
    period: "2024 — Expected Graduation 2028",
    focus: "C++, Data Structures & Algorithms, Operating Systems, Networking, and Graphics"
  },

  // About Me Section Highlights
  bio: [
    "I'm an undergraduate looking to apply my skills to the real-world. I enjoy taking on complex problems apart, understanding the constraints involved, and building solutions that are reliable, efficient, and maintainable. I'm particularly interested in opportunities where I can work alongside experienced engineers, deepen my understanding of systems, and contribute to technically challenging projects."
  ],

  // Core Competencies / Skills
  skills: [
    { category: "Languages", items: ["C", "C++", "C#", "Python", "Lua", "SQL"]},
	{ category: "Tools & Build", items: ["Jira", "Git", "CMake", "Make", "Visual Studio", "Batch Scripting"] },
	{ category: "Computer Science", items: ["Data structures & Algorithms", "Object-Oriented Programming","Memory Management", "Bit Manipulation Optimizations", "Computer architecture", "Networking", "Multithreading"] },
	{ category: "Game Development", items: ["Unity","Entity Component System","Shader Programming","ImGui","GLFW"] }
  ],

  // Contact Information & Links
  contact: {
    email: "lohbctimothy@gmail.com", 
    github: "https://github.com/Timothy-Loh-bc",
    linkedin: "https://www.linkedin.com/in/timothyloh2001/",
    resumeUrl: "./assets/Resume_Loh_Boon_Cheong_Timothy.pdf",
    location: "Available for on-site & semi-remote internships"
  },

  // Role categories available for filtering projects
  roleFilters: [
    { id: "all", label: "All Projects" },
    { id: "software-engineering", label: "Software Engineering" },
    { id: "backend", label: "Backend & Systems" },
    { id: "fullstack", label: "Full Stack / Web" },
    { id: "data-ai", label: "Data & ML" }
  ]
};

// Export for module or global window usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = profileConfig;
} else {
  window.profileConfig = profileConfig;
}
