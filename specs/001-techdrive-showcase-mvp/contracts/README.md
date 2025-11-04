# Contracts: Mock Data Schemas

本目錄包含所有前端 Mock 資料的 JSON Schema 定義。這些 schema 用於驗證 `public/data/` 目錄下的 JSON 檔案格式是否正確。

## Schema Files

- `product.schema.json` - 產品資料結構
- `technology.schema.json` - 核心技術資料結構
- `news.schema.json` - 新聞資料結構
- `faq.schema.json` - FAQ 資料結構
- `retailer.schema.json` - 零售商資料結構
- `site-config.schema.json` - 網站設定資料結構

## Usage

在開發過程中，可使用 JSON Schema 驗證工具（如 [ajv](https://ajv.js.org/)）來確保 Mock 資料符合定義的結構。

### Validation Example

```bash
# 安裝 ajv-cli
pnpm add -D ajv-cli

# 驗證產品資料
ajv validate -s contracts/product.schema.json -d public/data/products.json
```

### TypeScript Integration

所有 TypeScript 型別定義已記錄於 [data-model.md](../data-model.md)，可直接使用 `import` 匯入型別：

```typescript
import type { Product } from '@/types/product';
import productsData from '/public/data/products.json';

const products: Product[] = productsData;
```

## Related Files

- [data-model.md](../data-model.md) - 完整的資料模型文件
- `public/data/*.json` - 實際的 Mock 資料檔案
- `src/types/*.ts` - TypeScript 型別定義檔案
