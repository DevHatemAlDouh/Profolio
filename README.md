# Profolio

**A portfolio for web development and game development projects**

Profolio is a responsive portfolio built with React and TypeScript. It has separate pages for web and game development, and loads selected projects from public GitHub repositories.

## Features

- **Single-page portfolio:** Switch between web and game development without leaving the homepage.
- **Cached GitHub project cards:** A GitHub Actions workflow refreshes the selected public repositories once a day, so visitors load a local cache instead of calling GitHub.
- **README-inspired details:** Project descriptions and badges are read from each repository's README.
- **Responsive interface:** Layouts adapt to mobile, tablet, and desktop screens.
- **Tech-inspired theme:** Dark surfaces, cyan accents, and subtle grid details.

## Portfolio views

| View | Navigation | Content |
| --- | --- | --- |
| Web development | In-page switch | Selected web and software repositories |
| Game development | In-page switch | Repositories identified as games by their language, topics, or name |

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

4. Open the local URL printed by Vite and use the navigation controls to switch portfolio views.

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
├── components/     # Shared sections and web/game portfolio views
├── hooks/          # Loads the generated project cache
├── assets/         # Images and static assets
├── App.tsx         # Switches portfolio views without changing the URL
├── index.css       # Portfolio theme
└── main.tsx        # React entry point
public/             # Public static assets
scripts/            # Generates the GitHub repository cache
.github/workflows/  # Daily cache refresh workflow
```

## Project selection

The GitHub Actions workflow reads **public repositories** from the `DevHatemAlDouh` GitHub account and saves selected project data to `public/repositories.json`. The site reads that file, so visitors do not make GitHub API requests. The workflow refreshes the cache daily and on pushes to `main`.

### Initialize or refresh the cache

The starter `public/repositories.json` contains no projects. To generate it:

1. Commit and push the workflow and project changes to the repository's `main` branch.
2. In GitHub, open **Actions** and select **Update repository cache**.
3. If the cache has not been generated yet, choose **Run workflow**, select `main`, and confirm.
4. Wait for the run to succeed. It commits the generated cache, which should trigger a Netlify deploy if the repository is connected.

The workflow also runs automatically once a day. If it fails to push the updated cache, check **Settings → Actions → General → Workflow permissions** and allow read and write access to the repository. No personal access token or Netlify environment variable is needed; the workflow uses its automatically provided `GITHUB_TOKEN`.

Add this marker to a web or software repository's README to include it:

```html
<!-- {use profolio} -->
```

For a game repository, use the game-specific marker instead:

```html
<!-- {use profolio game} -->
```

The README's first usable paragraph is used as the card description. Recognized README badges are shown on the card. Repositories with the game-specific marker appear in the game view; repositories with the standard marker continue to be classified by their primary language, topics, and name.

Private repositories are not included.

## Project note

If the portfolio says the cache is waiting for its first update, make sure the workflow has been pushed to `main` and run it once from the repository's **Actions** tab.

## Author

**Hatem Al-Douh**  
[GitHub profile](https://github.com/DevHatemAlDouh)
