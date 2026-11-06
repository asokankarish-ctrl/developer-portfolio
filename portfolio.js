const projects = [
  {
    name: "Student Assignment Tracker",
    art: "ASSIGNMENT<br>TRACKER",
    style: "signal",
    category: "javascript",
    label: "Guided learning project · HTML, CSS, JavaScript",
    description: "A browser-based tool for managing coursework, tracking deadlines, and marking assignments complete.",
    idea: "Give students one place to see what’s pending, what’s finished, and what’s overdue.",
    approach: "Add and delete assignments, filter by completion status, and highlight overdue work. Save assignments with localStorage so they’re available the next time the page opens.",
    live: "https://asokankarish-ctrl.github.io/student-assignment-tracker/",
    source: "https://github.com/asokankarish-ctrl/student-assignment-tracker"
  },
  {
    name: "BrightPath Tutoring",
    art: "BRIGHTPATH<br>TUTORING",
    style: "atlas",
    category: "html-css",
    label: "Guided portfolio demo · HTML, CSS",
    description: "A responsive landing page for a fictional tutoring service.",
    idea: "Introduce the service and make it easy for visitors to browse the subjects on offer.",
    approach: "Structure the page with semantic HTML and in-page navigation. Use CSS Grid for the subject cards and adapt the layout for smaller screens.",


  }
];

const select = (selector) => document.querySelector(selector);
const grid = select("#projects");
const dialog = select("#case-study");
const filters = [...document.querySelectorAll("[data-filter]")];
let openedFrom;

function projectArt(project, index) {
  const art = document.createElement("div");
  art.className = "project-art " + project.style;
  art.setAttribute("aria-hidden", "true");
  art.innerHTML = '<span class="art-label">PROJECT / ' + String(index + 1).padStart(2, "0") + '</span><span class="art-title">' + project.art + '</span>';
  return art;
}

function openProject(project, index, button) {
  openedFrom = button;
  select(".case-art").replaceChildren(projectArt(project, index));
  select(".case-category").textContent = project.label.toUpperCase();
  select("#case-title").textContent = project.name;
  select(".case-description").textContent = project.description;
  select(".case-idea").textContent = project.idea;
  select(".case-approach").textContent = project.approach;
  for (const [selector, href] of [[".case-live", project.live], [".case-source", project.source]]) {
    const link = select(selector);
    link.hidden = !href;
    if (href) link.href = href;
    else link.removeAttribute("href");
  }
  dialog.showModal();
  dialog.scrollTop = 0;
}

const cards = projects.map((project, index) => {
  const card = document.createElement("article");
  card.className = "project";
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-haspopup", "dialog");
  button.append(projectArt(project, index));
  const meta = document.createElement("span");
  meta.className = "project-meta";
  meta.innerHTML = '<strong></strong><span class="arrow" aria-hidden="true">↗</span><small></small>';
  meta.querySelector("strong").textContent = project.name;
  meta.querySelector("small").textContent = project.label;
  button.append(meta);
  button.addEventListener("click", () => openProject(project, index, button));
  card.append(button);
  grid.append(card);
  return card;
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.dataset.filter;
    filters.forEach((option) => option.setAttribute("aria-pressed", String(option === filter)));
    cards.forEach((card, index) => {
      card.hidden = category !== "all" && projects[index].category !== category;
    });
    const count = cards.filter((card) => !card.hidden).length;
    select("#project-count").textContent = String(count).padStart(2, "0") + (count === 1 ? " PROJECT" : " PROJECTS");
  });
});

dialog.addEventListener("close", () => openedFrom?.focus());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const progress = select(".progress");
function updateProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = "scaleX(" + (maxScroll > 0 ? window.scrollY / maxScroll : 0) + ")";
}
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

const portrait = select(".portrait");
const motion = matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)");
portrait.addEventListener("pointermove", (event) => {
  if (!motion.matches) return;
  const rect = portrait.getBoundingClientRect();
  portrait.style.setProperty("--shift-x", (event.clientX - rect.left - rect.width / 2) * 0.025 + "px");
  portrait.style.setProperty("--shift-y", (event.clientY - rect.top - rect.height / 2) * 0.025 + "px");
});
portrait.addEventListener("pointerleave", () => {
  portrait.style.removeProperty("--shift-x");
  portrait.style.removeProperty("--shift-y");
});
