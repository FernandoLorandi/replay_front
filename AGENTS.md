<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project context

This project is the frontend for a video production company website. The frontend uses Next.js, React, Tailwind CSS, and GSAP for richer motion/interaction. The planned CMS is Strapi, so content such as projects, clients, team members, media assets, page copy, and section ordering should be treated as dynamic content whenever practical.

## Architecture guidance

- Prefer route composition in `src/app` and keep reusable visual pieces under `src/components`.
- Treat current local `src/data` files as temporary typed fixtures that should mirror future Strapi response shapes.
- Keep page sections modular, for example `components/sections/home`, `components/sections/projects`, and `components/sections/team`.
- Avoid hardcoding content inside visual components when it is likely to come from Strapi later; pass typed props or import typed fixture data instead.
- Isolate CMS access behind a small data layer, for example `src/services/strapi` or `src/lib/strapi`, before wiring components directly to remote data.
- For GSAP usage, keep animation-specific client components explicit with `'use client'` and avoid turning large server-renderable sections into client components unnecessarily.
