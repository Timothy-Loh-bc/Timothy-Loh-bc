// Display order for the homepage and project navigation.
// Rearrange these IDs without moving the project definitions below.
// Active projects omitted from this list appear at the end.
const projectOrder = [
  "Hellmaker 2D Engine/Editor",
  "strokenet",
  "csd2151-graphics-demos",
  "polygon-simplification"
];

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
      github: ""
    },
    caseStudy: {
      videos: [{
        src: "assets/hellmaker/Infernumb_LevelEditorVideo.mp4",
        caption: "Hellmaker level editor demonstration."
      }],
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
  {
    id: "csd2151-graphics-demos",
    title: "Interactive Graphics Demos",
    tagline: "A collection of C++ and GLSL demos exploring ray tracing, lighting, environment mapping, and rendering across multiple passes, developed throughout my CSD2151 module.",
    active: true,
    featured: true,
    roles: ["software-engineering", "graphics"],
    period: "",
    metrics: [
    { label: "Languages", value: "C++ / GLSL" },
    { label: "Platform", value: "Windows" },
	{ label: "Duration", value: "January 2026 to May 2026"},
    { label: "Dependencies", value: "GLFW, GLEW, GLM, stb_image" }
    ],
    summary: "Implemented interactive rendering demos within a supplied graphics framework, connecting C++ scene setup and GPU data management with GLSL shaders for different rendering techniques.",
    links: {
      github: ""
    },
    caseStudy: {
      videos: [
	  {
        src: "assets/graphics_demos/cartoonshading.mp4",
        caption: "A six-pass pipeline combines Blinn-Phong rendering, Gaussian blur, Sobel edge detection, and cartoon shading. The video shows how enabling and disabling blur changes the resulting outlines."
      },{
        src: "assets/graphics_demos/blinn-phong.mp4",
        caption: "Blinn-Phong Demo. This demonstrates the Blinn-Phong shading technique, which produces smooth, realistic surfaces by interpolating vertex normals per pixel and applying a lighting model that combines ambient, diffuse, and specular components. This approach creates sharp, well-defined highlights, in contrast to the softer, blurred highlights seen with Gouraud shading."
      },{
        src: "assets/graphics_demos/raycasting.mp4",
        caption: "Raycasting demo. This demo renders a 2D map as a pseudo-3D scene. It casts one ray per screen column from the player's position, computing the distance to the nearest wall in the grid-based world. These distances are then used to determine wall height and shading, producing a perspective correct visualization of the environment."
      },{
        src: "assets/graphics_demos/raytracing.mp4",
        caption: "Raytracing demo. This demo showcases real-time ray tracing of a small scene containing multiple moving spheres. Rays are casted from the camera through each pixel to compute intersections with the scene geometry, allowing for accurate lighting and shading effects such as reflections and material-based colouring. The result illustrates how ray tracing can produce a physically based visual by directly simulating ray-object intersections."
      },{
        src: "assets/graphics_demos/env-mapping.mp4",
        caption: "Environment Mapping Demo. This demonstrates real-time environment mapping on different geometric primitives. It allows interactive adjustment of the reflection factor and index of refraction, illustrating how these parameters influence the blending between reflected and refracted environment samples on the object's surface."
      },{
        src: "assets/graphics_demos/nightsky.mp4",
        caption: "Night sky demo. This demo is a real-time 3D scene rendered with a skybox and dynamic lighting. It uses a cubemap based skybox to simulate the surrounding environment, while the scene itself is lit using a combination of shading techniques and a directional light source. Fog is also applied based on distance to add atmospheric depth, and different materials are showcased across objects, including checkerboard, Phong, discard-based, and cartoon shading."
      },{
        src: "assets/graphics_demos/portal.mp4",
        caption: "Portal demo. This demo demonstrates a real-time portal system by projecting a camera through a user-defined surface within a skybox environment. A ray is casted from the screen into the scene to determine where the portal should be placed, aligning it with the surface normal at the hit point. The result illustrates how screen-space picking, ray intersection, and custom projection matrices can be combined to achieve a real-time portal effect."
      },{
        src: "assets/graphics_demos/ogre.mp4",
        caption: "Ogre demo. This demo showcases a deferred rendering pipeline used to efficiently render a large number of ogre instances. Geometry is first rendered into multiple G-Buffers that store per-pixel attributes. A second pass is done afterwards, using the information from the G-Buffer to compute lighting and shading on a screen-space quad. This separation allows for complex lighting to be applied without re-rendering geometry."
      },{
        src: "assets/graphics_demos/cursor_light.mp4",
        caption: "This demo contains three tabs. Tab 1: U/V adjustment with time | Tab 2: Colour gradient shift with time | Tab 3: Pitch black screen with radial cursor glow."
      }],
      overview: [
        "This project brings together graphics assignments completed for CSD2151 at DigiPen Singapore. The application presents nine interactive demos covering ray casting, ray tracing, lighting, environment mapping, skyboxes, cartoon shading, portals, and deferred rendering.",
        "The work builds on a supplied graphics framework rather than an engine written entirely from scratch. My contributions include demo implementations, shader code, scene setup, and changes to the application that brings the demos together.",
        "Each demo connects a rendering technique to a working scene, from calculating ray intersections to coordinating framebuffer passes and transferring scene data to shaders."
      ],
      architecture: [
        "A shared window manager runs the application and its demo windows. Individual demo modules configure cameras, objects, textures, shader programs, callbacks, and rendering passes, while the main window presents previews of the demos.",
        "C++ code manages scene state and OpenGL resources, with uniforms and GPU buffers supplying shader inputs. Vertex, fragment, and compute shaders perform the relevant rendering work.",
        "Techniques that need intermediate results use framebuffer textures across multiple passes. The cartoon demo combines shading, horizontal and vertical Gaussian blur, Sobel edge detection, and final compositing. Deferred rendering separates surface-data generation from lighting."
      ],
      keyCapabilities: [
        "Ray casting and ray tracing: shader-based ray intersection demos, including sphere data supplied through a shader storage buffer.",
        "Lighting and surface detail: Blinn-Phong shading, interactive camera controls, and tangent-space normal mapping.",
        "Environment rendering: reflection and refraction demos, skybox rendering, and a night-sky scene.",
        "Cartoon shading: a sequence of rendering passes combining Gaussian blur and Sobel edge detection with shaded scene output.",
        "Portal projection: portal placement using ray intersections with skybox walls and a projection matrix derived from the portal's position and orientation.",
        "Deferred rendering: a geometry pass stores positions, normals, and diffuse color in framebuffer attachments for a subsequent lighting pass."
      ]
    }
  },
  {
    id: "strokenet",
    title: "StrokeNet, A Networking Drawing Game",
    tagline: "A multiplayer LAN drawing-and-guessing game built in C++, with an authoritative UDP server, synchronized drawing, and a custom message protocol.",
    active: true,
    featured: true,
    roles: ["software-engineering", "backend"],
    period: "",
    metrics: [
      { label: "Languages", value: "C++" },
      { label: "Platform", value: "Windows" },
      { label: "Team Size", value: "4 programmers" },
      { label: "Role", value: "Architecture" },
      { label: "Duration", value: "19th March 2026 to 31st March 2026" },
      { label: "Dependencies", value: "SFML 3, Winsock, OpenSSL, RapidJSON" }
    ],
    summary: "Designed data flow between threads in the client and server, synchronization boundaries around shared state, and binary packet layouts for the game's network commands.",
    links: { github: "" },
    caseStudy: {
      overview: [
        "StrokeNet is a Pictionary-style multiplayer game developed by a team of four for CSD2161 Computer Networks at DigiPen Singapore. Players connect over a LAN, take turns drawing a secret word, and submit guesses through in-game chat.",
        "I designed how data moves between threads in both the client and server, including the synchronization boundaries around shared state. I also defined the binary packet layouts for the different network commands, specifying what data each message carries and how it is encoded. The team worked together on the game's networking, interface, and gameplay features.",
        "The server manages player sessions, drawing turns, words, scores, and history. The client presents the game through SFML, while a custom UDP protocol carries drawing commands and game updates."
      ],
      architecture: [
        "Networking runs through a separate listener thread. Received drawing commands, chat messages, and score updates are stored in mutex-protected containers for the client to consume. On the server, the network listener and game loop share player and game state through explicit synchronization boundaries.",
        "Each network command has a defined binary layout describing its message identifier, field order, field sizes, and payload. Shared protocol definitions keep the client and server aligned on how to encode and interpret those messages.",
        "The protocol distinguishes request/response messages, acknowledged server notifications, and fire-and-forget updates. Important actions use acknowledgements and retries, while frequent drawing-extension updates use best-effort delivery.",
        "We used a client-server architecture to give all players a single source of truth for turns, scores, and drawing state. The server coordinates the game, while clients send player actions and display the updates they receive."
      ],
      keyCapabilities: [
        "Shared drawing: players see strokes, brush settings, erasing, and canvas clearing propagated through the server.",
        "Game coordination: the server assigns the drawer, distributes word information, advances turns, and updates player scores across a three-round game.",
        "Joining and discovery: clients can locate the server through LAN broadcast or a direct IP address. Players joining an active session receive drawing and chat history.",
        "Communication and persistence: in-game chat supports guessing, with user accounts and high scores stored by the server."
      ],
      technicalChallenges: [
        {
          challenge: "Coordinating Threads, Mutexes, and Lock Ownership",
          resolution: [
            "My biggest challenge was reasoning about multithreading, especially mutexes and deadlocks. Network messages could arrive while the game loop was accessing shared state, so I had to think about which thread owned each operation and which data needed protection. A function that looked straightforward on its own became harder to reason about when it called other functions that also acquired locks.",
            "I made it clear which server functions acquire mutexes and which expect the caller to have already acquired them, so nested calls do not try to lock the same mutex again. When an operation needs access to both game state and player data, it uses std::scoped_lock to acquire both mutexes together. On the client, mutexes protect the message containers shared by the network listener and the main thread, allowing received updates to pass safely between them.",
            "This challenge pushed me to consider synchronization as part of the architecture. Protecting a container is only one part of the problem. I also had to track which locks were already held as one function called another, so a nested call would not acquire the same mutex again or access shared data without protection.",
            "After the project, I realized that I needed to draw clearer boundaries around shared state. Even within the networking thread, it could become difficult to tell which mutexes were already held and which data was safe to access. Rather than carrying those assumptions through many nested calls, I would define a small number of entry points that acquire the necessary locks, then keep the work inside that boundary from acquiring those locks again. This would make the protected data and locking responsibilities easier to follow. We did not have time to implement that redesign within the project's constraints."
          ]
        },
        {
          challenge: "Winsock Hell",
          resolution: [
            "Working with the Windows API, especially Winsock, meant digging through what felt like mountains of documentation and examples on learn.microsoft.com. Reading about an individual function was often not enough to understand how it should fit into the application. I had to piece together socket configuration, blocking behavior, error handling, and cleanup across different examples, then work out which assumptions applied to our own client and server.",
            "The examples on learn.microsoft.com gave me a starting point, but adapting them meant understanding why each call was there and what happened when it returned something unexpected. Through that process, the details that initially felt implicit became easier to recognize. It taught me that working with lower-level platform APIs involves as much reading, testing, and connecting scattered information as it does writing code."
          ]
        }
      ]
    }
  },
  {
    id: "polygon-simplification",
    title: "Area-Preserving Polygon Simplification",
    tagline: "A C++ implementation of area-preserving segment collapse, reducing polygon vertex counts while limiting shape displacement and checking for intersections.",
    active: true,
    featured: true,
    roles: ["software-engineering"],
    period: "",
    metrics: [
      { label: "Languages", value: "C++ / Python" },
      { label: "Team Size", value: "4 members" },
      { label: "Role", value: "Implementation" },
      { label: "Duration", value: "May 2026 to June 2026" },
      { label: "Tools", value: "GCC, Make, Python for benchmarking" }
    ],
    summary: "Implemented a greedy polygon simplification algorithm with area-preserving point placement, priority-queue candidate selection, and spatially indexed topology checks.",
    links: { github: "https://github.com/Timothy-Loh-bc/CSD2183-Homework-2-Polygon-Simplification" },
    caseStudy: {
      overview: [
        "This project was developed by a team of four for CSD2183 Data Structures at Singapore Institute of Technology. It implements Area-Preserving Segment Collapse, based on work by Kronenfeld and collaborators, as a command-line tool for simplifying polygons, including polygons with holes.",
        "My role was implementation, while teammates handled the report, video and presentation, and AI prompt refinement. The project used AI assistance during development, with an accompanying disclosure report in the repository.",
        "The tool reads polygon rings from CSV and attempts to reduce their total vertex count to a requested target. Each step replaces two neighboring vertices with a new point selected to preserve signed area mathematically and limit local shape displacement. Intersection checks reject unsafe collapses, so simplification can stop before reaching the target."
      ],
      architecture: [
        "Each polygon ring is represented as a circular doubly linked list, allowing a collapse to update neighboring vertices without shifting an entire array. A min-heap orders candidate collapses by their displacement cost.",
        "Point placement uses a four-vertex neighborhood to construct an area-preserving line. Candidate points are evaluated where that line intersects the surrounding edge lines, with the lower-displacement valid placement selected. A proximity limit guards against excessively distant placements from nearly parallel lines.",
        "A uniform spatial grid narrows the existing edges considered during intersection checks. Removed edges are pruned lazily, and vertex generation counters identify outdated priority-queue candidates after a neighborhood changes.",
        "The code separates input/output, geometric predicates, point placement, and collapse execution. A Python script supports experimental plots of runtime, memory use, and displacement as input size and target vertex count vary."
      ],
      keyCapabilities: [
        "Polygon simplification: processes multiple rings and holes, aiming to preserve signed ring area within floating-point precision while reducing vertices.",
        "Shape preservation: greedily prioritizes collapses with lower local areal displacement rather than removing vertices solely by distance.",
        "Topology checks: tests proposed edges against nearby existing edges and checks for existing vertices lying inside a new edge, addressing both crossings and self-touching cases.",
        "Validation and evaluation: includes 15 supplied cases and eight additional cases covering concave shapes, narrow features, and holes, alongside area and displacement output statistics."
      ]
    }
  },
];

// Helper functions for easy filtering and retrieval
const ProjectsManager = {
  // Returns all active projects
  getActiveProjects() {
    const positions = new Map(projectOrder.map((id, index) => [id, index]));
    return projectsData.filter(project => project.active).sort((a, b) =>
      (positions.get(a.id) ?? Infinity) - (positions.get(b.id) ?? Infinity)
    );
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
  module.exports = { projectOrder, projectsData, ProjectsManager };
} else {
  window.projectsData = projectsData;
  window.projectOrder = projectOrder;
  window.ProjectsManager = ProjectsManager;
}
