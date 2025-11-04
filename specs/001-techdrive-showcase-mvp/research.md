# 技術研究報告: TechDrive 科技車載品牌官網 MVP

**Date**: 2025-11-05
**Branch**: `001-techdrive-showcase-mvp`
**Research Phase**: Phase 0

本文件記錄針對 TechDrive 官網 MVP 專案的技術研究結果,所有決策基於最新(2025)且穩定的技術堆疊。

---

## 研究主題

### 1. Vite Multi-Page Application (MPA) 配置

#### 決策
採用 **Vite MPA 模式**,透過 `rollupOptions.input` 配置 8 個 HTML 入口點。

#### 理由
- Vite v7.0+ 原生支援多頁應用
- 無需複雜的客戶端路由(如 Vue Router)
- 每個頁面獨立建置,適合 SEO 與靜態部署
- 建置時自動處理共享代碼的分割(code splitting)

#### 實作範例

**vite.config.js**:
```javascript
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue()],
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
        contact: resolve(__dirname, 'contact.html'),
      },
      output: {
        manualChunks: {
          vendor: ['vue', 'pinia', 'vue-i18n', 'vee-validate']
        }
      }
    },
    minify: 'terser',
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true  // 生產環境移除 console.log
      }
    }
  }
})
```

**index.html 範例**:
```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechDrive - 科技車載品牌</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/pages/home/main.js"></script>
  </body>
</html>
```

#### 替代方案被否決的原因
- **Vue Router (SPA)**: 不需要客戶端路由,增加複雜度且影響 SEO
- **Nuxt (SSR/SSG)**: 過度工程化,此專案無需 SSR

---

### 2. Vue I18n 雙語切換實作

#### 決策
採用 **Vue I18n v10+**,使用 Composition API 的 `useI18n()`,語言檔案存放於 `public/locales/`。

#### 理由
- Vue 3 官方推薦的 i18n 解決方案(Trust Score: 7.8)
- 支援全域與局部作用域
- 簡單的 JSON 檔案結構,易於維護
- 無需建置時編譯,適合靜態部署

#### 實作範例

**src/main.js**:
```javascript
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'

// 載入語言檔案
import zhTW from '../public/locales/zh-TW.json'
import en from '../public/locales/en.json'

const i18n = createI18n({
  legacy: false,          // 啟用 Composition API 模式
  globalInjection: true,  // 全域注入 $t
  locale: 'zh-TW',        // 預設語言
  fallbackLocale: 'en',   // 備援語言
  messages: {
    'zh-TW': zhTW,
    'en': en
  }
})

const app = createApp(App)
app.use(createPinia())
app.use(i18n)
app.mount('#app')
```

**public/locales/zh-TW.json**:
```json
{
  "nav": {
    "home": "首頁",
    "about": "關於我們",
    "technology": "核心技術",
    "products": "產品系列",
    "contact": "聯絡我們"
  },
  "hero": {
    "title": "驅動未來,從科技開始",
    "subtitle": "TechDrive 提供創新的車載科技解決方案",
    "cta": "了解更多"
  },
  "validation": {
    "required": "此欄位為必填",
    "email": "請輸入有效的 Email 地址",
    "maxLength": "留言不可超過 {max} 字"
  }
}
```

**public/locales/en.json**:
```json
{
  "nav": {
    "home": "Home",
    "about": "About Us",
    "technology": "Technology",
    "products": "Products",
    "contact": "Contact"
  },
  "hero": {
    "title": "Drive the Future with Technology",
    "subtitle": "TechDrive provides innovative in-vehicle tech solutions",
    "cta": "Learn More"
  },
  "validation": {
    "required": "This field is required",
    "email": "Please enter a valid email address",
    "maxLength": "Message cannot exceed {max} characters"
  }
}
```

**語言切換組件 (Header.vue)**:
```vue
<script setup>
import { useI18n } from 'vue-i18n'

const { locale, availableLocales, t } = useI18n()

const changeLocale = (newLocale) => {
  locale.value = newLocale
  // 同步到 localStorage
  localStorage.setItem('locale', newLocale)
}
</script>

<template>
  <div class="locale-switcher">
    <label>{{ t('nav.language') }}:</label>
    <select v-model="locale" @change="changeLocale(locale)">
      <option value="zh-TW">繁體中文</option>
      <option value="en">English</option>
    </select>
  </div>
</template>
```

#### 替代方案被否決的原因
- **手動實作**: 缺乏 pluralization、fallback 等進階功能
- **i18next**: 非 Vue 生態專用,整合較複雜

---

### 3. VeeValidate 表單驗證模式

#### 決策
採用 **VeeValidate v4.15+ with Composition API**,搭配 Yup 進行 schema 驗證。

