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

## 最終交付成果

**AI輔助日誌**
1. 使用線上 claude Sonnet4.5
```
您是一個程式架構師
我現在要執行一個 React + AI Coding 小作業

目的是要建置一個「創意想法牆」的最小可行產品（MVP）

接下來我會在 cursor 執行，所以我會先產生一個 rules

內容大概如下
---------------------------------------------
## 使用的框架與元件庫
╴框架：Next.js / React
╴Node 版本： +.nvmrc
╴資料庫/後端：Supabase
╴樣式：Tailwind CSS
╴元件庫（如果需要）：Shadcn UI
╴狀態管理庫（如果需要）：Zustand

## 注意事項
╴請先搜尋網路上類似工具使用的套件
╴需考量 RWD 響應式設計
╴建立 .gitignore 來排除指定檔案上傳（例如：node_modules, .env.local）

## README
╴專案介紹、功能列表、需求（Node 版本）、安裝與啟動、部屬、授權等

## 部屬
╴預計用 Vercel 
---------------------------------------------

以上內容 請根據 這份文檔 幫我檢查 是否符合需求
```
2. 使用 cursor ask
```
我要設計一個「創意想法牆」的單頁應用程式，並以「最小可行性方案 MVP」來進行設計。

核心功能： 
1. 使用 Supabase 進行 "ideas" 的 CRUD 
2. 這些"ideas" 會以 卡片的形式 顯示 
3. 卡片會顯示"內容"與"建立時間"

請以實際使用的角度，將功能依「必要、次要」來分類，並告訴我最佳的操作流程。
```
3. 使用 cursor ask 接在 接在 2. 之後
```
請扮演專業的 UI/UX 設計師,根據上面的討論 
用下面的格式,回傳「具體、可執行」的網頁設計規格。 
目標是幫助前端工程師能依據描述直接開始開發,內容需具備視覺與互動細節。 

輸出格式： 
#[頁面名稱]
－功能簡述：(一句話概述頁面目的) 
－色系搭配：(主色、輔色、背景色、按鈕色) 
## [由上而下列出使用元素] 請依畫面垂直順序列出元件,格式如下：
－元件名稱（如：頂部導覽列/按鈕/ideas wall 區塊） 
－顏色： 
－寬度： 
－高度： 
－字型大小與樣式（如有文字）： 
－功能說明（該元件的目的）：
－如[按鈕] → 說明觸發任務（例：「送出表單」、「刪除功能」）

請只輸出上述格式內容,不要附加分析、理由或額外說明。
```
4. 使用 cursor ai agent 接在 3. 之後
```
將上方對話的結論彙整成 Markdown 格式的 Spec 
請儲存到專案根目錄的「plan」資料夾中（若無自動建立），以好辨識的英文命名檔案
＊還不需要實作
```

**GitHub**
- https://github.com/Han010609/idea-wall-app

**vercal(已部署)**
- https://idea-wall-app.vercel.app/

**整體時間**
- 13:00 ~ 13:30 (大概) 先完成 supabase 創建 idea-wall 的 table
- 中間出門
- 21:15 ~ 21:27 先問 Claude 大致方向 & 在 cursor 當中新增 projerct rules
- 21:27 ~ 22:14 做完初版 本地 可以 讀到 supabase 也可以寫入 刪除
- 22:18 ~ 22:41 部屬到 vercal
- 完成
