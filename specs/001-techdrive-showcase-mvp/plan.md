# Implementation Plan: TechDrive 科技車載品牌官網 MVP

<!--
  ⚠️ LANGUAGE REQUIREMENT: This plan (including research.md, data-model.md, quickstart.md)
  MUST be written in Traditional Chinese (zh-TW) as per Constitution Principle VI.
  Technical terms may remain in English when commonly used.
-->

**Branch**: `001-techdrive-showcase-mvp` | **Date**: 2025-11-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-techdrive-showcase-mvp/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

本專案旨在建立 TechDrive 科技車載品牌的官方展示網站 MVP,提供潛在客戶與合作夥伴瀏覽品牌資訊、核心技術、產品規格比較,以及透過表單進行聯繫與申請。網站採用簡潔、現代、國際化的視覺風格(黑/白/灰 + 品牌藍),支援繁體中文與英文雙語切換,並具備響應式設計以適應桌機、平板與手機裝置。

技術方案採用 **Vue 3 + Vite + Tailwind CSS** 的現代前端堆疊,利用 Vite 的多頁應用(MPA)模式建構 8 個獨立頁面,搭配 Vue I18n 實現雙語切換、VeeValidate 處理表單驗證、Pinia 管理全域狀態(如語言設定、產品比較清單)。所有資料為前端 Mock Data,表單送出僅為模擬行為,最終產出為可靜態部署的網站。

## Technical Context

**Language/Version**: JavaScript (ES2022+) / Node.js v20 LTS
**Primary Dependencies**:
  - **Vue 3** (v3.5+): 前端框架,採用 Composition API
  - **Vite** (v7.0+): 建置工具,支援多頁應用(MPA)與快速 HMR
  - **Tailwind CSS** (v3.4+): Utility-first CSS 框架
  - **Vue I18n** (v10+): 國際化解決方案(繁中/英文)
  - **VeeValidate** (v4.15+): 表單驗證庫
  - **Pinia** (v2.3+): 狀態管理(語言設定、產品比較清單)

**Storage**: 本地 JSON 檔案(Mock Data),無後端資料庫

**Testing**:
  - **Vitest** (單元測試 - 選用)
  - **Playwright** (E2E 測試 - 選用,需求未明確要求測試)

**Target Platform**:
  - 桌機瀏覽器(Chrome、Firefox、Safari、Edge 最近 2 版)
  - 平板/手機(iOS Safari 15+、Chrome Mobile)
  - 不支援 IE11

**Project Type**: Web - 多頁應用(Multi-Page Application)

**Performance Goals**:
  - First Contentful Paint (FCP) ≤1.5s (桌機)、≤2.5s (手機)
  - 語言切換 <300ms
  - 產品比較功能 <1s
  - 動畫流暢度 60fps
  - Hero 圖片載入 ≤3s (3G 網速)

**Constraints**:
  - 靜態部署(無 SSR)
  - 無外部 API 呼叫(表單送出為模擬)
  - 支援「無外聯模式」(移除 Google 服務)
  - Bundle size 建議 <500KB (gzipped)

**Scale/Scope**:
  - 8 個頁面
  - ~6 個產品資料
  - ~6 個 FAQ 項目
  - 3 則新聞
  - 3 種表單
  - 2 種語言

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ Principle I: Simplicity First
- **狀態**: 通過
- **評估**: 採用 Vue 3 + Vite + Tailwind CSS 的標準堆疊,無過度抽象。Vite MPA 模式直接對應 8 個 HTML 頁面,無需複雜的路由或 SSR。僅在必要處引入狀態管理(Pinia)與驗證(VeeValidate)。

### ✅ Principle II: Scope Control
- **狀態**: 通過
- **評估**: Spec 中的 User Stories 已明確定義優先級(P1-P3),將嚴格按照 acceptance scenarios 實作,不增加未定義功能。

### ⚠️ Principle III: Test-Driven Development
- **狀態**: 需澄清
- **評估**: Spec 未明確要求測試。建議在 Phase 0 research 階段決定是否需要 E2E 測試(Playwright)來驗證 User Story acceptance scenarios。

### ✅ Principle IV: User Experience Consistency
- **狀態**: 通過
- **評估**: Tailwind CSS 提供一致的 utility 類別,FR-049~051 定義了 UI Kit 規範(按鈕、卡片、字級)。FR-035~040 涵蓋無障礙需求。

### ✅ Principle V: Performance Standards
- **狀態**: 通過
- **評估**: SC-004~009 定義了明確的效能指標(FCP、語言切換、動畫流暢度)。Vite 的按需載入與 Tailwind 的 PurgeCSS 有助於達成 bundle size 目標。

