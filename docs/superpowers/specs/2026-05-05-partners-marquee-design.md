# Partners Marquee Design

**Goal:** adicionar uma animação horizontal contínua e automática na seção de partners, com aparência de loop infinito e implementação simples.

## Contexto atual

A home renderiza `PartnerSection` a partir de `apps/web/src/app/page.tsx`, mantendo a busca de dados no servidor. O componente atual em `apps/web/src/components/sections/home/PartnersSection.tsx` renderiza texto fixo à esquerda e uma lista simples de logos à direita.

## Abordagem aprovada

Usar um componente cliente pequeno e isolado para a esteira de logos, mantendo `PartnerSection` como Server Component. A lista de parceiros continua vindo por props tipadas, e apenas a faixa animada passa para um Client Component com GSAP.

## Estrutura proposta

- `PartnersSection.tsx`
  - continua no servidor
  - mantém o título/copy da seção
  - delega a faixa de logos para um componente cliente
- `PartnersMarquee.tsx`
  - novo componente com `'use client'`
  - recebe `partners: PartnerLogo[]`
  - duplica os itens localmente para formar o loop visual
  - anima a track com GSAP em deslocamento horizontal contínuo

## Comportamento da animação

- movimento contínuo, automático e lento
- direção única, da direita para a esquerda
- loop visual sem salto perceptível
- sem depender de scroll da página
- sem controles, sem paginação e sem lógica de hover nesta primeira versão

## Decisões técnicas

- usar `overflow-hidden` no container visível
- usar uma `track` flex horizontal com duas cópias da mesma sequência de logos
- animar a `track` até `xPercent: -50` para que a segunda metade assuma a posição da primeira
- repetir com `repeat: -1` e `ease: 'none'`
- isolar GSAP no menor componente possível para respeitar a orientação do projeto e do Next sobre boundaries de client/server components

## Riscos e mitigação

- **salto no loop**: evitar espaçamentos assimétricos entre os dois blocos duplicados
- **logos com larguras diferentes**: manter cada item com largura mínima estável para o fluxo não “respirar”
- **bundle JS desnecessário**: limitar `'use client'` apenas ao marquee

## Teste e validação

- validar visualmente no desktop se a faixa roda sem salto visível
- validar que a home continua renderizando com dados do servidor
- rodar `pnpm --dir apps/web typecheck`

