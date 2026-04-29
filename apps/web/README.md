# Web app

Frontend Next.js da Replay ja movido para `apps/web`.

Comandos esperados:

- `pnpm --dir apps/web dev`
- `pnpm --dir apps/web build`
- `pnpm --dir apps/web start`
- `pnpm --dir apps/web typecheck`
- `pnpm --dir apps/web test:strapi`

Variaveis de ambiente:

- `STRAPI_URL`: URL base do Strapi, ex. `http://localhost:1337`
- `STRAPI_API_TOKEN`: token opcional para leitura server-side no Next
- `STRAPI_WEBHOOK_SECRET`: segredo validado em `POST /api/revalidate`
- `STRAPI_PREVIEW_SECRET`: segredo validado em `GET /api/preview`

Bootstrap local recomendado:

1. Crie `apps/web/.env.local` a partir de `apps/web/.env.example`
2. Defina `STRAPI_URL=http://localhost:1337`
3. Se o Strapi nao estiver com leitura publica, gere um API token de leitura e preencha `STRAPI_API_TOKEN`
4. Defina segredos para preview e revalidate

Validacao manual:

- `GET http://localhost:3000/api/preview?secret=<STRAPI_PREVIEW_SECRET>&slug=/projetos`
- `POST http://localhost:3000/api/revalidate`

Exemplo de payload para revalidate:

```json
{
  "secret": "change-me",
  "model": "project",
  "slug": "continental"
}
```