#### 理由
- 最高 Trust Score (9.8),Vue 3 最佳表單驗證庫
- 宣告式驗證,代碼清晰易維護
- 內建 i18n 支援,錯誤訊息可多語系
- 支援非同步驗證與自訂規則

#### 實作範例

**ContactForm.vue**:
```vue
<script setup>
import { useForm, Field, ErrorMessage } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import * as yup from 'yup'

const { t } = useI18n()

// 定義驗證 schema
const schema = yup.object({
  name: yup.string().required(t('validation.required')),
  company: yup.string(),  // 非必填
  email: yup.string()
    .required(t('validation.required'))
    .email(t('validation.email')),
  message: yup.string()
    .required(t('validation.required'))
    .max(600, t('validation.maxLength', { max: 600 }))
})

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema
})

// 表單送出處理(模擬)
const onSubmit = handleSubmit(async (values) => {
  // 模擬 API 呼叫
  await new Promise(resolve => setTimeout(resolve, 1500))

  // 隨機成功/失敗(模擬)
  const success = Math.random() > 0.3

  if (success) {
    alert(t('form.success'))
  } else {
    alert(t('form.error'))
  }
})
</script>

<template>
  <form @submit="onSubmit" novalidate class="space-y-4">
    <div>
      <label>{{ t('form.name') }} *</label>
      <Field name="name" type="text" class="form-input" />
      <ErrorMessage name="name" class="text-red-500 text-sm" />
    </div>

    <div>
      <label>{{ t('form.company') }}</label>
      <Field name="company" type="text" class="form-input" />
    </div>

    <div>
      <label>{{ t('form.email') }} *</label>
      <Field name="email" type="email" class="form-input" />
      <ErrorMessage name="email" class="text-red-500 text-sm" />
    </div>

    <div>
      <label>{{ t('form.message') }} *</label>
      <Field name="message" as="textarea" class="form-textarea" />
      <ErrorMessage name="message" class="text-red-500 text-sm" />
    </div>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="btn-primary"
    >
      <span v-if="!isSubmitting">{{ t('form.submit') }}</span>
      <span v-else>{{ t('form.submitting') }}</span>
    </button>
  </form>
</template>
```

#### 驗證規則複用

**src/utils/validation.js**:
```javascript
import * as yup from 'yup'

// 可複用的驗證規則
export const emailRule = yup.string().email().required()

export const dealerFormSchema = (t) => yup.object({
  companyName: yup.string().required(t('validation.required')),
  region: yup.string().required(t('validation.required')),
  contact: yup.string(),
  email: emailRule,
  message: yup.string().required(t('validation.required')).max(600)
})

export const productRegSchema = (t) => yup.object({
  model: yup.string().required(t('validation.required')),
  serialNumber: yup.string().required(t('validation.required')),
  email: emailRule
})
```

#### 替代方案被否決的原因
- **手動驗證**: 代碼冗長,難以維護
- **Vuelidate**: Trust Score 較低(5.2),社群支援不足

---

### 4. 無外聯模式實作(中國市場)

#### 決策
使用 **本地字體 + Pinia 狀態管理**,透過開關切換外部資源載入。

#### 理由
- 符合 FR-032 需求(移除 Google 服務)
- 確保中國市場無連線問題
- 使用 `@font-face` 載入本地字體檔案
- Pinia 管理全域開關狀態

#### 實作範例

**Pinia Store (stores/ui.js)**:
```javascript
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const offlineMode = ref(false)

  const toggleOfflineMode = (enabled) => {
    offlineMode.value = enabled
    localStorage.setItem('offlineMode', enabled)
  }

  // 從 localStorage 恢復設定
  const initOfflineMode = () => {
    const saved = localStorage.getItem('offlineMode')
    if (saved !== null) {
      offlineMode.value = saved === 'true'
    }
  }

  return {
    offlineMode,
    toggleOfflineMode,
    initOfflineMode
  }
})
```

**本地字體配置 (src/styles/fonts.css)**:
```css
/* 本地字體 - Noto Sans TC (繁中) */
@font-face {
  font-family: 'Noto Sans TC';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/NotoSansTC-Regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Noto Sans TC';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/NotoSansTC-Bold.woff2') format('woff2');
}

/* 本地字體 - Inter (英文) */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
}
```

**Tailwind 配置 (tailwind.config.js)**:
```javascript
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'system-ui', 'sans-serif'],
        display: ['Inter', 'Noto Sans TC', 'sans-serif']
      },
      colors: {
        brand: {
          blue: '#0066CC',    // 品牌藍
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            900: '#111827'
          }
        }
      },
      screens: {
        'tablet': '768px',    // 平板斷點
        'desktop': '1280px'   // 桌機斷點
      }
    }
  }
}
```

