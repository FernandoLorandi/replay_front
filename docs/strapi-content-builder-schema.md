# Strapi Content Builder Schema

Este documento descreve os tipos de conteúdo necessários para recriar o CMS usado pelo frontend em `apps/web`.

Versões consideradas:

- Strapi `5.43.0`
- Next.js `16.2.4`

## Componentes

### `shared.nav-item`

Crie em **Content-Type Builder > Components > shared > nav-item**.

| Campo | Tipo | Obrigatorio | Configuracao |
| --- | --- | --- | --- |
| `label` | Text, Short text | Sim | Nome exibido no menu |
| `href` | Text, Short text | Sim | Caminho interno ou URL externa |
| `external` | Boolean | Nao | Default `false` |

JSON equivalente:

```json
{
  "collectionName": "components_shared_nav_items",
  "info": {
    "displayName": "nav-item"
  },
  "options": {},
  "attributes": {
    "label": {
      "type": "string",
      "required": true
    },
    "href": {
      "type": "string",
      "required": true
    },
    "external": {
      "type": "boolean",
      "default": false
    }
  },
  "config": {}
}
```

## Single Types

### `navigation`

Crie em **Content-Type Builder > Single Types > Create new single type**.

- Display name: `navigation`
- API ID singular: `navigation`
- API ID plural: `navigations`
- Draft & Publish: habilitado

| Campo | Tipo | Obrigatorio | Configuracao |
| --- | --- | --- | --- |
| `items` | Component | Nao | Componente `shared.nav-item`, repeatable |

JSON equivalente:

```json
{
  "kind": "singleType",
  "collectionName": "navigations",
  "info": {
    "singularName": "navigation",
    "pluralName": "navigations",
    "displayName": "navigation"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "items": {
      "type": "component",
      "component": "shared.nav-item",
      "repeatable": true
    }
  }
}
```

## Collection Types

### `project`

Crie em **Content-Type Builder > Collection Types > Create new collection type**.

- Display name: `project`
- API ID singular: `project`
- API ID plural: `projects`
- Draft & Publish: habilitado

| Campo | Tipo | Obrigatorio | Configuracao |
| --- | --- | --- | --- |
| `title` | Text, Short text | Sim | Titulo do projeto |
| `slug` | UID | Sim | Attached field: `title` |
| `category` | Enumeration | Sim | Valores abaixo |
| `previewVideo` | Media | Sim | Video curto de preview do card, single media, allowed types: Videos e Files para aceitar MP4 com MIME generico |
| `videoUrl` | Text, Short text | Sim | URL publica do video completo, por exemplo YouTube watch URL, Vimeo URL ou MP4 publico |
| `showOnHome` | Boolean | Nao | Marca o projeto para aparecer na sequencia da home |
| `homeOrder` | Number, Integer | Nao | Ordem do projeto na sequencia da home |
| `homeHeroVideo` | Media | Nao | Video especifico da hero/scroll da home; se vazio, usa `previewVideo` |
| `homeTitle` | Text, Short text | Nao | Titulo opcional especifico da home; se vazio, usa `title` |
| `homeSummary` | Text, Long text | Nao | Texto opcional especifico da home; se vazio, usa a categoria |
| `summary` | Text, Long text | Nao | Resumo exibido nos cards e pagina do projeto |

Valores do enum `category`:

```text
Institucionais
Reels
Varejo
Inteligencia Artificial
Motions Graphics
```

JSON equivalente:

```json
{
  "kind": "collectionType",
  "collectionName": "projects",
  "info": {
    "singularName": "project",
    "pluralName": "projects",
    "displayName": "project"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "category": {
      "type": "enumeration",
      "required": true,
      "enum": [
        "Institucionais",
        "Reels",
        "Varejo",
        "Inteligencia Artificial",
        "Motions Graphics"
      ]
    },
    "previewVideo": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": [
        "videos",
        "files"
      ]
    },
    "videoUrl": {
      "type": "string",
      "required": true
    },
    "showOnHome": {
      "type": "boolean",
      "default": false
    },
    "homeOrder": {
      "type": "integer"
    },
    "homeHeroVideo": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": [
        "videos",
        "files"
      ]
    },
    "homeTitle": {
      "type": "string"
    },
    "homeSummary": {
      "type": "text"
    },
    "summary": {
      "type": "text"
    }
  }
}
```

