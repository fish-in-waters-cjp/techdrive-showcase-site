# Data Model: TechDrive 科技車載品牌官網 MVP

<!--
  ⚠️ LANGUAGE REQUIREMENT: This data model MUST be written in Traditional Chinese (zh-TW)
  as per Constitution Principle VI. Technical terms may remain in English when commonly used.
-->

**Feature**: TechDrive 科技車載品牌官網 MVP
**Date**: 2025-11-05
**Related**: [spec.md](./spec.md) | [plan.md](./plan.md) | [research.md](./research.md)

## Overview

本文件定義所有前端 Mock 資料的結構與 TypeScript 型別。由於此為純前端專案，所有資料來自 JSON 檔案，無需資料庫設計。

---

## Core Entities

### 1. Product（產品）

代表車載產品的完整資訊，包含基本屬性、規格、下載資源與比較欄位。

**TypeScript Interface**:

```typescript
interface Product {
  id: string;                    // 唯一識別碼（如 "TD-100"）
  name: string;                  // 產品名稱
  slug: string;                  // URL 友善的識別碼（如 "td-100"）
  thumbnail: string;             // 縮圖路徑（800×600，≤300KB）
  image: string;                 // 詳情頁大圖路徑（1200×800，≤300KB）
  highlights: string[];          // 亮點清單（3 個項目）
  description: string;           // 產品描述（2-3 行）
  specs: ProductSpec[];          // 規格表（10-15 項）
  downloads: ProductDownload[];  // 下載連結（手冊、規格書等）
  category?: string;             // 產品分類（選填）
  featured?: boolean;            // 是否為精選產品
}

interface ProductSpec {
  label: string;                 // 規格名稱（如 "尺寸"）
  value: string;                 // 規格值（如 "120×60mm"）
}

interface ProductDownload {
  name: string;                  // 下載項目名稱（如 "產品手冊"）
  url: string;                   // 假下載連結（如 "#" 或 "/dl/td100.pdf"）
  type: 'datasheet' | 'manual' | 'other';  // 下載類型
}
```

**Example JSON**:

```json
{
  "id": "TD-100",
  "name": "TD-100",
  "slug": "td-100",
  "thumbnail": "/assets/products/td100-thumb.jpg",
  "image": "/assets/products/td100-large.jpg",
  "highlights": ["低延遲", "高耐熱", "車規級"],
  "description": "專為車載環境設計的高效能處理單元，支援 CAN 與 USB-C 連接。",
  "specs": [
    { "label": "尺寸", "value": "120×60mm" },
    { "label": "重量", "value": "180g" },
    { "label": "輸入/輸出", "value": "USB-C, CAN" },
    { "label": "工作溫度", "value": "-40°C ~ 85°C" },
    { "label": "處理器", "value": "ARM Cortex-A53" }
  ],
  "downloads": [
    { "name": "產品手冊", "url": "/dl/td100-manual.pdf", "type": "manual" },
    { "name": "技術規格書", "url": "/dl/td100-datasheet.pdf", "type": "datasheet" }
  ],
  "category": "主控單元",
  "featured": true
}
```

**Validation Rules**:
- `id` 必須唯一
- `highlights` 必須恰好 3 個項目
- `specs` 至少 10 項，最多 15 項
- `thumbnail` 與 `image` 必須為有效的圖片路徑

---

### 2. Technology（核心技術）

代表 TechDrive 的三大核心技術，用於 Technology 頁面與首頁技術卡片。

**TypeScript Interface**:

```typescript
interface Technology {
  key: string;                   // 唯一識別碼（如 "smart_connect"）
  title: string;                 // 技術名稱（如 "Smart Connect"）
  summary: string;               // 一句話賣點（≤50 字）
  description: string;           // 詳細說明（2-3 行）
  icon: string;                  // SVG 圖示路徑
  benefits: string[];            // 優勢要點（3-5 項）
}
```

**Example JSON**:

