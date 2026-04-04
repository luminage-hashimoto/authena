# Authena（オーセナ）

富裕層向けWebメディア。上質な消費には、上質な情報がいる。

Operated by Luminage Inc.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Fonts**: Cormorant Garamond / Noto Serif JP / DM Sans
- **Deploy**: Vercel

## Pages

| Route | Description |
|-------|-------------|
| `/` | トップページ |
| `/articles` | 記事一覧（カテゴリフィルター付き） |
| `/articles/[slug]` | 記事詳細 |

## Categories

Car / Watch / Travel / Beauty / Real Estate / Finance

## Development

```bash
npm run dev     # localhost:3000
npm run build   # production build
```

## Deploy to Vercel

```bash
npx vercel
```

## CMS Integration

現在はダミーデータ（`src/lib/articles.ts`）で動作。CMSを連携する際は `Article` 型（`src/types/index.ts`）に合わせてデータ取得関数を差し替えてください。

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `base` | `#f7f5f1` | Background |
| `gold` | `#a8854a` | Accent |
| `ink` | `#1a1814` | Text |
| `muted` | `#6b6456` | Subdued text |
