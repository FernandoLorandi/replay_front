'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import type { NavItem } from '@/types/navigation';

type MobileNavProps = {
  items: NavItem[];
};

export default function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        className="flex size-12 items-center justify-center rounded-lg border border-zinc-600/30 bg-zinc-800/10 text-zinc-50 backdrop-blur-lg transition-colors hover:border-zinc-400"
        aria-label={isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {isOpen ? (
        <nav
          id={menuId}
          aria-label="Navegação principal"
          className="absolute top-full right-0 z-50 mt-3 flex w-72 flex-col rounded-lg border border-zinc-600/30 bg-zinc-950/90 p-4 backdrop-blur-lg"
        >
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md px-4 py-3 text-lg font-medium tracking-tight text-zinc-50 transition-colors hover:bg-zinc-800 hover:text-replay-primary"
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
