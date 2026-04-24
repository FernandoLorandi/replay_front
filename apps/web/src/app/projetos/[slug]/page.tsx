import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/lib/strapi/repository';

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-20 py-32 text-zinc-50">
      <p className="text-sm font-medium uppercase tracking-[0.4em] text-zinc-500">
        Projeto
      </p>
      <h1 className="mt-6 text-6xl font-bold tracking-tight">{project.title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
        {project.summary}
      </p>
    </main>
  );
}
