# Home Hero Scroll Projects Design

## Goal

Transform the home hero into a pinned, scroll-driven project showcase for web. The hero should present multiple featured projects in sequence, using scroll progress to transition between them. Once the last project finishes, the page should continue naturally into the rest of the home sections.

## Context

- The current home hero already receives `featuredProject`, `featuredProjects`, and `navigationItems`.
- `ProjectSummary` already includes hero-specific fields:
  - `homeOrder`
  - `homeTitle`
  - `homeSummary`
  - `homeHeroMediaType`
  - `homeHeroMediaSrc`
  - `homeHeroMediaAlt`
- The project uses Next.js App Router, React 19, Tailwind CSS, GSAP, and `@gsap/react`.
- Project guidance prefers keeping route composition in `src/app`, reusable UI in `src/components`, and GSAP logic isolated in explicit client components.

## Selected Approach

Use a pinned hero with one scroll step per project.

This approach keeps the existing premium, cinematic direction of the current hero while adding stronger editorial motion inspired by the OVA portfolio reference. The hero remains a server-friendly wrapper that passes serializable project data into a focused client animation component.

## User Experience

### Desktop and large screens

- The first viewport shows the first featured project immediately.
- When the user scrolls down, the hero becomes pinned.
- Each project occupies one scroll phase.
- As the scroll advances, the active project changes inside the pinned hero instead of moving the page forward immediately.
- After the final project transition completes, the pin ends and the page resumes normal scrolling into `PartnersSection` and the remaining content.

### Mobile and small screens

- The initial implementation will focus on web and desktop behavior.
- Mobile will use a simplified fallback without a long pinned experience.
- The fallback should preserve the same content order and visual hierarchy, but avoid fragile or uncomfortable scroll trapping on touch devices.

## Interaction Model

### Hero layout

The hero is composed of three visual layers:

1. Full-bleed project media background
2. Readability overlays and ambient gradients
3. Foreground editorial content with title, summary, project position, and CTA

### Scroll sequencing

- Let `N` be the number of eligible featured projects in the hero.
- Each project maps to one scroll segment.
- The pinned section duration scales with `N`, so adding projects automatically lengthens the interaction.
- The active project is derived from scroll progress, not from click state.

### Project transition behavior

When the active project changes:

- Incoming media fades in with subtle scale and vertical motion.
- Outgoing media fades out cleanly.
- Title and summary animate separately from the media, with short staggered entry.
- A progress indicator updates to show the current position, for example `01 / 04`.

### Exit behavior

- The final transition resolves inside the hero.
- Once the scroll reaches the end of the pinned timeline, `ScrollTrigger` releases the hero.
- The next physical scroll movement advances the page into `PartnersSection`.

## Data Rules

### Project eligibility

The hero will use `featuredProjects` sorted by `homeOrder` when available. If the list is empty, it falls back to the existing single-project behavior using `featuredProject`.

### Media fallback

For each project:

1. Prefer `homeHeroMedia*`
2. Fall back to `previewMedia*`
3. Fall back to the current local default asset only if neither exists

### Content fallback

For each project:

1. Prefer `homeTitle`
2. Fall back to `title`

And:

1. Prefer `homeSummary`
2. Fall back to `category`

## Component Architecture

### Server-friendly wrapper

`HeroSection` remains the entry point and continues to receive typed project data from the page layer. It should stay as lightweight as possible and avoid browser-only logic.

### Client animation component

Create a dedicated client component responsible for:

- GSAP registration
- `ScrollTrigger` pinning and cleanup
- Mapping scroll progress to active project index
- Rendering animated media layers
- Rendering the animated text and progress indicator

This keeps GSAP isolated to a small client boundary, which aligns with the current project guidance and Next.js client/server composition recommendations.

## GSAP Strategy

### Core tools

- `@gsap/react` for lifecycle-safe integration
- `gsap`
- `ScrollTrigger`

### Animation responsibilities

- Pin the hero for a duration based on the number of projects
- Scrub the timeline so motion tracks scroll progress smoothly
- Update a shared active index for text, media, and progress UI
- Cleanly destroy triggers on unmount or layout change

### Responsiveness

Use media-query-aware setup so the pinned scroll experience only activates on larger viewports. Smaller breakpoints should render a simpler static or lightly animated version.

## Performance and Safety

- Avoid converting large surrounding home sections into client components.
- Keep video autoplay muted and inline.
- Animate opacity and transforms rather than layout-affecting properties.
- Limit simultaneous heavy media layers to the minimum needed for smooth transitions.
- Ensure the hero still renders meaningful content before hydration.

## Accessibility

- The hero content must remain readable without motion.
- The active project title and summary should stay in semantic text, not be baked into media.
- If `prefers-reduced-motion` is enabled, the pinned scroll animation should be disabled and the hero should render a stable fallback state.

## Testing and Verification

### Functional checks

- The hero pins on desktop.
- Scroll progress advances through all featured projects in order.
- The hero releases after the final project.
- The page continues into `PartnersSection` without overlap or jump.
- The fallback behavior works when there is only one featured project.

### Regression checks

- Navigation remains visible and usable over the hero.
- Video and image projects both render correctly.
- The hero still works when some `home*` fields are missing.
- The fallback layout remains readable before GSAP hydration.

## Out of Scope

- Full mobile parity with the desktop pinned experience
- Click-driven project switching inside the hero
- CMS schema changes
- Reworking downstream sections such as `PartnersSection` or `ProjectSection`

## Recommendation Summary

Proceed with a pinned, scroll-driven hero track on web, using one scroll phase per featured project and releasing naturally into the rest of the page. Keep `HeroSection` mostly server-rendered, move GSAP into a dedicated client component, and use progressive fallbacks for mobile and reduced-motion users.
