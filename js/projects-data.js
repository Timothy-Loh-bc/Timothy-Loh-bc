const projectsData = [
  {
    id: "Hellmaker 2D Engine/Editor",
    title: "Hellmaker 2D Engine/Editor",
    tagline: "A custom C++ engine and editor powering Death's Refrain, with component-based scenes, Lua gameplay scripting, and integrated development tools.",
    active: true,
    featured: true,
    roles: [""],
    period: "",
    tags: ["C++", "Lua", "OpenGL", "Dear ImGui", "CMake"],
    accentColor: "from-blue-600 to-indigo-700",
    metrics: [
	{ label: "Languages", value: "C++ / Lua" },
	{ label: "Platform", value: "Windows" },
	{ label: "Team Size", value: "9 members: 5 programmers, 2 designers, 2 artists" },
	{ label: "Role", value: "Technical Lead" },	
	{ label: "Dependencies", value: "GLFW, GLEW, GLM, Dear ImGui, FMOD, FreeType, yaml-cpp, sol2, CivetWeb, spdlog, stb" },
	{ label: "Duration", value: "September 2025 to May 2026" },
    ],
    summary: "Collaborated with Team Infernumb to develop the Hellmaker engine and editor as Technical Lead, contributing to the core framework, subsystem integration, and development diagnostics for Death's Refrain.",
    links: {
      github: "https://github.com/Timothy-Loh-bc/team-infernumb"
    },
    caseStudy: {
      overview: [
        "Hellmaker is a custom 2D game engine and editor developed by Team Infernumb to build Death's Refrain, an RPG set in a mythic underworld. The project combines a C++ runtime, a Dear ImGui editor, and Lua gameplay scripts within a shared development workflow.",
        "The engine and editor were developed collaboratively by Team Infernumb. As Technical Lead and Engine Champion, my contributions included the central framework, system registration and lifecycle management, subsystem integration, and the engine's browser diagnostics server. Other team members also contributed to both the engine and editor, including rendering, physics and collision, content authoring tools, and gameplay integration.",
        "The engine is built as a static library used by both the editor and the standalone game executable. This lets the team author scenes and test gameplay through the same runtime systems used by the game."
      ],
      architecture: [
        "Game objects are composed of components that hold data for transforms, sprites, colliders, animation, audio, and gameplay logic. Scene and component serialization use YAML, with prefab support for reusable objects.",
        "Engine systems implement a shared ISystem interface. A registrar owns their lifetimes through unique pointers and invokes updates in registration order, giving subsystems a consistent lifecycle while allowing each to define its own behavior. Resource and service managers provide access to textures, shaders, fonts, audio, and other shared facilities.",
        "The editor's main loop accumulates elapsed frame time to calculate fixed simulation steps. Lua scripts and state machines implement gameplay behavior through C++ bindings, while the editor layers its authoring tools over the engine runtime.",
        "CMake defines separate engine, editor, and game targets, with Debug, Release, and Shipment configurations. The current dependency setup targets Windows."
      ],
      keyCapabilities: [
        "Rendering and presentation: OpenGL rendering with cameras, sprites, animation, text, and shader resources, supported by GLFW, GLEW, GLM, and FreeType.",
        "Gameplay systems: physics and collision, Lua scripting and state machines, FMOD audio, dialogue, video playback, and scene transitions support the game's combat and narrative content.",
        "Content authoring: a Dear ImGui editor provides a scene hierarchy and component inspector, game view, tilemap editing, asset browsing, and undo/redo tools.",
        "Development diagnostics: an embedded CivetWeb server connects the engine to a browser interface for frame-time monitoring and runtime inspection. Editor tools also include a debug console, profiling, and build-size analysis."
      ]
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