### `partner`

Crie em **Content-Type Builder > Collection Types > Create new collection type**.

- Display name: `partner`
- API ID singular: `partner`
- API ID plural: `partners`
- Draft & Publish: habilitado

| Campo | Tipo | Obrigatorio | Configuracao |
| --- | --- | --- | --- |
| `name` | Text, Short text | Sim | Nome do cliente/parceiro |
| `logo` | Media | Sim | Single media, allowed types: Images e Videos |

JSON equivalente:

```json
{
  "kind": "collectionType",
  "collectionName": "partners",
  "info": {
    "singularName": "partner",
    "pluralName": "partners",
    "displayName": "partner"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "logo": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": [
        "images",
        "videos"
      ]
    }
  }
}
```

### `team-member`

Crie em **Content-Type Builder > Collection Types > Create new collection type**.

- Display name: `team-member`
- API ID singular: `team-member`
- API ID plural: `team-members`
- Draft & Publish: habilitado

| Campo | Tipo | Obrigatorio | Configuracao |
| --- | --- | --- | --- |
| `name` | Text, Short text | Sim | Nome da pessoa |
| `position` | Text, Short text | Sim | Cargo/função |
| `photo` | Media | Sim | Single media, allowed types: Images e Videos |

JSON equivalente:

```json
{
  "kind": "collectionType",
  "collectionName": "team_members",
  "info": {
    "singularName": "team-member",
    "pluralName": "team-members",
    "displayName": "team-member"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "position": {
      "type": "string",
      "required": true
    },
    "photo": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": [
        "images",
        "videos"
      ]
    }
  }
}
```

## Dados iniciais sugeridos

### Navigation

| label | href | external |
| --- | --- | --- |
| Projetos | `/projetos` | `false` |
| Equipe | `/equipe` | `false` |
| Contato | `/contato` | `false` |

### Projects

| title | slug | category | summary |
| --- | --- | --- | --- |
| Continental | `continental` | Institucionais | Narrativa de marca com acabamento cinematografico e foco em produto. |
| Castrolanda | `castrolanda` | Reels | Peca comercial com ritmo dinamico e direcao de arte limpa. |
| Lojas MM | `lojas-mm` | Institucionais | Conteudo orientado a lifestyle com linguagem visual mais editorial. |
| Copagril | `copagril` | Reels | Captacao em campo com discurso de marca claro e proximidade humana. |

### Partners

| name |
| --- |
| Castrolanda |
| Copagri |
| Continental |
| Lojas MM |

### Team Members

| name | position |
| --- | --- |
| John Cartes | CEO & Founder |
| Matt Cannon | Produtor Executivo |
| Lilly Woods | Operador de câmera |
| Sophie Moore | Diretora de Arte |

## Permissoes e chamadas usadas pelo frontend

Depois de criar e publicar os registros, libere as permissoes de leitura em **Settings > Users & Permissions plugin > Roles > Public** ou gere um API token usado em `STRAPI_API_TOKEN`.

Endpoints usados pelo frontend:

```text
GET /api/navigation?populate[0]=items
GET /api/projects?populate[0]=previewVideo&populate[1]=homeHeroVideo&sort[0]=title:asc
GET /api/projects?populate[0]=previewVideo&populate[1]=homeHeroVideo&sort[0]=title:asc&filters[slug][$eq]=continental
GET /api/partners?populate=logo&sort[0]=name:asc
GET /api/team-members?populate=photo&sort[0]=name:asc
```

Variaveis de ambiente do frontend:

```text
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=<token-opcional-se-a-rota-nao-for-publica>
```
