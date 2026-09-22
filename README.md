# Hi there, I'm Timothy Loh 👋

[![Portfolio](https://img.shields.io/badge/Portfolio-Live_Site-6366f1?style=for-the-badge&logo=googlechrome&logoColor=white)](https://timothy-loh-bc.github.io/Timothy-Loh-bc/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com)
[![Email](https://img.shields.io/badge/Email-Contact_Me-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:timothyloh.dev@gmail.com)

Final-year Computer Science undergraduate student seeking **Software Engineering Internships**. Experienced in distributed task systems, real-time web applications, RESTful microservices, and database optimization.

---

## 🌟 Featured Engineering Projects

- **[Distributed Asynchronous Task Engine](https://timothy-loh-bc.github.io/Timothy-Loh-bc/project.html?id=distributed-task-runner)**: Scalable worker pool and Redis Streams task queue processing 8,500+ tasks/sec with DLQ and Prometheus observability.
- **[Synapse Collaborative Workspace](https://timothy-loh-bc.github.io/Timothy-Loh-bc/project.html?id=collaborative-workspace)**: Real-time multi-cursor document editor with WebSockets and Conflict-Free Replicated Data Types (CRDTs).
- **[InsightPulse Financial Analytics](https://timothy-loh-bc.github.io/Timothy-Loh-bc/project.html?id=predictive-analytics-platform)**: Python & FastAPI time-series processing pipeline with TimescaleDB indexing and unsupervised anomaly detection.
- **[CloudMart Microservices API](https://timothy-loh-bc.github.io/Timothy-Loh-bc/project.html?id=microservices-ecommerce-api)**: Resilient e-commerce backend with PostgreSQL row-level locks, JWT auth, and Stripe webhook reconciliation.

👉 **[View Full Portfolio & Interactive Case Studies](https://timothy-loh-bc.github.io/Timothy-Loh-bc/)**

---

## 🛠️ Tech Stack & Toolbelt

- **Languages:** Python, JavaScript (ES6+), TypeScript, Java, C/C++, SQL, HTML5/CSS3
- **Backend & APIs:** Node.js, Express.js, FastAPI, REST APIs, WebSockets
- **Databases & Caching:** PostgreSQL, MongoDB, Redis (Streams, Pub/Sub, Lua), TimescaleDB
- **DevOps & Cloud:** Docker, Linux, Git/GitHub, Prometheus, Grafana, AWS (EC2/S3)
- **Practices:** Distributed Systems, System Design, Unit Testing, CI/CD, Agile

---

## 🚀 Portfolio Setup & Customization Guide

This repository powers both your GitHub profile README and your personal GitHub Pages website.

### 1. Enable GitHub Pages
1. Go to this repository on GitHub: **`Timothy-Loh-bc/Timothy-Loh-bc`**
2. Click **Settings** (top tab) → **Pages** (left sidebar).
3. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`
   - **Branch:** Select `main` and folder `/(root)`
   - Click **Save**.
4. Within 1-2 minutes, your website will be live at:
   `https://timothy-loh-bc.github.io/Timothy-Loh-bc/`
   *(Tip: If you want the site at `timothy-loh-bc.github.io` without the subfolder, you can create a repository named `Timothy-Loh-bc.github.io` and push these files there!)*

---

### 2. How to Plug In & Out Projects (Modularity)
All projects live in [`js/projects-data.js`](js/projects-data.js).

- **To hide/unpublish a project:**
  Set `active: false`:
  ```javascript
  {
    id: "project-name",
    active: false, // <-- Hidden from the site
    ...
  }
  ```
- **To add a new project:**
  Simply copy an existing block in `projectsData` in [`js/projects-data.js`](js/projects-data.js), provide your title, roles, tags, metrics, and case study details.
- **To target specific roles:**
  Adjust the `roles` array (e.g. `roles: ["software-engineering", "backend"]`).

---

### 3. Tailored Links for Job Applications
When sending your portfolio to recruiters, you can send tailored links that automatically highlight projects relevant to that specific role:
- **Backend roles:** `https://timothy-loh-bc.github.io/Timothy-Loh-bc/?role=backend`
- **Full Stack roles:** `https://timothy-loh-bc.github.io/Timothy-Loh-bc/?role=fullstack`
- **General SWE roles:** `https://timothy-loh-bc.github.io/Timothy-Loh-bc/?role=software-engineering`
- **Data / ML roles:** `https://timothy-loh-bc.github.io/Timothy-Loh-bc/?role=data-ai`

---

### 4. Updating Personal Info
Edit [`js/config.js`](js/config.js) to update your email, LinkedIn URL, resume link, bio, and university details in one spot.
