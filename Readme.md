<div align="center">

# SPYLT Luminous Scroll

**A cinematic, scroll-driven frontend recreation of the award-winning SPYLT website, built as a learning tribute with React, GSAP, Vite, and Tailwind.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

[Live Demo](https://spylt-weld.vercel.app/) &nbsp;·&nbsp;
[Source Code](https://github.com/ShAuRyA-Noodle/SPYLT-Luminous-Scroll) &nbsp;·&nbsp;
[Report Bug](https://github.com/ShAuRyA-Noodle/SPYLT-Luminous-Scroll/issues) &nbsp;·&nbsp;
[Request Feature](https://github.com/ShAuRyA-Noodle/SPYLT-Luminous-Scroll/issues)

</div>

---

## Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Security](#security)
- [Acknowledgements](#acknowledgements)
- [License](#license)

---

## About The Project

This project is a frontend recreation (a tribute, not an official product) of the
[SPYLT](https://spylt.com) website, a lactose-free, protein-packed flavoured milk
brand whose site won an Awwwards Site of the Day. It was built as a deep-dive
learning exercise to practice GSAP ScrollTrigger, clip-path transitions, and
scroll-driven UI storytelling.

It is a pure front-end showcase. There is no backend, no API, and no data
collection. The newsletter input is a client-side demo that validates the email
format locally and never sends it anywhere.

### About the Original Brand

| | |
|---|---|
| Founded | 2022, Lehi, Utah, USA |
| Founder | Josh Mendenhall |
| Recognition | New York MilkLaunch 2022 winner |
| Website award | Awwwards Site of the Day |

All brand names, copy, and assets in this repository belong to SPYLT and Built
Brands. They are reproduced here only for educational purposes.

---

## Features

- Scroll-driven section animations powered by GSAP ScrollTrigger
- Clip-path geometric section transitions
- Scroll-linked text reveal effects
- Pinned, scrubbed product video sequences
- Bold, cinematic full-viewport sections
- Responsive layout via react-responsive
- Client-side routing with react-router (home, privacy, terms)
- Clean section-based component architecture

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | React 19 | Component-based UI |
| Build tool | Vite 6 | Dev server and bundler |
| Animation | GSAP 3 with ScrollTrigger | Scroll-driven motion |
| Styling | Tailwind CSS v4 | Utility-first styling |
| Routing | react-router-dom 7 | Client-side routes |
| Responsive | react-responsive | Breakpoint handling |
| Hosting | Vercel | Edge-optimised hosting |

---

## Project Structure

```
SPYLT-Luminous-Scroll/
├── index.html                 # Root HTML entry point
├── vite.config.js             # Vite + Tailwind configuration
├── eslint.config.js           # ESLint rules
├── package.json               # Dependencies and scripts
│
├── public/
│   ├── fonts/                 # Brand typeface
│   ├── images/                # Product images and graphics
│   └── videos/                # Background and product videos
│
└── src/
    ├── main.jsx               # React DOM entry point
    ├── App.jsx                # Root component and routes
    ├── index.css              # Global styles and CSS variables
    ├── constants/index.js     # Site-wide content and data
    ├── utils/scroll.js        # Scroll helpers
    │
    ├── components/            # Reusable UI building blocks
    │   ├── ClipPathTitle.jsx
    │   ├── FlavourSlider.jsx
    │   ├── FlavourTitle.jsx
    │   ├── Navbar.jsx
    │   ├── ScrollToTop.jsx
    │   └── VideoPin.jsx
    │
    ├── pages/                 # Routed pages
    │   ├── HomePage.jsx
    │   └── LegalPage.jsx
    │
    └── sections/             # Full-page scroll sections
        ├── HeroSection.jsx
        ├── MessageSection.jsx
        ├── FlavourSection.jsx
        ├── NutritionSection.jsx
        ├── BenefitSection.jsx
        ├── TestimonialSection.jsx
        └── FooterSection.jsx
```

---

## Getting Started

### Prerequisites

```bash
node >= 18.0.0
npm  >= 9.0.0
```

### Installation

```bash
git clone https://github.com/ShAuRyA-Noodle/SPYLT-Luminous-Scroll.git
cd SPYLT-Luminous-Scroll
npm install
```

### Scripts

```bash
npm run dev      # Start the Vite dev server
npm run build    # Build for production
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

---

## Security

- CodeQL `security-extended` scanning on push, pull request, and a weekly schedule.
- Dependabot weekly updates with `semver-major` version bumps ignored.
- Secret scanning and push protection enabled on the repository.
- Branch protection on `main`: required CodeQL check, linear history, no force-push, no deletion.

To report a vulnerability, see [SECURITY.md](SECURITY.md).

---

## Acknowledgements

| Resource | Purpose |
|---|---|
| [SPYLT](https://spylt.com) | Original brand and design |
| [Awwwards](https://awwwards.com) | Design recognition |
| [GSAP](https://gsap.com/docs) | Animation engine |
| [Codrops](https://tympanus.net/codrops) | Frontend inspiration |

---

## License

The source code in this repository is released under the [MIT License](LICENSE).

All SPYLT brand names, copy, and visual assets remain the property of SPYLT and
Built Brands. This project is for educational purposes only and is not an
official SPYLT product.

---

## Author

**Shaurya Punj**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shaurya-punj-2287513b3/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ShAuRyA-Noodle)
