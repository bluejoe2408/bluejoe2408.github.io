# Gearless Joe — Personal Site

Personal site for Chen Jian (bluejoe2408): tech notes, travel logs, and portfolio.
Built with [Astro 6](https://astro.build), Tailwind CSS 4, MDX, and deployed to GitHub Pages.

## Quick start

```sh
nvm use          # uses Node version from .nvmrc
npm ci           # reproducible install from lock-file
npm run dev      # dev server at http://localhost:4321
npm run build    # production build → ./dist
npm run preview  # serve ./dist locally
npm test         # run unit tests (vitest)
```

## Multi-machine workflow

1. `git pull` — always pull latest before editing.
2. `nvm use && npm ci` — re-sync Node version and dependencies (`.nvmrc` + `package-lock.json` guarantee identical installs everywhere).
3. Edit content in `src/content/` or components in `src/`.
4. `git add <files> && git commit -m "…" && git push` — push to `main`.
5. GitHub Actions (`.github/workflows/deploy.yml`) auto-builds and deploys to GitHub Pages on every push to `main`.

> Never commit `node_modules/`. `package-lock.json` is always committed.

## Commands reference

| Command | Action |
| :--------------------------- | :----------------------------------------------- |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Serve `./dist/` locally for final check |
| `npm test` | Run unit tests with Vitest |
| `npm run img:prep <folder>` | Downsample images in `<folder>` to max 1600 px (see below) |

## Image convention

Before committing images to the repo, run the downsampler to keep git history lean:

```sh
npm run img:prep src/content/travel/my-trip
```

This resizes all `.jpg/.jpeg/.png/.webp` files in the folder so the longest edge is at most 1600 px and strips EXIF metadata. The originals are **not** backed up by the script — keep them on local disk or a cloud drive before running.

Astro's `<Picture>` component handles further responsive optimisation (multiple widths, WebP/AVIF) at build time; the `img:prep` script only prevents full-resolution originals from polluting git history.

## Travel post editing convention

A travel post's **gallery** belongs in the frontmatter `gallery[]` array — these are rendered as a lightbox grid by the `Gallery` component.

Inline images inside the MDX body (`![…](…)`) should be used **only** for single narrative images (e.g. a map, a diagram, a scene that belongs in the flow of prose). Do **not** repeat images that are already in `gallery[]` as inline body images; duplication causes them to appear twice and confuses readers.

Rule of thumb: *group shots go to the gallery, story beats go inline*.

## Project structure

```
src/
├── components/       # Astro + React components
├── config/           # site.ts — sitewide metadata
├── content/          # MDX content (tech/, travel/, portfolio/)
├── layouts/          # BaseLayout, etc.
└── pages/            # Routes (index, tech, travel, portfolio, rss.xml)
public/               # Static assets copied as-is
scripts/              # Local dev helpers (optimize-images.mjs)
.github/workflows/    # CI/CD (deploy.yml → GitHub Pages)
.nvmrc                # Node version pin
```

## Deployment

Deployment is fully automated via GitHub Actions. Every push to `main`:
1. Checks out code, installs the Node version from `.nvmrc`, runs `npm ci`.
2. Runs `npm run build` to produce `./dist`.
3. Uploads `./dist` as a GitHub Pages artifact and deploys it.

The live site is at <https://bluejoe2408.github.io>.

To deploy manually for the first time, enable GitHub Pages in the repository settings and set the source to **GitHub Actions**.
