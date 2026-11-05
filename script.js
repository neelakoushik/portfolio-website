// Neela Reddy - Portfolio
// All the JavaScript for the site is in this one file.

// ---------- 1. Mobile menu (hamburger) ----------
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.classList.toggle("open", isOpen);
  menuBtn.setAttribute("aria-expanded", isOpen);
  menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

// close the menu after tapping a link (otherwise it stays open on phones)
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

function closeMenu() {
  navLinks.classList.remove("open");
  menuBtn.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open menu");
}


// ---------- 2. Highlight the current section in the navbar ----------
const sections = document.querySelectorAll("main section[id]");
const menuItems = document.querySelectorAll(".nav-link");

function highlightNav() {
  // a section counts as "current" once its top passes this line
  const line = window.scrollY + 120;
  let currentId = "home";

  sections.forEach(function (section) {
    if (line >= section.offsetTop) {
      currentId = section.id;
    }
  });

  // if we are at the very bottom, the last section is always active
  // (the contact section is short so it would never reach the line otherwise)
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
    currentId = "contact";
  }

  menuItems.forEach(function (item) {
    const matches = item.getAttribute("href") === "#" + currentId;
    item.classList.toggle("active", matches);
    if (matches) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", highlightNav);
window.addEventListener("load", highlightNav);


// ---------- 3. Contact form validation ----------
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successMsg = document.getElementById("formSuccess");

// simple email pattern: something@something.something
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(input, errorId, text) {
  document.getElementById(errorId).textContent = text;
  input.classList.toggle("invalid", text !== "");
  input.setAttribute("aria-invalid", text !== "");
}

function validateForm() {
  let ok = true;

  if (nameInput.value.trim().length < 2) {
    showError(nameInput, "nameError", "Please enter your name (at least 2 letters).");
    ok = false;
  } else {
    showError(nameInput, "nameError", "");
  }

  if (!emailPattern.test(emailInput.value.trim())) {
    showError(emailInput, "emailError", "Please enter a valid email, like name@example.com.");
    ok = false;
  } else {
    showError(emailInput, "emailError", "");
  }

  if (messageInput.value.trim().length < 10) {
    showError(messageInput, "messageError", "Your message should be at least 10 characters.");
    ok = false;
  } else {
    showError(messageInput, "messageError", "");
  }

  return ok;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();          // stop the page from reloading
  successMsg.textContent = "";

  if (validateForm()) {
    // There is no backend in this project, so we only show a message.
    // Later this could be connected to Formspree / EmailJS / a Node server.
    const firstName = nameInput.value.trim().split(" ")[0];
    console.log("Form data:", {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim()
    });

    successMsg.textContent =
      "Thanks, " + firstName + "! Your message was checked (demo only, no server is connected yet).";
    form.reset();
  }
});

// remove the red error as soon as the user starts fixing a field
[nameInput, emailInput, messageInput].forEach(function (input) {
  input.addEventListener("input", function () {
    input.classList.remove("invalid");
    input.setAttribute("aria-invalid", "false");
    document.getElementById(input.id + "Error").textContent = "";
  });
});


// ---------- 4. Projects loaded from GitHub ----------

// Change these if needed
const GITHUB_USERNAME = "neelakoushik";
const MAX_PROJECTS = 6;                                  // how many cards to show
const HIDE_REPOS = ["neelakoushik", "portfolio-website"]; // repos that should NOT appear as projects

const projectsGrid = document.getElementById("projectsGrid");
const projectsNote = document.getElementById("projectsNote");

// Shown only while the GitHub account has no public repos (or GitHub can't be reached).
// Once real repos exist, these are replaced automatically.
const sampleProjects = [
  {
    title: "Expense Tracker",
    description: "Add daily income and expenses, see the balance and filter by income or expense. Data is saved in the browser using localStorage.",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "Tech Quiz App",
    description: "A 10-question multiple choice quiz on computer science basics (DBMS, OS, networks and more) with a score and answer review at the end.",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "Task Manager",
    description: "A simple to-do list where you can add, complete, edit and delete tasks, and filter them by all, active or completed.",
    tags: ["HTML", "CSS", "JavaScript"]
  }
];

// "tech-quiz_app" -> "Tech Quiz App"
function prettyName(repoName) {
  return repoName
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, function (c) { return c.toUpperCase(); });
}

// small helper so we never put GitHub text straight into innerHTML
function makeEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

function makeChips(list, small) {
  const ul = makeEl("ul", "chips" + (small ? " chips-small" : ""));
  list.forEach(function (item) {
    ul.appendChild(makeEl("li", "", item));
  });
  return ul;
}

