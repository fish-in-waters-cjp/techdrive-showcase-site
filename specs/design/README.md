# TechDrive UI Design Mockups

本目錄包含 TechDrive 科技車載品牌官網 MVP 的 HTML UI 設計稿。

## 設計稿清單

### ✅ 已完成

1. **design-system.html** - 完整設計系統展示頁
   - 色彩系統（品牌色、中性色、狀態色）
   - 字級系統（H1-H3、內文）
   - 間距系統（4px-64px）
   - UI 組件（按鈕、卡片、表單、狀態訊息）
   - 響應式網格
   - 動效指引
   - 無障礙設計規範

2. **home.html** - 首頁設計稿（P1 優先級）
   - Header（導航、語言切換、漢堡選單）
   - Hero 區塊（主標、副標、CTA 按鈕）
   - 核心技術特色 3 卡
   - 產品系列預覽（6 件產品）
   - 合作零售商 LOGO 帶
   - Footer（快速連結、版權資訊）
   - 響應式設計（桌機/平板/手機）

### 🔄 待補充頁面

以下頁面的設計規格已在 spec.md 中詳細定義，可依據 design-system.html 中的設計系統進行實作：

3. **about.html** - 關於頁面（P1）
   - 品牌故事區塊（120-180 字）
   - 使命/價值 3 點
   - 時間線（4 節點，帶滑入動效）

4. **technology.html** - 技術頁面（P1）
   - Smart Connect、Active Clamps、EcoBoost Drive
   - 技術卡片（含 SVG/微動畫）
   - 詳細說明區塊

5. **products.html** - 產品列表頁面（P1）
   - 產品卡網格（圖片、名稱、3 亮點）
   - 查看詳情 / 加入比較按鈕
   - 產品篩選功能（選用）

6. **product-detail.html** - 產品詳情頁面（P1）
   - 產品大圖（1200×800）
   - 重點賣點（3-5 條）
   - 規格表（10-15 行）
   - 下載手冊與購買連結（假連結）

7. **contact.html** - 聯絡頁面（P2）
   - 聯絡表單（姓名*、公司、Email*、訊息*）
   - 表單驗證示範
   - 靜態地圖占位圖
   - 聯絡資訊

8. **support.html** - 客服頁面（P3）
   - FAQ 展開/收合設計（至少 6 題）
   - 產品註冊表單
   - 客服聯繫方式

9. **media-news.html** - 媒體新聞頁面（P3）
   - 3 則新聞卡（標題、日期、摘要）
   - 資源下載區
   - 圖片打包下載 / 品牌手冊下載

10. **retail-partner.html** - 零售商頁面（P2）
    - 經銷商申請表單
    - 零售商列表/地圖
    - 合作條件說明

## 設計系統使用方式

所有頁面都應使用 `design-system.html` 中定義的設計 token（CSS 變數）：

```css
/* 品牌色彩 */
var(--brand-blue)      /* #0066FF - 主要品牌色 */
var(--brand-blue-dark) /* #0052CC - Hover 狀態 */

/* 間距 */
var(--space-3) /* 16px */
var(--space-4) /* 24px */
var(--space-5) /* 32px */
var(--space-6) /* 48px */

/* 圓角 */
var(--radius-sm) /* 8px - 按鈕 */
var(--radius-md) /* 16px - 卡片 */

/* 陰影 */
var(--shadow-md) /* 卡片預設陰影 */
var(--shadow-lg) /* Hover 加深陰影 */

/* 轉場 */
var(--transition-base) /* 150ms ease */
```

## 響應式斷點

- **桌機**：≥1280px（4欄網格、水平導航）
- **平板**：768-1279px（2欄網格）
- **手機**：≤767px（1欄網格、漢堡選單）

## 互動狀態

### 按鈕
- **Primary**: `background: var(--brand-blue)` → Hover: `translateY(-2px) + shadow-lg`
- **Secondary**: `border: 2px solid var(--gray-300)` → Hover: `border-color: var(--brand-blue)`

### 卡片
- 預設: `box-shadow: var(--shadow-md)`
- Hover: `translateY(-4px) + shadow-lg`

### 表單
- Focus: `border-color: var(--brand-blue) + 3px rgba blur`
- Error: `border-color: var(--error)` + 錯誤訊息

### 語言切換
- 切換時間：<300ms
- Active 狀態：`background: var(--brand-blue)`

## 無障礙設計檢查清單

- [ ] 所有圖片設定 alt 屬性
- [ ] 對比度符合 WCAG AA 標準（最低 4.5:1）
- [ ] 最小字級 14px
- [ ] 焦點樣式明確可見（2-3px 藍色邊框）
- [ ] 支援鍵盤導航（Tab、Enter、Space）
- [ ] 表單 label 與 input 正確關聯
- [ ] ARIA 屬性設定（語言切換、導航選單）

## Mock Data 準則

所有設計稿使用車載科技相關的真實感 Mock Data：

- **產品名稱**：SmartHub Pro X1、DriveSync Elite、SafeGuard Max 等
- **技術名稱**：Smart Connect、Active Clamps、EcoBoost Drive
- **產品特色**：4K UHD、Wi-Fi 6E、AI 智能導航等
- **圖片占位**：使用 "800 × 600" 文字標註尺寸

## 實作順序建議

1. ✅ **Phase 1**：design-system.html + home.html（已完成）
2. **Phase 2**：P1 優先級頁面（about, technology, products, product-detail）
3. **Phase 3**：P2/P3 優先級頁面（contact, support, media-news, retail-partner）
4. **Phase 4**：響應式與互動優化

## 技術規格

- 純 HTML + CSS（內嵌樣式）
- 最小化 JavaScript（僅用於互動示範）
- 不依賴外部框架（方便直接在瀏覽器開啟）
- 使用 CSS Grid + Flexbox 佈局
- 使用 CSS 變數（:root）管理設計 token

## 瀏覽方式

直接在瀏覽器開啟各 HTML 檔案即可查看設計稿：

```bash
# 在瀏覽器中開啟
open specs/design/design-system.html
open specs/design/home.html
```

## 參考文件

- [spec.md](../001-techdrive-showcase-mvp/spec.md) - 完整功能需求規格
- [plan.md](../001-techdrive-showcase-mvp/plan.md) - 實作計劃與技術規格
- [tasks.md](../001-techdrive-showcase-mvp/tasks.md) - 實作任務清單
