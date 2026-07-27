# Capstone Project

A responsive **Settings Page** built with HTML, CSS, and vanilla JavaScript. This capstone exercise focuses on AI-assisted development, prompt engineering, Git workflows, accessibility, and client-side form validation.

**Repository:** [github.com/TanvirCou/capstone-project](https://github.com/TanvirCou/capstone-project)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Branch Structure](#branch-structure)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Validation Rules](#validation-rules)
- [AI Development Workflow](#ai-development-workflow)
- [Accessibility](#accessibility)
- [Development Guidelines](#development-guidelines)
- [Git Workflow](#git-workflow)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Responsive layout for desktop and mobile
- Card-based UI with light/dark theme support
- Home page and dedicated Settings page
- Client-side form validation with inline error messages
- Email format validation
- Theme selection (Light / Dark) with live preview
- Notification toggle
- Settings persisted in `localStorage`
- Success feedback after saving
- Accessible form controls and keyboard-friendly navigation
- Submit button disabled while processing

---

## Tech Stack

| Layer           | Technology               |
| --------------- | ------------------------ |
| Markup          | HTML5                    |
| Styling         | CSS3                     |
| Logic           | Vanilla JavaScript (ES6) |
| Version control | Git & GitHub             |

No build tools or frameworks are required — open the project in a browser and it runs.

---

## Branch Structure

This repository uses separate branches to compare two AI prompting strategies:

| Branch       | Description                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| `main`       | Project documentation (`README.md`, `WORKFLOW.md`, `CLAUDE.md`)                                           |
| `ai-vague`   | Settings page built from a **vague prompt** — minimal instructions                                        |
| `ai-precise` | Settings page built from a **detailed prompt** — constraints, validation, accessibility, and verification |

To explore the implementations:

```bash
git checkout ai-vague    # Round One — vague prompt
git checkout ai-precise  # Round Two — precise prompt (recommended)
```

See [WORKFLOW.md](./WORKFLOW.md) for the full comparison and findings.

---

## Project Structure

On the `ai-precise` branch (recommended implementation):

```text
capstone-project/
├── index.html          # Home page
├── settings.html       # Settings form page
├── css/
│   └── style.css
├── js/
│   └── settings.js
├── README.md
├── WORKFLOW.md         # AI prompt comparison write-up
├── CLAUDE.md           # Project rules for AI-assisted development
├── LICENSE
└── .gitignore
```

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Edge, Firefox, or Safari)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension (recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/TanvirCou/capstone-project.git
   cd capstone-project
   ```

2. **Check out an implementation branch**

   ```bash
   git checkout ai-precise
   ```

3. **Open the project**
   - In VS Code: right-click `index.html` → **Open with Live Server**, or
   - Open `index.html` directly in your browser

No `npm install` or build step is needed.

---

## Usage

1. Open the app and navigate to **Settings** (or go directly to `settings.html`).
2. Enter your **full name**.
3. Enter a valid **email address**.
4. Select a **theme** (Light or Dark).
5. Toggle **notifications** on or off.
6. Click **Save Settings**.

If all fields pass validation, a success message appears and your preferences are saved to `localStorage`. Invalid fields show inline errors beneath the corresponding input and block submission until corrected.

---

## Validation Rules

| Field         | Rule                                         |
| ------------- | -------------------------------------------- |
| Full name     | Required; cannot be empty or whitespace only |
| Email         | Required; must match a valid email format    |
| Theme         | Required; Light or Dark must be selected     |
| Notifications | Optional checkbox                            |

Errors clear automatically when a field becomes valid. The submit button is disabled briefly while settings are being saved.

---

## AI Development Workflow

This project compares two prompting approaches for the same feature:

| Round         | Prompt style                                                           | Outcome                                                          |
| ------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Round One** | Vague — _"Create a settings page for my website."_                     | Basic UI; missing validation, accessibility, and clean structure |
| **Round Two** | Detailed — file refs, constraints, validation, a11y, verification step | Production-ready output with minimal manual fixes                |

Key takeaway: a structured prompt takes longer to write but reduces review, debugging, and refactoring time.

Full write-up: **[WORKFLOW.md](./WORKFLOW.md)**

---

## Accessibility

This project follows basic accessibility practices:

- `<label>` associated with every form field
- Keyboard-accessible controls and visible focus styles
- `aria-invalid` on invalid inputs and the theme group
- Validation messages placed directly below the related field
- Semantic HTML and meaningful page titles

See [CLAUDE.md](./CLAUDE.md) for the full project rules used during AI-assisted development.

---

## Development Guidelines

When extending this project, follow the conventions in [CLAUDE.md](./CLAUDE.md):

- Validate input before submission; show errors inline
- Use `addEventListener()` — no inline handlers
- Keep validation logic separate from UI updates
- Use Conventional Commits for every change

---

## Git Workflow

This repository uses [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat: add settings page
fix: clear validation messages on valid input
docs: update README
refactor: simplify validation logic
```

Keep each commit focused on a single change.

---

## Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Commit with Conventional Commits
4. Open a pull request against `main`

---

## License

This project is licensed under the [MIT License](./LICENSE).
