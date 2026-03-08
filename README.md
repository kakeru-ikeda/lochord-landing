# lochord-landing

> Landing page for **[Lochord](https://github.com/kakeru-ikeda/Lochord)** — Local music library & M3U8 playlist manager

🌐 **Live site:** https://kakeru-ikeda.github.io/lochord-landing/

---

## Overview

This repository contains the promotional landing page for [Lochord](https://github.com/kakeru-ikeda/Lochord), a cross-platform desktop app for managing local music libraries and M3U8 playlists.

**Features of this page:**
- Multi-language support: English / 日本語 / 한국어 / 中文
- Dynamic download links — automatically fetches the latest release from the GitHub API
- Fully responsive design matching Lochord's dark/light aesthetic
- Zero build step — plain HTML + CSS + JS, deployed via GitHub Actions

---

## Local Development

No dependencies or build tools required.

```bash
# Clone
git clone https://github.com/kakeru-ikeda/lochord-landing.git
cd lochord-landing

# Open in browser
open index.html         # macOS
start index.html        # Windows
xdg-open index.html     # Linux
```

Or use any static file server:

```bash
npx serve .
# → http://localhost:3000
```

---

## Deployment

Pushes to `main` automatically trigger GitHub Actions ([`.github/workflows/pages.yml`](.github/workflows/pages.yml)) which deploys to **GitHub Pages**.

| Branch | URL |
|--------|-----|
| `main` | https://kakeru-ikeda.github.io/lochord-landing/ |

---

## Structure

```
lochord-landing/
├── index.html              # Landing page (all-in-one HTML/CSS/JS)
├── .github/
│   └── workflows/
│       └── pages.yml       # GitHub Actions → GitHub Pages
└── README.md
```

---

## Related

- 🎵 **Lochord app:** https://github.com/kakeru-ikeda/Lochord
- 📦 **Latest release:** https://github.com/kakeru-ikeda/Lochord/releases/latest

---

## License

MIT License © 2025–2026 [kakeru-ikeda](https://github.com/kakeru-ikeda)

---

---

# lochord-landing（日本語）

> **[Lochord](https://github.com/kakeru-ikeda/Lochord)** のプロモーション用ランディングページです。

🌐 **公開 URL:** https://kakeru-ikeda.github.io/lochord-landing/

---

## 概要

[Lochord](https://github.com/kakeru-ikeda/Lochord) は、ローカル音楽ライブラリを管理し M3U8 プレイリストを作成するクロスプラットフォームデスクトップアプリです。このリポジトリはそのランディングページのソースです。

**ページの特徴:**
- 多言語対応：English / 日本語 / 한국어 / 中文
- GitHub API から最新リリースを動的取得してダウンロードボタンに反映
- Lochord のデザインに合わせたレスポンシブレイアウト
- ビルド不要 — HTML + CSS + JS のみ

---

## ローカル開発

依存パッケージやビルドツールは不要です。

```bash
git clone https://github.com/kakeru-ikeda/lochord-landing.git
cd lochord-landing
start index.html   # Windows
```

---

## デプロイ

`main` ブランチへの push が GitHub Actions を起動し、GitHub Pages に自動デプロイします。

---

## ライセンス

MIT License © 2025–2026 [kakeru-ikeda](https://github.com/kakeru-ikeda)
