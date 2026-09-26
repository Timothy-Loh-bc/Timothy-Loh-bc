# [Your Name] — Portfolio

[![Portfolio](https://img.shields.io/badge/Portfolio-View_Site-6366f1?style=for-the-badge&logo=googlechrome&logoColor=white)](https://timothy-loh-bc.github.io/Timothy-Loh-bc/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/timothyloh2001/)
[![Email](https://img.shields.io/badge/Email-Contact_Me-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:lohbctimothy@gmail.com)

> [A short introduction describing who you are, what you build, and the opportunities you are seeking.]

## About Me

[Write two or three sentences about your background, interests, and current goals. Keep this section concise and specific.]

- **Current role or course:** [Your role, degree, or programme]
- **Based in:** [City, Country]
- **Interested in:** [Backend engineering, game development, data, etc.]
- **Currently learning:** [Technology or subject]
- **Open to:** [Internships, graduate roles, freelance work, etc.]

## Featured Projects

### [Project One]

[One-sentence explanation of the problem and what you built.]

- **Highlights:** [Key result, feature, or measurable impact]
- **Built with:** [Technology], [Technology], [Technology]
- **Links:** [Case study](PROJECT_CASE_STUDY_URL) · [Source code](PROJECT_REPOSITORY_URL) · [Live demo](PROJECT_DEMO_URL)

### [Project Two]

[One-sentence explanation of the problem and what you built.]

- **Highlights:** [Key result, feature, or measurable impact]
- **Built with:** [Technology], [Technology], [Technology]
- **Links:** [Case study](PROJECT_CASE_STUDY_URL) · [Source code](PROJECT_REPOSITORY_URL) · [Live demo](PROJECT_DEMO_URL)

<!-- Copy a project section above to add more featured projects. -->

## Skills

- **Languages:** [Language], [Language], [Language]
- **Frameworks and libraries:** [Framework], [Framework], [Library]
- **Databases:** [Database], [Database]
- **Tools and platforms:** [Tool], [Cloud platform], [Operating system]
- **Practices:** [Testing], [System design], [CI/CD]

## Portfolio Website

This repository contains a static portfolio website built with HTML, CSS, and JavaScript.

### Update your personal information

Edit [`js/config.js`](js/config.js) to change your name, biography, contact details, resume link, education, and role filters.

### Add or edit projects

Project content is stored in [`js/projects-data.js`](js/projects-data.js). Copy an existing project object and replace its values:

```javascript
{
  id: "unique-project-id",
  title: "Project Name",
  tagline: "A concise description of the project.",
  active: true,
  featured: true,
  roles: ["software-engineering"],
  period: "Month Year – Month Year",
  tags: ["Technology", "Technology"],
  metrics: [
    { label: "Role", value: "Your Role" }
  ],
  caseStudy: {
    screenshots: [
      {
        src: "assets/project-name/screenshot.png",
        caption: "Describe what this screenshot shows."
      }
    ],
    overview: "Explain the project, its purpose, and your contribution."
  }
}
```

Set `active` to `false` to hide a project without deleting it. Store its images under `assets/` and make sure filename capitalization exactly matches the paths in the project data.

### Run locally

Open `index.html` directly, or serve the repository with any local static-file server.

### Publish with GitHub Pages

1. Open the repository's **Settings** on GitHub.
2. Select **Pages**.
3. Choose **Deploy from a branch**.
4. Select the `main` branch and `/(root)` folder, then save.
5. Replace `YOUR_PORTFOLIO_URL` at the top of this file with the published URL.

## Contact

- **Email:** [EMAIL_ADDRESS]
- **LinkedIn:** [LINKEDIN_URL]
- **Portfolio:** [PORTFOLIO_URL]

---

Replace every value in square brackets before publishing this README.
