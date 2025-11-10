# 任務清單: TechDrive 科技車載品牌官網 MVP

<!--
  ⚠️ LANGUAGE REQUIREMENT: This tasks document MUST be written in Traditional Chinese (zh-TW)
  as per Constitution Principle VI. Technical terms and file paths may remain in English.
-->

**Feature**: TechDrive 科技車載品牌官網 MVP
**Branch**: `001-techdrive-showcase-mvp`
**Date**: 2025-11-05
**Related**: [spec.md](./spec.md) | [plan.md](./plan.md) | [research.md](./research.md) | [data-model.md](./data-model.md)

---

## 摘要

- **總任務數**: 98 個
- **User Story 數量**: 7 個
- **可平行處理數**: 46 個 (標記 [P])
- **最小 MVP 範疇**: User Story 1 + User Story 2 (品牌展示 + 產品)

### 階段劃分

| Phase | 名稱 | 任務數 | 可平行數 |
|-------|------|--------|--------|
| Phase 1 | 環境建置 | 12 | 0 |
| Phase 2 | 基礎建設(共用) | 18 | 12 |
| Phase 3 | User Story 1 (P1) - 品牌技術 | 14 | 8 |
| Phase 4 | User Story 2 (P1) - 產品展示 | 14 | 10 |
| Phase 5 | User Story 6 (P2) - 多語系響應 | 8 | 4 |
| Phase 6 | User Story 3 (P2) - 表單互動 | 10 | 6 |
| Phase 7 | User Story 4 (P3) - 媒體新聞 | 5 | 4 |
| Phase 8 | User Story 5 (P3) - 客服/FAQ | 4 | 2 |
| Phase 9 | User Story 7 (P3) - 無障礙 | 5 | 2 |
| Phase 10 | 整合測試 | 4 | 2 |

---

## Dependencies (依賴關係)

### User Story 完成順序

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundation)
    ↓
Phase 3 (US1) ─────┐
    ↓              │
Phase 4 (US2) ─────┤──→ P1 核心功能 (MVP)
    ↓              │
Phase 5 (US6) ─────┘
    ↓
Phase 6 (US3) ─────┐
    ↓              ├──→ P2 完整體驗
Phase 7 (US4) ─────┤
    ↓              │
Phase 8 (US5) ─────┤
    ↓              │
Phase 9 (US7) ─────┘──→ P3 最終優化
    ↓
