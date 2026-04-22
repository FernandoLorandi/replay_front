export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-zinc-950 px-20 py-32 text-zinc-50">
      <p className="text-sm font-medium uppercase tracking-[0.4em] text-zinc-500">
        Projeto
      </p>
      <h1 className="mt-6 text-6xl font-bold tracking-tight">{slug}</h1>
    </main>
  );
}
