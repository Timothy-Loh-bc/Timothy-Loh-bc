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
        caption: "Cartoon shading demo. This demo applies edge detection on top of cartoon shading to produce a more vivid, stylized result with emphasized outlines. It uses 6 render passes in its render pipeline. Pass 1: Blinn-Phong render (edge-detection pipeline); Pass 2: Gaussian blur vertical (edge-detection pipeline); Pass 3: Gaussian blur horizontal (edge-detection pipeline); Pass 4: Sobel edge detection (edge-detection pipeline); Pass 5: Cartoon shading render (cartoon pipeline); Pass 6: Combine and render to default framebuffer (combine together). In the video, edge detection using blur filtering is demonstrated, afterwards, the blur filtering is turned off to show the difference."
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
        caption: "Ogre demo. This demo showcases a deferred rendering pipeline used to efficiently render a large number of ogre instances. Geomtery is first rendered into multiple G-Buffers that store per-pixel attributes. A second pass is done afterwards, using the information from the G-Buffer to compute lighting and shading on a screen-space quad. This separation allows for complex lighting to be applied without re-rendering geometry."
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