function makeLink(text, url) {
  const a = makeEl("a", "", text);
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener";
  return a;
}

// builds one project card (works for both real repos and sample projects)
function buildCard(project) {
  const card = makeEl("article", "project");
  card.appendChild(makeEl("h3", "", project.title));
  card.appendChild(makeEl("p", "project-tag", project.meta));
  card.appendChild(makeEl("p", "", project.description));
  if (project.tags.length) {
    card.appendChild(makeChips(project.tags, true));
  }

  const links = makeEl("div", "project-links");
  if (project.codeUrl) {
    links.appendChild(makeLink("GitHub code", project.codeUrl));
  } else {
    links.appendChild(makeEl("span", "link-soon", "Code coming soon"));
  }
  if (project.liveUrl) {
    links.appendChild(makeLink("Live demo", project.liveUrl));
  }
  card.appendChild(links);
  return card;
}

// turns the data GitHub sends back into what our card needs
function repoToProject(repo) {
  const tags = [];
  if (repo.language) tags.push(repo.language);
  (repo.topics || []).forEach(function (t) {
    // skip topics that repeat something already shown (e.g. "javascript" after "JavaScript")
    const already = tags.some(function (x) { return x.toLowerCase() === t.toLowerCase(); });
    if (!already && tags.length < 4) tags.push(t);
  });

  // live demo = the "website" field of the repo, or the GitHub Pages address if Pages is on
  let live = repo.homepage ? repo.homepage.trim() : "";
  if (live && !/^https?:\/\//i.test(live)) live = "https://" + live;
  if (!live && repo.has_pages) {
    live = "https://" + GITHUB_USERNAME + ".github.io/" + repo.name + "/";
  }

  const updated = new Date(repo.pushed_at || repo.updated_at);
  const meta = "Updated " + updated.toLocaleDateString("en-IN", { month: "short", year: "numeric" });

  return {
    title: prettyName(repo.name),
    meta: meta,
    description: repo.description || "No description added yet. Add one in the repository settings on GitHub.",
    tags: tags,
    codeUrl: repo.html_url,
    liveUrl: live
  };
}

function showProjects(list) {
  projectsGrid.textContent = "";
  list.forEach(function (project) {
    projectsGrid.appendChild(buildCard(project));
  });
}

function showSamples(noteText) {
  showProjects(sampleProjects.map(function (p) {
    return { title: p.title, meta: "Sample project", description: p.description, tags: p.tags, codeUrl: "", liveUrl: "" };
  }));
  projectsNote.textContent = noteText;
}

// GitHub allows only 60 requests per hour without a login, so remember the
// answer for 10 minutes in sessionStorage instead of asking on every refresh.
function getCachedRepos() {
  try {
    const saved = JSON.parse(sessionStorage.getItem("repos-cache"));
    if (saved && Date.now() - saved.time < 10 * 60 * 1000) return saved.repos;
  } catch (e) { /* ignore, we will just fetch again */ }
  return null;
}

function saveCachedRepos(repos) {
  try {
    sessionStorage.setItem("repos-cache", JSON.stringify({ time: Date.now(), repos: repos }));
  } catch (e) { /* storage not available, no problem */ }
}

function loadRepos() {
  const cached = getCachedRepos();
  if (cached) return Promise.resolve(cached);

  const url = "https://api.github.com/users/" + GITHUB_USERNAME + "/repos?sort=pushed&per_page=100";
  return fetch(url)
    .then(function (response) {
      if (!response.ok) throw new Error("GitHub returned " + response.status);
      return response.json();
    })
    .then(function (repos) {
      saveCachedRepos(repos);
      return repos;
    });
}

loadRepos()
  .then(function (repos) {
    const mine = repos
      .filter(function (r) { return !r.fork && !r.archived && HIDE_REPOS.indexOf(r.name) === -1; })
      .sort(function (a, b) { return new Date(b.pushed_at) - new Date(a.pushed_at); })
      .slice(0, MAX_PROJECTS);

    if (mine.length === 0) {
      showSamples("No public repositories yet, so these are sample projects. Upload a project to GitHub and it will appear here by itself.");
    } else {
      showProjects(mine.map(repoToProject));
      projectsNote.textContent = "";
    }
  })
  .catch(function (error) {
    console.log("Could not load GitHub repos:", error);
    showSamples("Could not reach GitHub right now, so sample projects are shown. Please try again later.");
  });


// ---------- 5. Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
