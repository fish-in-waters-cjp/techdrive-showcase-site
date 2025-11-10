# 圖片資產指南 (Image Assets Guide)

此文件說明專案所需的圖片資產規格與放置位置。

## 規格要求 (Specifications)

根據 spec.md FR-045~048 的要求:

### Hero 主圖 (Hero Images)
- **尺寸**: 1920×1080
- **檔案大小**: ≤350KB
- **格式**: JPG/WEBP
- **位置**: `/public/assets/hero/`
- **檔名範例**: `hero-main.jpg`

### 產品卡圖片 (Product Card Images)
- **尺寸**: 800×600
- **檔案大小**: ≤300KB
- **格式**: JPG/WEBP
- **位置**: `/public/assets/products/`
- **檔名範例**: `td100-thumb.jpg`, `td200-thumb.jpg`

### 產品詳情圖 (Product Detail Images)
- **尺寸**: 1200×800
- **檔案大小**: ≤300KB
- **格式**: JPG/WEBP
- **位置**: `/public/assets/products/`
- **檔名範例**: `td100-large.jpg`, `td200-large.jpg`

### 品牌 LOGO (Brand Logos)
- **格式**: SVG 或高倍 PNG
- **檔案大小**: ≤80KB
- **位置**: `/public/assets/`
- **檔名範例**: `logo.svg`, `logo@2x.png`

### 零售商 LOGO (Retailer Logos)
- **格式**: SVG/PNG
- **檔案大小**: ≤50KB (建議)
- **位置**: `/public/assets/retailers/`
- **檔名範例**: `retailer-1.svg`, `retailer-2.png`

### 技術圖示 (Technology Icons)
- **格式**: SVG
- **檔案大小**: ≤30KB (建議)
- **位置**: `/public/assets/tech/`
- **檔名範例**: `smart-connect.svg`, `active-clamps.svg`, `ecoboost-drive.svg`

## 開發階段占位圖 (Development Placeholders)

在正式圖片準備完成前,可以使用以下占位圖服務:

### 推薦服務
- **picsum.photos**: `https://picsum.photos/{width}/{height}`
- **placehold.co**: `https://placehold.co/{width}x{height}`
- **via.placeholder.com**: `https://via.placeholder.com/{width}x{height}`

### 範例 URL
```html
<!-- Hero 圖 (1920x1080) -->
<img src="https://picsum.photos/1920/1080" alt="Hero">

<!-- 產品卡圖 (800x600) -->
<img src="https://picsum.photos/800/600" alt="Product">

<!-- 產品詳情圖 (1200x800) -->
<img src="https://picsum.photos/1200/800" alt="Product Detail">
```

## 檢查清單 (Checklist)

在將專案交付給客戶前,請確認:

- [ ] 所有 Hero 圖尺寸符合 1920×1080
- [ ] 所有產品卡圖尺寸符合 800×600
- [ ] 所有產品詳情圖尺寸符合 1200×800
- [ ] 所有圖片檔案大小符合限制
- [ ] 所有 LOGO 為 SVG 或高倍 PNG 格式
- [ ] 圖片命名清楚且一致
- [ ] 圖片已優化 (使用 ImageOptim、TinyPNG 等工具)
- [ ] 所有圖片已加入 alt 屬性(在程式碼中)

## 工具建議 (Recommended Tools)

### 圖片優化工具
- **ImageOptim** (macOS): https://imageoptim.com/
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/

### 圖片編輯工具
- **Figma**: 設計稿匯出
- **Photoshop/Sketch**: 專業編輯
- **GIMP**: 免費開源選擇

### SVG 優化工具
- **SVGOMG**: https://jakearchibald.github.io/svgomg/
- **SVGO**: CLI 工具
