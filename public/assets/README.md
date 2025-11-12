# Assets 目錄結構

此目錄包含所有靜態圖片資源。以下是所需的圖片清單。

## 必要圖片清單

### Hero 區塊
- `hero/hero-bg.jpg` - 首頁主視覺背景圖 (建議尺寸: 1920×1080px)

### 產品圖片
- `products/td100-thumb.jpg` - TD-100 縮圖 (800×600px, ≤300KB)
- `products/td100-large.jpg` - TD-100 大圖 (1200×800px, ≤300KB)
- `products/td200-thumb.jpg` - TD-200 縮圖
- `products/td200-large.jpg` - TD-200 大圖
- `products/td300-thumb.jpg` - TD-300 縮圖
- `products/td300-large.jpg` - TD-300 大圖
- `products/td400-thumb.jpg` - TD-400 縮圖
- `products/td400-large.jpg` - TD-400 大圖
- `products/td500-thumb.jpg` - TD-500 縮圖
- `products/td500-large.jpg` - TD-500 大圖
- `products/td600-thumb.jpg` - TD-600 縮圖
- `products/td600-large.jpg` - TD-600 大圖

### 技術圖示
- `tech/smart-connect.svg` - Smart Connect 技術圖示
- `tech/active-clamps.svg` - Active Clamps 技術圖示
- `tech/ecoboost-drive.svg` - EcoBoost Drive 技術圖示

### 零售商 LOGO
- `retailers/tech-store.svg` - Tech Store Taiwan LOGO
- `retailers/autoparts.svg` - AutoParts Direct LOGO
- `retailers/cartech.svg` - CarTech Solutions LOGO
- `retailers/drivemax.svg` - DriveMax LOGO
- `retailers/smartauto.svg` - SmartAuto Hub LOGO
- `retailers/vehicletech.svg` - VehicleTech Pro LOGO
- `retailers/powerdrive.svg` - PowerDrive Systems LOGO
- `retailers/nextgen.svg` - NextGen Motors LOGO

### 新聞圖片
- `news/ces2025.jpg` - CES 2025 展會圖片
- `news/award.jpg` - 獎項圖片
- `news/partnership.jpg` - 合作夥伴圖片

### 佔位圖片
- `placeholders/news-placeholder.jpg` - 新聞預設圖片
- `placeholders/product-placeholder.jpg` - 產品預設圖片

## 圖片規範

### 格式
- LOGO: SVG 格式（可縮放）
- 照片: JPG 格式
- 透明背景圖: PNG 格式

### 尺寸與品質
- 縮圖 (Thumbnail): 800×600px, ≤300KB
- 大圖 (Large): 1200×800px, ≤300KB
- Hero 背景: 1920×1080px, ≤500KB
- LOGO: SVG 或 PNG, ≤80KB

### 最佳化
建議使用以下工具進行圖片最佳化：
- JPG: TinyJPG, ImageOptim
- PNG: TinyPNG, pngquant
- SVG: SVGO

## 暫時解決方案

在取得實際圖片之前，可以使用以下線上服務生成佔位圖片：
- https://placehold.co/ - 簡單的佔位圖片
- https://picsum.photos/ - 隨機照片
- https://loremflickr.com/ - 主題照片

範例：
```html
<!-- 800x600 產品縮圖 -->
<img src="https://placehold.co/800x600/0066CC/FFFFFF?text=TD-100" alt="TD-100">

<!-- 1920x1080 Hero 背景 -->
<img src="https://picsum.photos/1920/1080" alt="Hero Background">
```
