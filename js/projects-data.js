const projectsData = [
  {
    id: "Hellmaker 2D Engine/Editor",
    title: "Hellmaker 2D Engine/Editor",
    tagline: "A custom 2D game engine and editor built from the ground up with a team of five, featuring a component-based architecture, real-time rendering, and scene management.",
    active: true,
    featured: true,
    roles: [""],
    period: "",
    tags: [],
    accentColor: "from-blue-600 to-indigo-700",
    metrics: [
	{ label: "Languages", value: "C++ / Lua" },
	{ label: "Platform", value: "PC" },
	{ label: "Team Size", value: "5 programmers, 2 artists and 1 designer" },
	{ label: "Role", value: "Technical Lead" },	
	{ label: "Dependencies", value: "FMOD, GLFW, Dear ImGui, FreeType, yaml-cpp, stb_image, spdlog" },	
	{ label: "Duration", value: "September 2025 to May 2026" },
    ],
    summary: "",
    links: {
    },
    caseStudy: {
	  screenshots: [
		{
		  src: "assets/hellmaker/isystem.png",
		  caption: "Systems inheriting from ISystem base class"
		},
		{
		  src: "assets/profile.jpeg",
		  caption: "Systems inheriting from ISystem base class"
		},		
	  ],
      overview: "Hellmaker Engine/Editor is a pair of custom applications built to support the development of the game \"Death's Refrain\" in GAM200, Software Engineering Project 3/4 at DigiPen Singapore.\n\nBoth the engine and editor was writen in C++ with the help of school-approved third-party dependencies.\n\nThe engine used a component-based system that derived from a base class, making use of polymorphic behaviours for standardized invocation whilst maintaining customizability."
	}
  },
];

// Helper functions for easy filtering and retrieval
const ProjectsManager = {
  // Returns all active projects
  getActiveProjects() {
    return projectsData.filter(project => project.active);
  },

  // Returns projects filtered by role ID
  getProjectsByRole(roleId) {
    if (!roleId || roleId === "all") {
      return this.getActiveProjects();
    }
    return this.getActiveProjects().filter(project => 
      project.roles && project.roles.includes(roleId.toLowerCase())
    );
  },

  // Find a specific project by id/slug
  getProjectById(id) {
    return projectsData.find(project => project.id.toLowerCase() === id.toLowerCase());
  }
};

// Export for module or global window usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = { projectsData, ProjectsManager };
} else {
  window.projectsData = projectsData;
  window.ProjectsManager = ProjectsManager;
}
