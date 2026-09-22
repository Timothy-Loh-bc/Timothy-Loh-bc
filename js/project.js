/**
 * Project Case Study Renderer (project.js)
 * Minimalist Technical Document Format
 */

document.addEventListener('DOMContentLoaded', () => {
  renderProjectDetail();
});

function renderProjectDetail() {
  const container = document.getElementById('project-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  if (!projectId || typeof ProjectsManager === 'undefined') {
    renderNotFound(container);
    return;
  }

  const project = ProjectsManager.getProjectById(projectId);

  if (!project) {
    renderNotFound(container);
    return;
  }

  const authorName = (typeof profileConfig !== 'undefined' && profileConfig.name) ? profileConfig.name : 'Timothy Loh';
  document.title = `${project.title} — ${authorName}`;

  // Sync Brand, Navigation and Footer
  document.querySelectorAll('.brand-name').forEach(el => el.textContent = authorName);
  const navResume = document.getElementById('nav-resume-link');
  if (navResume && typeof profileConfig !== 'undefined' && profileConfig.contact?.resumeUrl) {
    navResume.href = profileConfig.contact.resumeUrl;
  }
  const footerAuthor = document.getElementById('footer-author-name');
  if (footerAuthor) footerAuthor.textContent = authorName;
  const footerYear = document.getElementById('copyright-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear().toString();

  const activeProjects = ProjectsManager.getActiveProjects();
  const currentIndex = activeProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? activeProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < activeProjects.length - 1 ? activeProjects[currentIndex + 1] : null;

  const caseStudy = project.caseStudy || {};

  // Metrics HTML
  const metricsHtml = (project.metrics || []).map(m => `
    <div>
      <div class="metric-box-val">${m.value}</div>
      <div class="metric-box-lbl">${m.label}</div>
    </div>
  `).join('');

  // Architecture items
  const archItemsHtml = (caseStudy.architecture || []).map(item => `
    <li class="case-list-item">
      <span class="case-bullet">&mdash;</span>
      <div>${item}</div>
    </li>
  `).join('');

  // Key Features
  const featuresHtml = (caseStudy.keyFeatures || []).map(feat => `
    <li class="case-list-item">
      <span class="case-bullet">&bull;</span>
      <div>${feat}</div>
    </li>
  `).join('');

  // Technical Challenges
  const challengesHtml = (caseStudy.technicalChallenges || []).map(ch => `
    <div class="challenge-item">
      <div class="challenge-problem">Challenge: ${ch.challenge}</div>
      <div class="challenge-solution">${ch.resolution}</div>
    </div>
  `).join('');

  // Tech breakdown
  const techStackHtml = Object.entries(caseStudy.technologies || {}).map(([cat, list]) => `
    <div class="tech-breakdown-row">
      <div class="tech-breakdown-cat">${cat}:</div>
      <div class="tech-breakdown-items">${list.join(', ')}</div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="back-row">
      <a href="index.html#projects" class="back-link">
        &larr; Back to all projects
      </a>
    </div>

    <header class="case-header">
      <h1 class="case-title">${project.title}</h1>
      <p class="case-tagline">${project.tagline}</p>

      <div class="case-meta">
        <div class="case-roles">
          Role tags: ${project.roles.join(', ')} &middot; ${project.period || ''}
        </div>
        <div class="case-links">
          ${project.links?.github ? `
            <a href="${project.links.github}" target="_blank" rel="noopener noreferrer">
              GitHub Repo ↗
            </a>
          ` : ''}
          ${project.links?.demo ? `
            <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer">
              Live Demo ↗
            </a>
          ` : ''}
        </div>
      </div>
    </header>

    ${metricsHtml ? `<div class="case-metrics-simple">${metricsHtml}</div>` : ''}

    <article>
      <!-- Overview -->
      <section class="case-section">
        <h2 class="case-section-title">Overview</h2>
        <p class="case-body-text">${caseStudy.overview || project.summary}</p>
      </section>

      <!-- Problem -->
      ${caseStudy.problem ? `
        <section class="case-section">
          <h2 class="case-section-title">Problem & Motivation</h2>
          <p class="case-body-text">${caseStudy.problem}</p>
        </section>
      ` : ''}

      <!-- Architecture -->
      ${archItemsHtml ? `
        <section class="case-section">
          <h2 class="case-section-title">System Architecture</h2>
          <ul class="case-list">
            ${archItemsHtml}
          </ul>
        </section>
      ` : ''}

      <!-- Key Features -->
      ${featuresHtml ? `
        <section class="case-section">
          <h2 class="case-section-title">Key Capabilities</h2>
          <ul class="case-list">
            ${featuresHtml}
          </ul>
        </section>
      ` : ''}

      <!-- Engineering Challenges -->
      ${challengesHtml ? `
        <section class="case-section">
          <h2 class="case-section-title">Engineering Challenges Solved</h2>
          ${challengesHtml}
        </section>
      ` : ''}

      <!-- Technologies -->
      ${techStackHtml ? `
        <section class="case-section">
          <h2 class="case-section-title">Technology Stack</h2>
          ${techStackHtml}
        </section>
      ` : ''}

      <!-- Learnings -->
      ${caseStudy.learnings ? `
        <section class="case-section">
          <h2 class="case-section-title">Key Learnings & Takeaways</h2>
          <p class="case-body-text">${caseStudy.learnings}</p>
        </section>
      ` : ''}
    </article>

    <div class="case-pagination">
      ${prevProject ? `
        <a href="project.html?id=${prevProject.id}">
          &larr; ${prevProject.title}
        </a>
      ` : '<div></div>'}

      ${nextProject ? `
        <a href="project.html?id=${nextProject.id}">
          ${nextProject.title} &rarr;
        </a>
      ` : '<div></div>'}
    </div>
  `;
}

function renderNotFound(container) {
  container.innerHTML = `
    <div style="padding: 3rem 0;">
      <h1 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Project Not Found</h1>
      <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
        The requested project case study could not be found.
      </p>
      <a href="index.html#projects">&larr; Return to all projects</a>
    </div>
  `;
}