```json
{
  "key": "smart_connect",
  "title": "Smart Connect",
  "summary": "低延遲連接，快速穩定",
  "description": "採用專利的自適應連接技術，確保車載裝置間的資料傳輸低延遲、高穩定。即使在高速移動與訊號干擾環境下，仍能維持穩定連線。",
  "icon": "/assets/tech/smart-connect.svg",
  "benefits": [
    "連線延遲低於 10ms",
    "抗干擾能力強",
    "支援多裝置同時連線",
    "自動恢復斷線"
  ]
}
```

**Validation Rules**:
- `key` 必須唯一
- `summary` 不可超過 50 字
- `benefits` 至少 3 項，最多 5 項

---

### 3. News（新聞/媒體報導）

代表公司新聞、媒體報導或活動資訊。

**TypeScript Interface**:

```typescript
interface News {
  id: string;                    // 唯一識別碼
  title: string;                 // 新聞標題
  date: string;                  // 日期（YYYY-MM-DD 格式）
  excerpt: string;               // 摘要（80-120 字）
  url: string;                   // 外部連結或假連結（"#"）
  category?: 'press' | 'event' | 'announcement';  // 分類
  image?: string;                // 新聞配圖（選填）
}
```

**Example JSON**:

```json
{
  "id": "n1",
  "title": "TechDrive 亮相 CES 2025，展示智慧車載技術",
  "date": "2025-01-08",
  "excerpt": "TechDrive 於美國拉斯維加斯 CES 2025 展會中，展示最新的 Smart Connect 技術與 TD-200 系列產品，吸引眾多國際買家關注。",
  "url": "#",
  "category": "event",
  "image": "/assets/news/ces2025.jpg"
}
```

**Validation Rules**:
- `date` 必須為 ISO 8601 格式（YYYY-MM-DD）
- `excerpt` 長度介於 80-120 字

---

### 4. FAQ（常見問題）

代表客戶支援頁面的常見問題解答。

**TypeScript Interface**:

```typescript
interface FAQ {
  id: string;                    // 唯一識別碼
  question: string;              // 問題
  answer: string;                // 答案
  category?: string;             // 分類（如 "技術支援"、"產品規格"）
  order?: number;                // 顯示順序
}
```

**Example JSON**:

```json
{
  "id": "faq1",
  "question": "是否支援車規級溫度範圍？",
  "answer": "是的，我們的產品皆支援車規級溫度範圍：-40°C 至 85°C，確保在極端環境下仍能穩定運作。",
  "category": "產品規格",
  "order": 1
}
```

**Validation Rules**:
- `question` 與 `answer` 不可為空
- `order` 用於排序顯示順序（數字越小越前面）

---

### 5. Retailer/Partner（合作零售商）

代表合作零售商或經銷商資訊，用於首頁與 Retail & Partner 頁面。

**TypeScript Interface**:

```typescript
interface Retailer {
  id: string;                    // 唯一識別碼
  name: string;                  // 零售商名稱
  logo: string;                  // LOGO 路徑（SVG 或 PNG，≤80KB）
  url?: string;                  // 官網連結（選填，假連結為 "#"）
  region?: string;               // 服務區域（如 "台灣"、"亞太"）
}
```

**Example JSON**:

```json
{
  "id": "r1",
  "name": "Tech Store Taiwan",
  "logo": "/assets/retailers/tech-store.svg",
  "url": "#",
  "region": "台灣"
}
```

**Validation Rules**:
- `logo` 檔案大小不可超過 80KB

---

### 6. Form Data（表單資料）

代表使用者提交的表單資料結構，雖為前端模擬，仍需定義型別以確保驗證邏輯正確。

#### 6.1 Contact Form（聯絡表單）

```typescript
interface ContactFormData {
  name: string;                  // 姓名（必填）
  company?: string;              // 公司名稱（選填）
  email: string;                 // Email（必填，需驗證格式）
  message: string;               // 訊息內容（必填，≤600 字）
}
```

#### 6.2 Retailer Application Form（經銷商申請表單）