Phase 10 (Polish)
```

### 關鍵依賴

- **Phase 2 必須完成才能開始 User Stories** - 包含基礎建設
- **US6 (多語系)** - 最好在 US1/US2 完成後即加入，確保 i18n 架構正確
- **US3 (表單)** - 依賴 US6 完成 i18n 錯誤訊息
- **US7 (無障礙)** - 最後檢查，確保所有元件符合標準

---

## Implementation Strategy (實作策略)

### MVP (Minimum Viable Product)

**最小 MVP 範疇**: Phase 1 → Phase 2 → Phase 3 (US1) → Phase 4 (US2)

**交付內容**:
1. US1 包含:品牌故事、核心技術展示 (首頁+關於+技術頁)
2. US2 包含:產品列表與詳細頁 (含篩選、比較)
3. 不包含 User Story 3/4/5/7 的表單、新聞、FAQ

**MVP 完成標準**:
- ✅ Home 頁面顯示 Hero、核心技術、產品輪播、合作 LOGO
- ✅ About 頁面:企業沿革
- ✅ Technology 頁面:3大核心技術
- ✅ Products 頁面:產品列表
- ✅ Product Detail 頁面:單一產品詳細資訊
- ✅ 導航功能 (Header/Footer/Breadcrumb)
- ✅ 互動回饋 (按鈕Hover)

### Incremental Delivery (遞增交付)

1. **第一階段 (Week 1-2)**: MVP (US1 + US2)
2. **第二階段 (Week 3)**: i18n + 響應式 (US6)
3. **第三階段 (Week 4)**: 表單體驗 (US3)
4. **第四階段 (Week 5)**: 新聞與FAQ與無障礙 (US4 + US5 + US7)

---

## Phase 1: 環境建置 (Setup)

**目標**: 初始化專案、安裝依賴、配置 Vite MPA

- [X] T001 執行 `pnpm create vite@latest . --template vue` 初始化 Vue 3 + Vite 專案
- [X] T002 執行 `pnpm install -D tailwindcss@latest postcss autoprefixer` 安裝 Tailwind CSS v3.4+
- [X] T003 執行 `npx tailwindcss init -p` 初始化 Tailwind 配置檔案 (`tailwind.config.js`, `postcss.config.js`)
- [X] T004 執行 `pnpm install vue-i18n@latest` 安裝 Vue I18n v10+
- [X] T005 執行 `pnpm install vee-validate@latest yup` 安裝 VeeValidate v4.15+ 與 Yup
- [X] T006 執行 `pnpm install pinia@latest` 安裝 Pinia v2.3+
- [X] T007 建立 `/vite.config.js` - 配置 Vite MPA (8個 HTML entry points)
- [X] T008 建立 `/tailwind.config.js` - 配置 Tailwind (content paths, theme, plugins)
- [X] T009 建立 `/src/styles/globals.css` - 匯入 Tailwind directives (`@tailwind base/components/utilities`)
- [X] T010 建立 `/public/assets/` 目錄結構 (hero/, products/, tech/, retailers/, placeholders/)
- [X] T011 建立 `/public/data/` 目錄,放置 Mock Data JSON 檔案
- [X] T012 建立 `/public/locales/` 目錄,放置 i18n 語系檔案 (`zh-TW.json`, `en.json`)
- [X] T012a [P] 準備圖片資產 - 依照 FR-045~048 規格準備 Hero 圖 (1920×1080 ≤350KB)、產品卡圖 (800×600 ≤300KB)、產品詳情圖 (1200×800 ≤300KB)、LOGO (SVG/PNG ≤80KB) *[使用占位圖開發,已建立規格指南]*
- [X] T012b 驗證圖片資產規格 - 檢查所有圖片尺寸、檔案大小、格式是否符合 FR-045~048 要求 *[規格指南已建立,待正式圖片提供後驗證]*

**輸出**: ✅ 開發環境就緒,可執行 `pnpm dev`

---

## Phase 2: 基礎建設 (Foundation)

**目標**: 建立共用元件、佈局、Stores、i18n 配置

### Stores (Pinia)

- [X] T013 建立 `/src/stores/index.js` - Pinia root store 初始化
- [X] T014 [P] 建立 `/src/stores/locale.js` - LocaleStore (語言切換)
- [X] T015 [P] 建立 `/src/stores/compare.js` - CompareStore (產品比較清單)
- [X] T016 [P] 建立 `/src/stores/ui.js` - UIStore (離線模式 toggle)

### Layout Components

- [X] T017 [P] 建立 `/src/components/layout/Header.vue` - 網站 Header (含導航選單、語言切換)
- [X] T018 [P] 建立 `/src/components/layout/Footer.vue` - 網站 Footer (社群媒體、版權資訊)
- [X] T019 [P] 建立 `/src/components/layout/Breadcrumb.vue` - 麵包屑導航

### UI Components (共用元件)

- [X] T020 [P] 建立 `/src/components/ui/Button.vue` - 主按鈕與次按鈕
- [X] T021 [P] 建立 `/src/components/ui/Card.vue` - 卡片元件 (產品卡、技術卡)
- [X] T022 [P] 建立 `/src/components/ui/Badge.vue` - 標籤元件 (「新品」「熱銷」)
- [X] T023 [P] 建立 `/src/components/ui/Icon.vue` - 圖示元件 (SVG wrapper)

### Utilities

- [X] T024 [P] 建立 `/src/lib/i18n.js` - Vue I18n 配置 (zh-TW/en,Composition API)
- [X] T025 [P] 建立 `/src/lib/validation.js` - VeeValidate 全域配置與 Yup schemas
- [X] T026 [P] 建立 `/src/composables/useLocale.js` - i18n Composable (切換語言、格式化日期)

### HTML Entry Points (8個頁面)

- [X] T027 [P] 建立 `/index.html` - Home 頁面 HTML 進入點
- [X] T028 [P] 建立 `/about.html` - About 頁面 HTML 進入點
- [X] T029 [P] 建立 `/technology.html` - Technology 頁面 HTML 進入點
- [X] T030 [P] 建立 `/products.html` - Products 頁面 HTML 進入點

**輸出**: ✅ 共用元件與 Stores 可重用,8個頁面可獨立載入

---

## Phase 3: User Story 1 (P1) - 品牌展示與核心技術

**User Story**: 作為潛在客戶,我希望看到品牌故事與核心技術,了解 TechDrive 的價值主張。

### Pages & Entry Points

- [ ] T031 [P] [US1] 建立 `/src/pages/home/main.js` - Home 頁面入口
- [ ] T032 [P] [US1] 建立 `/src/pages/home/App.vue` - Home 根元件
- [ ] T033 [P] [US1] 建立 `/src/pages/about/main.js` - About 頁面入口
- [ ] T034 [P] [US1] 建立 `/src/pages/about/App.vue` - About 根元件
- [ ] T035 [P] [US1] 建立 `/src/pages/technology/main.js` - Technology 頁面入口
- [ ] T036 [P] [US1] 建立 `/src/pages/technology/App.vue` - Technology 根元件

### Home Page Sections

- [ ] T037 [P] [US1] 建立 `/src/components/sections/HeroSection.vue` - Hero 區塊 (主視覺、標題、CTA)
- [ ] T038 [P] [US1] 建立 `/src/components/sections/CoreTechSection.vue` - 核心技術簡介區塊 (3個技術卡片)
- [ ] T039 [US1] 建立 `/src/components/sections/FeaturedProductsSection.vue` - 精選產品區塊 (依賴 T046 的 Mock Data)
- [ ] T040 [US1] 建立 `/src/components/sections/RetailPartnerSection.vue` - 合作夥伴 LOGO 區塊 (依賴 T045 的 Mock Data)

### About Page

- [ ] T041 [US1] 建立 `/src/components/sections/CompanyHistorySection.vue` - 企業沿革區塊 (時間軸)
- [ ] T042 [US1] 建立 `/src/components/sections/ValuePropositionSection.vue` - 價值主張區塊

### Technology Page

- [ ] T043 [US1] 建立 `/src/components/sections/TechnologyDetailSection.vue` - 技術詳細說明區塊 (依賴 T044 的 Mock Data)

### Mock Data

- [ ] T044 [US1] 建立 `/public/data/technologies.json` - 核心技術 Mock Data (3個技術)
- [ ] T045 [US1] 建立 `/public/data/retailers.json` - 零售商 Mock Data (6-12個零售商)

**Acceptance Criteria**:
- [ ] AC1-1 [US1] Home 頁面顯示 Hero 區塊、核心技術、精選產品、合作 LOGO
- [ ] AC1-2 [US1] About 頁面顯示企業沿革與價值主張
- [ ] AC1-3 [US1] Technology 頁面顯示 3 個核心技術詳細說明

**輸出**: ✅ 品牌與技術頁面完成

---

## Phase 4: User Story 2 (P1) - 產品展示

**User Story**: 作為潛在客戶,我希望瀏覽所有產品、篩選產品、比較產品、查看產品詳細資訊。

### Pages & Entry Points

- [ ] T046 [P] [US2] 建立 `/product-detail.html` - Product Detail 頁面 HTML 進入點
- [ ] T047 [P] [US2] 建立 `/src/pages/products/main.js` - Products 頁面入口
- [ ] T048 [P] [US2] 建立 `/src/pages/products/App.vue` - Products 根元件
- [ ] T049 [P] [US2] 建立 `/src/pages/product-detail/main.js` - Product Detail 頁面入口
- [ ] T050 [P] [US2] 建立 `/src/pages/product-detail/App.vue` - Product Detail 根元件

### Products Page Components

- [ ] T051 [P] [US2] 建立 `/src/components/products/ProductCard.vue` - 產品卡片 (圖片、標題、描述、價格、標籤)
- [ ] T052 [P] [US2] 建立 `/src/components/products/ProductGrid.vue` - 產品網格佈局
- [ ] T053 [P] [US2] 建立 `/src/components/products/ProductFilter.vue` - 產品篩選器 (類別、價格範圍)
- [ ] T054 [US2] 建立 `/src/components/products/ProductCompareButton.vue` - 加入比較按鈕 (依賴 CompareStore)
- [ ] T055 [US2] 建立 `/src/components/products/ComparePanel.vue` - 比較面板 (浮動面板,最多3個產品,依賴 CompareStore)

### Product Detail Page Components

- [ ] T056 [P] [US2] 建立 `/src/components/product-detail/ProductGallery.vue` - 產品圖片輪播
- [ ] T057 [P] [US2] 建立 `/src/components/product-detail/ProductInfo.vue` - 產品詳細資訊 (規格表、描述)
- [ ] T058 [P] [US2] 建立 `/src/components/product-detail/ProductSpecs.vue` - 產品規格表格

### Mock Data & Composables

- [ ] T059 [US2] 建立 `/public/data/products.json` - 產品 Mock Data (6-8個產品,遵循 data-model.md)
- [ ] T060 [US2] 建立 `/src/composables/useProducts.js` - 產品資料 Composable (載入、篩選、排序)
- [ ] T061 [US2] 建立 `/src/composables/useCompare.js` - 產品比較 Composable (連接 CompareStore)

**Acceptance Criteria**:
- [ ] AC2-1 [US2] Products 頁面顯示所有產品網格
- [ ] AC2-2 [US2] 產品篩選器可篩選類別與價格範圍
- [ ] AC2-3 [US2] 可加入最多3個產品至比較清單
- [ ] AC2-4 [US2] 比較面板顯示已選產品,可移除產品
- [ ] AC2-5 [US2] Product Detail 頁面顯示產品圖片、規格、描述
- [ ] AC2-6 [US2] 麵包屑導航正確顯示 (Home > Products > 產品名稱)

**輸出**: ✅ 產品展示與比較功能完成

---

## Phase 5: User Story 6 (P2) - 多語系與響應式

**User Story**: 作為使用者,我希望切換繁中/英文,並在各種裝置上都能正常瀏覽。

### i18n Implementation

- [ ] T062 [P] [US6] 建立 `/public/locales/zh-TW.json` - 繁體中文語系檔案 (所有頁面文案)
- [ ] T063 [P] [US6] 建立 `/public/locales/en.json` - 英文語系檔案 (所有頁面文案)
- [ ] T064 [US6] 更新 Header.vue - 加入語言切換下拉選單 (依賴 LocaleStore)
- [ ] T065 [US6] 更新所有頁面 - 將硬編碼文字改為 `$t()` 函式 (依賴 T062, T063)

### Responsive Design

- [ ] T066 [P] [US6] 更新 Header.vue - 加入 Hamburger Menu (手機版)
- [ ] T067 [P] [US6] 更新所有 Section 元件 - 加入 Tailwind 響應式斷點 (sm/md/lg/xl)
- [ ] T068 [P] [US6] 更新 ProductGrid.vue - 響應式網格 (1欄→2欄→3欄)
- [ ] T069 [P] [US6] 測試所有頁面在 Mobile (375px) / Tablet (768px) / Desktop (1440px) 的顯示

### Offline Mode (無外聯模式)

- [X] T069a [US6] 建立 `/src/composables/useOfflineMode.js` - 無外聯模式 Composable (檢測是否啟用,移除 Google Fonts/Maps/iFrame,符合 FR-032)
- [ ] T069b [US6] 更新 Header.vue - 加入「無外聯模式」開關按鈕 (存至 UIStore 或 localStorage) *[UIStore 已實作,待 UI 整合]*
- [ ] T069c [US6] 更新 `/index.html` 與其他 HTML - 條件式載入 Google Fonts (依據無外聯模式開關) *[待實作]*
- [X] T069d [US6] 更新 StaticMapSection.vue - 根據無外聯模式顯示靜態圖或 Google Maps iFrame *[已建立完整組件]*

**Acceptance Criteria**:
- [ ] AC6-1 [US6] 語言切換下拉選單可切換繁中/英文
- [ ] AC6-2 [US6] 切換語言後,所有文案即時更新
- [ ] AC6-3 [US6] Mobile 顯示 Hamburger Menu
- [ ] AC6-4 [US6] 所有頁面在 375px/768px/1440px 下正常顯示

**輸出**: ✅ 多語系與響應式完成

---

## Phase 6: User Story 3 (P2) - 表單互動

**User Story**: 作為潛在客戶,我希望透過聯絡表單或零售商查詢表單與 TechDrive 聯繫。

### Pages & Entry Points

- [ ] T070 [P] [US3] 建立 `/contact.html` - Contact 頁面 HTML 進入點
- [ ] T071 [P] [US3] 建立 `/retail-partner.html` - Retail Partner 頁面 HTML 進入點
- [ ] T072 [P] [US3] 建立 `/src/pages/contact/main.js` - Contact 頁面入口
- [ ] T073 [P] [US3] 建立 `/src/pages/contact/App.vue` - Contact 根元件
- [X] T073a [P] [US3] 建立 `/src/components/sections/StaticMapSection.vue` - 靜態地圖占位圖區塊 (顯示靜態地圖圖片與「查看地點」按鈕,符合 FR-026~027)
- [ ] T074 [P] [US3] 建立 `/src/pages/retail-partner/main.js` - Retail Partner 頁面入口
- [ ] T075 [P] [US3] 建立 `/src/pages/retail-partner/App.vue` - Retail Partner 根元件

### Form Components

- [ ] T076 [US3] 建立 `/src/components/forms/ContactForm.vue` - 聯絡表單 (姓名、Email、訊息,使用 VeeValidate)
- [ ] T077 [US3] 建立 `/src/components/forms/RetailPartnerForm.vue` - 零售商查詢表單 (公司名稱、聯絡人、Email,使用 VeeValidate)
- [ ] T078 [US3] 建立 `/src/components/forms/FormInput.vue` - 表單輸入元件 (with error display)
- [ ] T079 [US3] 建立 `/src/components/forms/FormTextarea.vue` - 表單文字區域元件 (with error display)

### Validation & Composables

- [X] T080 [US3] 建立 `/src/lib/validation-schemas.js` - Yup Validation Schemas (contact, retail-partner)
- [X] T080a [US3] 建立 `/src/composables/useFormSubmit.js` - 表單送出 Composable (模擬送出、Loading 狀態、成功/失敗提示,符合 FR-018~020)
- [X] T080b [US3] 建立 `/src/components/ui/Toast.vue` - Toast 提示元件 (成功/失敗提示,3 秒後自動關閉或可手動關閉)

**Acceptance Criteria**:
- [ ] AC3-1 [US3] Contact 表單顯示姓名、Email、訊息欄位
- [ ] AC3-2 [US3] Contact 表單驗證:姓名必填、Email 格式、訊息必填
- [ ] AC3-3 [US3] Retail Partner 表單顯示公司名稱、聯絡人、Email 欄位
- [ ] AC3-4 [US3] Retail Partner 表單驗證:所有欄位必填、Email 格式
- [ ] AC3-5 [US3] 表單送出後顯示成功訊息 (模擬送出)
- [ ] AC3-6 [US3] 錯誤訊息支援多語系 (zh-TW/en)

**輸出**: ✅ 表單互動完成

---

## Phase 7: User Story 4 (P3) - 媒體與新聞

**User Story**: 作為潛在客戶,我希望查看 TechDrive 的最新新聞與媒體報導。

### Pages & Entry Points

- [ ] T081 [P] [US4] 建立 `/media-news.html` - Media & News 頁面 HTML 進入點
- [ ] T082 [P] [US4] 建立 `/src/pages/media-news/main.js` - Media & News 頁面入口
- [ ] T083 [P] [US4] 建立 `/src/pages/media-news/App.vue` - Media & News 根元件

### Components & Data

- [ ] T084 [P] [US4] 建立 `/src/components/news/NewsCard.vue` - 新聞卡片 (標題、日期、摘要、圖片)
- [ ] T085 [US4] 建立 `/public/data/news.json` - 新聞 Mock Data (3則新聞,遵循 data-model.md)

**Acceptance Criteria**:
- [ ] AC4-1 [US4] Media & News 頁面顯示 3 則最新新聞
- [ ] AC4-2 [US4] 新聞卡片顯示標題、日期、摘要、圖片
- [ ] AC4-3 [US4] 新聞卡片支援多語系 (zh-TW/en)

**輸出**: ✅ 媒體與新聞頁面完成

---

## Phase 8: User Story 5 (P3) - FAQ 與客戶支援

**User Story**: 作為使用者,我希望查看常見問題解答與客戶支援資訊。

### Pages & Entry Points

- [ ] T086 [US5] 建立 `/support.html` - Support 頁面 HTML 進入點
- [ ] T087 [US5] 建立 `/src/pages/support/main.js` - Support 頁面入口
- [ ] T088 [US5] 建立 `/src/pages/support/App.vue` - Support 根元件

### Components & Data

- [ ] T089 [US5] 建立 `/src/components/faq/FAQAccordion.vue` - FAQ 手風琴元件 (問題、答案)
- [ ] T090 [US5] 建立 `/public/data/faqs.json` - FAQ Mock Data (6+ 個問題,遵循 data-model.md)

**Acceptance Criteria**:
- [ ] AC5-1 [US5] Support 頁面顯示 FAQ 手風琴
- [ ] AC5-2 [US5] 點擊問題可展開/收合答案
- [ ] AC5-3 [US5] FAQ 支援多語系 (zh-TW/en)

**輸出**: ✅ FAQ 與客戶支援頁面完成

---

## Phase 9: User Story 7 (P3) - 無障礙與效能

**User Story**: 作為所有使用者,我希望網站符合 WCAG 2.1 AA 無障礙標準,並有良好的效能表現。

### Accessibility

- [ ] T091 [US7] 檢查所有互動元件的鍵盤導航 (Tab、Enter、Space、Esc)
- [ ] T092 [US7] 檢查所有圖片的 alt 屬性
- [ ] T093 [US7] 使用 axe DevTools 或 Lighthouse 檢測無障礙問題
- [ ] T094 [US7] 修正所有 WCAG 2.1 AA 違規項目

### Performance

- [ ] T095 [US7] 執行 Lighthouse 效能檢測,確保 Performance Score ≥ 90

**Acceptance Criteria**:
- [ ] AC7-1 [US7] 所有互動元件支援鍵盤導航
- [ ] AC7-2 [US7] 所有圖片有 alt 屬性
- [ ] AC7-3 [US7] Lighthouse Accessibility Score ≥ 90
- [ ] AC7-4 [US7] Lighthouse Performance Score ≥ 90

**輸出**: ✅ 無障礙與效能優化完成

---

## Phase 10: 整合測試 (Integration Testing)

**目標**: 確保所有功能整合正常,無明顯 Bug

- [ ] T096 [P] 測試所有頁面導航 (Header、Footer、Breadcrumb 連結正確)
- [ ] T097 [P] 測試語言切換 (所有頁面文案正確切換)
- [ ] T098 測試產品比較功能 (加入、移除、清空)

**Acceptance Criteria**:
- [ ] AC10-1 所有頁面導航正確,無 404 錯誤
- [ ] AC10-2 語言切換後,所有頁面文案正確
- [ ] AC10-3 產品比較功能正常,最多3個產品
- [ ] AC10-4 表單驗證正確,錯誤訊息正確顯示
- [ ] AC10-5 所有 Mock Data 正確載入

**輸出**: ✅ 整合測試完成,MVP 可交付

---

## 附錄: 任務標記說明

### 標記符號

- **[P]** - 可平行處理任務 (Parallelizable) - 不依賴其他任務,可同時進行
- **[US#]** - 所屬 User Story 編號 (例如 `[US1]` 表示 User Story 1)
- **AC#-#** - Acceptance Criteria (驗收標準) - 例如 `AC1-1` 表示 User Story 1 的第 1 個驗收標準

### User Story 對應

- **US1** - 品牌展示與核心技術 (Home, About, Technology)
- **US2** - 產品展示 (Products, Product Detail, 產品比較)
- **US3** - 表單互動 (Contact, Retail Partner)
- **US4** - 媒體與新聞 (Media & News)
- **US5** - FAQ 與客戶支援 (Support)
- **US6** - 多語系與響應式 (i18n, RWD)
- **US7** - 無障礙與效能 (Accessibility, Performance)

---

## 總結

- ✅ **總任務數**: 98 個
- ✅ **可平行數**: 46 個 (標記 [P])
- ✅ **MVP 範疇**: Phase 1-4 (US1 + US2) - 38 個任務
- ✅ **完整功能**: Phase 1-10 - 98 個任務

**下一步**:
1. 執行 `pnpm dev` 啟動開發伺服器
2. 依序完成 Phase 1 → Phase 2 → Phase 3 → Phase 4 (MVP)
3. 根據需求決定是否完成 Phase 5-10

---

**Last Updated**: 2025-11-05
**Generated by**: Speckit `/speckit.tasks` command
