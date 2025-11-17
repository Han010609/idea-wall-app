# Idea Wall

Next.js + Supabase 的「創意想法牆」最小可行產品。依照 `plan/idea-wall-mvp-spec.md` 需求完成，可於瀏覽器快速新增、瀏覽、刪除想法卡片，並支援 RWD、骨架載入、錯誤提示與刪除確認。

## 功能
- 讀取 Supabase `ideas` 資料表並依建立時間倒序顯示
- 單行表單新增想法：loading/disabled 狀態、成功清除欄位並自動捲動至頂
- 卡片刪除 + AlertModal 確認，完成後即時更新列表
- 錯誤與載入骨架、空狀態提示
- Tailwind CSS 版面規劃 + 指定色票 (#0864a7 / #efcf05 / #e87929)

## 安裝
```bash
cd idea-wall-app
npm install
npm run dev
```

## 環境變數
於 `idea-wall-app/.env.local` 內設定：
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## 指令
- `npm run dev`：開發伺服器
- `npm run build`：產生正式版
- `npm run start`：production server
- `npm run lint`：ESLint

## 規格
- Node 版本：`nvm use`（`20.18.0`）
- 部署：Vercel
- 生態系：Next.js App Router、TypeScript、Tailwind CSS、Zustand、Supabase、react-hot-toast