```typescript
interface RetailerApplicationFormData {
  companyName: string;           // 公司名稱（必填）
  region: string;                // 地區（必填，下拉選單）
  contactPerson?: string;        // 聯絡人（選填）
  email: string;                 // Email（必填，需驗證格式）
  message: string;               // 留言（必填，≤600 字）
}
```

#### 6.3 Product Registration Form（產品註冊表單）

```typescript
interface ProductRegistrationFormData {
  productModel: string;          // 產品型號（必填，下拉選單）
  serialNumber: string;          // 序號（必填）
  email: string;                 // Email（必填，需驗證格式）
}
```

**Validation Rules**（使用 Yup schema 搭配 VeeValidate）:

```typescript
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'

export const useFormSchemas = () => {
  const { t } = useI18n()

  const contactFormSchema = yup.object({
    name: yup.string().required(t('validation.required')),
    company: yup.string().optional(),
    email: yup.string().required(t('validation.required')).email(t('validation.email')),
    message: yup.string().required(t('validation.required')).max(600, t('validation.maxLength', { max: 600 }))
  })

  const retailerApplicationFormSchema = yup.object({
    companyName: yup.string().required(t('validation.required')),
    region: yup.string().required(t('validation.required')),
    contactPerson: yup.string().optional(),
    email: yup.string().required(t('validation.required')).email(t('validation.email')),
    message: yup.string().required(t('validation.required')).max(600, t('validation.maxLength', { max: 600 }))
  })

  const productRegistrationFormSchema = yup.object({
    productModel: yup.string().required(t('validation.required')),
    serialNumber: yup.string().required(t('validation.required')),
    email: yup.string().required(t('validation.required')).email(t('validation.email'))
  })

  return {
    contactFormSchema,
    retailerApplicationFormSchema,
    productRegistrationFormSchema
  }
}
```

---

### 7. Site Configuration（網站設定）

代表全站通用的設定資料，如導航選單、社群連結、版權資訊等。

**TypeScript Interface**:

```typescript
interface SiteConfig {
  locale: string;                // 預設語言（zh-TW 或 en）
  menus: MenuItem[];             // 主導航選單
  socialLinks: SocialLink[];     // 社群連結
  footerLinks: FooterLink[];     // 頁尾快速連結
  copyright: string;             // 版權文字
  contactEmail: string;          // 客服 Email
  supportHours: string;          // 客服時間
}

interface MenuItem {
  label: string;                 // 選單文字（需支援 i18n key）
  path: string;                  // 路由路徑
  order: number;                 // 顯示順序
}

interface SocialLink {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'youtube';
  url: string;                   // 假連結（"#"）
}

interface FooterLink {
  label: string;                 // 連結文字
  path: string;                  // 路由路徑
  category?: string;             // 分類（如 "產品"、"支援"）
}
```

**Example JSON**:

```json
{
  "locale": "zh-TW",
  "menus": [
    { "label": "nav.home", "path": "/", "order": 1 },
    { "label": "nav.about", "path": "/about", "order": 2 },
    { "label": "nav.technology", "path": "/technology", "order": 3 },
    { "label": "nav.products", "path": "/products", "order": 4 }
  ],
  "socialLinks": [
    { "platform": "facebook", "url": "#" },
    { "platform": "linkedin", "url": "#" }
  ],
  "footerLinks": [
    { "label": "footer.about", "path": "/about", "category": "公司" },
    { "label": "footer.contact", "path": "/contact", "category": "支援" }
  ],
  "copyright": "© 2025 TechDrive. All rights reserved.",
  "contactEmail": "support@techdrive.com",
  "supportHours": "週一至週五 09:00-18:00（台灣時間）"
}
```

---

## Relationships

### Product ↔ Technology
- 產品可以標註使用哪些核心技術（透過 `technology_keys` 陣列關聯）
- 例如：TD-100 使用 Smart Connect 與 Active Clamps

### Product ↔ Retailer
- 無直接關聯，零售商提供所有 TechDrive 產品

