import Link from 'next/link';
import Logo from '../ui/Logo';
import { navigationItems } from '@/data/fixtures/navigation';

export default function SiteNav() {
  return (
    <div className="flex items-center justify-between py-16">
      <div>
        <Logo />
      </div>
      <div className="flex gap-5 rounded-lg bg-zinc-800/10 p-4 backdrop-blur-lg backdrop-opacity-70">
        {navigationItems.map((navItems) => (
          <Link
            href={navItems.href}
            className="hover:text-replay-primary text-xl font-medium tracking-tight text-zinc-50 transition-colors"
            key={navItems.label}
          >
            {navItems.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
