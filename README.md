# TechDrive 科技車載品牌官網

> 現代化、國際化的科技車載品牌展示網站 MVP

[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-10.19-F69220?logo=pnpm)](https://pnpm.io/)

## 專案簡介

TechDrive 科技車載品牌官網是一個可供客戶展示的前端互動示範網站，採用簡潔、現代、國際化的設計風格（黑/白/灰 + 品牌藍）。網站支援繁體中文與英文雙語切換，並提供完整的響應式設計以適應桌機、平板與手機裝置。

### 主要功能

- ✨ **品牌展示** - 品牌故事、企業沿革與核心價值
- 🚀 **核心技術** - Smart Connect、Active Clamps、EcoBoost Drive 三大技術展示
- 📦 **產品展示** - 產品列表、詳細規格與產品比較功能（最多 3 件）
- 📝 **互動表單** - 聯絡表單、經銷商申請表單、產品註冊表單
- 📰 **媒體中心** - 最新新聞、媒體報導與品牌資源下載
- 💬 **客戶支援** - FAQ 常見問題解答與客服資訊
- 🌍 **多語系** - 繁體中文 / English 雙語切換
- 📱 **響應式設計** - 支援桌機（≥1280px）、平板（768-1279px）、手機（≤767px）
- ♿ **無障礙** - 符合 WCAG 2.1 AA 標準，支援鍵盤導航

## 技術棧

- **前端框架**: Vue 3 (Composition API)
- **建置工具**: Vite 7.1 (Multi-Page Application)
- **樣式框架**: Tailwind CSS 4.1
- **狀態管理**: Pinia 3.0
- **國際化**: Vue I18n 11.1
- **表單驗證**: VeeValidate 4.15 + Yup
- **開發語言**: JavaScript (ES2022+)
- **執行環境**: Node.js v20 LTS
- **套件管理**: pnpm 10.19

## 快速開始

### 環境需求

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### 安裝

```bash
# 複製專案
git clone <repository-url>
cd techdrive-showcase-site

# 切換至功能分支
git checkout 001-techdrive-showcase-mvp

# 安裝依賴
pnpm install
```

### 開發

```bash
# 啟動開發伺服器
pnpm dev

# 開發伺服器將運行於 http://localhost:5173
```

### 建置

```bash
# 建置正式版本
pnpm build

# 預覽建置結果
pnpm preview
```

## 專案結構

```
techdrive-showcase-site/
├── public/                      # 靜態資源
│   ├── assets/                 # 圖片、LOGO、圖示
│   │   ├── hero/              # Hero 主視覺圖片
│   │   ├── products/          # 產品圖片
│   │   ├── tech/              # 技術圖示
│   │   └── retailers/         # 零售商 LOGO
│   ├── data/                   # Mock Data JSON
│   │   ├── products.json      # 產品資料
│   │   ├── technologies.json  # 技術資料
│   │   ├── news.json          # 新聞資料
│   │   ├── faqs.json          # FAQ 資料
│   │   └── retailers.json     # 零售商資料
│   └── locales/               # 多語系翻譯檔
│       ├── zh-TW.json         # 繁體中文
│       └── en.json            # 英文
│
├── src/
│   ├── components/            # Vue 元件
│   │   ├── layout/           # 佈局元件（Header、Footer）
│   │   ├── ui/               # UI 元件（Button、Card）
│   │   ├── forms/            # 表單元件
│   │   ├── products/         # 產品相關元件
│   │   └── sections/         # 區塊元件
│   │
│   ├── pages/                # 頁面入口
│   │   ├── home/            # 首頁
│   │   ├── about/           # 關於我們
│   │   ├── technology/      # 核心技術
│   │   ├── products/        # 產品列表
│   │   ├── product-detail/  # 產品詳情
│   │   ├── retail-partner/  # 合作夥伴
│   │   ├── media-news/      # 媒體新聞
│   │   ├── support/         # 客戶支援
│   │   └── contact/         # 聯絡我們
│   │
│   ├── stores/              # Pinia 狀態管理
│   │   ├── locale.js        # 語言設定
│   │   ├── compare.js       # 產品比較
│   │   └── ui.js            # UI 狀態
│   │
│   ├── composables/         # Composition API 可複用邏輯
│   ├── lib/                 # 工具函式與配置
│   └── styles/              # 全域樣式
│
├── specs/                   # 專案規格文件
│   ├── 001-techdrive-showcase-mvp/
│   │   ├── spec.md         # 功能規格
│   │   ├── plan.md         # 實作計畫
│   │   ├── tasks.md        # 任務清單
│   │   ├── data-model.md   # 資料模型
│   │   └── quickstart.md   # 開發指南
│   └── design/             # UI/UX 設計原型
│
├── index.html              # 首頁 HTML 入口
├── about.html              # 關於頁面入口
├── technology.html         # 技術頁面入口
├── products.html           # 產品頁面入口
├── vite.config.js          # Vite 配置
├── tailwind.config.js      # Tailwind 配置
└── package.json
```

## 頁面架構

網站採用 **Vite Multi-Page Application (MPA)** 架構，包含以下 8 個獨立頁面：

1. **Home** (`/`) - 首頁，展示 Hero、核心技術、精選產品、合作夥伴
2. **About** (`/about.html`) - 關於我們，品牌故事與企業沿革
3. **Technology** (`/technology.html`) - 核心技術詳細說明
4. **Products** (`/products.html`) - 產品列表與篩選
5. **Product Detail** (`/product-detail.html`) - 產品詳細資訊與規格表
6. **Retail & Partner** (`/retail-partner.html`) - 合作夥伴與經銷商申請
7. **Media & News** (`/media-news.html`) - 媒體報導與新聞
8. **Support** (`/support.html`) - FAQ 與客戶支援
9. **Contact** (`/contact.html`) - 聯絡表單

## 開發指南

### Mock Data

所有資料來自 `public/data/` 目錄下的 JSON 檔案：

- `products.json` - 6-8 個產品資料
- `technologies.json` - 3 個核心技術
- `news.json` - 3 則新聞
- `faqs.json` - 6+ 個常見問題
- `retailers.json` - 6-12 個零售商

資料結構請參考 `specs/001-techdrive-showcase-mvp/data-model.md`。

### 狀態管理

使用 Pinia 管理全域狀態：

```javascript
// 語言切換
import { useLocaleStore } from '@/stores/locale'
const localeStore = useLocaleStore()
localeStore.setLocale('en')

// 產品比較
import { useCompareStore } from '@/stores/compare'
const compareStore = useCompareStore()
compareStore.addItem(product)

// UI 狀態
import { useUIStore } from '@/stores/ui'
const uiStore = useUIStore()
uiStore.toggleOfflineMode(true)
```

### 多語系

使用 Vue I18n 實現雙語切換：

```vue
<template>
  <h1>{{ $t('nav.home') }}</h1>
  <p>{{ $t('hero.subtitle') }}</p>
</template>
```

翻譯檔案位於 `public/locales/zh-TW.json` 與 `public/locales/en.json`。

### 表單驗證

使用 VeeValidate + Yup：

```javascript
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required('請輸入姓名'),
  email: yup.string().email('請輸入有效的 Email').required('請輸入 Email')
})

const { handleSubmit } = useForm({ validationSchema: schema })
```

## 設計資源

UI/UX 設計原型位於 `specs/design/` 目錄：

- `index.html` - 設計系統總覽
- `design-system.html` - 色彩、字體、間距規範
- `components.html` - UI 元件庫
- `home.html` - 首頁設計原型（明亮模式）
- `home-dark.html` - 首頁設計原型（深色模式）
- `responsive-demo.html` - 響應式設計示範

開啟方式：直接在瀏覽器中開啟 HTML 檔案即可預覽。

## 效能目標

- First Contentful Paint (FCP) ≤ 1.5s (桌機)、≤ 2.5s (手機)
- 語言切換 < 300ms
- 產品比較功能 < 1s
- 動畫流暢度 60fps
- Bundle size < 500KB (gzipped)

## 瀏覽器支援

- Chrome (最新 2 版)
- Firefox (最新 2 版)
- Safari (最新 2 版)
- Edge (最新 2 版)
- iOS Safari 15+
- Chrome Mobile (最新版)

**不支援 IE11**

## 專案文件

詳細文件請參考 `specs/001-techdrive-showcase-mvp/` 目錄：

- [spec.md](./specs/001-techdrive-showcase-mvp/spec.md) - 功能規格書（7 個 User Stories，52 個功能需求）
- [plan.md](./specs/001-techdrive-showcase-mvp/plan.md) - 實作計畫（技術選型、架構設計）
- [tasks.md](./specs/001-techdrive-showcase-mvp/tasks.md) - 任務清單（98 個任務，10 個階段）
- [data-model.md](./specs/001-techdrive-showcase-mvp/data-model.md) - 資料模型（TypeScript 型別定義）
- [quickstart.md](./specs/001-techdrive-showcase-mvp/quickstart.md) - 開發環境設定指南

## 開發階段

專案分為 10 個階段，採用遞增交付策略：

### Phase 1-4: MVP (核心功能)
- ✅ Phase 1: 環境建置
- 🔄 Phase 2: 基礎建設（Layout、Stores、UI 元件）
- ⏳ Phase 3: User Story 1 - 品牌展示與核心技術
- ⏳ Phase 4: User Story 2 - 產品展示與比較

### Phase 5-9: 完整功能
- ⏳ Phase 5: User Story 6 - 多語系與響應式
- ⏳ Phase 6: User Story 3 - 表單互動
- ⏳ Phase 7: User Story 4 - 媒體與新聞
- ⏳ Phase 8: User Story 5 - FAQ 與客戶支援
- ⏳ Phase 9: User Story 7 - 無障礙與效能

### Phase 10: 整合測試
- ⏳ Phase 10: 整合測試與最終優化

## Git 工作流程

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 規範：

- `feat`: 新功能
- `fix`: 錯誤修正
- `docs`: 文件更新
- `style`: 程式碼格式調整
- `refactor`: 重構
- `perf`: 效能優化
- `test`: 測試相關
- `chore`: 維護與配置

範例：
```bash
feat(products): add product comparison feature
fix(forms): correct email validation regex
docs: update README with deployment instructions
```

## 授權

ISC

## 聯絡方式

如有任何問題或建議，請聯繫專案維護者。

---

**Last Updated**: 2025-11-05
**Version**: 1.0.0
**Status**: In Development
