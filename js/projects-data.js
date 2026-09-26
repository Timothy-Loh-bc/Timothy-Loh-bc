const projectsData = [
  {
    id: "Hellmaker 2D Engine/Editor",
    title: "Hellmaker 2D Engine/Editor",
    tagline: "A custom C++ engine and editor powering Death's Refrain, with component-based scenes, Lua gameplay scripting, and integrated development tools.",
    active: true,
    featured: true,
    roles: [""],
    period: "",
    accentColor: "from-blue-600 to-indigo-700",
    metrics: [
	{ label: "Languages", value: "C++ / Lua" },
	{ label: "Platform", value: "Windows" },
	{ label: "Team Size", value: "9 members: 5 programmers, 2 designers, 2 artists" },
	{ label: "Role", value: "Technical Lead" },	
	{ label: "Duration", value: "September 2025 to May 2026" },
	{ label: "Dependencies", value: "GLFW, GLEW, GLM, Dear ImGui, FMOD, FreeType, yaml-cpp, sol2, CivetWeb, spdlog, stb" },
    ],
    summary: "Collaborated with Team Infernumb to develop the Hellmaker engine and editor as Technical Lead, contributing to the core framework, subsystem integration, and development diagnostics for Death's Refrain.",
    links: {
      github: "https://github.com/Timothy-Loh-bc/team-infernumb"
    },
    caseStudy: {
      video: {
        src: "assets/hellmaker/Infernumb_LevelEditorVideo.mp4",
        caption: "Hellmaker level editor demonstration."
      },
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
      ],
      technicalChallenges: [
        {
          challenge: "Synchronizing Video and Audio",
          resolution: [
            "Keeping video and audio synchronized was much harder than I expected. Audio drifting out of sync became the main problem, and understanding how to approach it meant working through playback clocks, buffering, and the interaction between the main thread and FMOD's audio thread.",
            "The solution was to use FMOD's audio clock as the timing reference and make the video follow it. I accounted for audio output buffering latency when calculating which frame to display, then decoded video toward that playback position with a limit on catch-up work per update. For audio, the main thread maintained a queue of decoded samples that FMOD consumed through its callback, with a mutex protecting access between the threads.",
            "This resolved the synchronization problem. What stayed with me was that starting audio and video together does not guarantee they will stay together. I had to understand how timing moved through the entire playback pipeline, including the gap between processing audio and actually hearing it."
          ]
        },
        {
          challenge: "Reducing Texture Loading Times",
          resolution: [
            "As more art assets were added, the size of our textures quickly got out of hand. Opening the editor and launching the game took longer, making the cost of loading those assets hard to ignore. I researched GPU internal texture formats to understand how we could prepare the textures in a form better suited to runtime loading.",
            "I implemented an import pipeline that converts PNG assets into BC3/DXT5 compressed textures. The importer decodes the image into RGBA pixels, compresses it in 4-by-4 blocks, and saves the dimensions and compressed data in a .compressedTex file. Existing converted files are reused, and the engine uploads their compressed blocks directly to OpenGL rather than decoding the source PNG again during normal loading.",
            "This improved loading times for the editor and game while reducing the texture data needed on the GPU compared with uncompressed RGBA. The trade-off is that BC3 is lossy, so compression involves a balance between image quality and resource cost. The experience taught me that how assets are prepared can matter just as much as the code that loads them."
          ]
        }
      ],
      leadershipLessons: [
        "The hardest part of this project for me was learning how to delegate. I wanted the architecture to feel solid before asking teammates to build on it. My plan was to establish the framework, write the interfaces, and then hand over the implementation. In my head, that would make everyone's work easier. In practice, our deadlines did not leave enough time for that approach, and I kept taking on more of the work myself.",
        "That gave my teammates fewer opportunities to shape the project and feel ownership over it. I did not manage to resolve this during development, and it remains something I would approach differently. I enjoy the moment when the pieces of a system fit together, but I now see that waiting for everything to fit my picture can hold back the people building it with me.",
        "Next time, I would give teammates meaningful work earlier, let them make decisions about their own systems, and help connect those systems to the framework as it develops. That means balancing idealism with realism. An implementation might not be how I would have written it, but if it works, meets the requirements, and is reasonably maintainable, it deserves to move forward. I want to get better at making room for other people's ideas and keeping the ball rolling, even when the architecture is still taking shape."
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
