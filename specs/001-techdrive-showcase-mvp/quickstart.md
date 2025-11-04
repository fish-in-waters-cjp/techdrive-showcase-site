# Quick Start Guide: TechDrive 科技車載品牌官網 MVP

<!--
  ⚠️ LANGUAGE REQUIREMENT: This quick start guide MUST be written in Traditional Chinese (zh-TW)
  as per Constitution Principle VI. Technical terms may remain in English when commonly used.
-->

**Feature**: TechDrive 科技車載品牌官網 MVP
**Date**: 2025-11-05
**Related**: [spec.md](./spec.md) | [plan.md](./plan.md) | [data-model.md](./data-model.md) | [research.md](./research.md)

本指南將引導你快速設定開發環境並啟動專案。

---

## Prerequisites（前置需求）

確保你的開發環境已安裝以下工具：

- **Node.js**: v20.0.0 LTS 或以上
- **pnpm**: v9.0.0 或以上（若未安裝，執行 `npm install -g pnpm`）
- **Git**: 用於版本控制
- **現代瀏覽器**: Chrome、Firefox、Safari 或 Edge（最新 2 個版本）
- **程式碼編輯器**: 建議使用 VS Code（附 Volar、ESLint、Prettier 擴充套件）

---

## Setup（初始設定）

### 1. Clone Repository（複製儲存庫）

```bash
# Clone 專案
git clone <repository-url>
cd techdrive-showcase-site

# 切換至 MVP 功能分支
git checkout 001-techdrive-showcase-mvp
```

### 2. Install Dependencies（安裝依賴）

```bash
# 使用 pnpm 安裝所有依賴
pnpm install
```

這會安裝以下核心依賴：
- **Vue 3** (v3.5+) - 前端框架
- **Vite** (v7.0+) - 建置工具
- **Tailwind CSS** (v3.4+) - CSS 框架
- **Vue I18n** (v10+) - 國際化
- **VeeValidate** (v4.15+) - 表單驗證
- **Yup** - Schema 驗證
- **Pinia** (v2.3+) - 狀態管理
- **TypeScript** (v5.x) - 選用

### 3. 初始化 Tailwind CSS

```bash
# 初始化 Tailwind 配置
npx tailwindcss init -p
```

### 4. 配置 Vite (vite.config.js)

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        technology: resolve(__dirname, 'technology.html'),
        products: resolve(__dirname, 'products.html'),
        productDetail: resolve(__dirname, 'product-detail.html'),
        retailPartner: resolve(__dirname, 'retail-partner.html'),
        mediaNews: resolve(__dirname, 'media-news.html'),
        support: resolve(__dirname, 'support.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
})
```

---

## Project Structure（專案結構）

初始化後，你的專案結構應如下：

```text
techdrive-showcase-site/
├── public/                      # 靜態資產（未建立，需手動新增）
│   ├── assets/                 # 圖片、LOGO、圖示
│   ├── locales/               # i18n 語系檔
│   └── data/                   # Mock 資料 JSON
│
├── src/
│   ├── main.tsx                # 應用程式進入點
│   ├── App.tsx                 # 根元件（路由設定）
│   ├── pages/                  # 頁面層（需建立）
│   ├── components/             # 元件層
│   │   ├── layout/            # 佈局元件（需建立）
│   │   ├── ui/                # Shadcn UI 元件（已自動生成）
│   │   ├── sections/          # 區塊元件（需建立）
│   │   └── forms/             # 表單元件（需建立）
│   ├── lib/                   # 工具與設定
│   ├── hooks/                 # 自定義 Hooks（需建立）
│   ├── types/                 # TypeScript 型別定義（需建立）
│   └── styles/                # 全域樣式
│       └── globals.css        # 已由 Shadcn UI 生成
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── ...
```

---

## Development（開發）

### 1. Start Development Server（啟動開發伺服器）

```bash
pnpm dev
```

瀏覽器會自動開啟 http://localhost:5173

### 2. Build for Production（建置正式版本）

```bash
pnpm build
```

輸出檔案位於 `dist/` 目錄，可直接部署至靜態主機。

### 3. Preview Production Build（預覽正式版本）

```bash
pnpm preview
```

本地預覽建置後的靜態檔案（http://localhost:4173）。

---

## Testing（測試）

### Unit Tests（單元測試）

```bash
# 執行所有單元測試
pnpm test

# 開啟測試 UI
pnpm test:ui

# 測試覆蓋率報告
pnpm test:coverage
```

### E2E Tests（端到端測試）

```bash
# 執行 Playwright E2E 測試（需先啟動 dev server）
pnpm test:e2e

# 開啟 Playwright UI 模式
pnpm test:e2e:ui
```

---

## Code Quality（程式碼品質）

### Linting（程式碼檢查）

```bash
# 執行 ESLint 檢查
pnpm lint

# 自動修正可修復的問題
pnpm lint:fix
```

### Formatting（程式碼格式化）

```bash
# 執行 Prettier 格式化
pnpm format

