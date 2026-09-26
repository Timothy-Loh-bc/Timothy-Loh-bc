/**
 * Timothy Loh - Portfolio Main Logic
 * Minimalist, Distraction-Free Presentation
 */

document.addEventListener('DOMContentLoaded', () => {
  initProfileData();
  initProjectsSection();
  initContactSection();
});

function initProfileData() {
  if (typeof profileConfig === 'undefined') return;

  // Document Title & Brand Header
  if (profileConfig.name) {
    document.title = `${profileConfig.name} | Portfolio`;
    document.querySelectorAll('.brand-name').forEach(el => el.textContent = profileConfig.name);
    const footerName = document.getElementById('footer-author-name');
    if (footerName) footerName.textContent = profileConfig.name;
  }

  // Hero Section
  setText('hero-name', profileConfig.name);
  setText('hero-role', profileConfig.roleTitle);
  setText('hero-tagline', profileConfig.tagline);

  // Profile Photo
  const photoImg = document.getElementById('hero-photo-img');
  const photoBox = document.getElementById('hero-photo-box');
  if (photoImg && profileConfig.avatarUrl) {
    photoImg.src = profileConfig.avatarUrl;
    photoImg.onload = () => {
      if (photoBox) photoBox.classList.remove('placeholder-active');
    };
    photoImg.onerror = () => {
      if (photoBox) photoBox.classList.add('placeholder-active');
    };
  } else if (photoBox) {
    photoBox.classList.add('placeholder-active');
  }

  if (profileConfig.education) {
    setText('edu-degree', profileConfig.education.degree);
    setText('edu-institution', profileConfig.education.institution);
    setText('edu-period', profileConfig.education.period);
    setText('edu-focus', `Core Focus: ${profileConfig.education.focus}`);
  }

  // Social & Contact Links
  setHref('hero-resume-link', profileConfig.contact.resumeUrl);
  setHref('nav-resume-link', profileConfig.contact.resumeUrl);
  setHref('hero-github-link', profileConfig.contact.github);
  setHref('hero-linkedin-link', profileConfig.contact.linkedin);
  setHref('contact-email-link', `mailto:${profileConfig.contact.email}`);
  setText('contact-email-display', profileConfig.contact.email);

  // Bio Paragraphs
  const bioContainer = document.getElementById('bio-container');
  if (bioContainer && profileConfig.bio) {
    bioContainer.innerHTML = profileConfig.bio
      .map(paragraph => `<p style="margin-bottom: 0.75rem; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${paragraph}</p>`)
      .join('');
  }

  // Skills Rows
  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer && profileConfig.skills) {
    skillsContainer.innerHTML = profileConfig.skills.map(group => `
      <div class="skill-row">
        <span class="skill-cat">${group.category}</span>
        <span class="skill-list">${group.items.join(' · ')}</span>
      </div>
    `).join('');
  }

  setText('copyright-year', new Date().getFullYear().toString());
}

function initProjectsSection() {
  if (typeof ProjectsManager === 'undefined') return;
  renderProjectList();
}

function renderProjectList() {
  const list = document.getElementById('projects-grid');
  if (!list) return;

  const projects = ProjectsManager.getActiveProjects();

  if (projects.length === 0) {
    list.innerHTML = `<div style="padding: 2rem 0; color: var(--text-muted); font-size: 0.95rem;">No projects to display.</div>`;
    return;
  }

  list.innerHTML = projects.map(project => {
    const metricsStr = (project.metrics || []).map(m =>
      `<span class="metric-simple-item">${m.label}: <strong>${m.value}</strong></span>`
    ).join(' &middot; ');

    const tagsStr = (project.tags || []).join(' · ');

    return `
      <article class="project-item">
        <div class="project-top-row">
          <h3 class="project-heading">${project.title}</h3>
          <span class="project-date">${project.period || ''}</span>
        </div>

        <p class="project-summary-text">${project.tagline}</p>

        ${metricsStr ? `<div class="project-metrics-simple">${metricsStr}</div>` : ''}

        <div class="project-tags-simple">${tagsStr}</div>

        <div class="project-actions-row">
          <a href="project.html?id=${project.id}" class="action-case-study">
            Read More &rarr;
          </a>
          ${project.links?.github ? `
            <a href="${project.links.github}" class="action-github" target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">&nearr;</span>
            </a>
          ` : ''}
        </div>
      </article>
    `;
  }).join('');
}

function initContactSection() {
  const form = document.getElementById('quick-contact-form');
  const copyBtn = document.getElementById('copy-email-btn');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = profileConfig?.contact?.email || 'timothyloh.dev@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard');
      }).catch(() => {
        showToast(email);
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('sender-name').value.trim();
      const roleType = document.getElementById('sender-role-type').value.trim();
      const message = document.getElementById('sender-message').value.trim();

      const recipient = profileConfig?.contact?.email || 'timothyloh.dev@gmail.com';
      const subject = encodeURIComponent(`[Internship Inquiry] ${roleType} - ${senderName}`);
      const body = encodeURIComponent(
        `Hi Timothy,\n\n${message}\n\nBest regards,\n${senderName}`
      );

      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2500);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text) el.textContent = text;
}

function setHref(id, href) {
  const el = document.getElementById(id);
  if (el && href) el.href = href;
}
