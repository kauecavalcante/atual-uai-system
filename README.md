# Atual — Landing Page

Landing page construída a partir do Figma **“U.Ai System — Wireframe Landing Page”**
(`fileKey` `9R5vtI8pwAE0S9d0bXRkwv`).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript `strict` · Tailwind CSS v4

## Scripts

```bash
npm run dev          # servidor de desenvolvimento
npm run build        # build de produção
npm run typecheck    # tsc --noEmit
npm run lint         # eslint (core-web-vitals + typescript)
npm run format       # prettier --write .
```

## Estrutura

```
src/
├── app/
│   ├── layout.tsx        # fonte Inter, metadata/SEO, skip link, lang pt-BR
│   ├── page.tsx          # composição das seções
│   └── globals.css       # design tokens (@theme) + base
├── components/
│   ├── icons/            # ícones inline (currentColor)
│   ├── layout/
│   │   └── site-header/  # header + drawer mobile
│   │       ├── site-header.tsx   # barra (absoluta sobre o hero)
│   │       ├── mobile-menu.tsx   # drawer em <dialog> modal (client)
│   │       ├── contact-link.tsx  # botão "Contato"
│   │       └── logo.tsx
│   ├── sections/
│   │   ├── hero/         # seção 1 — Hero
│   │   │   ├── hero.tsx          # conteúdo (fluxo normal, acessível)
│   │   │   └── hero-artwork.tsx  # camada decorativa (foto, gradientes, gráfico)
│   │   └── services/     # seção 2 — Serviços
│   │       ├── services.tsx          # intro, título e lista de benefícios
│   │       └── services-collage.tsx  # colagem (foto, cards, moedas)
│   └── ui/
│       ├── button.tsx    # Button / ButtonLink (cva)
│       └── rich-text.tsx # títulos com destaques (RichSegment)
├── config/
│   ├── site.ts           # identidade do site e âncoras das seções
│   └── navigation.ts     # menu principal e ação de contato
├── content/
│   ├── hero.ts           # copy do hero
│   └── services.ts       # copy da seção de serviços
└── lib/cn.ts             # clsx + tailwind-merge
public/brand/             # logo
public/hero/              # assets do hero (AVIF/WebP/PNG/SVG/JPEG)
public/services/          # assets da seção de serviços
```

## Design tokens

Definidos em `src/app/globals.css` dentro de `@theme` (Tailwind v4):

| Token            | Valor     | Origem no Figma             |
| ---------------- | --------- | --------------------------- |
| `--color-brand`  | `#1b449d` | section “Cores” 7:269       |
| `--color-accent` | `#3adcdd` | section “Cores” 7:269       |
| `--color-ink`    | `#161c28` | corpo de texto, nó 7:64     |
| `--color-muted`  | `#a9a7b6` | rótulo secundário, nó 7:104 |
| `--font-sans`    | Inter     | section “Fontes” 7:275      |

As escalas `--text-hero-title`, `--text-hero-lead` e `--text-cta` são fluidas e
interpolam linearmente entre os dois comps desenhados (360px e 1366px).

## Estratégia responsiva

O Figma traz três comps: **360** (`Home Mob`), **1366** (`Desktop`) e **1920**
(`bg-principal`, proporcional ao de 1366).

- **< 1024px** — comp de 360, com tipografia fluida limitada por `clamp()`.
- **≥ 1024px** — comp de 1366 em **proporção pura** (`vw`): tipografia,
  espaçamentos e arte escalam juntos. Em 1920 o resultado reproduz o artboard de
  1920 do Figma (palco de 2156px de altura, exatamente como desenhado).

A arte de fundo nunca distorce: no desktop o palco é travado em
`aspect-ratio: 1366 / 1534` e todas as camadas são posicionadas em porcentagem.

## Notas de implementação

- **Header sobreposto** — o header (frame 7:35) fica `absolute` sobre o hero,
  sem fundo próprio, como no design. O hero reserva a altura dele no
  `padding-top`, então nenhum dos dois precisa saber do outro.
- **Ponto de virada do menu** — o menu completo só entra em `xl` (1280px).
  Abaixo disso ele não caberia com tipografia legível (a 1024px a escala do
  design daria 12px), então entra o drawer. O hero, por sua vez, vira desktop
  em `lg` (1024px): são decisões independentes, e por isso entre 1024 e 1280 a
  página mostra o hero desktop com a barra compacta.
- **Drawer** — `<dialog>` nativo em modo modal: aprisionamento de foco,
  fechamento por Escape e inércia do fundo vêm do navegador. A animação usa
  `@starting-style` + `allow-discrete` (sem JS) e some em
  `prefers-reduced-motion`. `@starting-style` precisa ficar fora de `@layer` e
  `@media` — aninhado, o Chrome trata a regra como estilo normal.
- **Sangria do fundo** — o palco (1366×1534) é propositalmente mais alto que a
  seção (920px): no design o degradê e o gráfico passam por trás da seção
  seguinte. Por isso o hero **não** usa `overflow-hidden` na `<section>`.
- **Art direction** — a mão com a borboleta usa `<picture>` com `media`, então
  cada breakpoint baixa só o seu recorte (mobile 9KB AVIF, desktop 41KB AVIF).
  As camadas vetoriais são `background-image`: `display: none` impede o download
  do conjunto do outro breakpoint.
- **Escala da seção de serviços** — tipografia e espaçamentos usam
  `max(valor-mobile, proporção-de-1366)`. A expressão devolve o comp de 360 nas
  larguras pequenas, o de 1366 na largura desenhada e interpola entre os dois
  sem precisar de breakpoint.
- **Colagem** — palco com `aspect-ratio` travado e filhos em porcentagem. Os
  dois comps do Figma compartilham os mesmos `top`/`height`, então só o eixo
  horizontal tem variante em `lg`. O miolo (raios, paddings, ícones) usa `--u`,
  uma unidade derivada de `cqh` que vale 1px do comp desktop e encolhe para
  0.71px no mobile — exatamente a razão que o Figma aplicou.
- **Grid de uma coluna precisa de `grid-cols-1`** — sem ele a coluna implícita
  é `auto` e a largura percentual da colagem se auto-referencia, inflando a
  coluna. Vale para qualquer item com largura percentual dentro de um grid.
- **Acessibilidade** — `<h1>` único, `aria-labelledby` nas seções, arte marcada
  como `aria-hidden` (inclusive os rótulos da UI fictícia da colagem, que seriam
  lidos como informação real), foco visível em ciano, skip link e
  `prefers-reduced-motion` respeitado.

## Segurança

`next.config.ts` aplica em todas as rotas: HSTS, `X-Content-Type-Options`,
`X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy` e
`poweredByHeader: false`.

## Ambiente

```bash
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br   # usado por metadataBase/OG
```