### ✅ Principle VI: Traditional Chinese Documentation
- **狀態**: 通過
- **評估**: 本 plan.md 以繁體中文撰寫,所有後續文件(research.md、data-model.md、quickstart.md)將遵循此原則。

### 結論
所有原則通過或需澄清。無複雜度違規需要追蹤。

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
techdrive-showcase-site/
├── public/                      # 靜態資源(圖片、假資料 JSON)
│   ├── images/
│   │   ├── hero/               # Hero 區塊主圖(1920×1080)
│   │   ├── products/           # 產品圖片(800×600、1200×800)
│   │   ├── logos/              # 品牌 LOGO、零售商 LOGO(SVG/PNG)
│   │   └── icons/              # 技術圖示、UI 圖示
│   ├── data/                   # Mock Data JSON 檔案
│   │   ├── products.json       # 產品資料(~6 件)
│   │   ├── news.json           # 新聞資料(3 則)
│   │   ├── faq.json            # FAQ 資料(6+ 題)
│   │   └── retailers.json      # 零售商資料
│   └── locales/                # i18n 翻譯檔案
│       ├── zh-TW.json          # 繁體中文
│       └── en.json             # 英文
│
├── src/
│   ├── components/             # Vue 可複用組件
│   │   ├── layout/             # 佈局組件(Header、Footer、Nav)
│   │   ├── ui/                 # UI 組件(Button、Card、Input、Modal)
│   │   ├── forms/              # 表單組件(ContactForm、DealerForm、RegistrationForm)
│   │   ├── product/            # 產品相關(ProductCard、ProductCompare、SpecTable)
│   │   └── sections/           # 區塊組件(HeroSection、TechSection、FAQSection)
│   │
│   ├── pages/                  # 頁面入口(每個 .html 對應一個資料夾)
│   │   ├── home/               # 首頁(index.html)
│   │   ├── about/              # 關於(about.html)
│   │   ├── technology/         # 技術(technology.html)
│   │   ├── products/           # 產品列表(products.html)
│   │   ├── product-detail/     # 產品詳情(product-detail.html?id=xxx)
│   │   ├── retail-partner/     # 零售商(retail-partner.html)
│   │   ├── media-news/         # 媒體新聞(media-news.html)
│   │   ├── support/            # 客服(support.html)
│   │   └── contact/            # 聯絡(contact.html)
│   │
│   ├── stores/                 # Pinia 狀態管理
│   │   ├── locale.js           # 語言設定
│   │   ├── compare.js          # 產品比較清單
│   │   └── ui.js               # UI 狀態(漢堡選單開關、Modal)
│   │
│   ├── composables/            # Vue Composition API 可複用邏輯
│   │   ├── useI18n.js          # i18n Hook
│   │   ├── useFormValidation.js# 表單驗證 Hook
│   │   └── useSmoothScroll.js  # 平滑滾動 Hook
│   │
│   ├── utils/                  # 工具函式
│   │   ├── validation.js       # 驗證規則
│   │   ├── animation.js        # 動畫工具
│   │   └── dataLoader.js       # JSON 資料載入
│   │
│   ├── styles/                 # 樣式
│   │   ├── main.css            # Tailwind 入口、全域樣式
│   │   ├── variables.css       # CSS 變數(品牌色)
│   │   └── animations.css      # 自訂動畫
│   │
│   └── main.js                 # Vue 應用程式初始化(Pinia、i18n)
│
├── index.html                  # Vite MPA 入口(Home)
├── about.html                  # About 頁面入口
├── technology.html             # Technology 頁面入口
├── products.html               # Products 頁面入口
├── product-detail.html         # Product Detail 頁面入口
├── retail-partner.html         # Retail & Partner 頁面入口
├── media-news.html             # Media & News 頁面入口
├── support.html                # Support 頁面入口
├── contact.html                # Contact 頁面入口
│
├── vite.config.js              # Vite 配置(MPA、Tailwind、alias)
├── tailwind.config.js          # Tailwind 配置(品牌色、字級、斷點)
├── package.json                # 依賴套件與 scripts
└── .gitignore
```

**Structure Decision**: 採用 **Vite Multi-Page Application (MPA)** 結構。每個頁面對應一個 `.html` 入口檔案,透過 Vite 的 `rollupOptions.input` 配置多個進入點。此架構適合 8 個獨立頁面的靜態網站,無需複雜的客戶端路由。組件、狀態、樣式集中於 `src/` 目錄,靜態資源與 Mock Data 放置於 `public/` 目錄,建置後直接產出為可部署的靜態檔案。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

無複雜度違規。所有技術選擇皆為業界標準解決方案,無過度抽象或不必要的架構層次。
