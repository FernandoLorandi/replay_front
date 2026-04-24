# replay-monorepo
Monorepo do site da Produtora Replay com dois apps independentes:

- `apps/web`: frontend Next.js
- `apps/cms`: destino do Strapi

## Integracao Strapi

Esta base agora opera como monorepo leve. O frontend foi movido para `apps/web`, enquanto o CMS fica isolado em `apps/cms`.

### Estrutura

- `apps/web` concentra o app Next.js.
- `apps/cms` concentra o app Strapi.
- A camada de acesso ao CMS fica em `apps/web/src/lib/strapi`.
- `apps/web/src/data/fixtures` continua como fallback tipado e espelha o shape esperado do CMS.

### Comandos da raiz

- `pnpm dev` ou `pnpm dev:web`
- `pnpm build` ou `pnpm build:web`
- `pnpm start` ou `pnpm start:web`
- `pnpm typecheck`
- `pnpm test:strapi`
- `pnpm cms:dev`

### Observacao sobre Windows + nvm

Se `node`, `npm` ou `pnpm` nao aparecerem no shell do agente, isso tende a ser problema de `PATH`/integração do `nvm-windows`, nao do projeto. Os comandos acima assumem que seu terminal local ja resolve o runtime corretamente.

### Variaveis de ambiente esperadas

- `STRAPI_URL`: base URL do Strapi, ex. `https://cms.example.com`
- `STRAPI_API_TOKEN`: token server-side usado pelo Next para ler o CMS
- `STRAPI_WEBHOOK_SECRET`: segredo validado na rota de revalidacao
- `STRAPI_PREVIEW_SECRET`: segredo validado na rota de preview

### Endpoints internos

- `GET /api/preview?secret=...&slug=/rota`
- `POST /api/revalidate`

Exemplo de payload para revalidacao:

```json
{
  "secret": "seu-segredo",
  "model": "project",
  "slug": "continental"
}
```

Ou de forma explicita:

```json
{
  "secret": "seu-segredo",
  "tags": ["projects"],
  "paths": ["/", "/projetos", "/projetos/continental"]
}
```

### Verificacao local

- `pnpm typecheck`
- `pnpm test:strapi`
