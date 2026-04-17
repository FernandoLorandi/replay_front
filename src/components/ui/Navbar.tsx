import Link from 'next/link';
import Logo from './Logo';

export default function Navbar() {
  return (
    <div className="flex items-center justify-between py-16">
      <div>
        <Logo />
      </div>
      <div className="flex gap-5 p-4 bg-zinc-800/10 rounded-lg backdrop-blur-lg backdrop-opacity-70">
        <Link
          href="/"
          className="text-xl font-medium tracking-tight text-zinc-50 transition-colors hover:text-replay-primary"
        >
          Projetos
        </Link>
        <Link
          href="/equipe"
          className="text-xl font-medium tracking-tight text-zinc-50 transition-colors hover:text-replay-primary"
        >
          Equipe
        </Link>
        <Link
          href="/"
          className="text-xl font-medium tracking-tight text-zinc-50 transition-colors hover:text-replay-primary"
        >
          Contato
        </Link>
      </div>
    </div>
  );
}
