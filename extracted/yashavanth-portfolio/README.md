# Yashavanth AN — Professional Portfolio

A responsive personal portfolio built with **React 19, TypeScript and Vite**. It is designed for GitHub source control and Cloudflare Pages hosting.

## What is included

- Personal introduction with the supplied profile photograph and an animated role line.
- Responsive navigation for desktop, tablet and mobile screens.
- About, skills, project, technical journal, credentials, leadership, opportunity and contact sections.
- Expandable project scope and an article-reading dialog.
- Opportunity shortcuts that preselect an enquiry type in the contact form.
- Accessible focus states, reduced-motion support, semantic page sections and responsive layouts down to 320px.
- Search metadata, Open Graph tags, a favicon, `robots.txt`, `sitemap.xml`, Cloudflare headers and SPA fallback rules.
- Data files kept separate from page components so projects, articles, skills and certificates can be updated without restructuring the app.

## Requirements

- Node.js 20.19+ or 22.12+
- npm 10+

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Build and verify

```bash
npm run check
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Important: personalise before publishing

Open `src/data/site.ts` and fill in these values:

- `contactEmail`: your real professional contact email. The contact form prepares an email in the visitor's email app; this static website does not send or store messages on a server.
- `githubUrl`: your personal GitHub profile URL.
- `linkedinUrl`: your personal LinkedIn profile URL.
- `resumeUrl`: optional path to your real CV after you add it under `public/files/`.
- `siteUrl`: your final Cloudflare Pages or custom-domain URL.

The site intentionally does not invent an institution, graduation date, employer, certificate, project completion claim or social profile. Add only verified information.

### Add a project

Edit `src/data/projects.ts`. Add a project record with a unique `id`, title, category, status, concise summary, scope details and tags. The project card is rendered from that data.

### Add an article

Edit `src/data/articles.ts`. Add an article record with a unique `id`, title, category, read time, status, date label, excerpt and body paragraphs. Use `status: 'Featured note'` for a published article with a non-empty `body`. Keep future topics as `status: 'Topic idea'` with an empty body so they are not presented as published.

### Add certificates

Edit `src/data/certificates.ts`. Add the exact certificate title, issuer, date and (where available) a verification URL or image path. Do not publish certificates that have not been earned.

### Replace the profile photograph

Replace `public/images/yashavanth-profile.webp` with your preferred optimised portrait, keeping the same filename, or update `profileImage` in `src/data/site.ts`. The supplied photograph is included in both JPG and WebP formats.

## Publish through GitHub and Cloudflare Pages

1. Extract this ZIP on your computer. **Do not upload only the ZIP file into the repository.** Upload the extracted project contents so `package.json`, `index.html`, `src/` and `public/` are at the repository root.
2. Create a GitHub repository named `yashavanth-portfolio` and push the extracted project files to its `main` branch.
3. In Cloudflare, open **Workers & Pages → Create application → Pages → Connect to Git** and choose the repository.
4. Set the production branch to `main`, build command to `npm run build` and build output directory to `dist`.
5. Select **Save and Deploy**. Cloudflare installs the dependencies declared in `package.json`, builds the project and publishes the `dist/` folder. Running `npm install` locally will also create a lockfile for repeatable local installs.
6. Add a custom domain in Cloudflare later, if you own one. Update `siteUrl`, `robots.txt` and `sitemap.xml` to use that final domain.

After Git integration is enabled, each push to the configured production branch triggers a new deployment. Cloudflare also creates preview deployments for supported branches and pull requests.

## Folder structure

```text
yashavanth-portfolio/
├── public/
│   ├── _headers
│   ├── _redirects
│   ├── favicon assets
│   ├── images/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   ├── data/
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── docs/
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

## Contact form behaviour

This project is a static portfolio and does not include a message database or server-side email service. Once `contactEmail` is configured, submitting the form opens the visitor's email application with a pre-filled message. To receive submissions without requiring the visitor to open an email app, connect a trusted form backend in a later version.

## Quality notes

Responsive layouts use fluid sizing, content-based sections, flexible grids and breakpoints for tablets, phones and narrow screens. The site includes keyboard-visible focus indicators and honours `prefers-reduced-motion`. Before publishing, check the final site on your own devices and replace all personal-detail placeholders in `src/data/site.ts`.

## Android upload note

When using GitHub from an Android phone, extract the ZIP with the Files app first. In the GitHub repository, use **Add file → Upload files** and select the extracted folders/files (not the ZIP archive itself). Confirm that `package.json` and `index.html` are visible at the repository root before committing.
