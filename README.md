# Personal Portfolio Website

**Week 1 Task - HTML, CSS and JavaScript**
**By:** Neela Reddy, B.Tech CSE (2025 batch), Vignana Bharathi Institute of Technology (VBIT), Hyderabad
**GitHub:** https://github.com/neelakoushik

A responsive, single-page portfolio website built with plain HTML, CSS and JavaScript (no frameworks, no build tools).
The **Projects** section loads my repositories from GitHub automatically, so new projects appear without editing any code.

> The marks, phone number, email and LinkedIn link in this site are **dummy data**. Replace them with real details before sharing the site.

## Sections

| Section  | What it has |
|----------|-------------|
| Home     | Introduction, short tagline, two buttons, small code card |
| About    | Short profile, photo placeholder, education details |
| Skills   | Technical skills grouped by type, plus things I'm learning |
| Projects | Cards loaded live from my GitHub account (code link + live demo link) |
| Contact  | Contact details and a contact form with validation |

## How to run the project

No installation is needed.

1. Download or clone this repository:
   ```
   git clone https://github.com/neelakoushik/portfolio-website.git
   ```
2. Open the folder and double-click **`index.html`**.

Optional: in VS Code, install the *Live Server* extension, right-click `index.html` and choose **Open with Live Server**.

> The Projects section needs an internet connection to talk to GitHub. Without it, sample projects are shown instead.

## How the Projects section works

`js/script.js` calls the public GitHub API:

```
https://api.github.com/users/neelakoushik/repos
```

- Every **public** repository is shown as a card (newest first, up to 6).
- Forks, archived repos and the repos listed in `HIDE_REPOS` (my profile repo and this portfolio repo) are skipped.
- The card shows the repo name, description, language, topics and a **GitHub code** link.
- A **Live demo** link appears if the repo has a website URL set, or if GitHub Pages is turned on for it.
- If there are no public repos yet (or GitHub can't be reached), 3 sample projects are shown with a short note.
- Results are cached for 10 minutes because GitHub allows only 60 anonymous requests per hour.

To change how many projects show, or which repos are hidden, edit the three lines at the top of section 4 in `js/script.js`:

```js
const GITHUB_USERNAME = "neelakoushik";
const MAX_PROJECTS = 6;
const HIDE_REPOS = ["neelakoushik", "portfolio-website"];
```

**Tips for nicer cards:** add a short *description* to each repo (the gear icon next to "About" on the repo page) and add *topics* such as `html`, `css`, `javascript`.

## Project structure

```
portfolio-website/
├── index.html          # all the page content
├── css/
│   └── style.css       # layout, colours, responsive rules
├── js/
│   └── script.js       # mobile menu, active nav link, GitHub projects, form validation
├── assets/
│   ├── profile.svg     # placeholder profile picture
│   └── favicon.svg     # browser tab icon
├── screenshots/        # screenshots for submission
└── README.md
```

## Features

- Navigation bar that stays at the top and scrolls smoothly to each section
- Current section is highlighted in the navbar while scrolling
- Hamburger menu on phones that closes after you tap a link
- Projects pulled automatically from GitHub (with a fallback if there are none)
- Responsive layout for desktop, tablet and mobile (CSS Grid, Flexbox and media queries)
- Contact form validation (name, email format, message length) with error messages
- Keyboard focus styles and `prefers-reduced-motion` support

## Contact form note

There is no backend, so the form only validates the input and shows a success message (the data is printed in the browser console). It can be connected later with a service like Formspree or EmailJS.

## Screenshots

| Desktop | Mobile |
|---------|--------|
| ![Home desktop](screenshots/01-home-desktop.png) | ![Home mobile](screenshots/09-mobile-home.png) |
| ![Projects from GitHub](screenshots/04b-projects-from-github.png) | ![Mobile projects](screenshots/12-mobile-projects.png) |

- `04-projects-desktop.png` shows the sample projects that appear while the GitHub account has no public repos.
- More screenshots (about, skills, contact, form errors, mobile menu, tablet, full page) are in the `screenshots/` folder.
- The "Projects from GitHub" screenshots were taken with a simulated GitHub response because the three sample repos were not uploaded yet.

## What I learned

- Building a layout with CSS Grid and Flexbox
- Making a page responsive with media queries
- Using JavaScript to handle events, toggle classes and validate forms
- Fetching data from a public API with `fetch()` and showing it on the page
- Using Git and GitHub to submit work

## Technologies

HTML5, CSS3, JavaScript (ES6), GitHub REST API, Git, GitHub
