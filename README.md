# Profolio

**A portfolio for web development and game development projects**

Profolio is a responsive portfolio built with React and TypeScript. It has separate pages for web and game development, and loads selected projects from public GitHub repositories.

## Features

- **Separate portfolio pages:** Browse web projects at `/` and game projects at `/game-dev`.
- **GitHub project cards:** Public repositories are included when their README contains the Profolio marker.
- **README-inspired details:** Project descriptions and badges are read from each repository's README.
- **Responsive interface:** Layouts adapt to mobile, tablet, and desktop screens.
- **Tech-inspired theme:** Dark surfaces, cyan accents, and subtle grid details.

## Pages

| Page | URL | Content |
| --- | --- | --- |
| Web development | `/` | Selected web and software repositories |
| Game development | `/game-dev` | Repositories identified as games by their language, topics, or name |

## Built with

| Technology | Use |
| --- | --- |
| React | UI components |
| TypeScript | Application logic and type checking |
| Vite | Development server and production build |
| Tailwind CSS | Layout and styling |

## Getting started

### Requirements

- Node.js
- npm

### Run locally

1. Clone the repository and enter its folder:

   ```sh
   git clone <repository-url>
   cd Profolio
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open the local URL printed by Vite. To view the game portfolio, open `/game-dev`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/
├── components/     # Shared sections and separate web/game pages
├── hooks/          # GitHub repository and README loading
├── assets/         # Images and static assets
├── App.tsx         # Selects the page based on the URL
├── index.css       # Portfolio theme
└── main.tsx        # React entry point
public/             # Public static assets
```

## Project selection

The portfolio currently reads **public repositories** from the `DevHatemAlDouh` GitHub account. Add this marker to a repository's README to include it:

```html
<!-- {use profolio} -->
```

The README's first usable paragraph is used as the card description. Recognized README badges are shown on the card. The game page currently identifies game repositories using their primary language, repository topics, and name.

Private repositories are not available to the browser-based GitHub requests used by this project.

## Project note

This is a front-end portfolio. GitHub API rate limits may temporarily prevent repository data from loading.

## Author

**Hatem Al-Douh**  
[GitHub profile](https://github.com/DevHatemAlDouh)
