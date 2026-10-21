import Link from 'next/link';
import type { NavItem } from '@/types/navigation';
import LogoImg from '../ui/LogoImg';
import { BorderBeam } from '../ui/border-beam';
import MobileNav from './MobileNav';

type SiteNavProps = {
  items: NavItem[];
};

export default function SiteNav({ items }: SiteNavProps) {
  return (
    <div className="flex items-center justify-between py-8 lg:py-16">
      <div>
        <Link href="/">
          <LogoImg />
        </Link>
      </div>
      <div className="relative hidden gap-5 rounded-lg border border-zinc-600/30 bg-zinc-800/10 p-4 backdrop-blur-lg backdrop-opacity-70 lg:flex">
        {items.map((navItems) => (
          <Link
            href={navItems.href}
            className="hover:text-replay-primary text-lg font-medium tracking-tight text-zinc-50 transition-colors"
            key={navItems.label}
            target={navItems.external ? '_blank' : undefined}
            rel={navItems.external ? 'noreferrer' : undefined}
          >
            {navItems.label}
          </Link>
        ))}
        <BorderBeam
          duration={6}
          size={100}
          borderWidth={1.5}
          className="from-transparent via-yellow-500 to-transparent"
        />
        <BorderBeam
          duration={6}
          size={100}
          delay={15}
          borderWidth={1.5}
          className="from-transparent via-yellow-500 to-transparent"
        />
      </div>
      <MobileNav items={items} />
    </div>
  );
}
