import Link from 'next/link';
import Logo from '../ui/Logo';
import type { NavItem } from '@/types/navigation';

type SiteNavProps = {
  items: NavItem[];
};

export default function SiteNav({ items }: SiteNavProps) {
  return (
    <div className="flex items-center justify-between py-16">
      <div>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex gap-5 rounded-lg bg-zinc-800/10 p-4 backdrop-blur-lg backdrop-opacity-70">
        {items.map((navItems) => (
          <Link
            href={navItems.href}
            className="hover:text-replay-primary text-xl font-medium tracking-tight text-zinc-50 transition-colors"
            key={navItems.label}
            target={navItems.external ? '_blank' : undefined}
            rel={navItems.external ? 'noreferrer' : undefined}
          >
            {navItems.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
