# Monorepo + Strapi Status

Data: 2026-04-24

## Estado atual

- O repositório foi convertido para monorepo com `pnpm-workspace.yaml` usando `apps/*` e `packages/*`.
- O frontend Next.js foi movido fisicamente da raiz para `apps/web`.
- O app web agora contém:
  - `apps/web/src`
  - `apps/web/public`
  - `apps/web/next.config.ts`
  - `apps/web/postcss.config.mjs`
  - `apps/web/tailwind.config.js`
  - `apps/web/tsconfig.json`
  - `apps/web/package.json`
- A raiz do repositório agora funciona como orquestração do workspace:
  - `pnpm dev`
  - `pnpm build`
  - `pnpm start`
  - `pnpm typecheck`
  - `pnpm test:strapi`
  - `pnpm cms:dev`
- A integração incremental com Strapi continua no app web em `apps/web/src/lib/strapi`.
- Os testes de `test:strapi` já passaram no ambiente local do usuário antes do move físico.

## Decisões tomadas

- Arquitetura adotada: monorepo leve com dois apps independentes.
- Organização final escolhida:
  - `apps/web` para o frontend Next.js
  - `apps/cms` para o Strapi
- Estratégia de migração adotada:
  1. estruturar o monorepo sem mover o app
  2. mover fisicamente o app para `apps/web`
- Segurança e integração com CMS:
  - tokens do Strapi permanecem server-side
  - preview e revalidate seguem no app web
  - componentes visuais continuam desacoplados da resposta bruta do CMS
- Banco inicial recomendado para o Strapi:
  - `sqlite` para bootstrap local
  - `PostgreSQL` depois para staging/prod

## Arquivos-chave alterados

- `package.json`
- `pnpm-workspace.yaml`
- `pnpm-lock.yaml`
- `tsconfig.base.json`
- `.gitignore`
- `README.md`
- `apps/web/**`
- `apps/cms/package.json`
- `apps/cms/README.md`
- `docs/superpowers/plans/2026-04-24-next-strapi-monorepo.md`

## Pendencias / bloqueios atuais

- O agente nao conseguiu executar `pnpm`/`node` neste shell por problema de `PATH`.
- Por isso, a verificacao final do monorepo precisa ser rodada no terminal local do usuario.
- `apps/cms` ainda esta como workspace real, mas com placeholder. O Strapi ainda nao foi bootstrapado.
- O lockfile foi ajustado estruturalmente, mas vale confirmar com `pnpm install` no ambiente local apos o bootstrap do CMS.

## Proximos passos recomendados

1. Confirmar o runtime local:
   - `nvm use 22`
   - `node -v`
   - `pnpm -v`
2. Reinstalar dependencias do workspace na raiz:
   - `pnpm install`
3. Validar o app web no novo local:
   - `pnpm test:strapi`
   - `pnpm typecheck`
   - `pnpm build`
4. Inicializar o Strapi real em `apps/cms`.
5. Criar os content types iniciais:
   - `project`
   - `team-member`
   - `partner`
   - `navigation`
6. Gerar token de leitura no Strapi e configurar variaveis de ambiente do web.
7. Testar preview e webhook de revalidacao.

## Comandos locais esperados agora

Na raiz do repo:

```bash
pnpm install
pnpm test:strapi
pnpm typecheck
pnpm build
pnpm dev
```

Para o CMS:

```bash
pnpm cms:dev
```

## Observacao operacional

Se `node` ou `pnpm` nao aparecerem no terminal, trate isso como problema do shell/`nvm-windows` antes de depurar o monorepo. O ponto mais importante neste momento e validar localmente que o move para `apps/web` manteve o app funcional antes de seguir para o bootstrap real do Strapi.
