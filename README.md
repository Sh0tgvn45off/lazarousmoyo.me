# Lazarous Moyo · Portfolio

Personal site at [lazarousmoyo.vercel.app](https://lazarousmoyo.vercel.app): selected projects with live GitHub stats,
Google Developer Program badges, LinkedIn posts, experience and contact.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS and Framer Motion. Dark by default with a light mode.
Deployed on Vercel.

## Run it locally

Requires Node.js 24.

```bash
npm install
npm run dev        # http://localhost:3000
```

`npm run build`, `npm run lint` and `npm run typecheck` run the production build, ESLint and TypeScript.

## Updating content

| What | File |
| --- | --- |
| Name, intro, links, the "now" terminal | `lib/site.ts` |
| Featured projects and earlier work | `lib/content/projects.ts` |
| Google Developer badges | `lib/content/badges.ts` (images in `public/images/badges/`) |
| LinkedIn posts | `lib/content/posts.ts` (images in `public/images/posts/`) |
| Experience, education, skills, tool strip | `lib/content/experience.ts` |

Project stars, language and "updated" dates come from the GitHub API and refresh once a day.

## Demos

Older demos are served as static files from `public/`, at the same addresses as before:

- `/Capture Note Assistant/index.html`. Its AI formatting goes through `app/api/format-notes/route.ts`, so the
  DeepSeek key stays on the server. Set `DEEPSEEK_API_KEY` on Vercel to enable it; without it the demo still records
  and transcribes.
- `/sickle-cell-inheritance-simulation/sickle-cell-simulation.html`

## Environment variables

See `.env.example`. Both are optional: `GITHUB_TOKEN` (higher GitHub API limit) and `DEEPSEEK_API_KEY` (demo formatting).
Never commit keys or put them in browser code.
