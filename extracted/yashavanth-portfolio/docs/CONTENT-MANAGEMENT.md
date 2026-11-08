# Portfolio content management

All recurring content is kept in typed data files under `src/data/`.

| Content | File | Notes |
|---|---|---|
| Name, contact email, GitHub, LinkedIn, site URL | `site.ts` | Personalise before publishing. |
| Project cards | `projects.ts` | Include the current status and avoid overstating completion. |
| Technical articles | `articles.ts` | A featured note needs a complete body. Draft ideas remain labelled as topics. |
| Skills and learning areas | `skills.ts` | Keep the descriptions accurate to current experience. |
| Certificates | `certificates.ts` | Add only earned, verifiable certificates. |

## Add an article

1. Open `src/data/articles.ts`.
2. Add an object to `articles` with a unique `id`.
3. Write the article as an array of paragraph strings in `body`.
4. Set `status` to `Featured note` only when it is ready to publish.
5. Run `npm run check` and `npm run build`.
6. Commit and push the change. Cloudflare Pages rebuilds the website from the connected repository.

## Update professional links

Edit the `githubUrl`, `linkedinUrl` and `contactEmail` values in `src/data/site.ts`. The website does not guess profile usernames or email addresses.
