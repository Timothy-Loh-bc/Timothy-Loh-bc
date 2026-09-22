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

let currentRoleFilter = 'all';

function initProjectsSection() {
  if (typeof ProjectsManager === 'undefined') return;

  // Check URL query parameters for ?role=... (e.g. ?role=backend)
  const urlParams = new URLSearchParams(window.location.search);
  const requestedRole = urlParams.get('role');

  const availableRoles = profileConfig.roleFilters || [
    { id: "all", label: "All" },
    { id: "software-engineering", label: "Software Engineering" },
    { id: "backend", label: "Backend" },
    { id: "fullstack", label: "Full Stack" },
    { id: "data-ai", label: "Data / ML" }
  ];

  if (requestedRole && availableRoles.some(r => r.id === requestedRole.toLowerCase())) {
    currentRoleFilter = requestedRole.toLowerCase();
  }

  renderFilterTabs(availableRoles);
  renderProjectList(currentRoleFilter);
  updateRoleNotice(currentRoleFilter);
}

function renderFilterTabs(roles) {
  const container = document.getElementById('filter-pills-container');
  if (!container) return;

  container.innerHTML = roles.map(role => {
    const count = ProjectsManager.getProjectsByRole(role.id).length;
    const isActive = role.id === currentRoleFilter ? 'active' : '';

    return `
      <button class="filter-btn ${isActive}" data-role="${role.id}">
        <span>${role.label}</span>
        <span class="filter-count">(${count})</span>
      </button>
    `;
  }).join('');

  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setRoleFilter(btn.dataset.role);
    });
  });
}

function setRoleFilter(roleId) {
  currentRoleFilter = roleId;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.role === roleId);
  });

  const url = new URL(window.location);
  if (roleId === 'all') {
    url.searchParams.delete('role');
  } else {
    url.searchParams.set('role', roleId);
  }
  window.history.replaceState({}, '', url);

  renderProjectList(roleId);
  updateRoleNotice(roleId);
}

function updateRoleNotice(roleId) {
  const noticeBox = document.getElementById('active-role-notice');
  const noticeText = document.getElementById('role-notice-text');
  const clearBtn = document.getElementById('clear-role-btn');

  if (!noticeBox) return;

  if (roleId !== 'all') {
    noticeBox.style.display = 'block';
    const roleObj = (profileConfig.roleFilters || []).find(r => r.id === roleId);
    const roleName = roleObj ? roleObj.label : roleId;
    if (noticeText) noticeText.textContent = `Filtered by role: ${roleName}`;

    if (clearBtn) {
      clearBtn.onclick = () => setRoleFilter('all');
    }
  } else {
    noticeBox.style.display = 'none';
  }
}

function renderProjectList(roleId) {
  const list = document.getElementById('projects-grid');
  if (!list) return;

  const projects = ProjectsManager.getProjectsByRole(roleId);

  if (projects.length === 0) {
    list.innerHTML = `
      <div style="padding: 2rem 0; color: var(--text-muted); font-size: 0.95rem;">
        No projects currently matching this filter. <a href="#" onclick="setRoleFilter('all'); return false;">View all projects</a>
      </div>
    `;
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
            Case Study &rarr;
          </a>
          ${project.links?.github ? `
            <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="action-secondary">
              GitHub ↗
            </a>
          ` : ''}
          ${project.links?.demo ? `
            <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="action-secondary">
              Live Demo ↗
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
