# Idea Wall MVP Spec

## Overview
- **Goal**：提供最小可行的「創意想法牆」單頁應用，讓使用者能快速新增、瀏覽、刪除 ideas。
- **Tech Stack**：Next.js / React、Tailwind CSS、Supabase（依 `.nvmrc` 指定 Node 版本）、Zustand（如需狀態共享）、Shadcn UI（選配）。
- **Deployment**：Vercel。
- **Environment Variables**：
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Feature Prioritization
### 必要功能
1. **Supabase `ideas` 讀寫（新增 / 刪除）**
   - Table schema：`id (uuid)`, `content (text)`, `created_at (timestamptz now())`.
   - 所有操作成功後需即時反映於 UI（重新抓取或本地更新列表）。
2. **想法卡片列表**
   - 卡片顯示 `content` 與人性化時間（如「5 分鐘前」）。
   - 依 `created_at desc` 排序，最新在最上方。
3. **新增想法表單**
   - 單行文字輸入＋「新增想法」按鈕。
   - 送出時顯示 loading 狀態、成功後清空欄位並插入新卡片。
4. **刪除操作**
   - 卡片右上角提供 `Delete`（打叉 icon）。
   - Delete：彈出確認（Modal 或 Popover），確認後刪除。
5. **載入與錯誤狀態**
   - 初次載入顯示骨架卡片或 spinner。
   - CRUD 失敗顯示 toast/inline 錯誤訊息。
6. **RWD**
   - 手機單欄、平板/桌機雙欄 Masonry／多欄 Grid；輸入區塊與列表在不同 viewport 都保持可用。
7. **色系搭配**：主色 #0864a7、輔色 #efcf05、按鈕色 #e87929（hover #e65428），其餘中性色與主色、輔色、按鈕色相近即可(黑、白、灰除外)。

### 次要功能（後續迭代，暫時不理會）
1. 排序與篩選。
2. 更豐富的卡片內容（標籤、圖片、更新功能）。
3. Reactions/Vote、收藏分享(置頂)。
4. 深色模式或主題切換。
5. 新增manber

## 建議操作流程
1. **初次載入**
   - App 初始化 → 呼叫 Supabase `select * from ideas order by created_at desc`。
   - 顯示骨架卡或 spinner；完成後渲染卡片。
2. **新增想法**
   - 使用者在頂部表單輸入文字 → 按「新增想法」。
   - 表單 disabled + loading 指示 → 成功後清空、toast 提示 → 新卡片插入列表頂端。
3. **刪除想法**
   - 點擊 `Delete` → 顯示確認（文案「確定要刪除此想法嗎？」）。
   - 確認後調用 delete → 從列表移除 → 成功 toast。
4. **錯誤處理**
   - 任何 API 錯誤顯示紅色 toast，文字描述失敗原因並提供重試按鈕。

### 元件（由上而下）
1. **頂部導覽列**
   - 背景 `#FFFFFF`，陰影 `0 1px 2px rgba(15,23,42,0.08)`
   - 高 64px、寬 100%、固定於頂端。
   - 內容：Logo（可用文字）＋標題「Idea Wall」。
   - 排版：左右內距 24px；手機時 Logo 與標題置中。
2. **新增想法區塊**
   - 位置：導覽列下方、置中。
   - 容器最大寬 720px，左右 padding 16px（手機）/32px（桌機）。
   - 輸入框：背景 `#FFFFFF`、邊框 `#E2E8F0`、圓角 12px、高 48px、字體 16px Regular。
   - 送出按鈕：背景按鈕色 `#e87929`、文字白、圓角 12px、高 48px、寬 120px（手機改滿寬堆疊），hover 改為 `#e65428`，disabled 採較淺橘（如 `#f1ad8b`），loading 內顯 spinner。
3. **狀態提示列**
   - 載入骨架：高度 120px，圓角 16px，背景 `#E2E8F0`。
   - 錯誤提示：高度 40px，背景 `#FEE2E2`，文字 `#B91C1C`，14px Regular，內含「重試」按鈕（文字色主色）。
4. **想法卡片列表**
   - 容器最大寬 960px，兩欄 Grid（≥768px），單欄（<768px），間距 24px。
   - 卡片：背景白、圓角 16px、陰影 `0 4px 12px rgba(15,23,42,0.08)`、內距 20px。
   - 內容文字：16px Regular，顏色 `#0F172A`。
   - 時間標籤：12px Medium，顏色 `#94A3B8`，置於卡片底部。
   - 操作列：右上角 IconButton（僅 `Delete`），尺寸 32×32，icon 16px；hover 變主色 `#0864a7`，刪除確認使用輔色陰影或紅色提示。
5. **空狀態**
   - 若無資料，顯示插畫（可用簡單 icon）＋文字「還沒有任何想法」＋次要文字「新增第一個想法吧！」。
   - 文字色 `#94A3B8`，主文 16px、次文 14px。

## 互動細節
- 所有主要按鈕有 hover、active、focus ring（`跟色系顏色相近即可`）。
- 表單送出使用 Enter 鍵也能觸發。
- API 操作時 disable 對應表單／按鈕，避免重複提交。
- 手機端送出後自動捲動/聚焦到列表頂部，保證新卡片可見。
- 刪除確認使用 `AlertDialog`（Shadcn）或自製 modal，需再次點擊才會執行。

## 待辦與後續
- [ ] 設定 Supabase 資料表與行級安全規則（匿名可讀寫或受限）。
- [ ] 在 `.env.local` 內填入 Supabase URL/Key，並加入 `.gitignore`。
- [ ] 依此 Spec 設計頁面並串接 Supabase。

