/**
 * Project Case Study Renderer (project.js)
 * Minimalist Technical Document Format
 */

document.addEventListener('DOMContentLoaded', () => {
  renderProjectDetail();
});

function renderParagraphs(text) {
  if (!text) return '';
  const paragraphs = Array.isArray(text) ? text : text.split(/\n\s*\n/);
  return paragraphs
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p class="case-body-text">${p}</p>`)
    .join('');
}

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

  // Optional project demo (local file or direct video URL).
  const video = caseStudy.video;
  const videoHtml = video?.src ? `
    <div class="case-video-wrapper">
      <video class="case-video" controls playsinline preload="metadata"${video.poster ? ` poster="${video.poster}"` : ''} aria-label="${project.title} project video">
        <source src="${video.src}">
        Your browser does not support video playback.
        <a href="${video.src}">Open the project video</a>.
      </video>
      ${video.caption ? `<p class="case-video-caption">${video.caption}</p>` : ''}
    </div>
  ` : '';

  // Screenshots (carousel)
  const screenshots = caseStudy.screenshots || [];
  const screenshotsHtml = screenshots.length ? `
    <div class="case-carousel${screenshots.length === 1 ? ' single-screenshot' : ''}" data-index="0">
      <div class="case-carousel-viewport">
        ${screenshots.length > 1 ? '<button class="case-carousel-arrow case-carousel-prev" aria-label="Previous screenshot">&larr;</button>' : ''}
        <div class="case-carousel-track">
          ${screenshots.map((shot, i) => `
            <div class="case-carousel-slide" data-slide="${i}">
              <img src="${shot.src}" alt="${shot.caption || project.title}" loading="lazy">
            </div>
          `).join('')}
        </div>
        ${screenshots.length > 1 ? '<button class="case-carousel-arrow case-carousel-next" aria-label="Next screenshot">&rarr;</button>' : ''}
      </div>
      <div class="case-carousel-caption" aria-live="polite">${screenshots[0]?.caption || ''}</div>
      ${screenshots.length > 1 ? `
        <div class="case-carousel-dots">
          ${screenshots.map((_, i) => `<button class="case-carousel-dot${i === 0 ? ' active' : ''}" data-dot="${i}" type="button" aria-label="Show screenshot ${i + 1}" aria-current="${i === 0 ? 'true' : 'false'}"></button>`).join('')}
        </div>
      ` : ''}
    </div>
  ` : '';

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
      <h3 class="challenge-problem">${ch.challenge}</h3>
      <div class="challenge-solution">${renderParagraphs(ch.resolution)}</div>
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
      ${project.links?.github ? `
        <div class="case-links">
          <a href="${project.links.github}" class="action-github" target="_blank" rel="noopener noreferrer">
            View on GitHub <span aria-hidden="true">&nearr;</span>
          </a>
        </div>
      ` : ''}
    </header>

    ${metricsHtml ? `<div class="case-metrics-simple">${metricsHtml}</div>` : ''}

    <article>
      <!-- Overview -->
		<section class="case-section">
		  <h2 class="case-section-title">Overview</h2>
		  ${videoHtml}
		  ${renderParagraphs(caseStudy.overview || project.summary)}
		</section>

      <!-- Screenshots -->
		${screenshotsHtml ? `
		  <section class="case-section">
			<h2 class="case-section-title">Screenshots</h2>
			${screenshotsHtml}
		  </section>
		` : ''}

      <!-- Architecture -->
		${caseStudy.architecture ? `
		  <section class="case-section">
			<h2 class="case-section-title">Architecture</h2>
			${renderParagraphs(caseStudy.architecture)}
		  </section>
		` : ''}
	  
      <!-- Key Capabilities -->
		${caseStudy.keyCapabilities ? `
		  <section class="case-section">
			<h2 class="case-section-title">Key Capabilities</h2>
			${renderParagraphs(caseStudy.keyCapabilities)}
		  </section>
		` : ''}
	  
      ${challengesHtml ? `
        <section class="case-section">
          <h2 class="case-section-title">Technical Challenges</h2>
          ${challengesHtml}
        </section>
      ` : ''}

      ${caseStudy.leadershipLessons?.length ? `
        <section class="case-section">
          <h2 class="case-section-title">Reflection</h2>
          ${renderParagraphs(caseStudy.leadershipLessons)}
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

  initCarousel(container, screenshots);
}

function initCarousel(container, screenshots) {
  const carousel = container.querySelector('.case-carousel');
  if (!carousel || !screenshots.length) return;

  const track = carousel.querySelector('.case-carousel-track');
  const caption = carousel.querySelector('.case-carousel-caption');
  const dots = carousel.querySelectorAll('.case-carousel-dot');
  const prevBtn = carousel.querySelector('.case-carousel-prev');
  const nextBtn = carousel.querySelector('.case-carousel-next');
  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    if (caption) caption.textContent = screenshots[index]?.caption || '';
    dots.forEach((dot, i) => {
      const isActive = i === index;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
    carousel.dataset.index = index;
  }

  if (screenshots.length <= 1) {
    return;
  }

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + screenshots.length) % screenshots.length;
    update();
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % screenshots.length;
    update();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      index = parseInt(dot.dataset.dot, 10);
      update();
    });
  });

  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') prevBtn.click();
    if (event.key === 'ArrowRight') nextBtn.click();
  });
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
