# Partners Marquee Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** adicionar uma esteira contínua e automática de logos na seção de partners usando GSAP com o menor client boundary possível.

**Architecture:** `PartnerSection` continua como Server Component e passa `partners` para um novo `PartnersMarquee` client component. O marquee duplica a sequência de logos e anima uma única track horizontal com GSAP em loop infinito, sem depender do scroll da página.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, GSAP, `next/image`

---

### Task 1: Criar o client component do marquee

**Files:**
- Create: `apps/web/src/components/sections/home/PartnersMarquee.tsx`
- Modify: `apps/web/src/components/sections/home/PartnersSection.tsx`
- Test: `apps/web/src/components/sections/home/PartnersMarquee.tsx` via `pnpm --dir apps/web typecheck`

- [ ] **Step 1: Criar o componente cliente com a track duplicada**

```tsx
'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { PartnerLogo } from '@/types/cms';

type PartnersMarqueeProps = {
  partners: PartnerLogo[];
};

export default function PartnersMarquee({
  partners,
}: PartnersMarqueeProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const duplicatedPartners = [...partners, ...partners];

  useGSAP(() => {
    if (!trackRef.current || partners.length === 0) {
      return;
    }

    gsap.set(trackRef.current, { xPercent: 0 });

    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 24,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [partners.length]);

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max items-center gap-10"
      >
        {duplicatedPartners.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex min-w-[150px] shrink-0 items-center justify-center"
          >
            <Image
              src={partner.logoSrc}
              alt={partner.logoAlt}
              style={{ objectFit: 'contain', width: 'auto' }}
              width={150}
              height={150}
              className="opacity-50 grayscale"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Montar o componente na seção existente**

```tsx
import type { PartnerLogo } from '@/types/cms';
import PartnersMarquee from './PartnersMarquee';

type PartnerSectionProps = {
  partners: PartnerLogo[];
};

export default function PartnerSection({ partners }: PartnerSectionProps) {
  return (
    <div className="mx-20 flex items-center justify-between gap-14 border-y border-y-zinc-900 py-6">
      <div className="w-72">
        <h1 className="text-xl leading-7 font-medium tracking-normal text-wrap text-zinc-400">
          Confiável pelas marcas mais empolgantes do mundo.
        </h1>
      </div>
      <div className="flex-1">
        <PartnersMarquee partners={partners} />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Rodar o typecheck**

Run: `pnpm --dir apps/web typecheck`
Expected: `tsc --noEmit` conclui sem erros

- [ ] **Step 4: Revisar o comportamento visual**

Run: `pnpm --dir apps/web dev`
Expected: a seção de partners mostra logos em movimento contínuo, lento e sem salto perceptível

### Task 2: Ajustar estabilidade visual do loop

**Files:**
- Modify: `apps/web/src/components/sections/home/PartnersMarquee.tsx`
- Test: `apps/web/src/components/sections/home/PartnersMarquee.tsx` via inspeção visual e `pnpm --dir apps/web typecheck`

- [ ] **Step 1: Garantir largura estável por item**

```tsx
<div
  key={`${partner.name}-${index}`}
  className="flex min-w-[150px] shrink-0 items-center justify-center"
>
```

- [ ] **Step 2: Se houver salto visual, separar em dois blocos idênticos dentro da mesma track**

```tsx
const partnerGroups = [partners, partners];

return (
  <div className="overflow-hidden">
    <div ref={trackRef} className="flex w-max items-center">
      {partnerGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="flex shrink-0 items-center gap-10 pr-10">
          {group.map((partner) => (
            <div
              key={`${groupIndex}-${partner.name}`}
              className="flex min-w-[150px] shrink-0 items-center justify-center"
            >
              <Image
                src={partner.logoSrc}
                alt={partner.logoAlt}
                style={{ objectFit: 'contain', width: 'auto' }}
                width={150}
                height={150}
                className="opacity-50 grayscale"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
```

- [ ] **Step 3: Rodar o typecheck novamente**

Run: `pnpm --dir apps/web typecheck`
Expected: `tsc --noEmit` conclui sem erros

- [ ] **Step 4: Verificar suavidade final**

Run: `pnpm --dir apps/web dev`
Expected: movimento uniforme, contínuo, sem jitter ou espaço visível entre as repetições

