# Next + Strapi Monorepo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the repository into a working monorepo with `apps/web` for the existing Next.js frontend and `apps/cms` reserved for Strapi, without breaking the current site during the transition.

**Architecture:** First establish the repository as a real workspace while the current Next app still runs from the root. Then move the frontend into `apps/web`, keeping the same runtime behavior, typed Strapi DAL, public assets, and route structure. Root scripts become orchestration-only and the app-specific configs live with each app.

**Tech Stack:** pnpm workspaces, Next.js 16 App Router, React 19, Tailwind CSS 4, TypeScript 5, Strapi integration layer

---

### Task 1: Formalize Workspace Root

**Files:**
- Modify: `package.json`
- Modify: `pnpm-workspace.yaml`
- Create: `docs/superpowers/plans/2026-04-24-next-strapi-monorepo.md`

- [ ] Define root scripts that delegate to `apps/web` and future `apps/cms`
- [ ] Keep the root package private and monorepo-oriented only
- [ ] Preserve the existing workspace package globs

### Task 2: Prepare Destination Apps

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/README.md`
- Modify: `apps/cms/README.md`
- Create: `apps/cms/package.json`

- [ ] Create the destination app manifest for the moved Next app
- [ ] Create a minimal CMS workspace manifest for future Strapi bootstrap
- [ ] Document each app responsibility and expected commands

### Task 3: Move Frontend Runtime Into apps/web

**Files:**
- Move: `src/** -> apps/web/src/**`
- Move: `public/** -> apps/web/public/**`
- Move: `next.config.ts -> apps/web/next.config.ts`
- Move: `postcss.config.mjs -> apps/web/postcss.config.mjs`
- Move: `tailwind.config.js -> apps/web/tailwind.config.js`
- Move: `tsconfig.json -> apps/web/tsconfig.json`
- Move: `next-env.d.ts -> apps/web/next-env.d.ts`

- [ ] Move the app files physically without changing user-facing behavior
- [ ] Keep public assets and route handlers intact
- [ ] Make sure TypeScript path aliases continue to resolve from `apps/web`

### Task 4: Repair Configs After Move

**Files:**
- Modify: `apps/web/tsconfig.json`
- Modify: `apps/web/tailwind.config.js`
- Modify: `apps/web/package.json`
- Create: `tsconfig.base.json`

- [ ] Move shared compiler options to a root base config where useful
- [ ] Update content globs and alias paths to the new app location
- [ ] Keep test and typecheck commands working from both root and `apps/web`

### Task 5: Update Root Docs and Execution Surface

**Files:**
- Modify: `README.md`

- [ ] Document the new monorepo layout
- [ ] Document root versus app-level commands
- [ ] Note the Windows `nvm`/PATH caveat as an environment issue, not an app issue

### Task 6: Verify the Monorepo Migration

**Files:**
- Verify: `apps/web/**`
- Verify: root scripts and workspace manifests

- [ ] Run `npm run test:strapi` from the repo root and confirm green
- [ ] Run `npm run typecheck` from the repo root and confirm green
- [ ] If available locally, run `npm run build:web` from the repo root and inspect the result
