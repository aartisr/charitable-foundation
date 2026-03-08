# Harmony Hope Foundation — Charitable Website Template

A CMS-editable charitable organization website built with **Next.js 16**, **Puck CMS**, and reusable shared UI components.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Puck CMS (`@puckeditor/core`)
- Tailwind CSS v4
- Local shared UI blocks in `packages/shared-ui`

## Positioning

- Mission-first nonprofit storytelling with clear donation and volunteer pathways
- Program and impact communication designed for trust and transparency
- Support + legal pages aligned for public accountability

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the site.

## Visual Editor

- `http://localhost:3000/admin` — page dashboard
- `http://localhost:3000/admin/edit` — edit homepage
- `http://localhost:3000/admin/edit/<slug>` — edit any page by slug

## Admin Protection

Admin routes and editor APIs are protected with HTTP Basic Auth via middleware:

- `/admin/*`
- `/api/pages`
- `/api/page/*`

Set these environment variables before running the app:

```bash
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_strong_password
```

If these values are missing, protected routes return `500` until configured.

## Key Content Pages

- `/` — foundation homepage (mission, programs, impact, calls to action)
- `/support-center` — volunteer, donation, and partnership contact hub
- `/testimony` — community stories and impact narratives
- `/blog` — updates, field notes, and transparency articles
- `/privacy-policy` — donor and visitor data handling policy
- `/terms-of-service` — terms governing use of the website and content

## Project Structure

- `content/` — page JSON data
- `packages/shared-ui/` — reusable Puck components
- `src/app/` — app routes and APIs
- `src/lib/` — render + content utilities

## Deployment Notes

- Set `NEXT_PUBLIC_SITE_URL` to your production domain for canonical URLs and sitemap output.
- Follow the SEO/social operations checklist in [docs/SEO_SOCIAL_CHECKLIST.md](docs/SEO_SOCIAL_CHECKLIST.md).

## Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — lint project