# 檢查格式是否正確
pnpm format:check
```

### Type Checking（型別檢查）

```bash
# 執行 TypeScript 型別檢查
pnpm type-check
```

---

## Git Hooks（Git 鉤子）

專案使用 Husky + lint-staged 確保提交的程式碼品質。

### Pre-commit Hook

每次 `git commit` 時會自動執行：
1. ESLint 檢查
2. Prettier 格式化
3. TypeScript 型別檢查

若有錯誤，commit 會被阻擋，需修正後才能提交。

### 設定 Husky

```bash
# 初始化 Husky
npx husky install

# 建立 pre-commit hook
npx husky add .husky/pre-commit "pnpm lint-staged"
```

---

## Environment Variables（環境變數）

專案使用 Vite 的環境變數機制。

### 建立 `.env.local` 檔案

```bash
# .env.local（本地開發用，不提交至 Git）
VITE_APP_TITLE="TechDrive"
VITE_DEFAULT_LOCALE="zh-TW"
VITE_ENABLE_NO_EXTERNAL_MODE="true"
```

### 在程式碼中使用

```typescript
const appTitle = import.meta.env.VITE_APP_TITLE;
const defaultLocale = import.meta.env.VITE_DEFAULT_LOCALE;
```

---

## Mock Data Setup（Mock 資料設定）

### 1. 建立 Mock 資料目錄

```bash
mkdir -p public/data
mkdir -p public/assets/{hero,products,tech,retailers,placeholders}
mkdir -p public/locales
```

### 2. 建立初始 Mock 資料

參考 [data-model.md](./data-model.md) 與 [contracts/](./contracts/) 中的範例，建立以下 JSON 檔案：

```bash
# 產品資料（6-8 個產品）
touch public/data/products.json

# 核心技術資料（3 個技術）
touch public/data/technologies.json

# 新聞資料（3 則新聞）
touch public/data/news.json

# FAQ 資料（6+ 個問題）
touch public/data/faqs.json

# 零售商資料（6-12 個零售商）
touch public/data/retailers.json
```

### 3. 建立語系檔案

```bash
# 繁體中文
touch public/locales/zh-TW.json

# 英文
touch public/locales/en.json
```

範例 `zh-TW.json`:

```json
{
  "nav": {
    "home": "首頁",
    "about": "關於我們",
    "technology": "核心技術",
    "products": "產品",
    "retailPartner": "合作夥伴",
    "mediaNews": "媒體與新聞",
    "support": "客戶支援",
    "contact": "聯絡我們"
  },
  "hero": {
    "title": "Smart Driving Starts Here",
    "subtitle": "以專利技術驅動新一代車載體驗",
    "cta": "了解產品"
  },
  ...
}
```

---

## VS Code Configuration（VS Code 設定）

### 建議擴充套件

在 `.vscode/extensions.json` 中加入：

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-playwright.playwright",
    "ZixuanChen.vitest-explorer"
  ]
}
```

### 工作區設定

在 `.vscode/settings.json` 中加入：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

## Deployment（部署）

### Netlify

```bash
# 安裝 Netlify CLI
pnpm add -D netlify-cli

# 部署至 Netlify
pnpm build
npx netlify deploy --prod --dir=dist
```

### Vercel

```bash
# 安裝 Vercel CLI
pnpm add -D vercel

# 部署至 Vercel
pnpm build
npx vercel --prod
```

### GitHub Pages

```bash
# 建置並部署至 GitHub Pages
pnpm build
npx gh-pages -d dist
```

---

## Troubleshooting（常見問題）

### Q: `pnpm install` 失敗

**A**: 確保 Node.js 版本 ≥18.0.0，並清除快取後重試：

```bash
pnpm store prune
pnpm install
```

### Q: TypeScript 報錯找不到模組

**A**: 確保 `tsconfig.json` 的 `paths` 設定正確：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

並在 `vite.config.ts` 中設定 alias：

```typescript
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Q: Tailwind CSS 樣式沒有生效

**A**: 確保 `tailwind.config.ts` 的 `content` 路徑正確：

```typescript
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  ...
}
```

### Q: i18n 語系檔案載入失敗

**A**: 確保 `public/locales/` 目錄存在，且檔案名稱正確（`zh-TW.json`、`en.json`）。

---

## Next Steps（下一步）

1. ✅ **Environment Setup Complete** - 開發環境設定完成
2. 🔄 **Run `/speckit.tasks`** - 產生任務清單（tasks.md）
3. 🔄 **Start Implementation** - 開始實作功能

---

## Support（支援）

若遇到問題，請參考：
- [spec.md](./spec.md) - 完整的功能規格
- [plan.md](./plan.md) - 實作計畫
- [data-model.md](./data-model.md) - 資料模型定義
- [contracts/](./contracts/) - Mock 資料 schema

或聯繫專案負責人。
