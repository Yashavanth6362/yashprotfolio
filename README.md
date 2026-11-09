# Yashavanth AN — Professional Portfolio

A responsive, static portfolio website for civil engineering, GIS, surveying and technical documentation.

## What is included

- Professional homepage with profile portrait and animated-feel greeting
- About and technical skills
- Project cards and individual project case studies
- Education timeline
- Certificates and credentials area
- Current learning and project focus
- Technical journal with individual article pages
- Internship, project opportunity and collaboration contact section
- Matching GitHub and LinkedIn portrait badges at opposite corners (LinkedIn activates when its real URL is added)
- Tablet and phone navigation, responsive layouts and reduced-motion support
- Search metadata, robots.txt, sitemap.xml and Cloudflare Pages headers

## Folder structure

```text
Yashavanth-Portfolio/
├── index.html
├── data.json
├── projects.json
├── education.json
├── certificates.json
├── featuretracker.json
├── ad.json
├── README.md
├── robots.txt
├── sitemap.xml
├── _headers
├── _redirects
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── theme.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── yashavanth-profile.jpg
│       └── favicon.svg
├── projects/
│   ├── index.html
│   ├── mit-mysuru-digital-campus-gis.html
│   └── Project-Template.html
├── articles/
│   ├── index.html
│   ├── Article1.html
│   ├── Article2.html
│   └── Article-Template.html
└── certificates/
    └── index.html
```

The folder structure and filenames are retained. The redesign is implemented through `assets/css/theme.css`, homepage refinements and small JavaScript improvements. The desktop hero now correctly places the profile and introduction side by side; smaller screens stack them automatically.

## Preview locally

The homepage loads JSON files with `fetch()`, so preview it through a local web server rather than opening `index.html` directly.

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Publish with GitHub Actions + Cloudflare Pages

This archive contains the website at its root. It is a static HTML/CSS/JavaScript site (not React/Vite), so do not set `npm run build` or `dist`. If the repository stores `portfolio.zip` in its root and the GitHub Action extracts it with:

```bash
rm -rf extracted
mkdir -p extracted
unzip -o portfolio.zip -d extracted
```

then the extracted folder will contain `extracted/index.html` directly, and Cloudflare Pages should use:

| Setting | Value |
|---|---|
| Product | Cloudflare Pages |
| Git provider | GitHub |
| Repository | Your portfolio repository |
| Production branch | `main` |
| Framework preset | None (or Static HTML if offered) |
| Root directory | `extracted` |
| Build command | `exit 0` |
| Build output directory | `.` |

This is a plain HTML, CSS, JavaScript and JSON website. It does not need `npm install`, Vite, React, TypeScript, `wrangler deploy`, or a Worker build command.

If you put the extracted website files directly in the repository root instead, leave the Root directory blank and set the output directory to `.`.

**Important:** Choose the Cloudflare Pages Git deployment flow, not the Workers setup screen that asks for `npx wrangler deploy`.

## Update your profile

Edit `data.json`:

```json
"profile": {
  "name": "Yashavanth AN",
  "headline": "Civil Engineering Student | GIS, Surveying & Construction",
  "location": "Karnataka, India",
  "email": "",
  "github": "https://github.com/Yashavanth6362",
  "linkedin": "",
  "website": "",
  "instagram": ""
}
```

Add your real LinkedIn URL and a public contact email when you are ready. The portrait shows GitHub on the left and LinkedIn on the right; until a real LinkedIn URL is added, the LinkedIn badge is shown as an inactive reminder rather than linking to a made-up profile. Do not publish private contact details unless you intend them to be public.

## Add your LinkedIn profile

Edit `data.json` and set the `profile.linkedin` value to your exact public profile URL, for example `https://www.linkedin.com/in/your-real-profile/`. The LinkedIn badge in the portrait and the contact links become active automatically after the URL is saved. Do not leave a sample or guessed URL in the live site.

## Add a project

1. Copy `projects/Project-Template.html`.
2. Rename it, for example `projects/new-project.html`.
3. Update its title, summary, scope, methods and verified results.
4. Add the project to the `projects` array in `projects.json`.
5. Add the project to `projects/index.html`.
6. Add its URL to `sitemap.xml` after your live domain is known.

## Add an article

1. Copy `articles/Article-Template.html`.
2. Rename it, for example `articles/Article3.html`.
3. Add your article title, summary, author details, explanation and references.
4. Add its entry to the `articles` array in `data.json`.
5. Add it to `articles/index.html` and `sitemap.xml`.

## Add certificates

Add only certificates you have actually earned to `certificates.json`. Include a title, issuer, date, image path and verification link where available. Put certificate images inside `assets/images/` or the `certificates/` folder.

## Before public launch

- Add your real LinkedIn profile and public email if desired.
- Add only verified certificates and project outputs.
- Replace the `REPLACE-WITH-YOUR-SITE-DOMAIN` text in `robots.txt` and `sitemap.xml` with the deployed Cloudflare Pages domain.
- Check the published website on a phone and desktop.
- Submit the sitemap in Google Search Console. Indexing is not guaranteed and can take time.
- The contact section uses an email link only after a valid email is added to `data.json`; it does not store form submissions.

## Technology

HTML5 · CSS3 · Vanilla JavaScript · JSON · Cloudflare Pages
