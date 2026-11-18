# Problem Lab website

The public site for Problem Lab, a student-led research collective at SUTD. Organisations bring a real problem; students research and frame it, then match it with builders who can solve it. The site explains how that works and collects problem submissions.

## How it's built

- **Next.js** (static export to `out/`) with **Tailwind CSS v4**.
- **Cloudflare Worker** (`worker/index.ts`) in front of the static files. It handles `POST /api/submit`: checks the Cloudflare Turnstile token, re-validates the fields, then forwards the submission to HubSpot. Every other request is served straight from `out/`.
- **HubSpot** stores submissions. The portal and form IDs live in `worker/hubspot.ts`, kept out of browser code.

## Run it locally

```bash
npm install
npm run dev        # Next.js dev server on http://localhost:3000 (no /api/submit)
```

To test the form end to end, run the site through the Worker:

```bash
echo 'TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA' > .dev.vars   # Turnstile's always-pass test secret
npm run preview    # next build, then wrangler dev
```

On localhost the form uses Turnstile's test site key automatically, so no real spam check runs. Submissions still go to the real HubSpot account.

## Deploy

Cloudflare builds and deploys on every push to `main` (`npm run build`, see `wrangler.jsonc`). The live Turnstile secret is set as `TURNSTILE_SECRET_KEY` in the Cloudflare dashboard.

## Layout

| Path | What's there |
| --- | --- |
| `app/` | Pages (home, privacy) and global styles |
| `components/` | Page sections and the contact form |
| `lib/` | Form fields and consent text shared with the Worker, plus site contact details and the country-code list |
| `worker/` | The Cloudflare Worker and HubSpot config |
| `public/` | Fonts, images and the hero animation |