**地圖組件 (MapSection.vue)**:
```vue
<script setup>
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()
</script>

<template>
  <div class="map-section">
    <!-- 無外聯模式:顯示靜態圖片 -->
    <div v-if="uiStore.offlineMode" class="static-map">
      <img
        src="/images/map-placeholder.jpg"
        alt="地圖位置"
        class="w-full h-96 object-cover"
      />
      <a href="#" class="btn-secondary mt-4">
        {{ $t('contact.viewLocation') }}
      </a>
    </div>

    <!-- 正常模式:嵌入 Google Maps iframe -->
    <iframe
      v-else
      src="https://www.google.com/maps/embed?pb=..."
      width="100%"
      height="384"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
    ></iframe>
  </div>
</template>
```

**無外聯模式開關 (Header.vue)**:
```vue
<script setup>
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()
</script>

<template>
  <div class="offline-toggle">
    <label class="flex items-center gap-2">
      <input
        type="checkbox"
        v-model="uiStore.offlineMode"
        @change="uiStore.toggleOfflineMode(uiStore.offlineMode)"
      />
      <span>{{ $t('settings.offlineMode') }}</span>
    </label>
  </div>
</template>
```

#### 字體檔案準備
- **Noto Sans TC**: 從 Google Fonts 下載 .woff2 檔案
- **Inter**: 使用 Variable Font 版本(減少檔案大小)
- 檔案路徑: `public/fonts/`
- 建議使用 `font-display: swap` 避免 FOIT

#### 替代方案被否決的原因
- **完全移除字體**: 降低視覺品質
- **動態載入外部字體**: 無法滿足「無外聯模式」需求

---

## 技術決策總結表

| 技術領域 | 選擇方案 | 版本 | Trust Score | 決策理由 |
|---------|---------|------|-------------|---------|
| 前端框架 | Vue 3 | v3.5+ | 9.7 | Composition API 完整支援,適合多頁應用 |
| 建置工具 | Vite | v7.0+ | 8.3 | 原生 MPA 支援,快速建置 |
| CSS 框架 | Tailwind CSS | v3.4+ | 10 | Utility-first,響應式設計,品牌色配置簡單 |
| 國際化 | Vue I18n | v10+ | 7.8 | Vue 3 官方推薦,JSON 檔案易維護 |
| 表單驗證 | VeeValidate | v4.15+ | 9.8 | 宣告式驗證,i18n 支援 |
| 狀態管理 | Pinia | v2.3+ | 9.7 | Vue 3 官方狀態管理,輕量 |
| Schema 驗證 | Yup | latest | N/A | VeeValidate 最佳搭檔 |

---

## 效能最佳化策略

### 1. Bundle Size 控制
- **目標**: Gzipped < 500KB
- **方法**:
  - Vite 自動 code splitting
  - Tailwind PurgeCSS(移除未使用的 CSS)
  - 生產環境移除 `console.log`
  - 使用 Variable Fonts 減少字體檔案數量

### 2. 圖片最佳化
- **Hero 圖片**: 1920×1080,≤350KB,使用 WEBP 格式
- **產品圖片**: 800×600 與 1200×800,≤300KB,使用 WEBP + fallback
- **LOGO**: 優先使用 SVG,PNG 使用 2x retina 版本

### 3. 載入策略
- **字體**: `font-display: swap` 避免 FOIT
- **圖片**: Lazy loading(`loading="lazy"`)
- **JavaScript**: 僅載入當前頁面所需模組

---

## 風險評估與緩解

### 風險 1: 瀏覽器相容性
- **風險**: 舊版瀏覽器不支援 ES2022 語法
- **緩解**: Vite 已內建 Babel 轉譯,target 設定為 ES2015

### 風險 2: 無外聯模式效能
- **風險**: 本地字體檔案過大影響載入速度
- **緩解**:
  - 使用 Variable Fonts
  - 僅載入必要的字符集(CJK subset)
  - 啟用 WOFF2 壓縮

### 風險 3: i18n 檔案維護
- **風險**: JSON 檔案缺少 key 導致顯示問題
- **緩解**:
  - 設定 `fallbackLocale: 'en'`
  - 使用 TypeScript 檢查 key 完整性(選用)

---

## 後續研究建議

1. **測試策略**: 考慮使用 Playwright 進行 E2E 測試(需與 stakeholder 確認)
2. **動畫庫**: 若內建 CSS 動畫不足,可考慮 GSAP 或 Framer Motion
3. **圖片壓縮工具**: 整合 `vite-plugin-imagemin` 自動壓縮圖片

---

**研究完成日期**: 2025-11-05
**研究人員**: Claude (AI Assistant)
**下一步**: Phase 1 - Design & Contracts (生成 data-model.md, contracts/, quickstart.md)
