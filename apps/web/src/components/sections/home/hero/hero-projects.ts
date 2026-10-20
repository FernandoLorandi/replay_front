export function normalizeHeroProjects<T>(
  featuredProjects: readonly T[],
  featuredProject: T | null,
): T[] {
  if (featuredProjects.length > 0) {
    return [...featuredProjects];
  }

  return featuredProject ? [featuredProject] : [];
}

export function getHeroProjectIndex(
  progress: number,
  projectCount: number,
): number {
  if (projectCount <= 1) {
    return 0;
  }

  return Math.min(
    Math.floor(Math.max(0, Math.min(progress, 1)) * projectCount),
    projectCount - 1,
  );
}

export function shouldAnimateHeroTransition(
  previousIndex: number | null,
  nextIndex: number,
): boolean {
  return previousIndex !== null && previousIndex !== nextIndex;
}