### News ↔ Product
- 新聞可以提及特定產品（透過 `related_products` 陣列關聯）
- 例如：CES 展會新聞提及 TD-200

---

## State Management (Pinia Stores)

此專案使用 **Pinia** 進行狀態管理,定義以下三個主要 Store:

### 1. CompareStore (產品比較)

```typescript
// stores/compare.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/product'

export const useCompareStore = defineStore('compare', () => {
  const items = ref<Product[]>([])
  const MAX_ITEMS = 3

  const count = computed(() => items.value.length)
  const canAdd = computed(() => count.value < MAX_ITEMS)
  const isFull = computed(() => count.value >= MAX_ITEMS)

  function addItem(product: Product): boolean {
    if (isFull.value) {
      return false  // 已達上限
    }
    if (items.value.some(p => p.id === product.id)) {
      return false  // 已存在
    }
    items.value.push(product)
    return true
  }

  function removeItem(productId: string) {
    const index = items.value.findIndex(p => p.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function clear() {
    items.value = []
  }

  function hasItem(productId: string): boolean {
    return items.value.some(p => p.id === productId)
  }

  return {
    items,
    count,
    canAdd,
    isFull,
    addItem,
    removeItem,
    clear,
    hasItem
  }
})
```

### 2. LocaleStore (語言設定)

```typescript
// stores/locale.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLocaleStore = defineStore('locale', () => {
  const { locale } = useI18n()
  const currentLocale = ref<'zh-TW' | 'en'>(
    (localStorage.getItem('locale') as 'zh-TW' | 'en') || 'zh-TW'
  )

  function setLocale(newLocale: 'zh-TW' | 'en') {
    currentLocale.value = newLocale
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)
  }

  function initLocale() {
    locale.value = currentLocale.value
  }

  return {
    currentLocale,
    setLocale,
    initLocale
  }
})
```

### 3. UIStore (UI 狀態)

```typescript
// stores/ui.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const offlineMode = ref<boolean>(
    localStorage.getItem('offlineMode') === 'true'
  )
  const mobileMenuOpen = ref<boolean>(false)

  function toggleOfflineMode(enabled: boolean) {
    offlineMode.value = enabled
    localStorage.setItem('offlineMode', String(enabled))
  }

  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  function closeMobileMenu() {
    mobileMenuOpen.value = false
  }

  return {
    offlineMode,
    mobileMenuOpen,
    toggleOfflineMode,
    toggleMobileMenu,
    closeMobileMenu
  }
})
```

---

## Data Loading Strategy

所有 Mock 資料在應用程式啟動時一次性載入（透過 `import` 靜態匯入），無需動態載入或 API 請求。

```typescript
// src/lib/data-loader.ts
import productsData from '/public/data/products.json';
import technologiesData from '/public/data/technologies.json';
import newsData from '/public/data/news.json';
import faqsData from '/public/data/faqs.json';
import retailersData from '/public/data/retailers.json';

export const data = {
  products: productsData as Product[],
  technologies: technologiesData as Technology[],
  news: newsData as News[],
  faqs: faqsData as FAQ[],
  retailers: retailersData as Retailer[],
};
```

---

## File Organization

```text
public/data/
├── products.json       # 6-8 個產品
├── technologies.json   # 3 個核心技術
├── news.json           # 3 則新聞
├── faqs.json           # 6+ 個 FAQ
└── retailers.json      # 6-12 個零售商

src/types/
├── product.ts          # Product, ProductSpec, ProductDownload
├── technology.ts       # Technology
├── news.ts             # News
├── faq.ts              # FAQ
├── retailer.ts         # Retailer
├── form.ts             # ContactFormData, RetailerApplicationFormData, ProductRegistrationFormData
└── site-config.ts      # SiteConfig, MenuItem, SocialLink, FooterLink
```

---

## Next Steps

1. ✅ **Data Model Complete** - 本檔案已完成
2. 🔄 **Generate contracts/** - 產生 JSON schema 檔案
3. 🔄 **Generate quickstart.md** - 撰寫開發環境設定指南
